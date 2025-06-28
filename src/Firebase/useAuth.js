"use client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "./firebase.config";
import {
  addUser,
  fetchCurrentUser,
  loginUser,
  logout,
} from "@/redux/features/userSlice/userSlice";
import axios from "axios";

const auth = getAuth(app);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const dispatch = useDispatch();

  // Function to create a user
  const createUser = async ({name, email, password, role}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Update Firebase user profile
      await updateProfile(newUser, { displayName: name });

      // Prepare user data for backend (securely)
      const userData = {
        name,
        email,
        role,
        uid: newUser.uid,
      };

      await dispatch(addUser(userData)).unwrap();

      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCredential.user);

      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout())
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
       
      if (currentUser?.email) {
        dispatch(loginUser(currentUser?.email));
        try {
            const userInfo = {email: currentUser.email};
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/jwt`, userInfo,{withCredentials : true})
            .then(res =>{
                if(res.data.token){
                    localStorage.setItem('token', res.data.token);
                }
            })
            
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }else{
        localStorage.removeItem('token');
      }
      
      setIsAuthLoading(false);
    }
  );

    return () => unsubscribe();
  }, [dispatch]);

  return { user, isAuthLoading, createUser, signIn, logOut };
};

export default useAuth;
