import { useState, useCallback } from 'react';

export interface UseNotteState {
  loading: boolean;
  answer: string | null;
  error: string | null;
}

export function useNotte() {
  const [state, setState] = useState<UseNotteState>({
    loading: false,
    answer: null,
    error: null,
  });

  const browse = useCallback(async (task: string, url?: string) => {
    setState({ loading: true, answer: null, error: null });
    try {
      const { createNotteBrowser } = await import('../services/notte');
      const notte = createNotteBrowser();
      const answer = await notte.browse({ task, url });
      setState({ loading: false, answer, error: null });
      return answer;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setState({ loading: false, answer: null, error: msg });
      throw err;
    }
  }, []);

  return { ...state, browse };
}
