<template>
  <div :class="[el-row, justify !== 'start' ? `is-justify-${this.justify}` : '', align !== 'top' ? `is-align-${this.align}` : '']" :style="style">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'XuRow',
    data(){

    },
    props: {
      gutter: Number,       //栅格间距
      type: String,         //布局类型
      jusitify: { 
        type: String,
        default: 'start'
      },
      align: {
        type: String,
        default: 'top'
      }
    },
    computed: {
      style(){            //组件样式
        var ret = {}        
        if(this.gutter){
          ret.marginLeft = `-${this.gutter / 2}px`;
          ret.marginRight = ret.marginLeft;
        }
        return ret;
      }
    }
  }
</script>

<style>
  
</style>