<script lang="ts" setup>
import { computed, nextTick,ref, watch } from 'vue'

import useClickOutside from '@/hooks/useClickOutside'
import useKeyPress from '@/hooks/useKeyPress'

defineOptions({
  name: 'InlineEdit'
})
// 定义组件props 与 emits
interface InlineEditProps {
  value: string;
}
const props = defineProps<InlineEditProps>()
const emits = defineEmits(['change'])
const innerValue = ref(props.value)
watch(() => props.value, (newValue) => {
  innerValue.value = newValue
})

// 基本功能, 编辑
const wrapper = ref<null | HTMLElement>(null)
const inputRef = ref<null | HTMLInputElement>(null)

// -校验输入值是否为空
const validateCheck = computed(() => innerValue.value?.trim() !== '')

// -支持倒灌
let cachedOldValue = ''

const isEditing = ref(false)
function handleClick() {
  isEditing.value = true
}
watch(isEditing, async (isEditing) => {
  if (isEditing) {
    cachedOldValue = innerValue.value
    await nextTick()
    if (inputRef.value) {
      inputRef.value.focus()
    }
  }
})

// 点击外部区域, 触发事件
const isOutside = useClickOutside(wrapper)
watch(isOutside, (newValue) => {
  if (!validateCheck.value) {
    return
  }
  if (newValue && isEditing.value) {
    isEditing.value = false
    emits('change', innerValue.value)
  }
  isOutside.value = false
})

// 支持键盘监听事件, 监听Enter键和Escape键
useKeyPress('Enter', () => {
  if (!validateCheck.value) {
    return
  }
  if (isEditing.value) {
    isEditing.value = false
    emits('change', innerValue.value) 
  }
})
useKeyPress('Escape', () => {
  if (isEditing.value) {
    isEditing.value = false
    // 这里取消输入的值, 恢复到之前的值, 倒灌
    innerValue.value = cachedOldValue
  }
})
</script>

<template>
  <div 
    ref="wrapper"
    class="inline-edit" 
    @click.stop="handleClick" 
  >
    <!-- 显示默认文本区域, 点击以后显示为input -->
    <input 
      v-if="isEditing" 
      ref="inputRef" 
      v-model="innerValue" 
      placeholder="文本不能为空"
      :class="{ 'input-error': !validateCheck }" 
      class="ant-input" 
    >
    <slot v-else :text="innerValue"><span>{{ innerValue }}</span></slot>
  </div>
</template>

<style>
.inline-edit {
  cursor: pointer;
}
.ant-input.input-error {
  border: 1px solid #f5222d;
}
.ant-input.input-error:focus {
  border-color:  #f5222d;
}
.ant-input.input-error::placeholder {
  color: #f5222d;
}
</style>
