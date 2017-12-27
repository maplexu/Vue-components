//传入三个参数：
//  1. componentName: 指定的边界父组件的自定义组件名
//  2. eventName: 事件名称
//  3. 当前值
function broadcast(componentName, eventName, params){
  this.$children.forEach(child => {                           //遍历子组件
    var name = child.$options.componentName;                  //获取子组件的自定义组件名

    if(name === componentName){                               //若子组件的名称等于指定的边界父组件的名称，就对子组件触发指定事件
      child.$emit.apply(child, [eventName].concat(params));
    }else{                                                     //否则就对子组件递归调用该方法
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  })
}

export default {
  methods: {
    dispatch(componentName, eventName, params){
      var parent = this.$parent || this.$root;    //$parent为当前组件的父Vue实例，$root是当前组件的根Vue实例
      var name = parent.$options.componentName;   //获取父（根）组件的名称

      while(parent && (!name || name !== componentName)){
        parent = parent.$parent;

        if(parent){
          name = parent.$options.componentName;
        }
      }
      if(parent){
        parent.$emit.apply(parent,[eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params){
      broadcast.call(this, componentName, eventName, params);
    }
  }
}