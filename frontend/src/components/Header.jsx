import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] md:h-[85vh] w-[90vw] m-auto flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient based on DaisyUI theme */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundSize: "200% 200%",
          backgroundImage: `linear-gradient(
            to right,
            hsl(var(--p)),
            hsl(var(--s)),
            hsl(var(--a))
          )`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Order Your Favourite Food 🍕
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Fresh, Fast & Delivered to Your Doorstep
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-warning btn-lg rounded-2xl shadow-lg">
            Order Now
          </button>
          <button className="btn btn-outline btn-lg rounded-2xl shadow-lg text-white border-white hover:bg-white hover:text-black">
            View Menu
          </button>
        </div>
      </motion.div>
    </section>
  );
}
