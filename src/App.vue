<script lang="ts" setup>
import Editor from '@/views/Editor/Editor.vue';

import Uploader from './components/Uploader.vue';
import ColorPicker from './components/ColorPicker.vue';
</script>

<template>
  <div>
    <Editor />
    <Uploader list-type="picture" :drag="false" action="http://localhost:7002/api/utils/upload-img" />
    <ColorPicker />
  </div>
</template>


<style>
.app-container .global-spinner {
  position: fixed;
  top: 10px;
  right: 50%;
}
</style>
