import type { ComputedRef } from 'vue'
import {  computed, reactive, toRef } from 'vue'

import useTemplateStore from '@/store/modules/templates'
interface LoadParams {
  pageIndex: number;
  pageSize: number;
  [key: string]: any;
}

const useLoadMore = (actionName: 'fetchTemplates' | 'fetchWorks', total: ComputedRef<number>, params: LoadParams = { pageIndex: 0, pageSize: 8}) => {
  const templateStore = useTemplateStore()
  // 变化的参数
  // const pageIndex = ref(params.pageIndex)
  // 请求的参数，根据变化的参数进行更新
  const requestParams = reactive(params)
  const loadMorePage = () => {
    requestParams.pageIndex++
    templateStore[actionName](requestParams)
  }
  const goToPage = (index: number) => {
    requestParams.pageIndex = index
    templateStore[actionName](requestParams)
  }
  const loadPrevPage = () => {
    requestParams.pageIndex--
    templateStore[actionName](requestParams)
  }
  const isFirstPage = computed(() => requestParams.pageIndex === 0)
  const totalPage =computed(() => Math.ceil(total.value / params.pageSize))
  const isLastPage = computed(() => {
    return totalPage.value === requestParams.pageIndex + 1
  })
  const pageIndex = toRef(requestParams, 'pageIndex')
  return {
    loadMorePage,
    isLastPage,
    pageIndex,
    loadPrevPage,
    isFirstPage,
    requestParams,
    goToPage,
    totalPage
  }
}
export default useLoadMore