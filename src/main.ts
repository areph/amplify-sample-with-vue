import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ja'
import awsconfig from './aws-exports'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Amplify.configure(awsconfig)
Vue.use(AmplifyPlugin, AmplifyModules)


Vue.config.productionTip = false
Vue.use(ElementUI, { locale });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
