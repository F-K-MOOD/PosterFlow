import { mapValues } from 'lodash-es'

import type { ImageComponentProps } from '@/types/ImageComponentProps'
import type { TextComponentProps } from '@/types/TextComponentProps'

export type AllComponentProps = TextComponentProps | ImageComponentProps

export const createPropsFromDefaults = <T extends AllComponentProps>(props:T) => {
  return mapValues(props, (item) => {
    return {
      type: (item as any).constructor as StringConstructor,
      default: item
    }
  })
}