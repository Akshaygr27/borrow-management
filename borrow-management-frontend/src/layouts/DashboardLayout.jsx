import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ConfirmModal from "../components/common/ConfirmModal";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Intercept the click event to show the prompt instead of logging out instantly
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  // Run the actual authentication destruction when confirmed
  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Equipment", path: "/equipment" },
    { label: "Borrowers", path: "/borrowers" },
    { label: "Borrow Transactions", path: "/borrow-transactions" },
    { label: "Return Transactions", path: "/return-transactions" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-600">Lendr</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 font-medium">Hello, {user?.name || "Admin"}</span>
            <button 
              onClick={handleLogoutClick} 
              className="text-xs font-semibold px-3 py-1.5 border border-red-200 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:block p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Interceptor */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirm Session Log Out"
        message="Are you sure you want to log out of your current session? You will need to sign back in to access the system components."
      />
    </div>
  );
}