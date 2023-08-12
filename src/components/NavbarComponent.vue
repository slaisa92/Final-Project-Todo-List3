<script setup>
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router'


const userStore = useUserStore();
const router = useRouter();
const signOut = () => {
  userStore.signOut();
  router.push('/');
}
</script>
<template>
  <nav class="navbar contrast-primary-background-color">
    <div class="container-fluid">
      <div>
        <RouterLink to="/" class="navbar-brand"><img src="@/assets/Logo.webp" alt="logo" height="100"></RouterLink>
      </div>
      <div>
        <div v-if="!userStore.user">
          <RouterLink to="/signin" class="btn btn-outline-primary me-2">Sign In</RouterLink>
          <RouterLink to="/signup" class="btn btn-primary">Sign Up</RouterLink>
        </div>
        <div v-else>
          <button class="btn btn-outline-primary" @click="signOut">Sign Out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

