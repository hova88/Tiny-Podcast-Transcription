# Podcast Transcription App
![](./public/demo.png)

[English](#english) | [中文](#chinese)

<h2 id="english">English</h2>

A podcast transcription application based on Next.js, supporting both OpenAI APIs and locally deployed AI models for audio transcription and intelligent summary generation.

## ✨ Features

- 🎯 Support both file upload and URL input
- 🎙️ Support for Xiaoyuzhou podcast transcription
- 📝 High-quality audio transcription using OpenAI Whisper API or local models
- 📊 AI-powered content summarization with local or cloud models
- 🎨 Modern UI design
- 💾 Download transcripts and summaries
- 🎵 Built-in audio player

## 🚀 Getting Started

### Local Model Deployment

This application supports locally deployed AI models as an alternative to OpenAI's APIs. You can use:

**Option 1: OpenAI-Compatible API Server (Recommended)**
- Use tools like [Ollama](https://ollama.ai/), [LocalAI](https://localai.io/), or [vLLM](https://vllm.readthedocs.io/)
- Set `NEXT_PUBLIC_BASE_URL` to your server's base URL
- Models will be called using OpenAI-compatible endpoints

**Option 2: Direct Model Endpoints**
- Point directly to your model endpoints using `LOCAL_*_ENDPOINT` variables
- Useful for custom model servers or non-OpenAI-compatible APIs

**Recommended Local Setup:**
```bash
# Example using Ollama for chat completion
ollama serve  # Starts on http://localhost:11434

# Example using whisper.cpp for transcription
./whisper-server --port 8001  # Starts on http://localhost:8001
```

### Prerequisites

- Node.js 18+ 
- OpenAI API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/podcast-transcription.git
cd podcast-transcription
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables:
Create a `.env.local` file and add:
```env
# For OpenAI-compatible local API server (recommended)
NEXT_PUBLIC_OPENAI_API_KEY=local-key
NEXT_PUBLIC_BASE_URL=http://localhost:8000/v1

# For direct local model endpoints (alternative)
LOCAL_WHISPER_ENDPOINT=http://localhost:8001/v1/audio/transcriptions
LOCAL_CHAT_ENDPOINT=http://localhost:8000/v1/chat/completions
LOCAL_WHISPER_MODEL=whisper-1
LOCAL_CHAT_MODEL=llama-3.1-8b-instruct
```

**Local Model Setup:**
- If `NEXT_PUBLIC_BASE_URL` is set, the app will use OpenAI-compatible API endpoints
- Otherwise, it will use direct endpoints specified by `LOCAL_*_ENDPOINT` variables
- Model names can be customized via `LOCAL_*_MODEL` variables

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t podcast-transcription .
```

2. Run the container:
```bash
docker run -p 3000:3000 podcast-transcription
```

### Zeabur Deployment

This project is deployed using [Zeabur](https://zeabur.com).

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **API**: [OpenAI Whisper](https://platform.openai.com/docs/guides/speech-to-text)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

## 📝 Usage

1. **File Upload**:
   - Click the "File Upload" tab
   - Select a local audio file
   - Click "Transcribe" to start

2. **URL Input**:
   - Click the "URL Input" tab
   - Enter a podcast link (supports Xiaoyuzhou podcast)
   - Click "Transcribe" to start

3. **View Results**:
   - View detailed transcription after processing
   - Get AI-generated summary
   - Download transcripts and summaries using the download buttons

## 🤝 Contributing

Pull Requests and Issues are welcome!

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

<h2 id="chinese">中文</h2>

一个基于 Next.js 和 OpenAI Whisper API 的播客转录应用，支持音频文件转录和智能摘要生成。

## 🌟 特性

- 🎯 支持音频文件上传和 URL 输入两种方式
- 🎙️ 支持小宇宙播客音频转录
- 📝 使用 OpenAI Whisper API 进行高质量音频转录
- 📊 AI 驱动的内容摘要生成
- 🎨 现代化的 UI 设计
- 💾 支持转录文本和摘要的下载
- 🎵 内置音频播放器

## 🚀 快速开始

### 本地模型部署

此应用支持本地部署的 AI 模型作为 OpenAI API 的替代方案。您可以使用：

**选项 1：OpenAI 兼容的 API 服务器（推荐）**
- 使用 [Ollama](https://ollama.ai/)、[LocalAI](https://localai.io/) 或 [vLLM](https://vllm.readthedocs.io/) 等工具
- 将 `NEXT_PUBLIC_BASE_URL` 设置为您服务器的基础 URL
- 模型将通过 OpenAI 兼容的端点调用

**选项 2：直接模型端点**
- 使用 `LOCAL_*_ENDPOINT` 变量直接指向您的模型端点
- 适用于自定义模型服务器或非 OpenAI 兼容的 API

**推荐的本地设置：**
```bash
# 使用 Ollama 进行聊天完成的示例
ollama serve  # 在 http://localhost:11434 启动

# 使用 whisper.cpp 进行转录的示例
./whisper-server --port 8001  # 在 http://localhost:8001 启动
```

### 前置要求

- Node.js 18+ 
- OpenAI API Key

### 安装

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/podcast-transcription.git
cd podcast-transcription
```

2. 安装依赖：
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 配置环境变量：
创建 `.env.local` 文件并添加以下内容：
```env
# 用于 OpenAI 兼容的本地 API 服务器（推荐）
NEXT_PUBLIC_OPENAI_API_KEY=local-key
NEXT_PUBLIC_BASE_URL=http://localhost:8000/v1

# 用于直接本地模型端点（替代方案）
LOCAL_WHISPER_ENDPOINT=http://localhost:8001/v1/audio/transcriptions
LOCAL_CHAT_ENDPOINT=http://localhost:8000/v1/chat/completions
LOCAL_WHISPER_MODEL=whisper-1
LOCAL_CHAT_MODEL=llama-3.1-8b-instruct
```

**本地模型设置：**
- 如果设置了 `NEXT_PUBLIC_BASE_URL`，应用将使用 OpenAI 兼容的 API 端点
- 否则，将使用由 `LOCAL_*_ENDPOINT` 变量指定的直接端点
- 模型名称可通过 `LOCAL_*_MODEL` 变量自定义

4. 启动开发服务器：
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### Docker 部署

1. 构建 Docker 镜像：
```bash
docker build -t podcast-transcription .
```

2. 运行容器：
```bash
docker run -p 3000:3000 podcast-transcription
```

### Zeabur 部署

本项目使用 [Zeabur](https://zeabur.com) 进行部署。

## 🛠️ 技术栈

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **API**: [OpenAI Whisper](https://platform.openai.com/docs/guides/speech-to-text)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

## 📝 使用说明

1. **文件上传**：
   - 点击 "File Upload" 标签
   - 选择本地音频文件
   - 点击 "Transcribe" 开始转录

2. **URL 输入**：
   - 点击 "URL Input" 标签
   - 输入播客链接（支持小宇宙播客）
   - 点击 "Transcribe" 开始转录

3. **查看结果**：
   - 转录完成后会显示详细的文本内容
   - 同时生成内容摘要
   - 可以通过下载按钮保存转录文本和摘要

## 🤝 贡献

欢迎提交 Pull Requests 和 Issues！

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。
## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=winterfx/Podcast-Transcription&type=Date)](https://star-history.com/#winterfx/Podcast-Transcription&Date)
