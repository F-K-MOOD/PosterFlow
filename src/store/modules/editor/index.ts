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
          fontFamily: '',
          color:'#000000',
          boxShadow: '0px 0px 0px #000000',
        },
        layerName: '图层一',
      },
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
        },
        layerName: '图层二',
      },
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
        },
        layerName: '图层三',
      },
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
        },
        layerName: '图层四',
      },
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
        },
        layerName: '图层五',
      },
    ],
    currentElement: ''
  })
  // 添加组件
  function addComponent(props: ComponentData) {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: props.name,
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
  function updateComponent(data: ComponentData) {
    const {id, isHidden, isLocked, layerName, isRoot,props} = data
    let component: ComponentData | undefined
    if(id) {
       component = state.components.find((item) => (item.id === id))
    } else {
       component = state.components.find((item) => (item.id === state.currentElement))
    }
    if(!component) {
      return
    }
    state.components = state.components.map((item) => {
      if(item.id === component.id) {
        if(isRoot) {
          return {
            ...item,
            isHidden,
            isLocked,
            layerName
          }
        } else {
          return {
            ...item,
            props: {
              ...item.props,
              ...props
            }
          }
        }
      }else {
        return item
      }
    })
  }
  // 更新组件列表
  function updateComponentList(list: ComponentData[]) {
    state.components = list
  }
  return {
    state,
    activeComponent,
    addComponent,
    removeComponent,
    setActive,
    updateComponent,
    updateComponentList
  }
})