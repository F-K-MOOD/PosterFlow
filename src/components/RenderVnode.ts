import { defineComponent } from 'vue'

const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true
    }
  },
  render(props) {
    return props.vNode
  }
})

export default RenderVnode
