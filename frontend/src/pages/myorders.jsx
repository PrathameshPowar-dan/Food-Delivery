import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../Context/axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const FetchingOrders = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/order/myorders");
            setOrders(response.data.data);
        } catch (err) {
            setError('Failed to load orders. Please try again later.');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        FetchingOrders();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return 'badge-warning';
            case 'shipped':
                return 'badge-info';
            case 'delivered':
                return 'badge-success';
            case 'cancelled':
                return 'badge-error';
            default:
                return 'badge-neutral';
        }
    };

    if (loading) {
        return (
            <div className="min-h-[64vh] flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-base-content/70">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[64vh] flex items-center justify-center">
                <div className="alert alert-error max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                    <button className="btn btn-sm btn-ghost" onClick={FetchingOrders}>Try Again</button>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[64vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
                    <p className="text-base-content/70 mb-6">You haven't placed any orders yet.</p>
                    <a href="/" className="btn btn-primary">Start Shopping</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[64vh] py-8 px-4 bg-base-100">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Orders</h1>
                    <p className="text-base-content/70">Your order history and tracking</p>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="card bg-base-100 shadow-xl border border-base-300">
                            <div className="card-body">
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Order #{order._id.slice(-8).toUpperCase()}
                                        </h3>
                                        <p className="text-sm text-base-content/70">
                                            Placed on {formatDate(order.date)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:items-end gap-2">
                                        <span className={`badge ${getStatusColor(order.status)} badge-lg`}>
                                            {order.status}
                                        </span>
                                        <span className="text-lg font-bold text-primary">
                                            ${order.amount}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="border-t border-base-200 pt-4 mb-4">
                                    <h4 className="font-medium mb-3">Items ({order.items.length})</h4>
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-base-300 rounded-lg overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-base-content/70">
                                                        ${item.price} × {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="border-t border-base-200 pt-4">
                                    <h4 className="font-medium mb-2">Delivery Address</h4>
                                    <div className="bg-base-200 rounded-lg p-4">
                                        <p className="font-semibold">
                                            {order.address.firstName} {order.address.lastName}
                                        </p>
                                        <p className="text-sm">{order.address.address}</p>
                                        <p className="text-sm">
                                            {order.address.pincode}, {order.address.country}
                                        </p>
                                        <p className="text-sm mt-2">📞 {order.address.phone}</p>
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm">
                                        Payment: {order.payment ? (
                                            <span className="text-success">Completed ✅</span>
                                        ) : (
                                            <span className="text-error">Pending ❌</span>
                                        )}
                                    </span>
                                    <button className="btn btn-sm btn-outline">
                                        Order Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination or Summary */}
                <div className="text-center mt-8">
                    <p className="text-base-content/70">
                        Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;