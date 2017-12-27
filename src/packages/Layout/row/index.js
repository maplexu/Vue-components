import Row from './src/row1'

Row.install = function(Vue){
  Vue.component(Row.name, Row);
}

export default Row;