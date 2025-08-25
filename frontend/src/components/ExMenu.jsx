import React from "react";
import { menu_list } from "../assets/assets";
import { motion } from "framer-motion";

const FloatingBg = () => {
    const foods = ["🍔", "🍕", "🍣", "🌮", "🍦", "🥗", "🍟", "🍩"];

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {foods.map((food, i) => (
                <motion.div
                    key={i}
                    className="absolute text-7xl sm:text-8xl opacity-70 drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                    style={{
                        top: `${Math.random() * 50 + 20}%`, // 20% to 70%
                        left: `${Math.random() * 80 + 10}%`, // still 10% to 90%
                    }}
                    animate={{
                        y: [0, -80, 0],
                        rotate: [0, 20, -20, 0],
                    }}
                    transition={{
                        duration: 15 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {food}
                </motion.div>
            ))}
        </div>

    );
};

const ExMenu = ({ category, setcategory }) => {
    return (
        <section className="relative py-12 px-4 overflow-hidden"  id="menu">
            {/* Floating background */}
            <FloatingBg />
            <div className="absolute inset-0 bg-base-100/20 backdrop-blur-xs -z-10" />

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
                    Explore Our Menu
                </h2>
                <p className="mt-3 text-base sm:text-lg text-base-content/70">
                    A variety of categories to satisfy every craving — from cheesy pizzas
                    to refreshing ice creams!
                </p>
            </div>

            {/* Menu Categories */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-10 max-w-5xl mx-auto relative z-10">
                {menu_list.map((item, idx) => (
                    <div
                        onClick={() =>
                            setcategory(prev => prev === item.dish_name ? "All" : item.dish_name)
                        }
                        key={idx}
                        className={`flex flex-col items-center w-24 sm:w-28 cursor-pointer transition-transform ${category === item.dish_name ? "scale-110" : "hover:scale-105"
                            }`}
                    >
                        <div
                            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 shadow-lg overflow-hidden transition-colors ${category === item.dish_name
                                ? "border-primary ring-4 ring-primary/40"
                                : "border-base-300"
                                }`}
                        >
                            <img
                                src={item.dish_image}
                                alt={item.dish_name}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p
                            className={`mt-2 text-sm sm:text-base font-medium text-center ${category === item.dish_name
                                ? "text-primary"
                                : "text-base-content"
                                }`}
                        >
                            {item.dish_name}
                        </p>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default ExMenu;
