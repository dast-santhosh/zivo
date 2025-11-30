import React from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  Calendar, 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  Menu,
  X
} from 'lucide-react';
import { AppRoute } from '../types';

interface LayoutProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  children: React.ReactNode;
}

const NavItem = ({ 
  route, 
  label, 
  icon: Icon, 
  isActive, 
  onClick 
}: { 
  route: AppRoute; 
  label: string; 
  icon: React.ElementType; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-primary-600 text-white shadow-md' 
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ currentRoute, onNavigate, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { route: AppRoute.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { route: AppRoute.TUTOR, label: 'AI Tutor', icon: BrainCircuit },
    { route: AppRoute.NOTES, label: 'Notes Generator', icon: BookOpen },
    { route: AppRoute.PLANNER, label: 'Study Planner', icon: Calendar },
    { route: AppRoute.EXAM, label: 'Exam Engine', icon: GraduationCap },
    { route: AppRoute.COMMUNITY, label: 'Community', icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white z-20 border-b border-slate-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <span className="font-bold text-xl text-slate-800">ZIVO</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <div>
              <h1 className="font-bold text-2xl text-slate-900 tracking-tight">ZIVO</h1>
              <p className="text-xs text-slate-500 font-medium">Student Companion</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 py-4">
            {navItems.map((item) => (
              <NavItem
                key={item.route}
                route={item.route}
                label={item.label}
                icon={item.icon}
                isActive={currentRoute === item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setIsMobileMenuOpen(false);
                }}
              />
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl border border-primary-200">
              <h4 className="font-semibold text-primary-900 text-sm">Pro Plan</h4>
              <p className="text-xs text-primary-700 mt-1 mb-3">Get unlimited AI requests</p>
              <button className="w-full bg-white text-primary-600 text-xs font-bold py-2 rounded-lg shadow-sm border border-primary-100 hover:bg-primary-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:h-screen lg:overflow-y-auto pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};