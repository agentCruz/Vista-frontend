import React, { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { OtpInput } from "../OtpInput";
import Button from "../Button";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { Checks } from "../Checks";
import { recentTransactions } from "../../dataHelpers/MainDataHelper";
import { Loader } from "../Loader";
import StyledInput from "../StyledInput";
import { AccountInput } from "../AccountInput";
import {
  getUserByAccount,
  updateBalancesBasedOnTransaction,
} from "../../functions/firebase";
import { useAuthState } from "../../stores/auth.store";
import { TransactionType } from "../../functions/types";

export const Transfer = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [started, setStarted] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tansferText, setTansferText] = useState("Transfer pending...");
  const [loading, setLoading] = useState(false);
  const [emptyState, setEmptyState] = useState(true);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountDetailLoading, setAccountDetailLoading] = useState(false);
  const [accountDetail, setAccountDetail] = useState({});
  const [accountDetailError, setAccountDetailError] = useState("");

  const { user } = useAuthState();

  const onAccountChange = (e) => {
    const number = e.target.value;
    setAccountNumber(number.toLocaleLowerCase());
  };

  useEffect(() => {
    if (accountDetail && amount !== 0) {
      setDisabled(true);
    }
  }, [accountDetail, amount]);

  useEffect(() => {
    if (accountNumber.length === 10) {
      setAccountDetailLoading(true);
      getUserByAccount(accountNumber)
        .then((val) => {
          if (val) {
            console.log(val);
            setAccountDetail(val);
            setDisabled(true);
            return;
          }

          setAccountDetailError("Account holder not found");
        })
        .catch(() => setAccountDetailError("Error fetching account detail"))
        .finally(() => setAccountDetailLoading(false));
    }
  }, [accountNumber]);

  const getRandomDelay = () => Math.floor(Math.random() * 500) + 1000; // 500 to 1500 ms (0.5 to 1.5 seconds)

  const function1 = () => {
    setCheck1(true);
    console.log("started");
  };
  const function2 = () => setCheck2(true);
  const function3 = () => setCheck3(true);
  const function4 = () => setCheck4(true);
  const paymentSuccess = () => {
    setLoading(false);
    setTansferText("Transfer Successful");
  };

  const executeFunctions = (functions) => {
    if (functions.length === 0) return;
    const [currentFunction, ...remainingFunctions] = functions;
    setTimeout(() => {
      currentFunction();
      executeFunctions(remainingFunctions);
    }, getRandomDelay());
  };

  const onChange = (e) => {
    const number = e.target.value;
    setAmount(number);
    console.log(number);
  };

  const startTransfer = () => {
    // senderId: string;
    // senderName: string;
    // receiverId: string;
    // receiverName: string;
    // amount: string;
    // type: TransactionType;
    // note: string;
    // timestamp: string;
    const trxn = {
      id: "",
      senderId: user.id,
      senderName: user.userName,
      receiverId: accountDetail.id,
      receiverName: accountDetail.userName,
      amount,
      type: TransactionType.debit,
      note: "transfer",
      timestamp: new Date().toLocaleDateString(),
    };
    setLoading(true);
    updateBalancesBasedOnTransaction(trxn)
      .then((val) => {
        setStarted(true);
        executeFunctions([
          function1,
          function2,
          function3,
          function4,
          paymentSuccess,
        ]);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let items = recentTransactions[0];

  const getFirstLetters = (str) => {
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word[0]) // Map each word to its first letter
      .join(""); // Join the first letters into a single string
  };

  return (
    <>
      {!started && (
        <div className="text-center">
          <div className="text-[20px]">
            <div className="flex items-center gap-4 place-content-center">
              <span className="text-[#7856FF]">
                <IoPersonOutline />
              </span>
              <h1 className="">Transfer</h1>
            </div>
            <p className="mt-6 w-[300px] text-[15px] mx-auto">
              Kindly enter account number and amount to proceed
            </p>
          </div>
          <form className="mt-12">
            <div className="flex items-center m-2 gap-4 place-content-center">
              {accountDetailLoading && !accountDetail && <Loader />}

              {!accountDetailLoading &&
                !accountDetailError &&
                accountDetail && (
                  <p className="mt-6 w-[300px] text-[15px] mx-auto">
                    {accountDetail.userName}
                  </p>
                )}

              {!accountDetail &&
                !accountDetailLoading &&
                accountDetailError && (
                  <p className="mt-6 w-[300px] text-[15px] mx-auto">
                    {accountDetailError}
                  </p>
                )}
            </div>

            <div className="m-2 gap-4">
              <AccountInput
                onChange={onAccountChange}
                placeholder="Account Number"
                type="number"
              />
            </div>

            <div className="m-2 gap-4">
              <AccountInput
                onChange={onChange}
                placeholder="Amount"
                type="number"
              />
            </div>

            <div className="w-auto m-2 mt-10 flex flex-col gap-3">
              {loading ? (
                <div className="flex items-center m-2 gap-4 place-content-center">
                  <Loader />
                </div>
              ) : (
                <Button
                  disabled={disabled}
                  text="Continue"
                  onClick={() => {
                    if (!disabled && loading) return;
                    if (!disabled && !loading) return;
                    startTransfer();
                  }}
                />
              )}
              {/* <Link to="#">Reset PIN?</Link> */}
            </div>
          </form>
          {/* <div className='mt-12'>
          <Button disabled={true} text="Done" />
        </div> */}
        </div>
      )}
      {started &&
        (emptyState ? (
          <div className="text-center flex flex-col gap-[24px]">
            <section className="flex py-3 mt-[20px] items-center justify-center gap-1 rounded-[12px] bg-[#F8F9FC]">
              <div className="text-[#7856FF] bg-[#8061FF] bg-opacity-10 font-[800] w-fit p-2 rounded-full">
                {getFirstLetters(accountDetail.userName)}
              </div>
              <div className="text-[15px] rounded-xl">
                {accountDetail.userName}
              </div>
            </section>
            <section className="py-6 bg-[#F8F9FC] rounded-[12px]">
              <div className="flex justify-center items-center gap-2 text-[#E2E0F0]">
                <h1 className="text-[40px]">₦</h1>
                <div className="max-w-[100px] text-[40px] font-[700] text-[#7856FF]">
                  {amount}
                </div>
              </div>
              <p className="text-[#8A81B1E5] mt-1 text-[12px]">{tansferText}</p>
            </section>
            <section className="flex flex-col gap-[24px] mt-[27px]">
              <Checks text="Payment requested 💯" checked={check1} />
              <Checks text="Processed by bank 🏦" checked={check2} />
              <Checks text="Received by Vista ✨" checked={check3} />
              <Checks text="Transfer successful 💜" checked={check4} />
            </section>
            {loading ? (
              <div className="mt-12 bg-[#9CADE933] text-[#7856FF] opacity-40 w-full flex justify-center py-3 mb-4">
                <Loader />
              </div>
            ) : (
              <div className="mt-12">
                <Button text="Done" onClick={props.close} />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center flex flex-col gap-[24px]">
            <section className="flex py-3 mt-[20px] items-center justify-center gap-1 rounded-[12px] bg-[#F8F9FC]">
              <div className="text-[#7856FF] bg-[#8061FF] bg-opacity-10 font-[800] w-fit p-2 rounded-full">
                {getFirstLetters(accountDetail.userName)}
              </div>
              <div className="text-[15px] rounded-xl">
                {accountDetail.userName}
              </div>
            </section>
            <section className="py-6 bg-[#F8F9FC] rounded-[12px]">
              <div className="flex justify-center items-center gap-2 text-[#E2E0F0]">
                <h1 className="text-[40px]">₦</h1>
                <div className="max-w-[100px] text-[40px] font-[700] text-[#7856FF]">
                  {amount}
                </div>
              </div>
              <p className="text-[#8A81B1E5] mt-1 text-[12px]">{tansferText}</p>
            </section>
            <section className="flex flex-col gap-[24px] mt-[27px]">
              <Checks text="Payment requested 💯" checked={check1} />
              <Checks text="Processed by bank 🏦" checked={check2} />
              <Checks text="Received by Vista ✨" checked={check3} />
              <Checks text="Transfer successful 💜" checked={check4} />
            </section>
            {loading ? (
              <div className="mt-12 bg-[#9CADE933] text-[#7856FF] opacity-40 w-full flex justify-center py-3 mb-4">
                <Loader />
              </div>
            ) : (
              <div className="mt-12">
                <Button text="Done" onClick={props.close} />
              </div>
            )}
          </div>
        ))}
    </>
  );
};

// {started && (
//   <div className='text-center'>
//     <section className='py-6 bg-[#F8F9FC]'>
//       <div className='flex justify-center items-center gap-2 text-[#E2E0F0]'>
//         <h1 className='text-[40px]'>₦</h1>
//         <div className='max-w-[100px]'>
//           <Input type='number' width="auto" disabled={true} />
//         </div>
//       </div>
//       <p className='text-[#8A81B1E5] mt-1 text-[12px]'>Gently tap device on Gateway</p>
//     </section>
//     <section className='flex gap-4 py-3 mt-[20px] items-center justify-center bg-[#F8F9FC]'>
//       <div className='text-[#E2E7FE] w-fit px-4 py-2 border border-opacity-40 rounded-full'>
//         ?
//       </div>
//       <div className='bg-[#EBEEFA] p-2 w-[170px] rounded-xl'></div>
//     </section>
//     <section className='flex flex-col gap-[24px] mt-[27px]'>
//       <Checks checked={check1} />
//       <Checks checked={check2}/>
//       <Checks checked={check3}/>
//       <Checks checked={check4}/>
//     </section>
//     <div className='mt-12'>
//       <Button disabled={!done} text="Done" />
//     </div>
//   </div>
// )}
