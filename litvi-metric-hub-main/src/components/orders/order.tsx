import React,{ useState,useEffect} from 'react'

const Order = () => {
  const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const response = await fetch('https://litvi-client.onrender.com/api/shipping/get-shipping'); // Ensure correct API URL
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error('Error fetching customers:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCustomers();
    }, []);
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
  
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Land Mark</th>
                <th className="border border-gray-300 p-2">City</th>
                <th className="border border-gray-300 p-2">State</th>
                <th className="border border-gray-300 p-2">Zip</th>
                <th className="border border-gray-300 p-2">Order Date</th>


              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border border-gray-300 p-2">{order.fullName || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.email || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.phone || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.address || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.landMark || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.city || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.state || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.zipCode || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{order.createdAt || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  
};

export default Order;
