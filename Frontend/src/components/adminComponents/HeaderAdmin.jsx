import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAdminLogoutMutation } from '../../slices/adminSlice.js/AdminApiSlics'
import { adminLogout } from '../../slices/adminSlice.js/AdminAuthSlice'

const HeaderAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logout] = useAdminLogoutMutation()
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(adminLogout());
            navigate('/admin');

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <nav className="bg-gray-900 text-white py-2">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-lg font-bold">Hello Admin</h1>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default HeaderAdmin