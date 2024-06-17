import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute'; // Adjust the import path as needed
export const network="localhost"

export default function App() {
    const [drawer, setDrawer] = useState();

    return (
        <div>
            <Routes>
                <Route 
                    path='/dashboard'
                    element={
                        <PrivateRoute>
                            <Main drawer={drawer} />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path='/'
                    element={<Login />}
                />
                <Route 
                    path='/sign-in'
                    element={<SignIn />}
                />
            </Routes>
        </div>
    );
}
