import { Drawer } from "antd";
import React, { useState } from "react";
import { TransactionDetails } from "./TransactionDetails";
import { IoClose } from "react-icons/io5";
import { TransactionType } from "../functions/types";

export default function Transaction(props) {
  const [openDrawer, setOpenDrawer] = useState(false);

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

  const onClose = () => {
    setOpenDrawer(false);
    console.log(openDrawer);
  };
  const open = () => {
    setOpenDrawer(true);
  };

  return (
    <div
      onClick={props.onClick}
      className="flex items-center justify-between py-4 mt-3 bg-[#F7F9FCE5] bg-opacity-90 px-6 rounded-lg"
    >
      <section className="flex item-center gap-4">
        <div className="text-[#7856FF] bg-[#8161FF] bg-opacity-10 p-2 w-[40px] text-center h-fit rounded-full">
          {getFirstLetters(transaction.receiverName)}
        </div>
        <div className="flex flex-col ">
          <h1 className="text-[#192038] font-[600] text-[14px]">
            {transaction.receiverName}
          </h1>
          <p className={`text-[${transaction.type === TransactionType.credit ? '#008000' : '#8F9BB3'}] font-extralight text-[11px]`}>
            {transaction.type === TransactionType.credit ? "Credit" : "Debit"}
          </p>
        </div>
      </section>
      {/* money and date */}
      <div className="flex item-center flex-col gap-1">
        <div className="flex items center gap-3">
          <span className="text-[6px] manrope border-2 border-[#E7ECFA] p-[6px] rounded-lg">
            NGN
          </span>
          <p className={`text-[13px] text-[${transaction.type === TransactionType.credit ? '#008000' : '#E52B36'}] font-bold`}>
            {transaction.type === TransactionType.credit
              ? `+${transaction.amount}`
              : `-${transaction.amount}`}
          </p>
        </div>
        <p className="text-[#666E7F] text-[10px] text-end">
          {getTimeIn12HourFormat(transaction.timestamp)}
        </p>
      </div>
      <Drawer
        height="80vh"
        title={
          <div className="text-center">
            <h3>Transaction details</h3>
          </div>
        }
        maskClosable
        placement="bottom"
        width="600px"
        closable={true} // Set closable to true to enable close button
        onClose={onClose}
        open={openDrawer}
        key="5"
        extra={
          <div
            className="text-xl text-[#4860B9] cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        }
      >
        <TransactionDetails />
      </Drawer>
    </div>
  );
}
