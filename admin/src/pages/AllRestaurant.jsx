import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
    FaTrash,
    FaEdit,
    FaMapMarkerAlt,
    FaClock,
    FaUtensils,
    FaChair,
    FaSearch,
    FaEye,
    FaSort,
    FaFilter
} from "react-icons/fa";

const AllRestaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCuisine, setFilterCuisine] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Fetch all restaurants
    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:4000/api/restaurants/list");

            if (response.data.success) {
                setRestaurants(response.data.data);
            }
        } catch (err) {
            toast.error("Error fetching restaurants");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    // Delete restaurant
    const handleDelete = async (id, name) => {
        try {
            await axios.delete(`http://localhost:4000/api/restaurants/${id}`);
            toast.success(`"${name}" deleted successfully 🗑️`);
            setDeleteConfirm(null);
            fetchRestaurants(); // Refresh the list
        } catch (err) {
            toast.error("Error deleting restaurant");
            console.error(err);
        }
    };

    // Filter and sort restaurants
    const filteredRestaurants = restaurants
        .filter(restaurant => {
            const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCuisine = filterCuisine === "all" || restaurant.cuisine === filterCuisine;
            return matchesSearch && matchesCuisine;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "seats":
                    return b.seats - a.seats;
                case "opening":
                    return a.opening.localeCompare(b.opening);
                default:
                    return 0;
            }
        });

    // Get unique cuisines for filter
    const cuisines = [...new Set(restaurants.map(r => r.cuisine))];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-white">
                        Restaurant <span className="text-purple-400">Dashboard</span>
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Manage your restaurant collection ({filteredRestaurants.length} restaurants)
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 mb-8 border border-white/20">
                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search restaurants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-purple-400"
                            />
                        </div>

                        {/* Cuisine Filter */}
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-3 text-gray-400" />
                            <select
                                value={filterCuisine}
                                onChange={(e) => setFilterCuisine(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400 appearance-none"
                            >
                                <option value="all" className="bg-gray-800">All Cuisines</option>
                                {cuisines.map(cuisine => (
                                    <option key={cuisine} value={cuisine} className="bg-gray-800">
                                        {cuisine}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <FaSort className="absolute left-3 top-3 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-gray-600 text-white outline-none focus:border-purple-400 appearance-none"
                            >
                                <option value="name" className="bg-gray-800">Sort by Name</option>
                                <option value="seats" className="bg-gray-800">Sort by Seats</option>
                                <option value="opening" className="bg-gray-800">Sort by Opening</option>
                            </select>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={fetchRestaurants}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                        >
                            Refresh List
                        </button>
                    </div>
                </div>

                {/* Restaurant Grid */}
                {filteredRestaurants.length === 0 ? (
                    <div className="text-center py-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Restaurants Found</h3>
                        <p className="text-gray-300">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredRestaurants.map((restaurant) => (
                            <div
                                key={restaurant._id}
                                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* Restaurant Image */}
                                <div className="h-48 overflow-hidden relative">
                                    {restaurant.images && restaurant.images.length > 0 ? (
                                        <img
                                            src={`http://localhost:4000/images${restaurant.images[0]}`}
                                            alt={restaurant.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                                            <FaUtensils className="text-4xl text-white opacity-50" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                                        <span className="text-white text-sm font-semibold">{restaurant.cuisine}</span>
                                    </div>
                                </div>

                                {/* Restaurant Info */}
                                <div className="p-2">
                                    <h3 className="text-xl font-bold text-white mb-2 truncate">
                                        {restaurant.name}
                                    </h3>

                                    <div className="space-y-2 mb-2">
                                        {/* Address */}
                                        <div className="flex items-start space-x-2">
                                            <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0" />
                                            <p className="text-gray-300 text-sm line-clamp-2">{restaurant.address}</p>
                                        </div>

                                        {/* Timing */}
                                        <div className="flex items-center space-x-2">
                                            <FaClock className="text-green-400" />
                                            <span className="text-gray-300 text-sm">
                                                {restaurant.opening} - {restaurant.closing}
                                            </span>
                                        </div>

                                        {/* Seats */}
                                        <div className="flex items-center space-x-2">
                                            <FaChair className="text-yellow-400" />
                                            <span className="text-gray-300 text-sm">
                                                {restaurant.seats} seats
                                            </span>
                                        </div>
                                    </div>

                                    {/* About */}
                                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                                        {restaurant.about}
                                    </p>

                                    {/* Coordinates */}
                                    {restaurant.latitude && restaurant.longitude && (
                                        <div className="bg-black/20 rounded-lg p-3 mb-4">
                                            <p className="text-xs text-gray-400">
                                                📍 {restaurant.latitude}, {restaurant.longitude}
                                            </p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setDeleteConfirm(restaurant._id)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                                        >
                                            <FaTrash />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-2">Confirm Delete</h3>
                            <p className="text-gray-300 mb-6">
                                Are you sure you want to delete this restaurant? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const restaurant = restaurants.find(r => r._id === deleteConfirm);
                                        handleDelete(deleteConfirm, restaurant.name);
                                    }}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRestaurant;