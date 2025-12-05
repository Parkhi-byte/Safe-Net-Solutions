import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Configure axios defaults
    axios.defaults.baseURL = 'http://localhost:5000/api';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            checkUserLoggedIn();
        } else {
            setLoading(false);
        }
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const res = await axios.get('/auth/me');
            setUser(res.data);
        } catch (err) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const res = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setUser(res.data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            setError(null);
            const res = await axios.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setUser(res.data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
