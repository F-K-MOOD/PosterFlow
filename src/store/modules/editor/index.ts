import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed,reactive } from 'vue'

// import type { TextComponentProps } from '@/types/TextComponentProps'
import type { ComponentData, EditorProps } from './helper'

export const useEditorStore = defineStore('editor', () => {
  const state: EditorProps = reactive({
    components: [
      {
        id: uuidv4(), 
        name: 'PFText', 
        props: {
          text: 'hello2', 
          fontSize: '10px', 
          fontWeight: 'bold', 
          lineHeight: '2', 
          textAlign: 'left', 
          fontFamily: '' 
        }
        },
    ],
    currentElement: ''
  })
  // 添加组件
  function addComponent(props: ComponentData) {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: 'PFText',
      props: {
        ...props.props
      }
    }
    state.components.push(newComponent)
  }
  // 删除组件
  function removeComponent(id: string) {
    if(!id) {
      state.components.pop()
      return
    } else {
      state.components = state.components.filter((item) => item.id !== id)
    }
  }
  // 设置当前选中的组件
  function setActive(id: string) {
    state.currentElement = id
    
  }
  // 获取当前选中的组件
  const activeComponent = computed(() => {
    return state.components.find((item) => item.id === state.currentElement)
  })
  // 更新组件属性
  function updateComponent(key: keyof ComponentData['props'], value: any) {
    if(state.currentElement) {
      const component = activeComponent.value
      if(component) {
        state.components = state.components.map((item) => {
          if(item.id === component.id) {
            return {
              ...item,
              props: {
                ...item.props,
                [key]: value
              }
            }
          }
          return item
        })
      }
    }
  }
  return {
    state,
    activeComponent,
    addComponent,
    removeComponent,
    setActive,
    updateComponent
  }
})