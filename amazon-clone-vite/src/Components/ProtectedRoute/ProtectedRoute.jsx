import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../DataProvider/DataProvider'
import { redirect, useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ children, msg, redirect }) => {
    const navigate = useNavigate()
    const [{ user }, dispatch] = useContext(DataContext)

    useEffect(() => {
        if (!user) {
            navigate("/auth", { state: { msg, redirect } })
        }
    }, [user])
    return children;
}

export default ProtectedRoute;