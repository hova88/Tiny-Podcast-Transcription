/**
 * Simple test to verify local AI client initialization and basic functionality
 */

// Mock environment variables for testing
process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key';
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:8000/v1';
process.env.LOCAL_CHAT_MODEL = 'llama-3.1-8b-instruct';
process.env.LOCAL_WHISPER_MODEL = 'whisper-1';

import { localAI } from '../src/lib/localAI';

describe('LocalAI Client', () => {
  test('should initialize without errors', () => {
    expect(localAI).toBeDefined();
  });

  test('should handle environment configuration correctly', () => {
    // Test that the client can be created with various configurations
    expect(() => {
      // This should not throw an error
      const testClient = new (require('../src/lib/localAI').localAI.constructor)();
      expect(testClient).toBeDefined();
    }).not.toThrow();
  });

  test('should handle missing environment variables gracefully', () => {
    // Temporarily clear environment variables
    const originalApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const originalBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    delete process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    delete process.env.NEXT_PUBLIC_BASE_URL;
    
    expect(() => {
      const testClient = new (require('../src/lib/localAI').localAI.constructor)();
      expect(testClient).toBeDefined();
    }).not.toThrow();
    
    // Restore environment variables
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = originalApiKey;
    process.env.NEXT_PUBLIC_BASE_URL = originalBaseUrl;
  });
});