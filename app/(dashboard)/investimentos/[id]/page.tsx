'use client'
import { useEffect, useState } from 'react';
import { Investment } from '@/types/investment';

interface PageProps {
  params: Promise<{ id: string }>
}

const InvestmentDetail = async ({ params }: PageProps) => {
    const { id } = await params;
    const [investment, setInvestment] = useState<Investment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Fetch investment details based on the ID
            const fetchInvestment = async () => {
                try {
                    const response = await fetch(`/api/investimentos/${id}`);
                    const data = await response.json();
                    setInvestment(data);
                } catch (error) {
                    console.error('Error fetching investment:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchInvestment();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!investment) {
        return <div>Investment not found.</div>;
    }

    return (
        <div>
            <h1>Investment Details</h1>
            <h2>{investment.name}</h2>
            <p>{investment.type}</p>
            <p>Amount: {investment.initial_amount}</p>
            <p>Date: {investment.start_date}</p>
            <a href={`/investimentos/${id}/editar`}>Edit Investment</a>
        </div>
    );
};

export default InvestmentDetail;