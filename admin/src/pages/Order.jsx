import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/order/list-orders`);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const getPaymentStatus = (payment) => {
    return payment ? (
      <span className="badge badge-success badge-sm">Paid</span>
    ) : (
      <span className="badge badge-error badge-sm">Pending</span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const statusMatch = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    const paymentMatch = filterPayment === 'all' ||
      (filterPayment === 'paid' && order.payment) ||
      (filterPayment === 'pending' && !order.payment);
    return statusMatch && paymentMatch;
  });

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/order/update-status`, {
        status: newStatus, orderId: orderId
      });

      if (res.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] w-[77.5vw] md:w-[85.5vw] flex items-center justify-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] w-[77.5vw] md:w-[85.5vw] overflow-y-auto bg-base-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          <p className="text-base-content/70 mt-2">Manage and track all customer orders</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={fetchOrders}
            className="btn btn-primary btn-sm"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-200 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="label-text font-semibold mr-2">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="label-text font-semibold mr-2">Payment:</label>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="badge badge-neutral">
            Total Orders: {filteredOrders.length}
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              {/* Order Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-base-content/70">
                    {formatDate(order.date)} • {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm">📞 {order.address.phone}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`badge ${getStatusColor(order.status)} badge-lg`}>
                    {order.status}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ${order.amount}
                  </span>
                  {getPaymentStatus(order.payment)}
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-base-200 pt-4 mb-4">
                <h4 className="font-medium mb-3">Items ({order.items.length})</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 bg-base-200 rounded-lg">
                      <div className="w-12 h-12 bg-base-300 rounded-lg overflow-hidden">
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

              {/* Actions */}
              <div className="border-t border-base-200 pt-4">
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <select
                    defaultValue={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="select select-bordered select-sm"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button className="btn btn-sm btn-outline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">No orders found</h3>
          <p className="text-base-content/70">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
}

export default Order;