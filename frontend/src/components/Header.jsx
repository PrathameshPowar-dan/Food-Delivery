import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [theme, setTheme] = useState("default");

  // Detect current theme from <html data-theme="">
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme || "default");
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Choose gradient depending on theme
  const titleGradient =
    theme === "retro"
      ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
      : "bg-gradient-to-r from-primary to-secondary";

  // Floating food icons
  const foods = ["🍔", "🍕", "🍣", "🍟", "🥗"];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Food Background */}
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


      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-base-100/40 backdrop-blur-xs -z-10" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Small Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <span className="text-primary font-semibold tracking-wider text-sm uppercase">
            🚀 Premium Food Delivery
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-base-content drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span
            className={`bg-clip-text text-transparent ${titleGradient} inline-block drop-shadow-md`}
          >
            Savor the Flavor,
          </span>
          <motion.span
            className="block mt-2 text-base-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Delivered to Your Door
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-base-content/80 drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Experience restaurant-quality meals crafted by top chefs and delivered
          fresh to your home in minutes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button className="btn btn-primary rounded-full px-8 py-3 text-lg shadow-lg">
            Order Now 🍔
          </button>
          <button className="btn btn-outline rounded-full px-8 py-3 text-lg">
            View Menu 📖
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          {[
            { number: "500+", label: "Dishes" },
            { number: "200+", label: "Restaurants" },
            { number: "30min", label: "Avg Delivery" },
            { number: "50k+", label: "Happy Customers" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-base-content"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary drop-shadow">
                {stat.number}
              </div>
              <div className="text-sm opacity-80 text-base-content">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
