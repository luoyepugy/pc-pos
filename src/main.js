// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview';
import App from './App.vue'
import router from './routes'
import components from './components'
import store from './store'
import '@/assets/sass/theme.less'; // 定制iview主题色
import '@/assets/sass/app.scss';

Vue.use(iView);


/* eslint-disable no-new */
const RootAppConstructor = Vue.extend(App)
new RootAppConstructor({
    el: '#app',
    router,
    store,
    components: { components }
})