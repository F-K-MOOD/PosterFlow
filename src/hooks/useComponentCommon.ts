import { pick } from 'lodash-es'
import { computed } from 'vue'

import type { TextComponentProps } from '@/types/TextComponentProps'

const useComponentCommon =(props: Readonly<Partial<TextComponentProps>>, styleKeys: string[]) => {
  const styleProps = computed(() => pick(props, styleKeys))
  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url
    }
  }
  return {
    styleProps,
    handleClick
  }
}

export default useComponentCommon