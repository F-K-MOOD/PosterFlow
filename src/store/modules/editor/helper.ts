import type { ImageComponentProps } from '@/types/ImageComponentProps'
import type { ShapeComponentProps } from '@/types/ShapeComponentProps'
import type { TextComponentProps } from '@/types/TextComponentProps'

export type AllComponentProps = TextComponentProps & ImageComponentProps & ShapeComponentProps
export type AllFormProps = PageProps & AllComponentProps

export interface EditorProps {
  components: ComponentData[]; // 供中间编译器渲染的数组
  currentElement: string; // 当前选中的元素 uuid
  page: PageData;
}

export interface PageData {
  id?: number;
  props?: PageProps;
  title?: string;
  desc?: string;
  coverImg?: string;
  uuid?: string;
  setting?: { [key: string]: any };
  isTemplate?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  author?: string;
  copiedCount?: number;
  status?: number;
  user?: {
    gender: string;
    nickName: string;
    picture: string;
    userName: string;
  };
}

export interface PageProps {
  backgroundColor: string;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  height: string;
}

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<AllComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等 
  name: string;
  page?: PageData;
  // 图层是否隐藏
  isHidden?: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
  // 是否是根组件
  isRoot?: boolean;
}