import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../Context/axios';
import { useEffect } from 'react';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const verifyPAYMENT = async () => {
        const response = await axiosInstance.post("/order/verify-order", { success, orderId })
        if (response.data.success) {
            navigate("/myorders")
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPAYMENT()
    }, [])

    return (
        <div className='flex flex-col items-center justify-center min-h-[64vh]'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    )
}

export default Verify;