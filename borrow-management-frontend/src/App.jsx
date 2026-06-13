import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import EquipmentList from "./pages/equipment/EquipmentList";
import CreateEquipment from "./pages/equipment/CreateEquipment";

import BorrowerList from "./pages/borrowers/BorrowerList";
import CreateBorrower from "./pages/borrowers/CreateBorrower";
import EditBorrower from "./pages/borrowers/EditBorrower";
import BorrowerDetails from "./pages/borrowers/BorrowerDetails";

import BorrowTransactionList from "./pages/borrow-transactions/BorrowTransactionList";
import CreateBorrowTransaction from "./pages/borrow-transactions/CreateBorrowTransaction";

import ReturnTransactionList from "./pages/return-transactions/ReturnTransactionList";
import CreateReturnTransaction from "./pages/return-transactions/CreateReturnTransaction";
import EditEquipment from "./pages/equipment/EditEquipment";
import EquipmentDetails from "./pages/equipment/EquipmentDetails";

// Unimplemented fallbacks to guarantee path completeness 
const FallbackView = ({ title }) => <div className="p-4 bg-white rounded-xl border">{title} placeholder subsystem UI.</div>;

export default function App() {
  return (
    <Routes>
      {/* Auth Unprotected Routes Entry Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Dash Engine Layout Area Container */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Equipment Path Context Routing */}
        <Route path="/equipment" element={<EquipmentList />} />
        <Route path="/equipment/new" element={<CreateEquipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />
        <Route path="/equipment/edit/:id" element={<EditEquipment/>} />
        
        {/* Borrowers Context Routing Map */}
        <Route path="/borrowers" element={<BorrowerList title="Borrower Management Workspace List" />} />
        <Route path="/borrowers/new" element={<CreateBorrower title="Create Borrower Portal" />} />
        <Route path="/borrowers/:id" element={<BorrowerDetails title="Borrower Detailed Analysis View" />} />
        <Route path="/borrowers/edit/:id" element={<EditBorrower title="Edit Borrower Information Interface" />} />

        {/* Transactions Layer Interfaces */}
        <Route path="/borrow-transactions" element={<BorrowTransactionList />} />
        <Route path="/borrow-transactions/new" element={<CreateBorrowTransaction />} />
        
        <Route path="/return-transactions" element={<ReturnTransactionList />} />
        <Route path="/return-transactions/new" element={<CreateReturnTransaction />} />
      </Route>

      {/* Route Fallbacks */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}