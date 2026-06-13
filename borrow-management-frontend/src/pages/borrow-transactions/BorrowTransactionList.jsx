// src/pages/borrow-transactions/BorrowTransactionList.jsx
import { useState, useEffect } from "react";
import { borrowTransactionApi } from "../../api/borrowTransactionApi";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import BorrowTransactionTable from "../../components/tables/BorrowTransactionTable";

export default function BorrowTransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    borrowTransactionApi.getTransactions()
      .then((res) => {
        setTransactions(res?.data || res || []);
      })
      .catch(err => console.error("Error reading transaction logs:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredTransactions = transactions.filter((tx) =>
    tx.borrower?.name?.toLowerCase().includes(search.toLowerCase()) ||
    tx.equipment?.equipmentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Equipment Assignments" 
        description="Monitor active and completed operational inventory loans" 
        actionLabel="Log New Assignment" 
        actionLink="/borrow-transactions/new" 
      />

      <div className="mb-4">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Filter logs by member name or equipment item description..." 
        />
      </div>

      {loading ? (
        <Loader />
      ) : filteredTransactions.length === 0 ? (
        <EmptyState message="No matching allocation history traces logged inside database." />
      ) : (
        <BorrowTransactionTable data={filteredTransactions} />
      )}
    </div>
  );
}