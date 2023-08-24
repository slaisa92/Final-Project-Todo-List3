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
        ['#FAEBD7', '#00FFFF'], 
        ['#DEB887', '#6495ED'], 
        ['#4B0082', '#D3D3D3']  
      ]
    }
  }
});
