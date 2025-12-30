import { without } from 'lodash-es'

import type { ImageComponentProps } from '../types/ImageComponentProps'
import { commonComponentProps } from './commonComponentProps'

export const imageComponentProps: ImageComponentProps = {
  src: 'test.url',
  ...commonComponentProps
}

export const imageStylePropsNames = without(Object.keys(imageComponentProps), 'src')
