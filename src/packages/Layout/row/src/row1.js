export default {
  name: 'XuRow',
  componentName: 'XuRow',       //自定义的属性，用于在下面判断子组件的直属关系
  props: {
    tag: {            //标签类型，默认为div
      type: String,
      default: 'div'
    },
    gutter: Number,   //珊栏间隔（控制col列的间隔），默认为0
    type: String,     //布局类型，可选为flex，默认不设置
    justify: {        //flex布局情况下的水平排列方式
      type: String,
      default: 'start'
    },
    align: {          //flex布局情况下的垂直排列方式
      type: String,
      default: 'top'
    }
  },
  computed: {
    style(){
      var ret = {};         //定义组件的样式（由珊栏间隔决定的样式）,返回一个样式对象

      if(this.gutter){
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }
      return ret;
    }
  },
  render(h){
    return h(this.tag, {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.jusitify}` : '',    //判断是否添加flex布局的水平排列样式
        this.align !== 'top' ? `is-align-${this.align}` : '',             //判断是否添加flex布局的垂直排列样式
      ],
      style: this.style
    }, this.$slots.default);                //这里的this.$slots.default表示子元素为默认插槽slot
  }
}