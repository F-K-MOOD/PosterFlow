import type { VNode } from 'vue'
import { h } from 'vue'

import type { TextComponentProps } from "./TextComponentProps"  
export interface PropToForm {
  events: any
  component: string
  subComponent?: string
  options?: {text: string | VNode, value: any}[]
  valueProp?:string
  value?:string
  extraProps?: Record<string, any>
  text?: string
  initalTransform?: (value: any) => any
  afterTransform?: (value: any) => any
  eventName?: string;
}
export type PropsToForms = {
  [key in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: Record<string, any> = {
  text: {
    component: 'a-textarea',
    text: '内容',
    extraProps: {
      rows: 3,
    },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    component: 'a-input-number',
    text: '大小',
    initalTransform: (value: string) => parseInt(value),
    afterTransform: (e: number) => e ? `${e}px` : '',
  },
  lineHeight: {
    component: 'a-slider',
    text: '行高',
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    initalTransform: (value: string) => parseFloat(value),
    afterTransform: (e: number) => e ? `${e}` : '',
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      {text: '左', value: 'left'},
      {text: '居中', value: 'center'},
      {text: '右', value: 'right'},
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [
      {text: '无', value: ''},
      {text: h('span', {style: {'font-family': 'SimSun'}}, '宋体'), value: '"SimSun","STSong"'},
      {text: h('span', {style: {'font-family': 'SimHei'}}, '黑体'), value: '"SimHei"'},
      {text: h('span', {style: {'font-family': 'KaiTi'}}, '楷体'), value: '"KaiTi"'},
      {text: h('span', {style: {'font-family': 'STFangsong'}}, '仿宋'), value: '"STFangsong"'},
    ]
  },
  src: {
    component: 'ImageProcesser'
  },
}

