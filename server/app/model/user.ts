import { Application } from 'egg'
import { Schema } from 'mongoose'
import * as AutoIncrementFactory from 'mongoose-sequence'
export interface UserProps {
  username: string;
  password: string;
  email?: string;
  nickName?: string;
  picture?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'email' | 'cellphone' | 'oauth';
  provider?: 'gitee';
  oauthID?: string;
  role?: 'admin' | 'normal';
  description?: string;
  gender?: string;
}

function initUserModel(app: Application) {
  const AutoIncrement = AutoIncrementFactory(app.mongoose)
  const UserSchema = new Schema<UserProps>({
    username: { type: String, unique: true, required: true },
    password: { type: String },
    nickName: { type: String },
    picture: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    type: { type: String, default: 'email' },
    provider: { type: String },
    oauthID: { type: String },
    role: { type: String, default: 'normal' },
    description: { type: String },
    gender: { type: String }
  }, {
    timestamps: true
  })

  // 确保transform函数正确配置
  UserSchema.set('toJSON', {
    transform(_doc, ret) {
      const userRet = ret as any
      delete userRet.password
      delete userRet.__v
      delete userRet._id
      delete userRet.type
      delete userRet.role
      delete userRet.provider
      delete userRet.oauthID
      delete userRet.email
      // 确保日期格式正确
      if (userRet.createdAt instanceof Date) {
        userRet.createdAt = userRet.createdAt.toISOString()
      }
      if (userRet.updatedAt instanceof Date) {
        userRet.updatedAt = userRet.updatedAt.toISOString()
      }
    }
  })
  UserSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'users_id_counter' })
  return app.mongoose.model('User', UserSchema) as any
}

export default initUserModel
