import type { UserDataProps } from "@/store/modules/user/helper"
import type { RespData } from "@/types/respTypes"
import service from "@/utils/request"

export function genVeriCode(cellphone: string): Promise<RespData<any>> {
  return service.post('/users/genVeriCode', { phoneNumber: cellphone })
}

export function LoginByPhoneNumber(payload: { phoneNumber: string, verifyCode: string }): Promise<RespData<{ token: string }>> {
  const { phoneNumber, verifyCode } = payload
  return service.post('/users/loginByPhoneNumber', {
    phoneNumber,
    verifyCode
  })
}

export function GetUserInfo(): Promise<RespData<UserDataProps>> {
  return service.get('/users/getUserInfo')
}


