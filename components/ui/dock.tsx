// components\ui\dock.tsx
"use client";

import React, { PropsWithChildren, useRef, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max gap-2 rounded-2xl border p-2 backdrop-blur-md",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      mouseX,
      direction = "bottom",
      ...props
    },
    ref,
  ) => {
    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child as ReactElement<DockIconProps>, {
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX?.set(e.pageX)}
        onMouseLeave={() => mouseX?.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = React.forwardRef<HTMLDivElement, DockIconProps>(
  (
    {
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      mouseX,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const distanceCalc = useTransform(mouseX, (val: number) => {
      if (!internalRef.current || val == Infinity) return 0;
      const rect = internalRef.current.getBoundingClientRect();
      return val - rect.x - rect.width / 2;
    });

    const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [40, magnification, 40],
    );

    const width = useSpring(widthSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    return (
      <motion.div
        ref={internalRef}
        style={{ width }}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-full",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
