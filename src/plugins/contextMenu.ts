import { onMounted, onUnmounted } from 'vue'

import useContextMenu from '@/hooks/useContextMenu'
import type { ActionItem } from '@/hooks/useContextMenu.ts'
import { useEditorStore } from '@/store/modules/editor'
const initContextMenu = () => {
  const editorStore = useEditorStore()
  const testActions: ActionItem[] = [
    {
      shortcut: 'Ctrl+C',
      text: '拷贝图层',
      action: (cid: string) => { editorStore.copyComponent(cid) }
    },
    {
      shortcut: 'Ctrl+V',
      text: '粘贴图层',
      action: () => { editorStore.pasteCopiedComponent() }
    },
    { 
      shortcut: 'Delete', 
      text: '删除图层', 
      action: (cid: string) => { editorStore.deleteComponent(cid) }
    },
    {
      shortcut: 'ESC',
      text: '取消选中',
      action: () => { editorStore.setActiveEmpty() }
    }
  ]

  const testActions2: ActionItem[] = [
    { shortcut: 'Ctrl+C', text: '复制配置', action: () => { console.log(2) }}
  ]
  let destroy: any;
  let destroy2: any;
  onMounted(() => {
    destroy = useContextMenu(testActions)
    destroy2 = useContextMenu(testActions2, 'settings-panel')
  })
  onUnmounted(() => {
    destroy()
    destroy2()
  })
}

export default initContextMenu