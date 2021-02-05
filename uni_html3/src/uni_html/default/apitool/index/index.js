import { createApp } from 'vue'
import App from './Index.vue'

/**
 * 按需引入组件
 * ↓
 */
// import { 
//   ElButton,
//   ElCard,
//   ElCol,
//   ElForm,
//   ElFormItem,
//   ElInput,
//   ElOption,
//   ElRow,
//   ElSelect,
//   ElMessage,
//   ElTabs,
//   ElTabPane,
//   ElAlert,
// } from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// const app = createApp(App)
// app.use(ElButton)
// app.use(ElCard)
// app.use(ElCol)
// app.use(ElForm)
// app.use(ElFormItem)
// app.use(ElInput)
// app.use(ElOption)
// app.use(ElRow)
// app.use(ElSelect)
// app.use(ElMessage)
// app.use(ElTabs)
// app.use(ElTabPane)
// app.use(ElAlert)

/**
 * 完整引入组件
 * ↓
 */
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
app.use(ElementPlus)

app.mount('#app')