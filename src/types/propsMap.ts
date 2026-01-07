import { h, type VNode } from 'vue'

import type { AllFormProps } from '@/store/modules/editor/helper'


const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' },
]

const fontFamilyOptions = fontFamilyArr.map(font => {
  return {
    value: font.value,
    text: h('span', { style: { fontFamily: font.value } }, font.text)
  }
})

export interface PropToForm {
  component: string
  subComponent?: string
  options?: { text: string | VNode, value: any }[]
  valueProp?: string
  value?: string
  extraProps?: Record<string, any>
  text?: string
  initialTransform?: (value: any) => any
  afterTransform?: (value: any) => any
  eventName?: string;
}
export type PropsToForms = {
  [key in keyof AllFormProps]?: PropToForm
}

const defaultHandler = {
  component: 'Input',
  eventName: 'change',
  valueProp: 'value',
  initialTransform: (v: any) => v,
  afterTransform: (e: any) => e
}

const pxToNumberHandler: PropToForm = {
  component: 'InputNumber',
  // 确保初始转换和反向转换是对称的
  initialTransform: (v: string) => {
    if (!v) return 0;
    // 保留原始值的数字部分，处理 'px' 后缀
    const num = parseInt(v, 10);
    return isNaN(num) ? 0 : num;
  },
  afterTransform: (e: number) => {
    if (e === undefined || e === null) return '';
    // 确保转换后的值与初始值格式一致
    const num = Number(e);
    return isNaN(num) ? '' : `${num}px`;
  },
}

export const mapPropsToForms: Record<string, any> = {
  // textComponentProps
  text: {
    text: '文本',
    component: 'Textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    ...pxToNumberHandler
  },
  lineHeight: {
    text: '行高',
    component: 'Slider',
    extraProps: { min: 0, max: 30, step: 0.1 },
    initialTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: 'RadioGroup',
    subComponent: 'RadioButton',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'Select',
    subComponent: 'SelectOption',
    text: '字体',
    options: [
      { value: '', text: '无' },
      ...fontFamilyOptions
    ]
  },
  fontWeight: {
    component: 'IconSwitch',
    initialTransform: (v: string) => v === 'bold',
    afterTransform: (e: boolean) => e ? 'bold' : 'normal',
    valueProp: 'checked',
    extraProps: { iconName: 'BoldOutlined', tip: '加粗' }
  },
  fontStyle: {
    component: 'IconSwitch',
    initialTransform: (v: string) => v === 'italic',
    afterTransform: (e: boolean) => e ? 'italic' : 'normal',
    valueProp: 'checked',
    extraProps: { iconName: 'ItalicOutlined', tip: '斜体' }
  },
  textDecoration: {
    component: 'IconSwitch',
    initialTransform: (v: string) => v === 'underline',
    afterTransform: (e: boolean) => e ? 'underline' : 'none',
    valueProp: 'checked',
    extraProps: { iconName: 'UnderlineOutlined', tip: '下划线' }
  },
  color: {
    component: 'ColorPicker',
    text: '字体颜色'
  },
  backgroundColor: {
    component: 'ColorPicker',
    text: '背景颜色'
  },
  // imageComponentProps
  src: {
    component: 'ImageProcesser',
  },
  // commonComponentProps - sizes
  width: {
    text: '宽度',
    ...pxToNumberHandler
  },
  height: {
    text: '高度',
    ...pxToNumberHandler
  },
  paddingLeft: {
    ...pxToNumberHandler,
    text: '左边距'
  },
  paddingRight: {
    ...pxToNumberHandler,
    text: '右边距'
  },
  paddingTop: {
    ...pxToNumberHandler,
    text: '上边距'
  },
  paddingBottom: {
    ...pxToNumberHandler,
    text: '下边距'
  },
  // commonComponentProps - border type
  borderStyle: {
    ...defaultHandler,
    component: 'Select',
    subComponent: 'SelectOption',
    text: '边框类型',
    options: [
      { value: 'none', text: '无' },
      { value: 'solid', text: '实线' },
      { value: 'dashed', text: '破折线' },
      { value: 'dotted', text: '点状线' }
    ]
  },
  borderColor: {
    ...defaultHandler,
    component: 'ColorPicker',
    text: '边框颜色'
  },
  borderWidth: {
    ...pxToNumberHandler,
    component: 'Slider',
    text: '边框宽度',
    extraProps: { min: 0, max: 20 }
  },
  borderRadius: {
    ...pxToNumberHandler,
    component: 'Slider',
    text: '边框圆角',
    extraProps: { min: 0, max: 200 }
  },
  // commonComponentProps - opacity and boxShadow
  opacity: {
    component: 'Slider',
    text: '透明度',
    initialTransform: (v: number) => v ? v * 100 : 100,
    afterTransform: (e: number) => (e / 100),
    extraProps: { min: 0, max: 100, reverse: true }
  },
  boxShadow: {
    component: 'ShadowPicker'
  },
  // commonComponentProps - positions
  left: {
    ...pxToNumberHandler,
    text: 'X轴坐标'
  },
  top: {
    ...pxToNumberHandler,
    text: 'Y轴坐标'
  },
  // commonComponentProps - actions and urls
  // actions
  actionType: {
    ...defaultHandler,
    component: 'Select',
    subComponent: 'SelectOption',
    text: '点击',
    options: [
      { value: '', text: '无' },
      { value: 'to', text: '跳转到 URL' }
    ]
  },
  url: {
    ...defaultHandler,
    afterTransform: (e: any) => e.target.value,
    text: '链接'
  },
  backgroundImage: {
    ...defaultHandler,
    component: 'BackgroundProcesser',
    initialTransform: (v: string) => {
      if (v) {
        const reg = /\(["'](.+)["']\)/g
        const matches = reg.exec(v)
        if (matches && matches.length > 1) {
          return matches[1]
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    afterTransform: (e: string) => e ? `url('${e}')` : ''
  },
}

