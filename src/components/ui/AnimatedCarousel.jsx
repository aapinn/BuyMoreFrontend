import { motion } from "framer-motion"
import CarouselComponent from "@/pages/components/CarouselComponent"

function AnimatedCarousel({component}) {
  return (
    <motion.div
      className="cursor-grab overflow-hidden w-full"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className="flex overflow-x-auto scroll-smooth scrollbar-hide" // ✅ smooth scroll + hide scrollbar
        animate={{
          x: [0, -20, 0], // gerakan ketarik ke kiri 20px lalu balik
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        <div>
          {component}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnimatedCarousel
