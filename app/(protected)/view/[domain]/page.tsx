import React from 'react';

interface DomainPageProps {
    params: {
        domain: string;
    }
}

const DomainPage = ({params:{domain}}: DomainPageProps) => {
    return (
        <div>
            Domain Page
            {domain}
        </div>
    )
}

export default DomainPage;