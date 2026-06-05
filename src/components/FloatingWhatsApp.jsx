import { C } from '../theme.js';
import { data } from '../data.js';
import { Icon } from './Icon.jsx';

export function FloatingWhatsApp() {
  return (
    <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
      style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60, width: 58, height: 58, borderRadius: '50%',
        background: '#25D366', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37,211,102,.4)', transition: 'transform .15s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
      <Icon name="whatsapp" size={30} color="#fff" />
    </a>
  );
}
