import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);
  

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error loading food list");
      }
    } catch (error) {
      toast.error("Failed to fetch list");
    }
  };

  const handleDelete = async (foodID) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodID });
      if (response.data.success) {
        toast.success("Item deleted successfully");
        setList(list.filter((item) => item._id !== foodID));
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      toast.error("Server error deleting item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <main className="h-[calc(100vh-64px)] w-[77.5vw] md:w-[85.5vw] overflow-y-auto p-6 bg-base-300">
      <h2 className="text-2xl font-bold text-base-content mb-6">Food Items</h2>

      {list.length === 0 ? (
        <p className="text-base-content/70">No items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 rounded-lg shadow">
            <thead>
              <tr className="text-base-content">
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td>{item.category}</td>
                  <td className="max-w-xs truncate">{item.description}</td>
                  <td className="text-primary font-semibold">${item.price}</td>
                  <td>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default List;
