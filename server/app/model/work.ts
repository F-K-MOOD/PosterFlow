import { Application } from 'egg'
import { ObjectId } from 'mongoose'
import * as AutoIncrementFactory from 'mongoose-sequence'
import { UserProps } from './user'
interface ChannelProps {
  name: string;
  id: string;
}
export interface WorkProps {
  id?: number;
  uuid: string;
  title: string;
  desc: string;
  coverImg?: string;
  content?: { [key: string]: any };
  isTemplate?: boolean;
  isPublic?: boolean;
  isHot?: boolean;
  author: string;
  copiedCount: number;
  status?: 0 | 1 | 2;
  user: ObjectId;
  latestPublishAt?: Date;
  channels?: ChannelProps[];
}

function initWorkModel(app: Application) {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const AutoIncrement = AutoIncrementFactory(mongoose)
  const WorkSchema = new Schema<WorkProps>({
    uuid: { type: String, unique: true },
    title: { type: String, required: true },
    desc: { type: String },
    coverImg: { type: String },
    content: { type: Object },
    isTemplate: { type: Boolean },
    isPublic: { type: Boolean },
    isHot: { type: Boolean },
    author: { type: String, required: true },
    copiedCount: { type: Number, default: 0 },
    status: { type: Number, default: 1 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    channels: { type: Array },
    latestPublishAt: { type: Date },
  }, { timestamps: true })
  WorkSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'works_id_counter' })
  
  // 添加toJSON转换函数，确保返回id字段而不是_id字段
  WorkSchema.set('toJSON', {
    transform(_doc, ret) {
      const workRet = ret as any
      delete workRet._id
      delete workRet.__v
      // 确保日期格式正确
      if (workRet.createdAt instanceof Date) {
        workRet.createdAt = workRet.createdAt.toISOString()
      }
      if (workRet.updatedAt instanceof Date) {
        workRet.updatedAt = workRet.updatedAt.toISOString()
      }
      if (workRet.latestPublishAt instanceof Date) {
        workRet.latestPublishAt = workRet.latestPublishAt.toISOString()
      }
    }
  })
  
  return mongoose.model<WorkProps>('Work', WorkSchema)
}

export default initWorkModel
