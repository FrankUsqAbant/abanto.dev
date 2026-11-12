import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useAnimationControls } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS } from "../../content/testimonials";

const TestimonialCarousel: React.FC = () => {
  // We duplicate the array to ensure seamless infinite looping
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 30, // Slow speed (adjust as needed)
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls]);

  return (
    <div className="w-full overflow-hidden py-12 relative fade-mask">
      {/* CSS Mask for fade effect on edges - Added via inline style or class if globally available. 
            Here strictly using container relative structure */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex w-max"
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() =>
          controls.start({
            x: "-50%",
            transition: {
              duration: 30,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          })
        }
      >
        {items.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            data={testimonial}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialCarousel;
