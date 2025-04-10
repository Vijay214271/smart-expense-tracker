// src/components/PageWrapper.tsx
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e2e8f0, #f8fafc)', // cool gradient
        paddingTop: '6rem', // to account for sticky nav
        paddingBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <main
        style={{
          width: '100%',
          maxWidth: '1100px',
          padding: '1rem',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
