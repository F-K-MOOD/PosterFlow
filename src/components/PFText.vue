<script lang="ts">
import { defineComponent } from 'vue'

import { createPropsFromDefaults } from '@/utils/createPropsFromDefaults'

import { textComponentProps, textStylePropNames } from '../constants/textComponentProps'
import useComponentCommon from '../hooks/useComponentCommon'

// array that contains style props
const defaultProps = createPropsFromDefaults(textComponentProps)

export default defineComponent({
  name: 'PFText',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    ...defaultProps
  },
  setup(props) {
    const { handleClick, styleProps } = useComponentCommon(props, textStylePropNames)
    return {
      handleClick,
      styleProps
    }
  }
})
</script>

<template>
  <component 
    :is="tag" 
    :style="styleProps" 
    class="pf-text-component" 
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<style scoped>
h2.pf-text-component,
p.pf-text-component {
  margin-bottom: 0;
}

button.pf-text-component {
  padding: 5px 10px;
  cursor: pointer;
}

.pf-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
