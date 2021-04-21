import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

import BaseButton from './components/base/BaseButton';
import BaseCard from './components/base/BaseCard';
import BaseDialog from './components/base/BaseDialog';
import BaseLoading from './components/base/BaseLoading';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-loading', BaseLoading);

app.mount('#app');
