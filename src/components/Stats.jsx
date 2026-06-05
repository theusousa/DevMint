import { C } from '../theme.js';
import { data } from '../data.js';
import { Counter, Rise } from './ui.jsx';

export function Stats() {
  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 18 }}>
        {data.stats.map((s, i) => (
          <Rise key={s.l} delay={i * 80} style={{ height: '100%' }}>
            <div className="glow-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 20px', textAlign: 'center', height: '100%' }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: C.mint, lineHeight: 1, fontFamily: C.mono }}><Counter value={s.n} /></div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 10 }}>{s.l}</div>
            </div>
          </Rise>
        ))}
      </div>
    </div>
  );
}
