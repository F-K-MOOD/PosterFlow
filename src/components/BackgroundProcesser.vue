<script lang="ts" setup>
import { message } from 'ant-design-vue'

import ImageProcesser from '@/components/ImageProcesser.vue'
import StyledUploader from '@/components/StyledUploader.vue'
import type { RespUploadData } from '@/types/respTypes'

// 定义props与emits
interface BackgroundProcesserProps {
  value: string
}
const props = defineProps<BackgroundProcesserProps>()
const emits = defineEmits(['change'])

const onImageUploaded = (data: { resp: RespUploadData; file: File }) => {
  const { resp } = data
  message.success('上传成功')
  emits('change', resp.data.urls[0])
}
const handleUploadUrl = (url: string) => {
  emits('change', url)
}
</script>

<template>
  <div class="background-processer">
    <styled-uploader v-if="!props.value" @success="onImageUploaded" />
    <image-processer 
      v-else 
      :value="props.value" 
      :show-delete="true" 
      @change="handleUploadUrl"
    />
  </div>
</template>
