<script lang="ts" setup>
import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from 'ant-design-vue'
import { computed } from 'vue'

import UserProfile from '@/components/UserProfile.vue'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'Index'
})

const user = computed(() => useUserStore().state)

</script>

<template>
  <div class="homepage-container">
    <Layout :style="{ background: '#fff' }">
      <LayoutHeader class="header">
        <div class="page-title">
          <router-link to="/">KlickPoster</router-link>
        </div>
        <UserProfile :user="user" />
      </LayoutHeader>
      <LayoutContent class="home-layout">
        <router-view />
      </LayoutContent>
    </Layout>
    <LayoutFooter>
      2024 KlickPoster 海报可视化低代码平台 版权所有
    </LayoutFooter>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  color: #fff;
}
</style>
