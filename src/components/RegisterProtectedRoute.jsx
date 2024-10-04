import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase/firebasemethods'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            if (user) {
                navigate('/dashboard'); // Redirect to dashboard if user is logged in
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <h1>Loading...</h1>; // Optional loading message while checking auth state
    }

    return (
        <div>
            <h1>Register</h1>
            {/* Registration form goes here */}
        </div>
    );
};

export default Register;
