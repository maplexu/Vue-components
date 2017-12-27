<template>
  <!-- 该按钮组件的最顶层就是<button>标签 -->
  <button 
    class="el-button" 
    @click="handleClick" 
    :disabled="disabled" 
    :autofocus="autofocus" 
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize  ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading" @click="handleInnerClick"></i>
    <i class="icon" v-if="icon && !loading" @click="handleInnerClick"></i>
    <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
  </button>
</template>

<script>
  export default {
    name: 'XuButton',
    inject: {
      elFormItem: {
        default: ''
      }
    },
    props: {
      type: {                 //按钮类型
        type: String,
        default: 'default'
      },
      size: String,           //尺寸
      icon: {                 //图标类名
        type: String,
        default: ''
      },
      nativeType: {           //按钮的原生type属性
        type: String,
        default: 'button'
      },
      loading: Boolean,       //是否加载中
      disabled: Boolean,      //是否禁用
      plain: Boolean,         //是否为朴素按钮
      autofocus: Boolean,     //是否默认聚焦
      round: Boolean          //是否为圆形按钮
    },
    computed: {
      _elFormItemSize(){
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize(){
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },
    methods: {
      handleClick(evt){
        this.$emit('click', evt);          //这里是通过响应<button>的点击事件，然后触发XuButton组件的click事件
      },
      handleInnerClick(evt){
        if(this.disabled){
          evt.stopPropagation();
        }
      }
    }
  }
</script>

<style>
  
</style>