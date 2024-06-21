import React, { useEffect, useState } from "react";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoArrowDownCircleOutline,
  IoClose,
} from "react-icons/io5";
import Transaction from "../components/Transaction";
import { recentTransactions } from "../dataHelpers/MainDataHelper";
import { Drawer } from "antd";
import { Transfer } from "../components/Drawers/Transfer";
import { Request } from "../components/Drawers/Request";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import NFCReader from "../components/NFCManager";
import { Notification } from "../components/Drawers/Notification";
import { AllTransactions } from "../components/Drawers/AllTransactions";
import { TransactionDetails } from "../components/TransactionDetails";
import { Account } from "../components/Drawers/Account";
import VerticalScrollList from "../components/OverflowDrawer";
import { Tips } from "../components/Tips";
import { useAuthState } from "../stores/auth.store";
import useAuth from "../hooks/auth.hook";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const getObjects = recentTransactions.slice(-2);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [drawerName, setDrawerName] = useState();
  const [drawer, setDrawer] = useState(<Transfer />);

  const { user, balance, transactions } = useAuthState();
  const { signOut } = useAuth();

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchUserData()
  //     .then((userData) => {
  //       setUsername(userData.username);
  //       console.log("Username:", username);
  //       // Handle username as needed
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch user data:", error.message);
  //       // Handle error
  //     });
  // });

  const onClose = () => {
    setOpen(false);
  };

  const openTransfer = () => {
    setOpen(true);
    setDrawer(<Transfer close={onClose} />);
    setDrawerName("Transfer");
  };
  const openRequest = () => {
    setOpen(true);
    setDrawer(<Request />);
    setDrawerName("Request");
  };
  const openNotifications = () => {
    setOpen(true);
    setDrawer(<Notification />);
    setDrawerName("Notifications");
  };

  const transactionDetails = (item) => {
    setOpen(true);
    setDrawerName("Transaction details");
    setDrawer(<TransactionDetails item={item} />);
  };

  const openHistory = () => {
    setOpen(true);
    setDrawerName("Recent Transactions");
    setDrawer(<AllTransactions setDrawer={(item) => transactionDetails(item)} />);
  };
  
  const tipsOptions = [
    {
      id: 1,
      background: "#D8FF6F",
      title: "Supercharge your business",
      subtext: "Accept payments with our NFC-enabled infrastructure.",
    },
    {
      id: 2,
      background: "#D7E5FF",
      title: "Pay instantly with Quick Debit",
      subtext: "Enable Quick Debit for an even faster payment session.",
    },
    {
      id: 3,
      background: "#F1DC91",
      title: "Lightning fast finance ",
      subtext: "Learn how NFC technology is faster and much safer.",
    },
  ];
  return (
    <section className="p-6 mx-auto max-w-[600px] shadow-sm bg-[#FBFAFF]">
      {/* Header section */}
      <NFCReader />
      <div className="flex items-center justify-between text-[#2E3A59]">
        <div
          onClick={() => {
            setDrawer(<Account />);
            setOpen(true);
          }}
          className="flex items-center gap-2 border rounded-[18px] p-4 "
        >
          <IoPersonOutline />
          <p className="text-[#2E3A59] font-medium text-sm">{username}</p>
        </div>
        <div className="flex items-center gap-4 text-xl">
          <div
            className=" cursor-pointer"
            onClick={() => {
              signOut().then(navigate("/sign-in"));
            }}
          >
            <IoSettingsOutline />
          </div>
          <div onClick={openNotifications} className="cursor-pointer">
            <IoNotificationsOutline />
          </div>
        </div>
      </div>
      {/* Wallet show */}
      <div className="text-white cardBg rounded-xl py-6 mt-6">
        <span className="flex items-center place-content-center font-semibold text-[35px] gap-1">
          <h1 className="text-[#4A33A8]">₦</h1>
          <h1 className="">{balance ? balance.amount : 0}</h1>
        </span>
        <section className="flex items-center gap-6 justify-around mt-6">
          {/* Request */}
          <div
            className="pl-12 flex items-center gap-3 cursor-pointer"
            onClick={openRequest}
          >
            <span className=" rotate-45 text-lg">
              <IoArrowDownCircleOutline />
            </span>
            <p className="text-[14px]">Request</p>
          </div>
          |{/* Transfer */}
          <div
            className="pr-12 flex items-center gap-3 cursor-pointer"
            onClick={openTransfer}
          >
            <span className="-rotate-90 text-lg">
              <IoArrowDownCircleOutline />
            </span>
            <p className="text-[14px]">Transfer</p>
          </div>
        </section>
      </div>
      {/* Recent Transactions */}
      <section className=" shadow-md shadow-[#5977E51A] rounded-xl p-4 pt-4 mt-6">
        <div className="flex items-center justify-between text-sm ">
          <h1 className="whitespace-nowrap text-[14px]">
            {" "}
            Recent Transactions
          </h1>
          <button
            onClick={openHistory}
            className="border-[#5977E51A] text-[#585858] outline-none text-[10px] border p-3 rounded-[10px] whitespace-nowrap"
          >
            See all transaction
          </button>
        </div>
        <div className="">
          {transactions.map((item, index) => (
            <div key={index}>
              <Transaction
                onClick={() => transactionDetails(item)}
                item={item}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="mt-[16px]">
        <VerticalScrollList />
      </section>
      <section className="mt-[16px]">
        <h1 className="mt-5 mb-3 text-[14px] text-[#2E3A59] ml-[12px] font-[500]">
          Tips and more
        </h1>
        {tipsOptions.map((item) => (
          <Tips
            background={item.background}
            key={item.id}
            title={item.title}
            subtext={item.subtext}
          />
        ))}
      </section>
      <Drawer
        width="50vw"
        height="80vh"
        title={
          <div className="text-center">
            <h3>{drawerName}</h3>
          </div>
        }
        maskClosable
        placement="bottom"
        closable={false}
        destroyOnClose
        onClose={onClose}
        open={open}
        key=""
        extra={
          <div
            className="text-xl text-[#4860B9]"
            onClick={() => {
              setOpen(false);
            }}
          >
            {drawerName === "Recent Transactions" ||
            drawerName === "Notifications" ? (
              <div className="border w-fit p-2 rounded-[10px] cursor-pointer">
                <MdOutlineKeyboardArrowDown />
              </div>
            ) : (
              <IoClose className="cursor-pointer" />
            )}
          </div>
        }
      >
        {drawer}
      </Drawer>
    </section>
  );
}
