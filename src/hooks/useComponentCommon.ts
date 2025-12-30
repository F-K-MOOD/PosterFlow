import { pick } from 'lodash-es'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

import type { AllComponentProps } from '@/utils/createPropsFromDefaults'

const useComponentCommon = (props: Readonly<Partial<AllComponentProps>>, styleKeys: string[]) => {
  const styleProps = computed<CSSProperties>(() => {
    return pick(props, styleKeys) as CSSProperties
  })

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