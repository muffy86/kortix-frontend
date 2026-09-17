import { useState, useRef, useEffect } from 'react';

// Route through a backend proxy — the OpenTerminal API key must NEVER be exposed
// in the frontend bundle. Configure a server-side proxy at VITE_OPEN_TERMINAL_PROXY_URL.
const TERMINAL_PROXY = import.meta.env.VITE_OPEN_TERMINAL_PROXY_URL ?? '/api/terminal';

async function execCommand(command) {
  const res = await fetch(TERMINAL_PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command }),
  });
  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}`;
    try {
      const errBody = await res.json();
      const detail = errBody?.detail || errBody?.message || errBody?.error;
      if (detail) errorMsg += ': ' + detail;
    } catch { /* ignore non-JSON bodies */ }
    throw new Error(errorMsg);
  }
  return res.json();
}

const LINE_COLORS = {
  info: '#6b7280',
  cmd: '#86efac',
  out: '#d1fae5',
  err: '#f87171',
};

export default function OpenTerminal({ height = 360 }) {
  const [lines, setLines] = useState([{ type: 'info', text: 'OpenTerminal ready. Type a command.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  async function submit(e) {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd || busy) return;
    setInput('');
    setHistIdx(-1);
    setCmdHistory((h) => [cmd, ...h].slice(0, 100));
    setBusy(true);
    setLines((l) => [...l, { type: 'cmd', text: `$ ${cmd}` }].slice(-500));

    try {
      const { stdout, stderr, exit_code } = await execCommand(cmd);
      const newLines = [];
      if (stdout) newLines.push({ type: 'out', text: stdout });
      if (stderr) newLines.push({ type: 'err', text: stderr });
      if (exit_code !== 0 && exit_code !== undefined) newLines.push({ type: 'err', text: `exit ${exit_code}` });
      if (newLines.length > 0) {
        setLines((l) => [...l, ...newLines].slice(-500));
      }
    } catch (err) {
      setLines((l) => [...l, { type: 'err', text: String(err) }].slice(-500));
    } finally {
      setBusy(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next]);
    }
  }

  return (
    <div
      style={{
        background: '#0a0a0a',
        borderRadius: 8,
        padding: 16,
        fontFamily: 'monospace',
        height,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #166534',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 11, color: '#4ade80', marginBottom: 8, fontWeight: 'bold', letterSpacing: 1 }}>
        ⚡ OPEN TERMINAL
      </div>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 8 }}>
        {lines.map((l, i) => (
          <pre
            key={i}
            style={{ margin: '1px 0', color: LINE_COLORS[l.type], whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 12 }}
          >
            {l.text}
          </pre>
        ))}
        {busy && <div style={{ color: '#4ade80', opacity: 0.5, fontSize: 12 }}>▋</div>}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={submit} style={{ display: 'flex', gap: 6, borderTop: '1px solid #166534', paddingTop: 8 }}>
        <span style={{ color: '#4ade80', fontSize: 13 }}>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={busy}
          autoFocus
          style={{ flex: 1, background: 'transparent', border: 'none', color: '#86efac', outline: 'none', fontSize: 13, fontFamily: 'monospace' }}
          placeholder="command..."
        />
        <button
          type="submit"
          disabled={busy}
          style={{ background: '#166534', color: '#4ade80', border: 'none', borderRadius: 4, padding: '3px 10px', cursor: 'pointer', fontSize: 11, opacity: busy ? 0.5 : 1 }}
        >
          {busy ? '...' : 'RUN'}
        </button>
      </form>
    </div>
  );
}
