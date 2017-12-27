import XuButton from './src/button'

XuButton.install = function(Vue){
  Vue.component(XuButton.name, XuButton.name);
}

export default XuButton;