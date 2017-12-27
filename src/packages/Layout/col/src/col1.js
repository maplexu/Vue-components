export default {
  name: 'XuCol',
  props: {
    span: {                 //栅格占据的列数，默认值为24
      type: Number,
      default: 24
    },
    tag: {                  //标签类型
      type: String,
      default: 'div'
    },
    offset: Number,         //栅格左侧的间隔格数
    pull: Number,           //栅格向右移动格式
    push: Number,           //栅格向左移动格式
    xs: [Number, Object],   //<768px 响应式栅格数或者栅格属性对象,可谓数字或对象,示例：{span:2, offset: 2}
    sm: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    gutter(){                               //珊栏间隔，继承row中设置的珊栏间隔大小
      let parent = this.$parent;
      while(parent && parent.$options.componentName !== 'XuRow'){
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h){
    let classList = [];
    let style = {};

    if(this.gutter){
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = this.paddingLeft;
    }

    //筛选span,offset,pull,push这四个配置属性，符合条件的就添加对应的class
    ['span', 'offset', 'pull' ,'push'].forEach(prop => {
      if(this[prop] || this[prop] === 0){
        classList.push(prop !== 'span' ? `el-col-${prop}-${this[prop]}` : `el-col-${this[prop]}`);
      }
    })

    //筛选xs,sm,md,lg,xl这几个配置属性，符合条件的就添加对应的clas
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if(typeof this[size] === 'number'){
        classList.push(`el-col-${size}-${this[size]}`);
      }else if(typeof this[size] === 'object'){
        let props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(prop !== 'span' ? `el-col-${size}-${prop}-${props[prop]}` : `el-col-${size}-${props[prop]}`);
        })
      }
    })

    return h(this.tag, {
      class: ['el-col', classList],
      style
    }, this.$slots.default);
  }
}