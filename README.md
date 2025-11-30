# AIcoding 静态站点

## 概览
- 默认“古风主题”（`data-theme="gufeng"`）
- 生成自我介绍与话题，支持本地 AI 润色与外部 API 接入
- 外部 API 支持 JSON 与 SSE 流式返回（可配置 Endpoint/Key）

## 本地运行
1. 在项目根目录启动本地服务：
   - `python -m http.server 8000`
2. 浏览器打开 `http://localhost:8000/`

## 使用说明
- “崭新亮相”区域：选择场景、语气，勾选“开启AI润色”，点击“生成”
- “更多选项”：
  - `AI Endpoint` 与 `API Key`：填写后点击“保存AI设置”；可“测试连接”
  - 未配置或网络错误时，自动使用本地润色回退
- 生成期间可“取消生成”，回收外部请求

## 部署到 GitHub Pages
1. 在仓库 Settings → Pages，将 Source 设置为 GitHub Actions
2. 已提供工作流：`.github/workflows/pages.yml`，会在推送到 `main` 时自动部署
3. 推送后检查 Actions 日志与 Pages 页面地址

## 部署到 Netlify
- 方式一：在 Netlify 仪表盘选择“New site from Git”，连接 GitHub 仓库，Publish directory 选择根目录 `.`
- 方式二：直接拖拽 `site-release-YYYYMMDD.zip` 到 Netlify（适合一次性部署）

## 部署到 Vercel
- 在 Vercel 选择“Import Git Repository”，选择本仓库；框架选择 `Other`，输出目录为根目录 `.`
- 部署成功后，Vercel 会分配域名；也可绑定自定义域名

## 安全
- API Key 保存在浏览器 `localStorage`，不写入仓库
- `.gitignore` 已排除 `.trae/`、`resources/`、临时打包文件等

## 结构
- `index.html` 页面与设置
- `style.css` 主题样式（`gufeng`/`dark`/`light`）
- `app.js` 逻辑与 AI 润色实现
- `dist/` 可用于发布的静态构建（可选）

## 变更摘要
- 古风主题设为默认显示
- 本地 AI 润色：段落化介绍 + 话题引导，并保留备选话题列表
- 外部 API 接入：JSON/SSE 支持、超时与回退、取消生成
