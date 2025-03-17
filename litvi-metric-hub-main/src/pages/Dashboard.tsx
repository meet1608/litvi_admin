import React, { useEffect, useState } from 'react';
import { Doughnut,PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Dashboard = () => {
  const [customerData, setCustomerData] = useState({ week: 0, month: 0, year: 0 });
  const [orderData, setOrderData] = useState({ week: 0, month: 0, year: 0, day:0, total:0 });

  useEffect(() => {
    document.title = 'Litvi Admin | Dashboard';

    fetch('https://litvi-client.onrender.com/auth/register')
      .then(response => response.json())
      .then(data => {
        const getCounts = (filterFn) => data.filter(filterFn).length;
        setCustomerData({
          week: getCounts(customer => Date.parse(customer.createdAt) >= Date.now() - 7 * 24 * 60 * 60 * 1000),
          month: getCounts(customer => Date.parse(customer.createdAt) >= Date.now() - 30 * 24 * 60 * 60 * 1000),
          year: getCounts(customer => Date.parse(customer.createdAt) >= Date.now() - 365 * 24 * 60 * 60 * 1000),
        });
      })
      .catch(error => console.error('Error fetching customers:', error));

    fetch('https://litvi-client.onrender.com/api/shipping/get-shipping')
      .then(response => response.json())
      .then(data => {
        const getCounts = (filterFn) => data.filter(filterFn).length;
        setOrderData({
          day: getCounts(order => new Date(order.createdAt) >= new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
          week: getCounts(order => new Date(order.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
          month: getCounts(order => new Date(order.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
          year: getCounts(order => new Date(order.createdAt) >= new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)),
          total: getCounts(() => true) // Counts all customers
        });
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="max-w-[350px] w-full mx-auto">
          <h2 className="text-center">Customers Joined</h2>
          <Doughnut
            key={JSON.stringify(customerData)}
            data={{
              labels: ['Week', 'Month', 'Year'],
              datasets: [{
                label: 'Customers',
                data: [customerData.week, customerData.month, customerData.year],
                backgroundColor: ['#36A2EB', '#4BC0C0', '#FFCE56'],
                borderColor: ['#36A2EB', '#4BC0C0', '#FFCE56'],
                borderWidth: 1
              }]
            }}
          />
        </div>


<div className="max-w-[350px] w-full mx-auto">
  <h2 className="text-center">Orders Received</h2>
  <PolarArea
    data={{
      labels: ['Day', 'Week', 'Month', 'Year', 'Total'],
      datasets: [{
        label: 'Orders',
        data: [orderData.day,orderData.week, orderData.month, orderData.year, orderData.total],
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#9966FF'],
        borderColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#9966FF'],
        borderWidth: 1
      }]
    }}
  />
</div>

      </div>
    </div>
  );
};

export default Dashboard;
