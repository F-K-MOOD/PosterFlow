<script lang="ts" setup>
import { computed } from 'vue'

// 定义 props
interface TextComponentProps {
  tag?: string;
  text?: string;
  fontSize?: string;
  color?: string;
}
const props = withDefaults(defineProps<TextComponentProps>(),{
  tag:  'div',
  text:  '默认文本',
  fontSize:  '14px',
  color:  '#000000'
})

// 简化样式处理,从props中提取fontSize和color
const styleProps = computed(() => ({
  fontSize: props.fontSize,
  color: props.color
}))

const handleClick = () => {
  console.log('文本组件被点击')
}
</script>

<template>
  <component 
    :is="tag" 
    :style="styleProps" 
    class="text-component" 
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<style scoped>
h2.text-component,
p.text-component {
  margin-bottom: 0;
}

button.text-component {
  padding: 5px 10px;
  cursor: pointer;
}

.text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
