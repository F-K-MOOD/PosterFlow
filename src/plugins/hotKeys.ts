import type { HotkeysEvent,KeyHandler } from 'hotkeys-js'
import { computed } from 'vue'

import useHotKey from '@/hooks/useHotKey'
import { useEditorStore } from '@/store/modules/editor'
const wrap = (callback: KeyHandler) => {
  const wrapperFn = (e: KeyboardEvent, event: HotkeysEvent) => {
    e.preventDefault()
    callback(e, event)
  }
  return wrapperFn
}
export default function initHotKeys() {
  const editorStore = useEditorStore()
  const currentId = computed(() => editorStore.state.currentElement)
  useHotKey('ctrl+c, command+c', () => {
    editorStore.copyComponent(currentId.value)
  })
  useHotKey('ctrl+v, command+v', () => {
    editorStore.pasteCopiedComponent()
  })
  useHotKey('backspace, delete', () => {
    editorStore.deleteComponent(currentId.value)
  })
  useHotKey('esc', () => {
    editorStore.setActiveEmpty()
  }) 
  useHotKey('up', wrap(() => {
    editorStore.moveComponentByKeyboard({ direction: 'Up', amount: 1, id: currentId.value })
  }))
  useHotKey('down', wrap(() => {
    editorStore.moveComponentByKeyboard({ direction: 'Down', amount: 1, id: currentId.value})
  }))
  useHotKey('left', wrap(() => {
    editorStore.moveComponentByKeyboard({ direction: 'Left', amount: 1, id: currentId.value})
  }))
  useHotKey('right', wrap(() => {
    editorStore.moveComponentByKeyboard({ direction: 'Right', amount: 1, id: currentId.value})        
  }))
  useHotKey('shift+up', wrap(() => {
    editorStore.moveComponentByKeyboard({ direction: 'Up', amount: 10, id: currentId.value})
  }))
  useHotKey('shift+down', wrap(() => {
    editorStore.moveComponentByKeyboard({ direction: 'Down', amount: 10, id: currentId.value})  
  }))
  useHotKey('shift+left', wrap(() => {  
    editorStore.moveComponentByKeyboard({ direction: 'Left', amount: 10, id: currentId.value})
  }))
  useHotKey('shift+right', wrap(() => {
    editorStore.moveComponentByKeyboard({ direction: 'Right', amount: 10, id: currentId.value})
  }))
  useHotKey('ctrl+z, command+z', () => {
    editorStore.undo()
  })
  useHotKey('ctrl+y, command+y', () => {
    editorStore.redo()
  })
}