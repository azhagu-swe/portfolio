import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CustomizeCardProps {
  img: string;
  description: string;
}

const CustomizeCard = ({ img, description }: CustomizeCardProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    whileHover={{
      scale: 1.05,
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
    }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className={cn(
      "text-center shadow-lg rounded-xl overflow-hidden w-full flex flex-col h-full bg-card text-card-foreground"
    )}
  >
    {/* Image Container with fixed aspect ratio */}
    <div className="relative w-full h-[250px] shrink-0">
      <Image
        src={img}
        alt={description}
        fill
        className="object-cover object-[center_5%]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>

    {/* Description Text */}
    <div className="p-2.5 bg-primary rounded-b-xl grow flex items-center justify-center">
      <p className="text-sm font-bold text-primary-foreground overflow-hidden line-clamp-3 text-ellipsis">
        {description}
      </p>
    </div>
  </motion.div>
);

export default CustomizeCard;
