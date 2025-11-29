// AddRestaurant component में
import React, { useState } from "react";
import { FaCloudUploadAlt, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AddRestaurant = ({ url }) => {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const [data, setData] = useState({
    name: "",
    address: "",
    seats: "",
    opening: "",
    closing: "",
    cuisine: "Multi-Cuisine",
    about: "",
    latitude: "",    // ✅ नई field
    longitude: ""    // ✅ नई field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // 📸 Multiple Image Upload (same as before)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const newPreview = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...newPreview]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      return toast.error("Please select at least one restaurant image");
    }

    // ✅ Coordinates validation
    if (!data.latitude || !data.longitude) {
      return toast.error("Please provide coordinates for the restaurant");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("seats", data.seats);
    formData.append("opening", data.opening);
    formData.append("closing", data.closing);
    formData.append("cuisine", data.cuisine);
    formData.append("about", data.about);
    formData.append("latitude", data.latitude);    // ✅ नई field
    formData.append("longitude", data.longitude);  // ✅ नई field

    images.forEach((img) => formData.append("images", img));

    try {
      const response = await axios.post(`http://localhost:4000/api/restaurants/create`, formData);

      if (response.data.success) {
        toast.success("Restaurant Added Successfully 🎉");

        // Reset
        setData({
          name: "",
          address: "",
          seats: "",
          opening: "",
          closing: "",
          cuisine: "Multi-Cuisine",
          about: "",
          latitude: "",    // ✅ reset
          longitude: ""    // ✅ reset
        });
        setImages([]);
        setPreview([]);
      }
    } catch (err) {
      toast.error("Error Adding Restaurant");
    }
  };

  return (
    <div className="w-full flex justify-center py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg transition"
      >
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">
          Add <span className="text-white">Restaurant</span>
        </h1>

        {/* IMAGE UPLOAD SECTION (same as before) */}
        <div className="mb-4">
          <p className="text-lg text-gray-200 mb-2 font-medium">Upload Images</p>
          <label
            htmlFor="images"
            className="cursor-pointer border-2 border-dashed border-gray-400 rounded-xl p-6 flex flex-col justify-center items-center hover:border-purple-400 transition"
          >
            <FaCloudUploadAlt className="text-4xl text-gray-300 mb-2" />
            <p className="text-gray-300">Click to upload images</p>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </label>

          {preview.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {preview.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden border border-white/10"
                >
                  <img
                    src={img}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition text-white"
                    onClick={() => removeImage(index)}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NAME */}
        <div className="mb-3">
          <label className="text-gray-300 font-medium">Restaurant Name</label>
          <input
            required
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter restaurant name…"
            className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-3">
          <label className="text-gray-300 font-medium">Address</label>
          <textarea
            required
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Full address…"
            className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
          ></textarea>
        </div>

        {/* COORDINATES SECTION - ✅ नया section */}
        <div className="mb-3">
          <label className="text-gray-300 font-medium flex items-center">
            <FaMapMarkerAlt className="mr-2 text-purple-400" />
            Location Coordinates
          </label>
          <div className="grid sm:grid-cols-2 gap-3 mt-1">
            <div>
              <input
                required
                type="number"
                step="any"
                name="latitude"
                value={data.latitude}
                onChange={handleChange}
                placeholder="Latitude (e.g., 28.6139)"
                className="w-full p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <input
                required
                type="number"
                step="any"
                name="longitude"
                value={data.longitude}
                onChange={handleChange}
                placeholder="Longitude (e.g., 77.2090)"
                className="w-full p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
              />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Get coordinates from <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">Google Maps</a>
          </p>
        </div>

        {/* SEATS + OPENING + CLOSING */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-gray-300 font-medium">Total Seats</label>
            <input
              required
              type="number"
              name="seats"
              value={data.seats}
              onChange={handleChange}
              placeholder="50"
              className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Opening Time</label>
            <input
              required
              type="time"
              name="opening"
              value={data.opening}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Closing Time</label>
            <input
              required
              type="time"
              name="closing"
              value={data.closing}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* CUISINE */}
        <div className="mt-3">
          <label className="text-gray-300 font-medium">Cuisine Type</label>
          <select
            name="cuisine"
            value={data.cuisine}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
          >
            <option className="bg-[#222]">Multi-Cuisine</option>
            <option className="bg-[#222]">Indian</option>
            <option className="bg-[#222]">Italian</option>
            <option className="bg-[#222]">Chinese</option>
            <option className="bg-[#222]">Mexican</option>
            <option className="bg-[#222]">Thai</option>
          </select>
        </div>

        {/* ABOUT */}
        <div className="mt-3">
          <label className="text-gray-300 font-medium">About Restaurant</label>
          <textarea
            required
            name="about"
            value={data.about}
            onChange={handleChange}
            rows={4}
            placeholder="Write about restaurant…"
            className="w-full mt-1 p-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400"
          ></textarea>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-900 text-white p-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;