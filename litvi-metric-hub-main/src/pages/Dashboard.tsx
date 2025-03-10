
import { useEffect } from 'react';
import { BarChart3, ShoppingCart, Users, ArrowUpRight, Package, Percent, Award, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { dashboardMetrics, monthlySales, categorySummary, products } from '@/utils/mockData';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Litvi Admin | Dashboard';
  }, []);
  
  
 

  return (
    <div className="space-y-6">
      
      
     
    </div>
  );
};

export default Dashboard;
