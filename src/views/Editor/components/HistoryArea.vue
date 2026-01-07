<script lang="ts" setup>
import { RedoOutlined, UndoOutlined } from '@ant-design/icons-vue'
import { Button,Tooltip } from 'ant-design-vue'
import { computed } from 'vue'

import { useEditorStore } from '@/store/modules/editor'

defineOptions({
  name: 'HistoryArea'
})
const editorStore = useEditorStore()
const histories = computed(() => editorStore.state.histories)
const historyIndex = computed(() => editorStore.state.historyIndex)
const undoIsDisabled = computed<boolean>(() => editorStore.undoIsDisabled)
const redoIsDisabled = computed<boolean>(() => editorStore.redoIsDisabled)

const undoHistory = () => {
  editorStore.undo()
}
const redoHistory = () => {
  editorStore.redo()
}
</script>

<template>
  <div class="history-area">
    <div class="operation-list">
      <Tooltip>
        <template #title>
          撤销
        </template>
        <Button shape="circle" :disabled="undoIsDisabled" @click="undoHistory">
          <template #icon>
            <UndoOutlined />
          </template>
        </Button>
      </Tooltip>
      <Tooltip>
        <template #title>
          重做
        </template>
        <Button shape="circle" :disabled="redoIsDisabled" @click="redoHistory">
          <template #icon>
            <RedoOutlined />
          </template>
        </Button>
      </Tooltip>
    </div>
    <li v-for="(item, index) in histories" :key="item.id">
      <span :class="{ bold: index === historyIndex }">{{ item.type }} - {{ item.data.key }}</span>
    </li>
  </div>
</template>

<style>
.history-area {
  position: absolute;
  right: 0;
  z-index: 500;
}

.operation-list {
  display: flex;
}

.history-area .bold {
  font-weight: bold;
}
</style>
