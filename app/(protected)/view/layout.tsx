import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            Viewer Carousel
            {children}
        </>
    )
}

export default Layout;