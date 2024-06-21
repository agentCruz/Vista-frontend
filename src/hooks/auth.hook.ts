import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../configs/firebase";
import {
  createBalance,
  getBalance,
  getUser,
  getUserTransaction,
  usersCollection,
} from "../functions/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "../stores/auth.store";
import { useEffect } from "react";
import { Balance } from "../functions/types";

export default function useAuth() {
  const {
    setIsAuthenticatedState,
    setFbUserState,
    setUserState,
    setBalanceState,
    setTransactionsState,
    isAuthenticated,
    fbUser,
  } = useAuthState();

  function generateUniqueAccountNumber(): string {
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit number
    const accountNumber = timestamp.slice(-4) + randomDigits; // Last 4 digits of timestamp + 6 random digits

    // Ensure the account number is exactly 10 digits long
    if (accountNumber.length > 10) {
      return accountNumber.slice(0, 10);
    } else {
      return accountNumber;
    }
  }

  const signUp = async (email: string, password: string, userName: string) => {
    // setSignUpIsLoading(true);
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed in and save user to firestore
        setFbUserState(userCredential.user);
        await setDoc(doc(usersCollection, userCredential.user.uid), {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          photo: "",
          account: generateUniqueAccountNumber(),
          firstName: "",
          lastName: "",
          userName,
        }).then(async () => {
          setIsAuthenticatedState(true);
          // setSignUpIsLoading(false);

          const bal: Balance = {
            id: '',
            amount: 0,
            userId: userCredential.user.uid
          }

          await createBalance(bal)

          const fbUser = await getUser(userCredential.user.uid);
          const balance = await getBalance(userCredential.user.uid);
          const transactions = await getUserTransaction(
            userCredential.user.uid
          );

  

          setUserState(fbUser);
          if (balance) setBalanceState(balance);
          setTransactionsState(transactions);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // setSignUpIsLoading(false);

        // setError(errorMessage);
        // ..
      });
  };

  const signIn = async (email: string, password: string, toast: any) => {
    // setSignInIsLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const { user } = userCredential;
        setFbUserState(user);

        setIsAuthenticatedState(true);

        const fbUser = await getUser(user.uid);
        const balance = await getBalance(user.uid);
        const transactions = await getUserTransaction(
          user.uid
        );

        setUserState(fbUser);
        if (balance) setBalanceState(balance);
        setTransactionsState(transactions);
      })
      .catch((error) => {
        // setSignInIsLoading(false);
        const errorMessage = error.message as string;
        const errorCode = error.code as string;
        // setCurrentUser(null);
        // setError(errorMessage);
        toast({
          title: "Error",
          status: "error",
          description: `${errorMessage.replace("Firebase", "MyClass Auth")}`,
          isClosable: true,
        });
      });
  };

  const signOut = async () => {
    fbSignOut(firebaseAuth)
      .then(function () {
        // Sign-out successful.
        setFbUserState(undefined);
        setUserState(undefined);
        setIsAuthenticatedState(false);
      })
      .catch((error) => {
        // An error happened.
        // setSignOutIsLoading(false);
        // setCurrentUser(null); // Do we need to do this?
        // setError(error.message);
      });
  };

  useEffect(() => {
    // setAuthLoading(true);
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (authUser) => {
        console.log("testing", authUser);
        setIsAuthenticatedState(!!authUser);
        if (authUser) {
          setIsAuthenticatedState(true);
          setFbUserState(authUser);

          const fbUser = await getUser(authUser.uid);
          const balance = await getBalance(authUser.uid);
          const transactions = await getUserTransaction(
            authUser.uid
          );
  
          setUserState(fbUser);
          if (balance) setBalanceState(balance);
          setTransactionsState(transactions);
        }
        // Async storage set firebase-user??
      },
      (error) => {
        // setCurrentUser(null);
        // setAuthLoading(false);
        // setError(error.message);
      }
    );

    // setTimeout(() => {
    //   !userLoggedIn && setAuthLoading(false);
    // }, 1000);

    return () => unsubscribe();
  }, []);

  return {
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    fbUser,
  };
}
