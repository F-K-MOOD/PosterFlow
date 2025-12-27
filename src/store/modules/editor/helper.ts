 export interface EditorProps {
  components: ComponentData[]; // 供中间编译器渲染的数组
  currentElement: string; // 当前选中的元素 uuid
}

export interface ComponentData {
  id: string; // id, uuidv4 生成
  name: string; // 业务组件库名称 pf-text, pf-image等
  props: Record<string, any>; //这个元素的属性
}
