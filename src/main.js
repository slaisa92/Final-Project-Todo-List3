import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

import App from './App.vue';
import router from './router';
import './assets/main.css';

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
new Granim({
  element: '#canvas-basic',
  direction: 'diagonal',
  isPausedWhenNotInView: true,
  states: {
    'default-state': {
      gradients: [
        ['#82a0e3', '#5c7ced'], 
        ['#3d6fe5', '#1a4fa8'], 
        ['#50a5e6', '#0078d4']  
      ]
    }
  }
});
