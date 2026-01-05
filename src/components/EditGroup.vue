<script lang="ts" setup>
import { Collapse, CollapsePanel } from 'ant-design-vue'
import type { AllComponentProps } from 'lego-bricks'
import { difference } from 'lodash-es'
import { computed, ref } from 'vue'

import PropsTable from '@/views/Editor/components/PropsTable.vue'
export interface GroupProps {
  text: string;
  items: string[];
}

// 定义props 和 emits
interface EditGroupProps {
  props: AllComponentProps;
  groups?: GroupProps[];
}
const props = withDefaults(defineProps<EditGroupProps>(), {
  groups: () => [
    {
      text: '尺寸',
      items: ['height', 'width', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']
    },
    {
      text: '边框',
      items: ['borderStyle', 'borderColor', 'borderWidth', 'borderRadius']
    },
    {
      text: '阴影与透明度',
      items: ['opacity', 'boxShadow']
    },
    {
      text: '位置',
      items: ['left', 'top']
    },
    {
      text: '事件功能',
      items: ['actionType', 'url']
    }
  ]
})
const emits = defineEmits(['change'])


const currentKey = ref('item-0')
// 基本属性合并成一个分组
const newGroups = computed(() => {
  const groupedPropNames = props.groups.reduce((prev, current) => {
    return [...prev, ...current.items]
  }, [] as string[]) || []
  // 从所有属性中剔除与尺寸,边框,阴影和透明度,位置,事件功能的属性, 得到基本属性
  const remainingProps = difference(Object.keys(props.props), groupedPropNames)
  return [
    {
      text: '基本属性',
      items: remainingProps
    },
    ...props.groups || []
  ]
})

// 计算成最终的分组, 每个分组包含属性名和属性值, 传递给propsTable组件分组展示
const editGroups = computed(() => {
  return newGroups.value.map(group => {
    const propsMap = {} as AllComponentProps
    group.items.forEach(item => {
      const key = item as keyof AllComponentProps
      // propsMap 数据类型为propsTable组件的props类型, 对象里面是key-value对
      propsMap[key] = props.props[key]
    })
    return {
      ...group,
      props: propsMap
    }
  })
})
const handleChange = (e: { key: string; value: any }) => {
  emits('change', e)
}
</script>

<template>
  <div class="edit-groups">
    <Collapse v-model:activeKey="currentKey">
      <CollapsePanel 
        v-for="(item, index) in editGroups" 
        :key="`item-${index}`" 
        :header="item.text"
      >
        <PropsTable :props="item.props" @change="handleChange" />
      </CollapsePanel>
    </Collapse>
  </div>
</template>
