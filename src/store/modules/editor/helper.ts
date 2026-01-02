import type { ImageComponentProps } from '@/types/ImageComponentProps'
import type { TextComponentProps } from '@/types/TextComponentProps'

 export interface EditorProps {
  components: ComponentData[]; // 供中间编译器渲染的数组
  currentElement: string; // 当前选中的元素 uuid
}

export type AllComponentProps = TextComponentProps & ImageComponentProps

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<AllComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等 
  name: string ;
  // 图层是否隐藏
  isHidden?: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
}