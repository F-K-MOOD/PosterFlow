import { Context, Application, EggAppConfig } from 'egg'
import { verify } from 'jsonwebtoken'
function getTokenValue(ctx: Context) {
  // JWT Header 格式
  // Authorization:Bearer tokenXXX
  const { authorization } = ctx.header
  if (!ctx.header || !authorization) {
    return false
  }
  if (typeof authorization === 'string') {
    const parts = authorization.trim().split(' ')
    if (parts.length === 2) {
      const scheme = parts[0]
      const credentials = parts[1]
      if (/^Bearer$/i.test(scheme)) {
        return credentials
      }
    }
  }
  return false
}
export default (options: EggAppConfig['jwt'], app: Application) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 从 header 获取对应的 token
    const token = getTokenValue(ctx)
    if (!token) {
      return ctx.helper.error({ ctx, errorType: 'loginValidateFail' })
    }
    // 使用app.config.jwt.secret确保获取正确的密钥
    const secret = app.config.jwt.secret
    if (!secret) {
      throw new Error('Secret not provided')
    }
    try {
      const decoded = verify(token, secret)
      ctx.state.user = decoded
      await next()
    } catch (e) {
      return ctx.helper.error({ ctx, errorType: 'loginValidateFail' })
    }
  }
}
