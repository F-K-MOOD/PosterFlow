<script lang="ts" setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Button, Col, Form, FormItem, Input, message, Row, Spin } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form/interface'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { genVeriCode } from '@/api/user.ts'
import useGlobalStore from '@/store/modules/global'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const globalStore = useGlobalStore()
const isLoginLoading = computed(() => globalStore.isLoading)
const router = useRouter()

// 获取验证码倒计时
let timer = 0
const counter = ref(60)
function startCounter() {
  counter.value--
  timer = window.setInterval(() => {
    counter.value--
  }, 1000)
}
// 倒计时复原
watch(counter, (newValue) => {
  if (newValue === 0) {
    clearInterval(timer)
    counter.value = 60
  }
})

// 手机号不符合格式或者倒计时未结束, 获取验证码按钮显示为禁用
const form = reactive({
  cellphone: '',
  verifyCode: ''
})
const codeButtonDisable = computed(() => {
  return !/^1[3-9]\d{9}$/.test(form.cellphone.trim()) || (counter.value < 60)
})

// 自定义表单验证规则
const cellnumberValidator = (rule: Rule, value: string) => {
  return new Promise((resolve, reject) => {
    const passed = /^1[3-9]\d{9}$/.test(value.trim())
    setTimeout(() => {
      if (passed) {
        resolve('')
      } else {
        reject('手机号码格式不正确')
      }
    }, 0)
  })
}
const rules = reactive({
  cellphone: [
    { required: true, message: '手机号码不能为空', trigger: ['blur', 'change'] },
    { asyncValidator: cellnumberValidator, trigger: ['blur', 'change'] }
  ],
  verifyCode: [
    { required: true, message: '验证码不能为空', trigger: ['blur', 'change'] }
  ]
})

// 点击登录按钮时, 先进行表单的验证, 在发起请求
const loginForm = ref()
function login() {
  loginForm.value.validate()
    .then(async () => {
      const payload = {
        phoneNumber: form.cellphone,
        verifyCode: form.verifyCode
      }
      //  发起登录请求, 获取token和用户信息
      await userStore.loginAndFetch(payload)
      message.success('登录成功 2秒后跳转首页')
      setTimeout(() => {
        router.push('/')
      }, 2000)
    })
    .catch(errors => {
      console.error('表单验证失败:', errors)
      // 显示第一个验证错误
      if (errors && errors.length > 0) {
        message.error(errors[0].message)
      }
    })
}

async function getCode(cellphone: string) {
  const response = await genVeriCode(cellphone)
  message.success('验证码发送成功, 请注意查收', 5)
  console.log('验证码:', response.data.data.verifyCode)
  startCounter()
}
</script>

<template>
  <div class="login-page">
    <Row>
      <Col :span="12" class="aside">
        <div class="aside-inner">
          <router-link to="/">
            <img alt="FK-PosterFlux" src="../assets/login.png" class="pf-img">
          </router-link>
          <h2>欢迎使用PosterFlux</h2>
        </div>
      </Col>
      <Col :span="12" class="login-area">
        <Form 
          ref="loginForm" 
          layout="vertical" 
          :model="form" 
          :rules="rules"
        >
          <h2>欢迎回来</h2>
          <p class="subTitle">使用手机号码和验证码登录</p>
          <FormItem label="手机号码" required name="cellphone">
            <Input v-model:value="form.cellphone" placeholder="手机号码">
              <template #prefix>
                <UserOutlined class="icon-prefix" />
              </template>
            </Input>
          </FormItem>
          <FormItem label="验证码" required name="verifyCode">
            <Input v-model:value="form.verifyCode" placeholder="四位验证码">
              <template #prefix>
                <LockOutlined class="icon-prefix" />
              </template>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" @click="login">
              <template #icon>
                <Spin :spinning="isLoginLoading" />
              </template>
              登录
            </Button>
            <Button 
              size="large" 
              :style="{ marginLeft: '20px' }" 
              :disabled="codeButtonDisable"
              @click="getCode(form.cellphone)"
            >
              {{ counter === 60 ? '获取验证码' : `${counter}秒后重发` }}
            </Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<style>
.logo-area {
  position: absolute;
  top: 30px;
  width: 150px;
}

.aside {
  height: 100vh;
  background-color: #1a191900;
  background-size: cover;
  background-repeat: no-repeat;
}

.aside .pf-img {
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  object-fit: cover;
}

.aside h2 {
  color: #CCCCCC;
  font-size: 29px;
}

.aside-inner {
  width: 60%;
  text-align: center;
}

.login-area {
  height: 100vh;
}

.login-area .ant-form {
  width: 350px;
}

.text-white-70 {
  color: #999;
  display: block;
  font-size: 19px;
}

.aside,
.login-area {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.login-area h2 {
  color: #333333;
  font-size: 29px;
}

.login-area .subTitle {
  color: #666666;
  font-size: 19px;
}

.login-area .ant-form-item-label {
  display: none;
}

.login-area .ant-input-prefix {
  left: auto;
  right: 30px;
  font-size: 19px;
}

.login-area .ant-input {
  font-size: 17px;
  padding: 20px 45px 20px 30px;
}

.icon-prefix {
  color: rgba(0, 0, 0, .25);
}
</style>
