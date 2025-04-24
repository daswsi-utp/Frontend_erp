import { useState } from 'react';

export default function LandbotFloating() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#00b67a',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '30px',
          cursor: 'pointer',
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            zIndex: 9998,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://landbot.online/v3/H-2071153-8F74NBV6CI8WLPJ9/index.html"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Landbot Chat"
          ></iframe>
        </div>
      )}
    </div>
  );
}
