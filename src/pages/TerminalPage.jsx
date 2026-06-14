import OpenTerminal from '../components/OpenTerminal';

export default function TerminalPage() {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ color: '#fff', fontFamily: 'monospace', marginBottom: 16, fontSize: 18 }}>
        Terminal
      </h1>
      <p style={{ color: '#6b7280', fontFamily: 'monospace', fontSize: 12, marginBottom: 16 }}>
        Remote shell powered by OpenTerminal. Commands run in an isolated sandbox.
      </p>
      <OpenTerminal height={500} />
    </div>
  );
}
