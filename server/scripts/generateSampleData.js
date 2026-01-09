const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// 连接到MongoDB数据库
mongoose.connect("mongodb://localhost:27017/lego");

// 定义用户模型
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

// 生成示例数据
const sampleUsers = [
  {
    username: "15288735583",
    password: null, // 手机号登录不需要密码
    nickName: "乐高5583",
    phoneNumber: "15288735583",
    type: "cellphone",
    role: "normal",
  },
  {
    username: "test@example.com",
    password: "password123", // 明文密码，脚本中会自动加密
    nickName: "测试用户",
    email: "test@example.com",
    type: "email",
    role: "normal",
  },
  {
    username: "admin@example.com",
    password: "admin123", // 明文密码，脚本中会自动加密
    nickName: "管理员",
    email: "admin@example.com",
    type: "email",
    role: "admin",
  },
  {
    username: "13800138000",
    password: null,
    nickName: "测试手机号用户",
    phoneNumber: "13800138000",
    type: "cellphone",
    role: "normal",
  },
  {
    username: "user@example.com",
    password: "user123",
    nickName: "普通用户",
    email: "user@example.com",
    type: "email",
    role: "normal",
  },
];

// 插入数据到数据库
async function insertSampleData() {
  try {
    // 清空现有的用户数据
    await User.deleteMany({});
    console.log("已清空现有用户数据");

    // 插入新的示例数据
    for (const userData of sampleUsers) {
      if (userData.password) {
        // 加密密码
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
      }

      const user = new User(userData);
      await user.save();
      console.log(`已创建用户: ${user.username}`);
    }

    console.log("\n示例数据生成完成！");

    // 关闭数据库连接
    mongoose.connection.close();

    // 生成Markdown文档
    generateMarkdown(sampleUsers);
  } catch (error) {
    console.error("生成示例数据时出错:", error);
    mongoose.connection.close();
  }
}

// 生成Markdown文档
function generateMarkdown(users) {
  const fs = require("fs");
  const path = require("path");

  let markdown = "# 示例用户数据\n\n";
  markdown += "## 用户列表\n\n";

  users.forEach((user, index) => {
    markdown += `### 用户 ${index + 1}\n`;
    markdown += `- **用户名**: ${user.username}\n`;
    if (user.password) {
      markdown += `- **密码**: ${user.password} (明文，实际存储为加密形式)\n`;
    }
    markdown += `- **昵称**: ${user.nickName}\n`;
    if (user.email) {
      markdown += `- **邮箱**: ${user.email}\n`;
    }
    if (user.phoneNumber) {
      markdown += `- **手机号**: ${user.phoneNumber}\n`;
    }
    markdown += `- **类型**: ${user.type}\n`;
    markdown += `- **角色**: ${user.role}\n\n`;
  });

  // 保存到sampleData.md文件
  const filePath = path.join(__dirname, "../sampleData.md");
  fs.writeFileSync(filePath, markdown, "utf8");
  console.log(`\n示例数据已保存到: ${filePath}`);
}

// 执行数据生成
insertSampleData();
