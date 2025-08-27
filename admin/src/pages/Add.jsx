import React, { useEffect, useState } from "react";
import axios from "axios"
import { toast } from 'react-toastify';
const Add = () => {
  const [preview, setPreview] = useState(null);
  const url = "http://localhost:3000";
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Japanese",
    price: "",
    image: null,
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setData((prev) => ({ ...prev, image: file })); // ✅ Save image into state
    }
  };

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", data.image);

    const response = await axios.post(`${url}/api/food/add`,formData);
    if (response.data.success) {
      toast.success("Food item added successfully");
      setData({
        name: "",
        description: "",
        category: "Japanese",
        price: "",
        image: null,
      });
      setPreview(null);
    } else{
      toast.error("Failed to add food item");
    }
  }

  return (
    <main className="h-[calc(100vh-64px)] w-[77.5vw] md:w-[85.5vw] overflow-y-auto p-6 bg-base-300">
      <h2 className="text-2xl font-bold text-base-content mb-6">Add New Item</h2>

      <form className="grid gap-6 max-w-2xl" onSubmit={onSubmitHandler}>
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            name="name"
            onChange={onchangeHandler}
            value={data.name}
            type="text"
            placeholder="Enter item name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            onChange={onchangeHandler}
            value={data.description}
            placeholder="Enter item description"
            className="textarea textarea-bordered w-full"
            rows="3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={data.category}
            onChange={onchangeHandler}
            required
          >
            <option value="">Select category</option>
            <option value="American">American</option>
            <option value="Desserts">Desserts</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            name="price"
            onChange={onchangeHandler}
            value={data.price}
            type="number"
            placeholder="Enter price"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
            required
          />

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full" >
          Add Item
        </button>
      </form>
    </main>
  );
};

export default Add;
