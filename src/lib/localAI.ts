import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

/**
 * Local AI client that supports both OpenAI-compatible APIs and direct local endpoints
 */
class LocalAIClient {
  private openaiClient: OpenAI | null = null;
  private useOpenAICompatible: boolean;
  
  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'local-key';
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    
    // Use OpenAI-compatible mode if baseURL is provided
    this.useOpenAICompatible = !!baseURL;
    
    if (this.useOpenAICompatible) {
      this.openaiClient = new OpenAI({
        apiKey,
        baseURL
      });
    }
  }

  /**
   * Create chat completion using local model
   */
  async createChatCompletion(
    messages: ChatCompletionMessageParam[],
    options: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
    } = {}
  ): Promise<string> {
    const model = options.model || process.env.LOCAL_CHAT_MODEL || 'llama-3.1-8b-instruct';
    
    if (this.useOpenAICompatible && this.openaiClient) {
      // Use OpenAI-compatible API
      const response = await this.openaiClient.chat.completions.create({
        model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000,
      });
      
      return response.choices[0]?.message?.content || '';
    } else {
      // Use direct local endpoint
      const endpoint = process.env.LOCAL_CHAT_ENDPOINT || 'http://localhost:8000/v1/chat/completions';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Local chat API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    }
  }

  /**
   * Create transcription using local Whisper model
   */
  async createTranscription(
    file: File,
    options: {
      model?: string;
      language?: string;
      response_format?: string;
      prompt?: string;
    } = {}
  ): Promise<string> {
    const model = options.model || process.env.LOCAL_WHISPER_MODEL || 'whisper-1';
    
    if (this.useOpenAICompatible && this.openaiClient) {
      // Use OpenAI-compatible API
      const createOptions: {
        model: string;
        file: File;
        response_format?: 'text' | 'json' | 'srt' | 'verbose_json' | 'vtt';
        language?: string;
        prompt?: string;
      } = {
        model,
        file,
        response_format: (options.response_format as 'text' | 'json' | 'srt' | 'verbose_json' | 'vtt') || 'text',
      };
      
      if (options.language) {
        createOptions.language = options.language;
      }
      
      if (options.prompt) {
        createOptions.prompt = options.prompt;
      }
      
      const response = await this.openaiClient.audio.transcriptions.create(createOptions);
      return typeof response === 'string' ? response : JSON.stringify(response);
    } else {
      // Use direct local endpoint
      const endpoint = process.env.LOCAL_WHISPER_ENDPOINT || 'http://localhost:8001/v1/audio/transcriptions';
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('model', model);
      formData.append('response_format', options.response_format || 'text');
      
      if (options.language) {
        formData.append('language', options.language);
      }
      
      if (options.prompt) {
        formData.append('prompt', options.prompt);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Local transcription API error: ${response.statusText}`);
      }

      const data = await response.text();
      return data;
    }
  }
}

// Export singleton instance
export const localAI = new LocalAIClient();