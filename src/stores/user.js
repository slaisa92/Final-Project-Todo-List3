// /store/user.js

import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined
  }),

  actions: {
    async fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      this.user = user;
    },
    async signUp(email, password, name) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        name
      });
      if (error) throw error;
      this.user = data.user;
    },
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      this.user = data.user;
    },
    async resetPassword(email) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://cozy-cranachan-795caa.netlify.app/update-password'
      });
      if (error) throw error;
    },
    async updatePassword(password) {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },

    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
});
