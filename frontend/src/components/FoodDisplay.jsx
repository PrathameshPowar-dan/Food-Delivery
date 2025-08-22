import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { motion } from "framer-motion";

const FoodDisplay = ({ Category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <section className="relative py-12 px-4 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
                    {Category === "All" ? "All Foods" : Category}
                </h2>
                <p className="mt-3 text-base sm:text-lg text-base-content/70">
                    Delicious dishes carefully selected just for you 🍴
                </p>
            </div>

            {/* Food Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {food_list
                    .filter(
                        (food) => Category === "All" || food.Category === Category
                    )
                    .map((food, idx) => (
                        <motion.div
                            key={food._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-base-300 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                                    draggable="false"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col justify-between h-40">
                                <div>
                                    <h3 className="text-lg font-semibold text-base-content line-clamp-1">
                                        {food.name}
                                    </h3>
                                    <p className="text-sm text-base-content/70 line-clamp-2 mt-1">
                                        {food.description}
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">
                                        ${food.price}
                                    </span>
                                    <span className="badge badge-outline">{food.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </div>

        </section>
    );
};

export default FoodDisplay;
