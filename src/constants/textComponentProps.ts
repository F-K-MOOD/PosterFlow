import { without } from 'lodash-es'

import type { TextComponentProps } from '../types/TextComponentProps'
import { commonComponentProps } from './commonComponentProps'

export const textComponentProps: TextComponentProps = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonComponentProps
}

export const textStylePropNames = without(Object.keys(textComponentProps), 'actionType', 'url', 'text')