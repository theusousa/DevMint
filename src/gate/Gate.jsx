import { useState } from 'react';
import { C } from '../theme.js';
import { Logo3D } from './Logo3D.jsx';
import './gate.css';

export function Gate() {
  const [status, setStatus] = useState('locked'); // locked | unlocking | flash | done
  const unlock = () => {
    if (status !== 'locked') return;
    setStatus('unlocking');
    setTimeout(() => setStatus('flash'), 820);   // warp + shockwave + explosão → impacto branco
    setTimeout(() => setStatus('done'), 1320);   // flash some, revela o site
  };
  if (status === 'done') return null;
  const unlocking = status === 'unlocking';
  const flashing = status === 'flash';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, overflow: 'hidden',
      background: flashing ? 'transparent' : '#050505', pointerEvents: flashing ? 'none' : 'auto' }}>

      {!flashing && <Logo3D unlocking={unlocking} />}

      {!flashing && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 48, gap: 18, pointerEvents: 'none',
          opacity: unlocking ? 0 : 1, transition: 'opacity .3s ease' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 48, fontWeight: 800, letterSpacing: -1.5,
            color: '#fff', lineHeight: 1, textShadow: '0 0 40px rgba(13,255,122,0.3)' }}>
            <span style={{ fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>Dev</span>Mint
          </div>

          <button type="button" onClick={unlock} disabled={unlocking} style={{
            pointerEvents: 'auto', fontFamily: C.mono, fontWeight: 700, fontSize: 15, letterSpacing: 1,
            padding: '14px 30px', background: unlocking ? 'transparent' : C.mint, color: unlocking ? C.mint : '#000',
            border: `1px solid ${C.mint}`, borderRadius: 12, cursor: unlocking ? 'default' : 'pointer',
            boxShadow: unlocking ? 'none' : '0 0 30px rgba(13,255,122,.35)', transition: 'transform .15s' }}
            onMouseEnter={(e) => { if (!unlocking) e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            {unlocking ? '» entrando...' : '» CONHEÇA A DEVMINT'}
          </button>

          <div style={{ fontFamily: C.mono, fontSize: 11, color: 'rgba(13,255,122,0.45)',
            letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            arraste para girar · scroll para zoom
          </div>
        </div>
      )}

      {(unlocking || flashing) && (
        <div className={flashing ? 'gate-flash-out' : 'gate-flash-in'}
          style={{ position: 'absolute', inset: 0, background: '#fff', pointerEvents: 'none' }} />
      )}
    </div>
  );
}
