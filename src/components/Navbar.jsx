import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1280px',
            zIndex: 100,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="gradient-text">Kortix</span>
            </Link>

            <ul style={{ display: 'flex', gap: '2rem' }}>
                <li><Link to="/" style={{ fontWeight: '500' }}>Home</Link></li>
                <li><Link to="/about" style={{ fontWeight: '500', opacity: 0.8 }}>About</Link></li>
                <li><a href="https://github.com/muffy86/kortix-frontend" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '500', opacity: 0.8 }}>GitHub</a></li>
            </ul>

            <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                Get Started
            </button>
        </nav>
    );
};

export default Navbar;
