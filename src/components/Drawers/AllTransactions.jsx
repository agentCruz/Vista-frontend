import React from "react";
import { recentTransactions } from "../../dataHelpers/MainDataHelper";
import Transaction from "../Transaction";

export const AllTransactions = (props) => {
  return (
    <div>
      {recentTransactions.map((items) => (
        <Transaction
          onClick={props.setDrawer}
          name={items.name}
          category={items.category}
          amountSpent={items.amountSpent}
          time={items.time}
        />
      ))}
    </div>
  );
};
