import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { Balance } from "../types";

export const balanceCollection = collection(db, "balances");

// get balance by id
export const getBalance = async (id: string): Promise<Balance> => {
  const user = await getDoc(doc(balanceCollection, id));
  const result = user.data();
  return result as Balance;
};

// get user by account
export const getBalanceByUserId = async (
  userId: string
): Promise<Balance | undefined> => {
  let result: Balance[] = [];

  let docs = await getDocs(
    query(balanceCollection, where("userId", "==", userId))
  );

  if (docs.empty) {
    return;
  }

  docs.docs.forEach((user) => {
    const converted = user.data() as Balance;

    if (converted.userId === userId) {
      result.push(converted);
    }
  });

  return result[0];
};

export const createBalance = async (
  balance: Partial<Balance>
): Promise<Balance> => {
  const { id, ...restOfTrans } = balance;

  const newBalance = doc(balanceCollection, restOfTrans.userId);

  const update = {
    ...restOfTrans,
    id: newBalance.id,
  };

  const bal = await setDoc(newBalance, update).then(() =>
    getBalance(newBalance.id)
  );

  return bal;
};
