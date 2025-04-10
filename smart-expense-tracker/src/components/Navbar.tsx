// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'white',
  transition: 'all 0.3s ease',
  padding: '0.3rem 0.8rem',
  borderRadius: '6px',
};

const Navbar = () => {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(to right, #6dd5ed, #2193b0)',
        padding: '1rem 2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* 🌟 Brand Name */}
      <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
        💰 SmartExpense
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '2.5rem', fontSize: '1.1rem', fontWeight: 500 }}>
        {['/', '/add', '/reports'].map((path, idx) => (
          <Link
            key={path}
            to={path}
            style={linkStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            {['Home', 'Add Expense', 'Reports'][idx]}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
