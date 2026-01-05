<script lang="ts" setup>
import { Input, InputNumber, RadioButton, RadioGroup, Select, SelectOption, Slider, Textarea } from 'ant-design-vue'
import { reduce } from 'lodash-es'
import type { VNode } from 'vue'
import { computed } from 'vue'

import BackgroundProcesser from '@/components/BackgroundProcesser.vue'
import ColorPicker from '@/components/ColorPicker.vue'
import ImageProcesser from '@/components/ImageProcesser.vue'
import ShadowPicker from '@/components/ShadowPicker.vue'
import type { AllComponentProps } from '@/store/modules/editor/helper'
import type { PropsToForms } from '@/types/propsMap'
import { mapPropsToForms } from '@/types/propsMap'

import RenderVnode from '../../../components/RenderVnode';

defineOptions({
  name: 'PFPropsTable',
  components: {
    ImageProcesser,
    RenderVnode,
    ColorPicker,
    Slider,
    RadioGroup,
    RadioButton,
    Select,
    SelectOption,
    Textarea,
    InputNumber,
    Input,
    ShadowPicker,
    BackgroundProcesser
  },
})

interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: Record<string, any>;
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp?: string;
  eventName?: string;
  events: Record<string, (e: any) => void>;
}

// 定义组件props 与 emits
interface PropsTableProps {
  props: AllComponentProps;
}
const props = defineProps<PropsTableProps>()
const emits = defineEmits(['change'])

// 处理props, 转换为表单props
const finalProps = computed(() => {
  return reduce(props.props, (result, value, key) => {
    // 这里的key是components列表里面的中的id, name, props里面的key
    const newKey = key
    // 获取需要使用组件来展示的属性, 
    const item = mapPropsToForms[newKey]
    if (item) {
      // 对item进行在加工,如果有initialTransform, 则对value进行加工
      // 然后添加事件处理函数, 统一处理change事件, 并将事件参数进行加工, 处理后为{ key: string, value: any }
      const { valueProp = 'value', eventName = 'change', initialTransform } = item
      const newItem: FormProps = {
        ...item,
        value: initialTransform ? initialTransform(value) : value,
        valueProp,
        eventName,
        events: {
          [eventName]: (e: any) => {
            // 对事件参数进行加工, 如果有afterTransform, 则对事件参数进行加工
            // 如果e不是改变的值, 而是事件对象, 相应地进行e.target.value, 在函数里进行处理
            emits('change', { key: newKey, value: item.afterTransform ? item.afterTransform(e) : e })
          }
        }
      }
      result[newKey] = newItem
    }
    return result
  }, {} as Required<PropsToForms>)
})
</script>

<template>
  <div class="props-table">
    <div 
      v-for="(value, key) in finalProps" 
      :id="`item-${key}`" 
      :key="key" 
      class="prop-item"
    >
      <!-- 表单左侧描述label -->
      <span v-if="value.text" class="label">{{ value.text }}</span>
      <component 
        :is="value.component" 
        v-if="value" 
        :value="value.value" 
        v-bind="value.extraProps" 
        v-on="value.events"
      >
        <template v-if="value.options">
          <component 
            :is="value.subComponent" 
            v-for="(option, k) in value.options" 
            :key="k" 
            :value="option.value"
          >
            <RenderVnode :v-node="option.text" />
          </component>
        </template>
      </component>
    </div>
  </div>
</template>

<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.label {
  width: 28%;
}

.prop-component {
  width: 70%;
}

.prop-item.no-text {
  display: inline-block;
  margin: 0 10px 0 0;
}

#item-fontWeight {
  margin-left: 28%;
}

.component-a-select .ant-select {
  width: 150px;
}

.prop-component.component-shadow-picker,
.prop-component.component-image-processer,
.prop-component.component-background-processer {
  width: 100%;
}
</style>
