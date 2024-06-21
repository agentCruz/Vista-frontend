import React from "react";
import Button from "./Button";
import { TransactionType } from "../functions/types";

export const TransactionDetails = (props) => {
  const transaction = props.item;

  const getFirstLetters = (str) => {
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word[0]) // Map each word to its first letter
      .join(""); // Join the first letters into a single string
  };

  const getTimeIn12HourFormat = (now) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = new Date(now).toLocaleTimeString("en-US", options);
    return timeString;
  };

  return (
    <section>
      <div className="bg-[#F8F9FC] flex items-center gap-4 justify-center py-4">
        <div className="text-[#7856FF] font-[800] text-lg bg-[#8161FF] bg-opacity-10 p-2 text-center h-fit rounded-full">
          {getFirstLetters(transaction.receiverName)}
        </div>
        <h1 className="font-[600] text-[#192038]">
          {transaction.receiverName}
        </h1>
        <p
          className={`text-[${
            transaction.type === TransactionType.credit ? "#008000" : "#8F9BB3"
          }] font-extralight text-[11px]`}
        >
          {transaction.type === TransactionType.credit ? "Credit" : "Debit"}
        </p>
      </div>
      {/* Money Spent */}
      <div className="mt-4 text-center bg-[#F8F9FC] py-[27px] rounded-[12px]">
        <h1 className={`text-[40px] font-semibold text-[${transaction.type === TransactionType.credit ? '#008000' : '#E52B36'}] opacity-90`}>
        {transaction.type === TransactionType.credit
              ? `+${transaction.amount}`
              : `-${transaction.amount}`}
        </h1>
        <p className="text-[#8A81B1E5] opacity-90 font-semibold">
          Transfer Complete
        </p>
      </div>
      {/* Items details */}
      <div className="mt-4 text-center bg-[#F8F9FC] p-[30px] rounded-[12px] flex flex-col gap-5">
        {/* Item 1 */}
        <div className="flex items-center justify-between">
          <h1 className="text-[#B5A3FF] text-[13px] font-[500] ">SendID</h1>
          <p className="text-[#10111180] font-[500]">{transaction.id}</p>
        </div>
        {/* Item 2 */}
        <div className="flex items-center justify-between">
          <h1 className="text-[#B5A3FF] text-[13px] font-[500] ">Date</h1>
          <p className="text-[#10111180] font-[500]">{getTimeIn12HourFormat(transaction.timestamp)}</p>
        </div>
        {/* Item 3 */}
        <div className="flex items-center justify-between">
          <h1 className="text-[#B5A3FF] text-[13px] font-[500] ">Currency</h1>
          <p className="text-[#10111180] font-[500]">NGN - Nigerian Naira</p>
        </div>
        {/* Item 4 */}
        <div className="flex items-center justify-between">
          <h1 className="text-[#B5A3FF] text-[13px] font-[500] ">Fee</h1>
          <p className="text-[#10111180] font-[500]">₦ 0.00</p>
        </div>
        {/* Item 4 */}
        <div className="flex items-center justify-between">
          <h1 className="text-[#B5A3FF] text-[13px] font-[500] ">Total</h1>
          <p className="text-[#10111180] font-[500]">₦ {transaction.amount}</p>
        </div>
        {/* Item 4 */}
        <div className="flex items-center justify-between">
          <h1 className="text-[#B5A3FF] text-[13px] font-[500] ">
            Description
          </h1>
          <p className="text-[#10111180] font-[500]">{transaction.note}</p>
        </div>
      </div>
      <div className="mt-3">
        <Button text="Done" />
      </div>
    </section>
  );
};
