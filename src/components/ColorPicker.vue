<script lang="ts" setup>
defineOptions({
  name: 'ColorPicker'
})

// 定义props 和 emits
interface ColorPickerProps {
  value?: string
  colors?: string[]
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  colors: () => ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
})
const emits = defineEmits(['change'])

const onChangeInput = (e: InputEvent) => {
  emits('change', (e.target as HTMLInputElement).value || '#000000')
}

const onChangeLi = (item: string) => {
  emits('change', item || '#000000')
}
</script>

<template>
  <div class="pf-color-picker">
    <div class="native-color-container">
      <input 
        type="color" 
        :value="value" 
        @input="onChangeInput"
      >
    </div>
    <ul class="picked-color-list">
      <li 
        v-for="(item, key) in props.colors" 
        :key="key" 
        :class="`item-${key}`" 
        @click.prevent="onChangeLi(item)"
      >
        <div v-if="item.startsWith('#')" :style="{ backgroundColor: item }" class="color-item" />
        <div v-else class="color-item transparent-back" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.pf-color-picker {
  display: flex;
}
.native-color-container {
  width: 40%;
}
.native-color-container input[type="color"] {
  width: 100%;
  cursor: pointer;
  height: 50px;
  border: 0;
  padding: 0;
  background-color: transparent;
}
.picked-color-list {
  padding: 0 0 0 5px;
  margin: 0;
  width: 60%;
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: space-between;
}
.picked-color-list li {
  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
}
.color-item {
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
}
.transparent-back {
  background: url('~@/assets/transparent.png') no-repeat;
}
</style>
