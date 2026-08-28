import InvestmentList from '@/components/investments/InvestmentList';
import React from 'react';

const InvestimentosPage = () => {
    
    return (
        <div>
            <h1>Investimentos</h1>
            <p>Welcome to the Investimentos section. Here you can manage your investments.</p>
            <InvestmentList investments={}/>
        </div>
    );
};

export default InvestimentosPage;