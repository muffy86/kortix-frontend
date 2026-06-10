/**
 * NotteBrowser — AI-driven browser automation for kortix-frontend.
 */

const NOTTE_API_BASE = 'https://api.notte.cc';

export interface NotteBrowseOptions {
  task: string;
  url?: string;
  maxSteps?: number;
}

export class NotteBrowser {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private get headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async browse(options: NotteBrowseOptions): Promise<string> {
    const sessionRes = await fetch(`${NOTTE_API_BASE}/v1/sessions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({}),
    });
    if (!sessionRes.ok) throw new Error(`Session failed: ${await sessionRes.text()}`);
    const { id: sessionId } = await sessionRes.json();

    try {
      const agentRes = await fetch(`${NOTTE_API_BASE}/v1/agents/run`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          session_id: sessionId,
          task: options.task,
          url: options.url,
          max_steps: options.maxSteps ?? 20,
        }),
      });
      if (!agentRes.ok) throw new Error(`Agent failed: ${await agentRes.text()}`);
      const data = await agentRes.json();
      return data.answer ?? JSON.stringify(data);
    } finally {
      await fetch(`${NOTTE_API_BASE}/v1/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: this.headers,
      });
    }
  }
}

export function createNotteBrowser(): NotteBrowser {
  const key = (import.meta as any).env?.VITE_NOTTE_API_KEY ?? '';
  return new NotteBrowser(key);
}
