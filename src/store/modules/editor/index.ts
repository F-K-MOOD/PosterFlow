import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed, reactive } from 'vue'

// import { imageComponentProps } from '@/constants/imageComponentProps'
import { pageProps } from '@/constants/pageProps'
import { textComponentProps } from '@/constants/textComponentProps'

import type { ComponentData, EditorProps } from './helper'

export const useEditorStore = defineStore('editor', () => {
  const state: EditorProps = reactive({
    components: [
      {
        id: uuidv4(),
        name: 'PFText',
        layerName: '图层1',
        page: {
          props: pageProps
        },
        props: {
          ...textComponentProps,
          text: 'hello',
          fontSize: '20px',
          color: '#000000',
          lineHeight: '1',
          textAlign: 'left',
          fontFamily: '',
          width: '100px',
          height: '100px',
          backgroundColor: '#efefef',
          left: '100px',
          top: '150px'
        }
      },
      // {
      //   id: uuidv4(),
      //   name: 'PFText',
      //   layerName: '图层2',
      //   page: {},
      //   props: {
      //     ...textComponentProps,
      //     text: 'hello2',
      //     fontSize: '10px',
      //     fontWeight: 'bold',
      //     lineHeight: '2',
      //     textAlign: 'left',
      //     fontFamily: ''
      //   }
      // },
      // {
      //   id: uuidv4(),
      //   name: 'PFText',
      //   layerName: '图层3',
      //   page: {},
      //   props: {
      //     ...textComponentProps,
      //     text: 'hello3',
      //     fontSize: '15px',
      //     actionType: 'url',
      //     url: 'https://www.baidu.com',
      //     lineHeight: '3',
      //     textAlign: 'left',
      //     fontFamily: ''
      //   }
      // },
      // {
      //   id: uuidv4(),
      //   name: 'PFImage',
      //   layerName: '图层4',
      //   page: {},
      //   props: {
      //     ...imageComponentProps,
      //     src: 'https://pf-server.oss-cn-beijing.aliyuncs.com/my-test%5CLUq2Ou.png',
      //     width: '100px'
      //   }
      // },
    ],
    currentElement: '',
    page: {
      props: pageProps,
      title: 'test title'
    }
  })
  //* 物料区
  // 物料区添加物料
  function addComponent(props: ComponentData) {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: props.name,
      props: {
        ...props.props
      },
      page: props.page || {}
    }
    state.components.push(newComponent)
  }
  // 删除物料
  function removeComponent(id: string) {
    if (!id) {
      state.components.pop()
      return
    } else {
      state.components = state.components.filter((item) => item.id !== id)
    }
  }

  //? 画布区
  // 画布区 获取当前选中的组件
  const activeComponent = computed(() => {
    return state.components.find((item) => item.id === state.currentElement)
  })
  // 画布区 设置当前选中的组件
  function setActive(id: string) {
    state.currentElement = id
  }
  // 画布区更新组件位置
  function handleUpdatePosition(data: { id: string; left?: string; top?: string; width?: string; height?: string }) {
    const { id, left, top, width, height } = data
    state.components = state.components.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          props: {
            ...item.props,
            left: left ? left : item.props.left,
            top: top ? top : item.props.top,
            width: width ? width : item.props.width,
            height: height ? height : item.props.height,
          }
        }
      } else {
        return item
      }
    })
  }

  //! 右侧配置区
  // 右侧配置区 更新组件属性
  function updateComponent(data: ComponentData) {
    const { id, isHidden, isLocked, layerName, isRoot, props } = data
    let component: ComponentData | undefined
    if (id) {
      component = state.components.find((item) => (item.id === id))
    } else {
      component = state.components.find((item) => (item.id === state.currentElement))
    }
    if (!component) {
      return
    }
    state.components = state.components.map((item) => {
      if (item.id === component.id) {
        if (isRoot) {
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
      } else {
        return item
      }
    })
  }
  // 右侧配置区 更新图层顺序
  function updateComponentList(list: ComponentData[]) {
    state.components = list
  }
  // 右侧配置区 更新页面属性
  function updatePage(data: { key: string; value: any }) {
    state.page.props = {
      ...state.page.props || {},
      ...data.value
    }
  }

  // 更新页面
  return {
    state,
    activeComponent,
    addComponent,
    removeComponent,
    setActive,
    updateComponent,
    updateComponentList,
    updatePage,
    handleUpdatePosition
  }
})