
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminSidebar } from '@/components/AdminSidebar';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  
  // This effect will handle the page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const mainContent = document.getElementById('admin-content');
    if (mainContent) {
      mainContent.classList.add('page-transition-enter');
      mainContent.classList.add('page-transition-enter-active');
      
      const timer = setTimeout(() => {
        mainContent.classList.remove('page-transition-enter');
        mainContent.classList.remove('page-transition-enter-active');
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50">
      <AdminSidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="p-6 h-[70px] border-b border-white/20 glass shadow-sm flex items-center">
          <h1 className="text-xl font-semibold gradient-text">
            {location.pathname === '/admin' && 'Dashboard'}
            {location.pathname === '/admin/products' && 'Products'}
            {location.pathname === '/admin/analytics' && 'Analytics'}
            {location.pathname === '/admin/orders' && 'Orders'}
            {location.pathname === '/admin/customers' && 'Customers'}
            {location.pathname === '/admin/settings' && 'Settings'}
          </h1>
        </div>
        
        <div 
          id="admin-content" 
          className={cn(
            "flex-1 overflow-auto p-6"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
