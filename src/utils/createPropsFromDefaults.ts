import { mapValues } from 'lodash-es'

import type { TextComponentProps } from '@/types/TextComponentProps'

export const createPropsFromDefaults = (props: TextComponentProps) => {
  return mapValues(props, (item) => {
    return {
      type: (item as any).constructor as StringConstructor,
      default: item
    }
  })
}