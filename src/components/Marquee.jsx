import { C } from '../theme.js';
import { data } from '../data.js';

export function Marquee() {
  const items = [...data.stack, ...data.stack];
  return (
    <div className="marquee" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      padding: '20px 0', overflow: 'hidden', position: 'relative', background: 'rgba(13,255,122,.015)' }}>
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 40, paddingRight: 40,
            fontFamily: C.mono, fontSize: 18, fontWeight: 600, color: C.muted, whiteSpace: 'nowrap' }}>
            {t}<span style={{ color: C.mint, fontSize: 12 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
