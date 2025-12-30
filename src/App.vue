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
    <Uploader list-type="picture" :drag="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
  </div>
</template>


<style>
.app-container .global-spinner {
  position: fixed;
  top: 10px;
  right: 50%;
}
</style>
