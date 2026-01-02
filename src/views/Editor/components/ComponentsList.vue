<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { v4 as uuidv4 } from 'uuid'

import PFText from '@/components/PFText.vue';
import StyledUploader from '@/components/StyledUploader.vue'
import { imageComponentProps } from '@/constants/imageComponentProps';
import type { ComponentData } from '@/store/modules/editor/helper';
import type { RespUploadData } from '@/types/respTypes';
import { getImageDimensions } from '@/utils/getImageDimensions'

defineOptions({
  name: 'PFComponentsList',
})

// 定义组件props 与 emits
interface ComponentsListProps {
  list: Record<string, any>[]
}
const props = defineProps<ComponentsListProps>()
const emits = defineEmits<{
  (e: 'on-item-click', item: ComponentData): void
}>()


function onItemClick(item: Record<string, any>) {
  // 为文本组件添加name字段
  const componentData = {
    id: uuidv4(),
    name: 'PFText',
    props: item
  }
  emits('on-item-click', componentData)
}

function onImageUploaded(data: { resp: RespUploadData; file: File }) {
  const { resp, file } = data
  console.log('onImageUploaded data:', data)
  console.log('resp.data:', resp.data)
  const componentData: ComponentData = {
    id: uuidv4(),
    name: 'PFImage',
    props: {
      ...imageComponentProps
    }
  }
  // 检查urls是否存在且不为空
  if (resp.data && resp.data.urls && resp.data.urls.length > 0) {
    componentData.props.src = resp.data.urls[0]
    message.success('图片上传成功')
    emits('on-item-click', componentData)
    getImageDimensions(file).then(({ width }) => {
      const maxWidth = 373
      componentData.props.width = ((width > maxWidth) ? maxWidth : width) + 'px'
      emits('on-item-click', componentData)
    })
  } else {
    message.error('图片上传失败：未获取到图片URL')
    console.error('Upload failed: urls not found in response', resp)
  }
}
</script>

<template>
  <div class="create-component-list">
    <div 
      v-for="(item, index) in props.list" 
      :key="index" 
      class="component-item" 
      @click="onItemClick(item)"
    >
      <PFText v-bind="item" />
    </div>
  </div>
  <StyledUploader @success="onImageUploaded" />
</template>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}

.component-item>* {
  position: static !important;
}
</style>