const mongoose = require("mongoose");

// 连接到MongoDB数据库
mongoose.connect("mongodb://localhost:27017/lego");

// 定义Work模型
const WorkSchema = new mongoose.Schema(
  {
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    channels: { type: Array },
    latestPublishAt: { type: Date },
  },
  { timestamps: true }
);

const Work = mongoose.model("Work", WorkSchema);

// 定义User模型（用于关联）
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String },
  nickName: { type: String },
  picture: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  type: { type: String, default: "email" },
  provider: { type: String },
  oauthID: { type: String },
  role: { type: String, default: "normal" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

// 用户提供的完整默认模板数据
const defaultTemplates = [
  {
    author: "林屿设计",
    copiedCount: 105,
    coverImg: "https://pf-server.oss-cn-beijing.aliyuncs.com/template-lake.png",
    desc: "清新湖泊风景海报模板，适配旅行宣传、节气海报制作",
    isHot: true,
    title: "湖光山色清新海报",
  },
  {
    author: "森野工作室",
    copiedCount: 200,
    coverImg:
      "https://pf-server.oss-cn-beijing.aliyuncs.com/template-grass.png",
    desc: "森系草地小清新模板，适合野餐活动、春日主题海报设计",
    isHot: false,
    title: "森系草地野餐海报",
  },
  {
    author: "云栖创意",
    copiedCount: 82,
    coverImg:
      "https://pf-server.oss-cn-beijing.aliyuncs.com/template-cloud.png",
    desc: "梦幻云朵治愈系模板，用于心情语录、文艺主题海报创作",
    isHot: true,
    title: "梦幻云朵治愈海报",
  },
  {
    author: "绿境企划",
    copiedCount: 120,
    coverImg:
      "https://pf-server.oss-cn-beijing.aliyuncs.com/template-earth.png",
    desc: "地球环保主题模板，适用于公益宣传、环保活动海报制作",
    isHot: true,
    title: "地球公益宣传海报",
  },
  {
    author: "山禾视觉",
    copiedCount: 232,
    coverImg:
      "https://pf-server.oss-cn-beijing.aliyuncs.com/template-mountain.png",
    desc: "大气山川风景模板，适合户外探险、旅行攻略类海报设计",
    isHot: true,
    title: "大气山川探险海报",
  },
  {
    author: "撞色实验室",
    copiedCount: 145,
    coverImg:
      "https://pf-server.oss-cn-beijing.aliyuncs.com/template-colors.png",
    desc: "撞色渐变潮流模板，用于新品发布、潮流活动宣传海报",
    isHot: false,
    title: "撞色渐变潮流海报",
  },
  {
    author: "暖光设计",
    copiedCount: 88,
    coverImg: "https://pf-server.oss-cn-beijing.aliyuncs.com/template-sun.png",
    desc: "暖系阳光活力模板，适配早安语录、运动健身主题海报",
    isHot: false,
    title: "暖系阳光活力海报",
  },
  {
    author: "城夜企划",
    copiedCount: 135,
    coverImg: "https://pf-server.oss-cn-beijing.aliyuncs.com/template-city.png",
    desc: "都市夜景商务模板，用于城市招商、企业宣传海报制作",
    isHot: false,
    title: "都市夜景商务海报",
  },
];

// 生成默认模板数据
async function generateDefaultTemplates() {
  try {
    // 获取系统默认用户（如果不存在则创建）
    let systemUser = await User.findOne({ username: "system@example.com" });

    if (!systemUser) {
      systemUser = await User.create({
        username: "system@example.com",
        password: "",
        nickName: "系统默认",
        email: "system@example.com",
        type: "email",
        role: "admin",
      });
      console.log("已创建系统默认用户");
    }

    // 清空现有模板数据
    await Work.deleteMany({ isTemplate: true });
    console.log("已清空现有默认模板数据");

    // 生成新的默认模板数据
    const templates = defaultTemplates.map((templateData, index) => ({
      uuid: `default-template-${Date.now()}-${index}`,
      title: templateData.title,
      desc: templateData.desc,
      coverImg: templateData.coverImg,
      content: {},
      isTemplate: true,
      isPublic: true,
      isHot: templateData.isHot,
      isNew: (index + 1) % 3 === 0,
      author: templateData.author,
      copiedCount: templateData.copiedCount,
      status: 1,
      user: systemUser._id,
      channels: [],
      latestPublishAt: new Date(),
    }));

    // 插入到数据库
    await Work.insertMany(templates);
    console.log("已插入", templates.length, "个默认模板");

    // 关闭数据库连接
    mongoose.connection.close();
    console.log("默认模板生成完成！");
  } catch (error) {
    console.error("生成默认模板时出错:", error);
    mongoose.connection.close();
  }
}

// 执行数据生成
generateDefaultTemplates();
