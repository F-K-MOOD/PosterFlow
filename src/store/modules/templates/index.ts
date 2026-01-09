import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

import { fetchTemplates as fetchTemplatesApi, fetchWork as fetchWorkApi,fetchWorks as fetchWorksApi } from '@/api/templates'
import type { RespData } from '@/types/respTypes'

import type { TemplateProps, TemplatesProps } from './helper'


const useTemplateStore = defineStore('templateStore', () => {
  const state: TemplatesProps = reactive({
    data: [],
    totalTemplates: 0,
    works: [],
    totalWorks: 0
  })

  const getTemplateById = computed(() => (id: number) => {
    return state.data.find(t => t.id === id)
  })
  async function fetchTemplates(params: { title?: string; pageIndex: number; pageSize: number }) {
    console.log('Fetching templates with params:', params)
    const resp = await fetchTemplatesApi(params)
    console.log('API Response:', resp)
    const { count, list } = resp.data.data
    console.log('Templates list from backend:', list)

    // 如果是第一页，替换数据；否则追加数据
    if (params.pageIndex === 0) {
      state.data = list
    } else {
      state.data = [...state.data, ...list]
    }

    state.totalTemplates = count
    console.log('Updated template state:', state)
  }

  async function fetchWork(id: string) {
    const resp = await fetchWorkApi(id)
    console.log('API Response:', resp)
    const { data } = resp.data.data
    console.log('Work from backend:', data)
    state.works = [data]
  }

  async function fetchWorks(params: { title?: string; status?: number; pageIndex: number; pageSize: number }) {
    const data = await fetchWorksApi(params)
    console.log('Works:', data)
    // const { count, list } = rawData.data
    // state.works = list
    // state.totalWorks = count
  }
  function fetchTemplate(rawData: RespData<TemplateProps>) {
    state.data = [rawData.data]
  }

  return {
    state,
    fetchTemplates,
    fetchWorks,
    fetchTemplate,
    getTemplateById,
    fetchWork
  }
})

export default useTemplateStore