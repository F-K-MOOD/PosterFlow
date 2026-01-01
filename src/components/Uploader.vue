<script lang="ts" setup>
import { DeleteOutlined, FileOutlined,LoadingOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import {last} from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { computed, reactive, ref } from 'vue'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type FileListType = 'picture' | 'text'
type CheckUpload = (file: File) => boolean | Promise<File>
export interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any;
  url?: string;
}

defineOptions({
  name: 'Uploader'
})

interface UploaderProps {
  action: string
  drag?: boolean
  autoUpload?: boolean
  beforeUpload?: CheckUpload
  listType?: FileListType
  showUploadList?: boolean
}

// 定义props和emits
const props = withDefaults(defineProps<UploaderProps>(),{
  drag: true,
  autoUpload: true,
  listType: 'text',
  showUploadList: true
})
const emits = defineEmits(['change', 'uploaded', 'success', 'error'])

// 完成基本上传功能
const fileInput = ref<HTMLInputElement | null>(null)
function triggerUpload() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  beforeUploadCheck(target.files)
}
function beforeUploadCheck(files: null | FileList) {
  if (files && files.length > 0 && files[0]) {
    const fileObj = files[0]
    if (props.beforeUpload) {
      const result = props.beforeUpload(fileObj)
      if (result && result instanceof Promise) {
        result.then(processedFile => {
          if (processedFile instanceof File) {
            addFileToList(processedFile)
          } else {
            throw new Error('beforeUpload Promise should return File object')
          }
        }).catch(e => {
          console.error(e)
        })
      } else if (result === true) {
        addFileToList(fileObj)
      }
    } else {
      addFileToList(fileObj)
    }
  }
}
function addFileToList(fileObj: File) {
  const uploadFile: UploadFile = reactive({
    uid: uuidv4(),
    size: fileObj.size,
    name: fileObj.name,
    status: 'ready',
    raw: fileObj
  })
  if (props.listType === 'picture') {
    uploadFile.url = URL.createObjectURL(fileObj)
  }
  uploadedFiles.value.push(uploadFile)
  if (props.autoUpload) {
    postFile(uploadFile)
  }
}
function postFile(uploadFile: UploadFile) {
  const formData = new FormData()
  formData.append(uploadFile.name, uploadFile.raw)
  axios.post(props.action, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    uploadFile.status = 'success'
    uploadFile.resp = res.data
    emits('success', { resp: res.data, file: uploadFile, list: uploadedFiles.value })
  }).catch(e => {
    uploadFile.status = 'error'
    console.error(e)
    emits('error', { error: e, file: uploadFile, list: uploadedFiles.value })
  }).finally(() => {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  })
}

// 上传文件列表功能
const uploadedFiles = ref<UploadFile[]>([])
// --指示上传状态是否为loading
const isUploading = computed(() => {
  return uploadedFiles.value.some(item => item.status === 'loading')
})
// --删除文件
function removeFile(uid: string) {
  uploadedFiles.value = uploadedFiles.value.filter(item => item.uid !== uid)
}

// 自定义上传模版
const lastFileData = computed(() => {
  const lastUploadFile = last(uploadedFiles.value)
  if (lastUploadFile) {
    return {
      loaded: lastUploadFile.status === 'success',
      data: lastUploadFile.resp
    }
  } else {
    return false
  }
})

// 支持拖拽上传
let events: Record<string, (e: any) => void> = {
  "click": triggerUpload,
}
if (props.drag) {
  events["dragover"] = (e: DragEvent) => handleDrag(e, true)
  events["dragleave"] = (e: DragEvent) => handleDrag(e, false)
  events["drop"] = handleDrop
}
const isDragover = ref(false)
function handleDrag(e: DragEvent, over: boolean) {
  e.preventDefault()
  isDragover.value = over
}
function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragover.value = false
  if (e.dataTransfer && e.dataTransfer.files) {
    const files = e.dataTransfer.files
    beforeUploadCheck(files)
  }
}
</script>

<template>
  <div class="file-upload">
    <div 
      class="upload-area"
      :class="{'is-dragover': drag && isDragover}"
      v-on="events"
    >
      <!-- 通过插槽实现初始容器的自定义和上传完毕后的自定义 -->
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot v-else-if="lastFileData && lastFileData.loaded" :uploaded-data="lastFileData.data" name="uploaded">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input 
      ref="fileInput" 
      type="file"
      :style="{
        display: 'none'
      }"
      @change="handleFileChange"
    >
    <ul v-if="showUploadList" :class="`upload-list upload-list-${listType}`">
      <li 
        v-for="item in uploadedFiles" 
        :key="item.uid"
        :class="`uploaded-file ${item.status}`"
      >
        <img
          v-if="item.url && listType === 'picture'"
          class="upload-list-thumbnail"
          :src="item.url"
          :alt="item.name"
        >
       <span v-if="item.status === 'loading'" class="file-icon">
          <LoadingOutlined />
        </span>
        <span v-else class="file-icon">
          <FileOutlined />
        </span>
        <span class="filename">{{ item.name }}</span>
        <span class="delete-icon" @click="removeFile(item.uid)">
          <DeleteOutlined />
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.upload-list li {
  transition: all .5s cubic-bezier(.55, 0, .1, 1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;

  &:first-child {
    margin-top: 10px;
  }

  .upload-list-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    object-fit: cover;
  }

  .file-icon {
    svg {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .filename {
    margin-left: 5px;
    margin-right: 40px;
  }

  &.upload-error {
    color: #f5222d;

    svg {
      color: #f5222d;
    }
  }

  .file-status {
    display: block;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
  }

  .delete-icon {
    display: none;
    position: absolute;
    right: 7px;
    top: 0;
    line-height: inherit;
    cursor: pointer;
  }

  &:hover {
    background-color: #efefef;

    .file-status {
      display: none;
    }

    .delete-icon {
      display: block;
    }
  }
}
</style>