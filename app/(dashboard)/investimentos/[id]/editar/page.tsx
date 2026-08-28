import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditarInvestimento = () => {
    const router = useRouter();
    const { id } = router.query;
    const [investimento, setInvestimento] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Fetch the investment details based on the ID
            const fetchInvestimento = async () => {
                const response = await fetch(`/api/investimentos/${id}`);
                const data = await response.json();
                setInvestimento(data);
                setLoading(false);
            };

            fetchInvestimento();
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedInvestimento = Object.fromEntries(formData);

        // Update the investment details
        await fetch(`/api/investimentos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInvestimento),
        });

        router.push('/(dashboard)/investimentos');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Editar Investimento</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" defaultValue={investimento.nome} required />
                </div>
                <div>
                    <label htmlFor="valor">Valor:</label>
                    <input type="number" id="valor" name="valor" defaultValue={investimento.valor} required />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditarInvestimento;