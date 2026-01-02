<script lang="ts" setup>
import { Layout, LayoutContent, LayoutSider } from 'ant-design-vue'
import { computed } from 'vue'

import PFImage from '@/components/PFImage.vue'
import PFText from '@/components/PFText.vue'
import { defaultTemplates } from '@/constants/defaultTemplates'
import { useEditorStore } from '@/store/modules/editor';
import type { ComponentData } from '@/store/modules/editor/helper'

import PFComponentsList from './components/ComponentsList.vue'
import PFEditWrapper from './components/EditWrapper.vue'
import PFPropsTable from './components/PropsTable.vue'

defineOptions({
  name: 'PFEditor'
})

const editorStore = useEditorStore()
const components = computed(() => editorStore.state.components)
const activeComponent = computed<ComponentData | undefined>(() => editorStore.activeComponent)

// 创建组件映射，用于动态渲染不同类型的组件
const componentMap = {
  PFText,
  PFImage
}

const addItem = (item: ComponentData) => {
  editorStore.addComponent(item)
}
const setActive = (id: string) => {
  editorStore.setActive(id)
}
const handelChange = (e: { key: keyof ComponentData['props']; value: any }) => {
  editorStore.updateComponent(e.key, e.value)
}
</script>

<template>
  <div class="editor-container">
    <Layout>
      <!-- 物料库 -->
      <LayoutSider width="300" class="sider-container">
        <div class="sider-content">
          <PFComponentsList :list="defaultTemplates" @on-item-click="addItem" />
        </div>
      </LayoutSider>
      <!-- 画布区域 -->
      <Layout class="main-layout">
        <LayoutContent class="preview-container">
          <p>画布区域</p>
          <div id="canvas-area" class="preview-list">
            <PFEditWrapper 
              v-for="component in components" 
              :id="component.id" 
              :key="component.id"
              :props="component.props" 
              :active="!!activeComponent && activeComponent.id === component.id"
              @set-active="setActive"
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
      <!-- 组件属性, 配置 -->
      <LayoutSider width="300" class="settings-panel">
        <PFPropsTable v-if="activeComponent" :props="activeComponent.props" @change="handelChange" />
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