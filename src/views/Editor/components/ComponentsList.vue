<script lang="ts">
import { defineComponent, } from 'vue';

import PFText from '@/components/PFText.vue';
export default defineComponent({
  name: 'PFComponentsList',
  components: {
    PFText
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
    return {
      onItemClick
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