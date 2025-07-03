"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
    token: string | null;
    userId: string | null;
    username: string | null;
    isLoggedIn: boolean;
}

// Define the shape of the context value (state + functions to update state)
interface AuthContextType extends AuthState {
    login: (token: string, userId: string, username: string) => void;
    logout: () => void;
    // You might add an optional `loading` state if initial load takes time
    // isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        userId: null,
        username: null,
        isLoggedIn: false,
    });
    // const [isLoading, setIsLoading] = useState(true); // Optional: if you show a loading spinner initially

    useEffect(() => {
        // This effect runs once on component mount to check local storage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;


        if (token && userId && username) {
            setAuthState({
                token,
                userId,
                username,
                isLoggedIn: true,
            });
        }
        // setIsLoading(false);
    }, []); // Empty dependency array means this runs once on mount

    const login = (token: string, userId: string, username: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        setAuthState({ token, userId, username, isLoggedIn: true });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setAuthState({ token: null, userId: null, username: null, isLoggedIn: false });
    };

    // The value provided to consumers of this context
    const contextValue: AuthContextType = {
        ...authState,
        login,
        logout,
        // isLoading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume the Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};