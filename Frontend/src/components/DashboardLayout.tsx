import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  MessageSquare,
  GraduationCap,
  Shield,
  Rocket,
  LogOut,
  Menu,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
  { name: 'Swap', href: '/dashboard/swap', icon: ArrowLeftRight },
  { name: 'Staking', href: '/dashboard/staking', icon: TrendingUp },
  { name: 'Market', href: '/dashboard/market', icon: TrendingUp },
  { name: 'AI Assistant', href: '/dashboard/ai', icon: MessageSquare },
  { name: 'Presale', href: '/dashboard/presale', icon: Rocket },
  { name: 'Learn', href: '/dashboard/learn', icon: GraduationCap },
  { name: 'Security', href: '/dashboard/security', icon: Shield },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">Truce</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-sidebar-accent"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant="ghost"
                  style={{
                    backgroundColor: isActive ? '#14b8a6' : undefined,
                    color: isActive ? 'rgb(15 23 42)' : undefined,
                    borderColor: isActive ? '#14b8a6' : 'transparent',
                    borderWidth: '1px'
                  }}
                  className={cn(
                    'w-full justify-start h-11 transition-all duration-200',
                    !isActive && 'hover:border-teal-600 hover:text-white',
                    !sidebarOpen && 'justify-center px-2'
                  )}
                >
                  <item.icon 
                    className={cn(
                      'w-5 h-5 transition-colors duration-200',
                      sidebarOpen && 'mr-3'
                    )}
                    style={{
                      color: isActive ? 'rgb(15 23 42)' : undefined
                    }}
                  />
                  {sidebarOpen && <span>{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start h-11 hover:bg-destructive/10 hover:text-destructive transition-all duration-200',
              !sidebarOpen && 'justify-center px-2'
            )}
            onClick={signOut}
          >
            <LogOut className={cn('w-5 h-5', sidebarOpen && 'mr-3')} />
            {sidebarOpen && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}