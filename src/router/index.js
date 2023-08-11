import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import TasksView from '@/views/TasksView.vue';

import ResetComponent from '@/components/ResetComponent.vue';
import AuthComponent from '@/components/AuthComponent.vue';
import UpdatePasswordComponent from '@/components/UpdatePasswordComponent.vue';

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthComponent
  },
  {
    path: '/signin',
    name: 'signIn',
    component: SignInView
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUpView
  },
  {
    path: '/reset-password',
    component: ResetComponent
  },

  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView,
    meta: { requireAuth: true }
  },
  {
    path: '/update-password',
    component: UpdatePasswordComponent
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  if (userStore.user === undefined) {
    await userStore.fetchUser();
  }
  console.log(userStore.user, to);
  if (!userStore.user && to.meta.requireAuth) {
    return { path: '/' };
  }
});
export default router;
