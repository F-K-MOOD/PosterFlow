# 后端 server 文件修改记录

## server/config/config.default.ts

### 修改内容：

- **位置**：第 35-39 行（JWT 配置）
- **修改前**：

```typescript
config.jwt = {
  enable: true,
  secret: process.env.JWT_SECRET || "",
  match: [
    "/api/users/getUserInfo",
    "/api/works",
    "/api/utils/upload-img",
    "/api/channel",
  ],
};
```

- **修改后**：

```typescript
config.jwt = {
  enable: true,
  secret: process.env.JWT_SECRET || "",
  match: ["/api/users/getUserInfo", "/api/works", "/api/channel"],
};
```

### 修改原因：

- 从 JWT 匹配列表中移除了`/api/utils/upload-img`接口
- 避免因前端缺少 token 导致上传请求被拦截
- 简化上传流程，使游客也能进行图片上传测试

## server/config/plugin.ts

### 修改内容：

- **位置**：第 24-27 行（Redis 插件配置）
- **修改前**：

```typescript
redis: {
  enable: true,
  package: 'egg-redis'
}
```

- **修改后**：

```typescript
redis: {
  enable: false,
  package: 'egg-redis'
}
```

### 修改原因：

- 禁用未使用的 Redis 插件
- 避免因 Redis 服务未启动导致的连接错误
- 减少不必要的依赖和资源消耗

## 其他操作（非文件内容修改）

### 创建缺失目录：

- **路径**：`server/node_modules/egg-watcher/app/middleware`
- **原因**：解决 Egg.js 插件扫描时缺少目录导致的 ENOENT 错误
- **命令**：`mkdir -p server/node_modules/egg-watcher/app/middleware`
