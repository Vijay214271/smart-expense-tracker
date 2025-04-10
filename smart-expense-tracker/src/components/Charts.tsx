import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import { useEffect, useState } from 'react';
import { getAllExpenses } from '../services/api';
import { Expense } from '../types/Expense';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const Charts = () => {
    const [expenses,setExpenses] = useState<Expense[]>([]);
    
    useEffect(()=>{
        getAllExpenses().then((res)=>setExpenses(res.data));
    },[])

    
  const monthlyTotals = expenses.reduce((acc, exp) => {
    const months = new Date(exp.date).toLocaleString('default', { month: 'short', year: 'numeric'})
    acc[months] = (acc[months] || 0) + exp.amount;
    return acc;
  },{} as Record<string, number>);

  const labels = Object.keys(monthlyTotals);
  const data = Object.values(monthlyTotals);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Monthly Spending Overview</h2>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Total Spent (₹)',
              data,
              backgroundColor: '#36A2EB',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Spending Trends' },
          },
        }}
      />
    </div>
  );
};

export default Charts;