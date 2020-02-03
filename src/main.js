import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')