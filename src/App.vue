<script lang="ts">
import { defineComponent } from 'vue';

import Uploader from './components/Uploader.vue';
import Editor from './views/Editor/Editor.vue';
export default defineComponent({
  name: 'PFEditor',
  components: {
    Editor,
    Uploader
  }
})
</script>

<template>
  <div>
    <Editor />
    <Uploader list-type="picture" :drag="false" action="http://localhost:7002/api/utils/upload-img" />
  </div>
</template>


<style>
.app-container .global-spinner {
  position: fixed;
  top: 10px;
  right: 50%;
}
</style>
