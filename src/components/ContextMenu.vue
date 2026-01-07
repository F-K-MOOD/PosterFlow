<script lang="ts" setup>
import { onMounted, onUnmounted,ref } from 'vue'

import type { ActionItem } from '@/hooks/useContextMenu'
import { getParentElement } from '@/utils/getParentElement'

// 定义props与emits
interface ContextMenuProps {
  actions: ActionItem[]
  triggerClass?: string
}
const props = withDefaults(defineProps<ContextMenuProps>(), {
  triggerClass: 'edit-wrapper'
})

const menuRef = ref<HTMLElement | null>(null)
const componentId = ref('')

// 基本功能: 支持右侧点击
function triggerContextMenu(e: MouseEvent) {
  const domElement = menuRef.value as HTMLElement
  const wrapperElement = getParentElement(e.target as HTMLElement, props.triggerClass)
  // 只有找到edit-wrapper之后, 才能触发右键菜单, 说明鼠标点击的是画布中的组件
  if (wrapperElement) {
    // 阻止浏览器默认的右键菜单
    e.preventDefault()
    domElement.style.display = 'block'
    domElement.style.top = e.pageY + 'px'
    domElement.style.left = e.pageX + 'px'
    const cid = wrapperElement.dataset.componentId
    console.log(cid)
    if (cid) {
      componentId.value = cid
    }
  }
}
function handleClick() {
  const domElement = menuRef.value as HTMLElement
  domElement.style.display = 'none'
}
onMounted(() => {
  document.addEventListener('contextmenu', triggerContextMenu)
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('contextmenu', triggerContextMenu)
  document.removeEventListener('click', handleClick)
})
</script>

<template>
  <div ref="menuRef" class="context-menu-component menu-container">
    <ul class="ant-menu-light ant-menu-root ant-menu ant-menu-vertical">
      <li 
        v-for="(action, index) in props.actions" 
        :key="index" 
        class="ant-menu-item" 
        @click="action.action(componentId)"
      >
        <span class="item-text">{{ action.text }}</span>
        <span class="item-shortcut">{{ action.shortcut }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu-container {
  display: none;
  position: absolute;
  background: #fff;
  z-index: 2000;
  width: 220px; 
  border: 1px solid #ccc;
}
.menu-container .ant-menu-item {
  display: flex;
  justify-content: space-between;
}
.menu-container .ant-menu-item:hover {
  background: #efefef;
}
.ant-menu-item .item-shortcut {
  color: #ccc;
}
</style>
