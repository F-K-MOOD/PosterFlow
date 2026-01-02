<script lang="ts" setup>
import { Input, InputNumber, RadioButton, RadioGroup, Select, SelectOption, Slider } from 'ant-design-vue'
import { reduce } from 'lodash-es';
import type { VNode } from 'vue'
import { computed } from 'vue'

import type { PropsToForms } from '@/types/propsMap'
import { mapPropsToForms } from '@/types/propsMap'

import ImageProcesser from '../../../components/ImageProcesser.vue'
import RenderVnode from '../../../components/RenderVnode';

defineOptions({
  name: 'PFPropsTable',
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
  events?: Record<string, (e: any) => void>;
}

const componentMap = {
  'a-input': Input,
  'a-input-number': InputNumber,
  'a-slider': Slider,
  'a-radio-group': RadioGroup,
  'a-radio-button': RadioButton,
  'a-select': Select,
  'a-select-option': SelectOption,
  'ImageProcesser': ImageProcesser,
  RenderVnode,
}

// 定义组件props 与 emits
interface PropsTableProps {
  props: Record<string, any>;
}
const props = defineProps<PropsTableProps>()
const emits = defineEmits(['change'])

const finalProps = computed(() => {
  return reduce(props.props, (result, value, key) => {
    const newKey = key 
    const item = mapPropsToForms[newKey]
    if (item) {
      const { valueProp = 'value', eventName = 'change', initalTransform } = item
      const newItem: FormProps = {
        ...item,
        value: initalTransform ? initalTransform(value) : value,
        valueProp,
        eventName,
        events: {
          [eventName]: (e: any) => { emits('change', { key: newKey, value: item.afterTransform ? item.afterTransform(e) : e }) }
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
        :is="componentMap[value.component]" 
        v-if="value" 
        :value="value.value"
        v-bind="value.extraProps" 
        v-on="value.events"
      >
        <template v-if="value.options">
          <component 
            :is="componentMap[value.subComponent]" 
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
