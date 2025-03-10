
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  BarChart, 
  Settings, 
  Users, 
  ShoppingCart, 
  MessageSquare, 
  ChevronLeft,
  LogOut
} from 'lucide-react';

type SidebarLink = {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

const mainLinks: SidebarLink[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Manage Products', href: '/admin/products', icon: Package},
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart},
  { name: 'Customers', href: '/admin/customers', icon: Users },
];



export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(window.innerWidth < 700);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('litvi-admin-auth');
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <aside 
      className={cn(
        "h-screen relative flex flex-col glass border-r border-white/20 sidebar-transition",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex items-center p-6 h-[70px]">
        {!collapsed && (
          <h1 className="text-xl font-semibold gradient-text">Litvi Admin</h1>
        )}
        {collapsed && (
          <span className="text-xl font-bold mx-auto gradient-text">L</span>
        )}
      </div>

      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-16 bg-white rounded-full p-1 shadow-md border border-white/30 text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", collapsed ? "rotate-180" : "")} />
      </button>

      <nav className="mt-6 flex flex-col flex-1 px-4">
        <div className="space-y-1">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                "hover:bg-blue-50/80 group",
                location.pathname === link.href ? "bg-blue-50/80 text-blue-700" : "text-slate-700"
              )}
            >
              <link.icon className={cn(
                "w-5 h-5 transition-colors duration-300",
                location.pathname === link.href ? "text-blue-700" : "text-slate-500 group-hover:text-blue-600"
              )} />
              {!collapsed && <span>{link.name}</span>}
              {!collapsed && link.badge && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-auto mb-8 space-y-1">
         

          <button 
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mt-6",
              "text-slate-700 hover:bg-red-50/80 hover:text-red-700 group transition-all duration-300"
            )}
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-colors duration-300" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}
