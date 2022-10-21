import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);

    //sign up with email & pass
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //log in
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Log out
    const logOut = () => {
        return signOut(auth);
    }

    //to get current user 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current User inside state change', currentUser);
            setUser(currentUser);
        });

        return () => unSubscribe();

    }, [])

    const authInfo = { user, createUser, signIn, logOut }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;