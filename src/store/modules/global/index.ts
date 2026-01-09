import { defineStore } from "pinia"
import { computed,reactive } from "vue"

import type { GlobalStatus } from "./helper"

const useGlobalStore = defineStore('global',()=> {
  const state = reactive<GlobalStatus>({
    requestMap: new Map(),
    error: {
      status: false,
      message: undefined
    }
  })

  // 生成请求的唯一键，用于在 requestMap 中标识请求
  function generateRequestKey(method: string, url: string, params?: any): string {
    const paramStr = params ? JSON.stringify(params) : "";
    return `${method}-${url}-${paramStr}`;
  }

  // 启动请求，如果已有相同请求则取消前一个
  function startRequest(key: string, controller: AbortController) {
    const existingController = state.requestMap.get(key);
    if (existingController) {
      existingController.abort(); // 取消前一个请求
    }
    state.requestMap.set(key, controller);
  }

  // 结束请求，清理 map
  function finishRequest(key: string) {
    setTimeout(() => {
      // 如果键存在并成功删除，返回 true 如果键不存在，返回 false
       state.requestMap.delete(key);
    }, 1000);
  }

  function setError(e: GlobalStatus['error']) {
    state.error = e
  }

  const isLoading = computed(() => {
    return state.requestMap.size > 0
  })

  return {
    state,
    setError,
    isLoading,
    generateRequestKey,
    startRequest,
    finishRequest
  }
})

export default useGlobalStore
