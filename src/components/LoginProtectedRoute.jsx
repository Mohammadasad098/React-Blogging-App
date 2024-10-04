import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const LoginProtectedRoute = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false); 
            if (user) {

                navigate('/dashboard');
            }
        });

        return () => unsubscribe();
    }, [navigate]);


    return (
        <div>
            {loading ? <h1>Loading...</h1> : (
                <div>

                    <Login/>

                </div>
            )}
        </div>
    );
};

export default LoginProtectedRoute;

