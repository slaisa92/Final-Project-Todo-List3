import { defineStore } from 'pinia';
import { supabase } from '../supabase';
import { useUserStore } from './user';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  getters: {
    completedTasks() {
      return this.tasks.filter((task) => task.is_complete);
    },
    incompletedTasks() {
      return this.tasks.filter((task) => !task.is_complete);
    },
    allTasks() {
      return this.tasks;
    }},
  actions: {
    async fetchTasks() {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      if (error) throw error;
      this.tasks = data;
    },
    async addTask(title) {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            user_id: useUserStore().user.id,
            title: title,
            is_complete: false
          }
        ])
        .select();
      if (error) throw error;
      this.tasks.unshift({ title, is_complete: false });
    },
    async updateTask(task, title) {
      const { error } = await supabase
        .from('tasks')
        .update({ title: title })
        .eq('id', task.id);
      if (error) throw error;
      this.tasks = this.tasks.map((item) =>
        item.id === task.id ? { ...item, title } : item
      );
    },
    async completeTask(task, is_complete) {
      const { error } = await supabase
        .from('tasks')
        .update({ is_complete: is_complete })
        .eq('id', task.id);
      if (error) throw error;
      this.tasks = this.tasks.map((item) =>
        item.id === task.id ? { ...item, is_complete } : item
      );
    },
    async deleteTask(task) {
      const { error } = await supabase.from('tasks').delete().eq('id', task.id);
      if (error) throw error;
      this.tasks = this.tasks.filter((item) => item.id != task.id);
    }
  }
});
