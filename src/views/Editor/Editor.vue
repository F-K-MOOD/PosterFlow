<script lang="ts" setup>
import { Empty, Layout, LayoutContent, LayoutSider, TabPane, Tabs, Textarea } from 'ant-design-vue'
import { computed, ref } from 'vue'

import EditGroup from '@/components/EditGroup.vue'
import LayerList from '@/components/LayerList.vue'
import PFImage from '@/components/PFImage.vue'
import PFText from '@/components/PFText.vue'
import defaultTextTemplates from '@/constants/defaultTemplates'
import initHotKeys from '@/plugins/hotKeys'
import { useEditorStore } from '@/store/modules/editor';
import type { ComponentData } from '@/store/modules/editor/helper'

import PFComponentsList from './components/ComponentsList.vue'
import PFEditWrapper from './components/EditWrapper.vue'
import HistoryArea from './components/HistoryArea.vue'
import PropsTable from './components/PropsTable.vue'

export type TabType = 'component' | 'layer' | 'page'

defineOptions({
  name: 'PFEditor'
})

const editorStore = useEditorStore()
const components = computed(() => editorStore.state.components)

// 创建组件映射，用于动态渲染不同类型的组件
const componentMap = {
  PFText,
  PFImage,
  Textarea,
}

// 处理物料区点击事件, 添加物料到pinia中的ediotor仓库, 进而在画布区进行展示
// 处理物料区上传图片,
const addItem = (item: ComponentData) => {
  editorStore.addComponent(item)
}

// 点击画布区的组件, 使其成为激活状态, 并在属性面板展示其属性
const activeComponent = computed<ComponentData | undefined>(() => {
  return editorStore.state.components.find((item) => item.id === editorStore.state.currentElement)
})
const setActive = (id: string) => {
  editorStore.setActive(id)
}

// 更新组件属性
function handleChangeComponentProps(data: { key: string; value: any }) {
  if (activeComponent.value) {
    // 传递的是完整的props
    editorStore.updateComponent({
      id: activeComponent.value.id,
      name: activeComponent.value.name,
      props: {
        ...activeComponent.value.props,
        [data.key]: data.value
      },
    })
  }
}
// 更新图层列表属性, 隐藏/显示, 锁定/解锁
function handleChangeLayerListMeta(data: ComponentData) {
  editorStore.updateComponent(data)
}
// 更新图层列表顺序
function handleChangeLayerListOrder(list: ComponentData[]) {
  editorStore.updateComponentList(list)
}

// 标签页(组件属性, 图层设置, 页面设置)
const activePanel = ref<TabType>('component')
const page = computed(() => editorStore.state.page)

function pageChange(data: { key: string; value: any }) {
  editorStore.updatePage(data)
}

// 处理画布区鼠标拖动元素
function handleUpdatePosition(data: { id: string; left?: string; top?: string; width?: string; height?: string }) {
  editorStore.handleUpdatePosition(data)
}

// 初始化热键
initHotKeys()
</script>

<template>
  <div class="editor-container">
    <Layout>
      <!-- 物料库 -->
      <LayoutSider width="300" class="sider-container">
        <div class="sider-content">
          <PFComponentsList :list="defaultTextTemplates" @on-item-click="addItem" />
        </div>
      </LayoutSider>
      <!-- 画布区域 -->
      <Layout class="main-layout">
        <LayoutContent class="preview-container">
          <p>画布区域</p>
          <HistoryArea />
          <div id="canvas-area" class="preview-list" :style="page.props">
            <PFEditWrapper 
              v-for="component in components" 
              :id="component.id" 
              :key="component.id"
              :props="component.props" 
              :active="!!activeComponent && activeComponent.id === component.id"
              @set-active="setActive" 
              @update-position="handleUpdatePosition"
            >
              <component 
                :is="componentMap[component.name]" 
                v-bind="component.props"
                v-if="componentMap[component.name]" 
              />
            </PFEditWrapper>
          </div>
        </LayoutContent>
      </Layout>
      <!-- 配置区 -->
      <LayoutSider width="300" class="settings-panel">
        <Tabs v-model:activeKey="activePanel" type="card">
          <TabPane key="component" tab="属性设置" class="no-top-radius">
            <div v-if="activeComponent">
              <edit-group 
                v-if="!activeComponent.isLocked" 
                :props="activeComponent.props"
                @change="handleChangeComponentProps" 
              />
              <div v-else>
                <Empty>
                  <template #description>
                    <p>该元素被锁定，无法编辑</p>
                  </template>
                </Empty>
              </div>
            </div>
          </TabPane>
          <TabPane key="layer" tab="图层设置">
            <layer-list 
              :list="components" 
              :selected-id="activeComponent && activeComponent.id"
              @change-list="handleChangeLayerListOrder" 
              @change="handleChangeLayerListMeta" 
              @select="setActive" 
            />
          </TabPane>
          <TabPane key="page" tab="页面设置">
            <PropsTable :props="page.props" @change="pageChange" />
          </TabPane>
        </Tabs>
      </LayoutSider>
    </Layout>
  </div>
</template>

<style>
.editor-container .sider-container {
  background: yellow;
}

.editor-container .sider-content {
  padding: 16px;
}

.editor-container .main-layout {
  padding: 0 24px 24px;
}

.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}

.editor-container .settings-panel {
  background: purple;
}

.page-title {
  display: flex;
}

.page-title .inline-edit span {
  font-weight: 500;
  margin-left: 10px;
  font-size: 16px;
}

.preview-list.canvas-fix .edit-wrapper>* {
  box-shadow: none !important;
}

.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
</style>