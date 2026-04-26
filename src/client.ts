import { CreationApiResponse } from './types.js';

const CREATION_BASE_URL = 'https://api-creation.codemao.cn';

export class HttpClient {
  private baseUrl: string;
  private authValue: string;

  constructor(authValue: string, baseUrl?: string) {
    this.authValue = authValue;
    this.baseUrl = baseUrl ?? CREATION_BASE_URL;
  }

  private headers(): Record<string, string> {
    return {
      cookie: `authorization=${this.authValue}`,
      'Content-Type': 'application/json',
    };
  }

  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method,
      headers: this.headers(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const json = (await res.json()) as CreationApiResponse<T>;
    if (!json.success) {
      throw new Error(json.msg || `API error: code ${json.code}`);
    }
    return json.data as T;
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}
