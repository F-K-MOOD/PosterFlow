<script lang="ts" setup>
import { pick } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'PFEditWrapper',
})

// 定义组件props 与 emits
interface EditWrapperProps {
  id: string
  active?: boolean
  hidden?: boolean
  props?: Record<string, any>
}
const props = withDefaults(defineProps<EditWrapperProps>(), {
  active: false,
  hidden: false,
})
const emits = defineEmits(['set-active'])

const styles = computed(() => pick(props.props, ['position', 'top', 'left', 'width', 'height']))
function onItemClick(id: string) {
  emits('set-active', id)
}
</script>

<template>
  <div 
    class="edit-wrapper" 
    :class="{'active': active}" 
    :style="styles"
    @click="onItemClick(props.id)"
  >
    <slot />
  </div>
</template>

<style>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: content-box !important;
}

.edit-wrapper>* {
  position: static !important;
  width: auto !important;
  height: auto !important;
  display: block !important;
  visibility: visible !important;
}

.edit-wrapper:hover {
  border: 1px dashed #ccc;
}

.edit-wrapper.hidden {
  display: none;
}

.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}

.edit-wrapper .resizers {
  display: none;
}

.edit-wrapper.active .resizers {
  display: block;
}

.edit-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #1890ff;
  position: absolute;
}

.edit-wrapper .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize;
}

.edit-wrapper .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}

.edit-wrapper .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}

.edit-wrapper .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>