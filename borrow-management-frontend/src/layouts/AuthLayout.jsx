import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Lendr</h2>
        <p className="text-center text-md mt-2">Equipment Borrowing Portal</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}