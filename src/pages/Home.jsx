const Home = () => {
    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative' }}>
            {/* Background Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '20%',
                width: '400px',
                height: '400px',
                background: 'var(--primary)',
                filter: 'blur(150px)',
                opacity: 0.2,
                borderRadius: '50%',
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                top: '30%',
                right: '20%',
                width: '300px',
                height: '300px',
                background: 'var(--secondary)',
                filter: 'blur(120px)',
                opacity: 0.2,
                borderRadius: '50%',
                zIndex: -1
            }} />

            <main className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div className="animate-float">
                    <span style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                    }}>
                        v1.0.0 Now Available
                    </span>
                </div>

                <h1 style={{ fontSize: '4rem', fontWeight: '800', margin: '1.5rem 0', lineHeight: 1.1 }}>
                    Build Faster with <br />
                    <span className="gradient-text">Kortix Frontend</span>
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    A premium, high-performance React template styled with vanilla CSS.
                    Experience the future of web development today.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-primary">Start Building</button>
                    <button className="btn btn-outline"
                        onClick={() => window.open('https://github.com/muffy86/kortix-frontend', '_blank')}
                    >
                        View on GitHub
                    </button>
                </div>

                {/* Feature Grid Demo */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '6rem',
                    textAlign: 'left'
                }}>
                    {[
                        { title: 'Lightning Fast', desc: 'Powered by Vite for instant server start and HMR.' },
                        { title: 'Modern Stack', desc: 'React 19 + React Router DOM 7 ready.' },
                        { title: 'Premium Design', desc: 'Glassmorphism and vibrant gradients out of the box.' }
                    ].map((feature, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
