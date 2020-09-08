import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 配置Vue环境下的Axios
import axios from 'axios'
import moment from 'moment'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;

Vue.config.productionTip = false

// 导入mit-ui组件库
import MintUI from 'mint-ui';

// 导入MintUI的样式表文件
import 'mint-ui/lib/style.min.css';

// 通过Vue.use()方法将MintUI注册为插件
Vue.use(MintUI);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
