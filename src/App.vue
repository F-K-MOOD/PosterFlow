<script lang="ts">
import { defineComponent } from 'vue';

import Editor from './views/Editor/Editor.vue';
export default defineComponent({
  name: 'PFEditor',
  components: {
    Editor
  }
})
</script>

<template>
  <div>
    <Editor />
  </div>
</template>


<style>
.app-container .global-spinner {
  position: fixed;
  top: 10px;
  right: 50%;
}
</style>
