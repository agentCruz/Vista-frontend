import React from "react";
import Transaction from "../Transaction";
import { useAuthState } from "../../stores/auth.store";

export const AllTransactions = (props) => {
  const { transactions } = useAuthState();

  return (
    <div>
      {transactions.map((items) => (
        <Transaction
          onClick={() => props.setDrawer(items)}
          item={items}
        />
      ))}
    </div>
  );
};
