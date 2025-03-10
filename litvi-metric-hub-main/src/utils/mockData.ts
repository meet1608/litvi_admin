
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  inventory: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  image?: string;
};

export type SalesData = {
  date: string;
  revenue: number;
  orders: number;
};

// Mock products
export const products: Product[] = [
  {
    id: '1',
    name: 'Litvi Premium Watch',
    category: 'Watches',
    price: 299.99,
    inventory: 42,
    status: 'active',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-09-15'),
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
  },
  {
    id: '2',
    name: 'Litvi Smart Speaker',
    category: 'Audio',
    price: 199.99,
    inventory: 78,
    status: 'active',
    createdAt: new Date('2023-07-22'),
    updatedAt: new Date('2023-10-01'),
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab'
  },
  {
    id: '3',
    name: 'Litvi Wireless Earbuds',
    category: 'Audio',
    price: 149.99,
    inventory: 120,
    status: 'active',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-09-30'),
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46'
  },
  {
    id: '4',
    name: 'Litvi Fitness Tracker',
    category: 'Wearables',
    price: 129.99,
    inventory: 92,
    status: 'active',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-10-10'),
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288'
  },
  {
    id: '5',
    name: 'Litvi Smartphone Stand',
    category: 'Accessories',
    price: 39.99,
    inventory: 215,
    status: 'active',
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-10-15'),
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90'
  },
  {
    id: '6',
    name: 'Litvi Wireless Charger',
    category: 'Accessories',
    price: 59.99,
    inventory: 180,
    status: 'draft',
    createdAt: new Date('2023-09-20'),
    updatedAt: new Date('2023-10-18'),
    image: 'https://images.unsplash.com/photo-1633514264964-9cae686b84b8'
  },
  {
    id: '7',
    name: 'Litvi Smart Wallet',
    category: 'Accessories',
    price: 89.99,
    inventory: 65,
    status: 'archived',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-08-15'),
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9'
  }
];

// Mock sales data (for charts)
export const monthlySales: SalesData[] = [
  { date: 'Jan', revenue: 42000, orders: 190 },
  { date: 'Feb', revenue: 49000, orders: 222 },
  { date: 'Mar', revenue: 55002, orders: 251 },
  { date: 'Apr', revenue: 47000, orders: 210 },
  { date: 'May', revenue: 58000, orders: 265 },
  { date: 'Jun', revenue: 63000, orders: 293 },
  { date: 'Jul', revenue: 75002, orders: 345 },
  { date: 'Aug', revenue: 82000, orders: 376 },
  { date: 'Sep', revenue: 76000, orders: 340 },
  { date: 'Oct', revenue: 89000, orders: 410 },
  { date: 'Nov', revenue: 95002, orders: 434 },
  { date: 'Dec', revenue: 105002, orders: 482 }
];

// Dashboard metrics
export const dashboardMetrics = {
  totalRevenue: 836000,
  totalOrders: 3818,
  averageOrderValue: 219,
  topSellingProduct: 'Litvi Premium Watch',
  returnRate: 2.4,
  customerSatisfaction: 94.7
};

// Product categories summary
export const categorySummary = [
  { name: 'Watches', count: 5, revenue: 289000 },
  { name: 'Audio', count: 8, revenue: 325002 },
  { name: 'Wearables', count: 3, revenue: 122000 },
  { name: 'Accessories', count: 10, revenue: 100000 }
];
