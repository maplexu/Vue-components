<template>
  <label class="el-radio" 
    :class="[
      border && radioSize ? 'el-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio" 
    :aria-checked="model === label" 
    :aria-disabled="isDisabled" 
    :tabIndex = "tabIndex" 
    @keydown.space.stop.prevent = "model = label"
  >
    <!-- 实际按钮 -->
    <!-- 注意： 这里为了替代原生radio按钮的样式，使用了一个小的技巧，通过span.el-radio__inner来显示按钮的样式，span.el-radio__inner为relative布局，且z-inde层级在input-radio的上面 -->
    <span class="el-radio__input" :class="{'is-disabled': isDisabled, 'is-checked': model === label}">
      <span class="el-radio__inner"></span>
      <input type="radio" class="el-radio__original" :value="label" v-model="model" @focus="focus = true" @blur="focus = false" @change="handleChange" :name="name" :disabled="isDisabled" tabindex="-1">
    </span>
    
    <!-- 按钮文字 -->
    <span class="el-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'XuRadio',
    mixins: [Emitter],
    inject: {
      elFormItem: {
        default : ''
      }
    },
    componentName: 'XuRadio',
    props: {
      value: {},
      label: {},                        //radio的value值
      disabled: Boolean,               //是否禁用
      name: String,                    //原生name属性
      border: Boolean,                 //是否显示边框
      size: String                     //按钮的尺寸
    },
    data(){
      return {
        focus: false
      }
    },
    computed(){
      //用于一直向上寻找，判断是否有父组件乃至祖先组件是radio-group
      isGroup(){
        let parent = this.$parent;

        while(parent){                    
          if(parent.$options.componentName !== 'XuRadioGroup'){
            parent = parent.$parent;
          }else{
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },
      //用于实现v-model
      model(){
        get(){
          //如果父组件是radio-group，返回父组件的value，否则返回自己的value
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(){
          if(this.isGroup){
            //如果父组件是radio-group，则派发input事件，让父组件去emit input事件
            this.dispatch('XuRadioGroup', 'input', [val]);
          }else{
            //否则的话自己去emit input事件
            this.$emit('input', 'val');
          }
        },
        //由父组件中传入的elFormItem来决定的组件大小
        _elFormItemSize(){
          return (this.elFormItem || {}).elFormItemSize;
        },
        //按钮组件大小
        radioSize(){
          const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
          return this.isGroup ? this._radioGroup.radioGroupSize || tempRadioSize : tempRadioSize;
        },
        //按钮组件可用性
        isDisabled(){
          return this.isGroup ? this._radioGroup.disabled || this.disabled : this.disabled;
        },
        //按钮组件的tab键顺序
        tabIndex(){
          return !this.isDisabled ? (this.isGroup ? (this.model === this.label ? 0 : -1) : 0) : -1;
        }
      }
    }
  }
</script>