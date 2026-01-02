<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'PFText'
})

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

// 简化样式处理
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
    class="pf-text-component" 
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<style scoped>
h2.pf-text-component,
p.pf-text-component {
  margin-bottom: 0;
}

button.pf-text-component {
  padding: 5px 10px;
  cursor: pointer;
}

.pf-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
