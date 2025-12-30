<script lang="ts">
import { message } from 'ant-design-vue';
import { v4 as uuidv4 } from 'uuid'
import { defineComponent, } from 'vue';

import PFText from '@/components/PFText.vue';
import StyledUploader from '@/components/StyledUploader.vue'
import { imageComponentProps } from '@/constants/imageComponentProps';
import type { ComponentData } from '@/store/modules/editor/helper';
import type { RespUploadData } from '@/types/respTypes';
import { getImageDimensions } from '@/utils/getImageDimensions'

export default defineComponent({
  name: 'PFComponentsList',
  components: {
    PFText,
    StyledUploader
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  emits: ['on-item-click'],
  setup(props, { emit }) {
    const onItemClick = (item: Record<string, any>) => {
      emit('on-item-click', item)
    }

    function onImageUploaded(data: { resp: RespUploadData; file: File }) {
      const { resp, file } = data
      const componentData: ComponentData = {
        id: uuidv4(),
        name: 'PFImage',
        props: {
          ...imageComponentProps 
        }
      }
      componentData.props.src = resp.data.urls[0]
      message.success('图片上传成功')
      emit('on-item-click', componentData)
      componentData.props.src = resp.data.urls[0]
      getImageDimensions(file).then(({ width }) => {
        const maxWidth = 373
        componentData.props.width = ((width > maxWidth) ? maxWidth : width) + 'px'
        emit('on-item-click', componentData)
      })
    }

    return {
      onItemClick,
      onImageUploaded
    }
  }
})
</script>

<template>
  <div class="create-component-list">
    <div 
      v-for="(item, index) in list" 
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