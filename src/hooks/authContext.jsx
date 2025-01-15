import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [data, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/auth/protected');
                console.log('Auth Check Response:', response);

                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    //   useEffect(() => {
    if (loading) return;
    if (data && window.location.pathname === '/') {
        if (data.user.rol == 'admin') {
            navigate('/dashboard/historial');
        }else{
            navigate('/dashboard');
        }
    }

    if (!data && window.location.pathname.startsWith('/dashboard')) {
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ data, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
