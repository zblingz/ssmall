import Toast from './Toast'
import { createApp} from "vue"              
const obj = {}

obj.install = function(Vue) {
  const instance = createApp(Toast).mount(
    document.createElement('div')
  )
  document.body.appendChild(instance.$el)
  Vue.config.globalProperties.$toast = instance 
}

export default obj