import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase/firebasemethods'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';
import Register from '../pages/Register';

const RegisterProtectedRoute = () => {
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
                   
                    <Register/>
                    
                </div>
            )}
        </div>
    );
};

export default RegisterProtectedRoute;

