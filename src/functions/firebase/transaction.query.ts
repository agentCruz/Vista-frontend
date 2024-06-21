import {
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { Transaction, TransactionType } from "../types/transaction.type";
import { Balance } from "../types";

export const transactionCollection = collection(db, "transactions");

// get user transaction by id
export const getUserTransaction = async (
  id: string
): Promise<Transaction[]> => {
  let transactions: Transaction[] = [];

  let docs = await getDocs(
    query(
      transactionCollection,
      or(where("senderId", "==", id), where("receiverId", "==", id)),
      orderBy("timestamp", 'desc')
    )
  );

  docs.docs.forEach((trans) => transactions.push(trans.data() as Transaction));

  return transactions;
};

// get user by id
export const getTransaction = async (id: string): Promise<Transaction> => {
  const tran = await getDoc(doc(transactionCollection, id));
  const result = tran.data();
  return result as Transaction;
};

export async function updateBalancesBasedOnTransaction(transaction: Transaction) {
  const senderBalanceRef = doc(db, "balances", transaction.senderId);
  const receiverBalanceRef = doc(db, "balances", transaction.receiverId);
  const transactionRef = doc(collection(db, "transactions")); // Create a new document in the transactions collection
  const senderTransactionHistoryRef = doc(collection(senderBalanceRef, "transactions")); // Sender's transaction history
  const receiverTransactionHistoryRef = doc(collection(receiverBalanceRef, "transactions")); // Receiver's transaction history

  try {
      await runTransaction(db, async (t) => {
          const senderBalanceDoc = await t.get(senderBalanceRef);
          const receiverBalanceDoc = await t.get(receiverBalanceRef);

          if (!senderBalanceDoc.exists()) {
              throw new Error("Sender balance document does not exist!");
          }

          if (!receiverBalanceDoc.exists()) {
              throw new Error("Receiver balance document does not exist!");
          }

          const senderBalance = senderBalanceDoc.data() as Balance;
          const receiverBalance = receiverBalanceDoc.data() as Balance;
          const amount = parseFloat(transaction.amount);

          let newSenderBalance: number;
          let newReceiverBalance: number;

          if (transaction.type === TransactionType.debit) {
              newSenderBalance = senderBalance.amount - amount;
              newReceiverBalance = receiverBalance.amount + amount;
          } else if (transaction.type === TransactionType.credit) {
              newSenderBalance = senderBalance.amount + amount;
              newReceiverBalance = receiverBalance.amount - amount;
          } else {
              throw new Error("Invalid transaction type!");
          }

          // Update the sender's and receiver's balances
          t.update(senderBalanceRef, { amount: newSenderBalance });
          t.update(receiverBalanceRef, { amount: newReceiverBalance });

          // Add the transaction to the transactions collection
          t.set(transactionRef, {
              ...transaction,
              id: transactionRef.id, // Use the generated ID from Firestore
              timestamp: new Date().toISOString() // Optionally add a timestamp
          });

          // Add the transaction to the sender's transaction history
          t.set(senderTransactionHistoryRef, {
              ...transaction,
              id: transactionRef.id, // Use the generated ID from Firestore
              timestamp: new Date().toISOString() // Optionally add a timestamp
          });

          // Add the transaction to the receiver's transaction history
          t.set(receiverTransactionHistoryRef, {
              ...transaction,
              id: transactionRef.id, // Use the generated ID from Firestore
              timestamp: new Date().toISOString() // Optionally add a timestamp
          });
      });

      console.log("Transaction successfully committed!");
  } catch (e) {
      console.error("Transaction failed: ", e);
  }
}
