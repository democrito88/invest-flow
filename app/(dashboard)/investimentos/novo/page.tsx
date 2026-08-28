'use client'
import React, { useState } from 'react';

interface FormData {
    name?: string;
    amount?: number;
    date?: string;
    description?: string;
}

const NovoInvestimento = () => {
    const [investmentData, setInvestmentData] = useState<FormData>({
        name: '',
        amount: 0,
        date: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInvestmentData({
            ...investmentData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await fetch("/api/investments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(investmentData),
        });
    }

    return (
        <div>
            <h1>Criar Novo Investimento</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={investmentData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Valor:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={investmentData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Data:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={investmentData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={investmentData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Criar Investimento</button>
            </form>
        </div>
    );
};

export default NovoInvestimento;