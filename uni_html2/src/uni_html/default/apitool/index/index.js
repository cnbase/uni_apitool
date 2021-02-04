import Vue from 'vue';
import App from './Index.vue'

import { 
  Button,
  Card,
  Col,
  Form,
  FormItem,
  Input,
  Option,
  Row,
  Select,
  Message,
  Tabs,
  TabPane,
  Alert,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button)
Vue.use(Card)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(Row)
Vue.use(Select)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.prototype.$message = Message;

new Vue({
  el: '#app',
  render: h => h(App)
});