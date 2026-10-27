"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./coffee.module.css";

/** Scroll moves the cup and beans without a perpetual animation or render loop. */
export function CoffeeScene({ alt = "Kalp desenli süt köpüğüyle porselen fincanda kahve" }: { alt?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cupX = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const cupY = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const cupRotate = useTransform(scrollYProgress, [0, 1], [-7, -13]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, -95]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, 65]);

  return <div className={styles.scene} ref={ref}>
    <motion.div className={styles.cup} style={reduced ? undefined : { x: cupX, y: cupY, rotate: cupRotate }}>
      <Image src="/images/coffee/floating-cup.webp" alt={alt} width={1100} height={1100} sizes="(max-width: 600px) 84vw, 530px" quality={84} preload />
    </motion.div>
    <motion.div aria-hidden="true" className={styles.beansNear} style={reduced ? undefined : { y: nearY }}>
      <Image className={styles.beanOne} src="/images/coffee/coffee-bean.webp" alt="" width={90} height={88} />
      <Image className={styles.beanTwo} src="/images/coffee/coffee-bean.webp" alt="" width={55} height={54} />
      <Image className={styles.beanThree} src="/images/coffee/coffee-bean.webp" alt="" width={68} height={66} />
    </motion.div>
    <motion.div aria-hidden="true" className={styles.beansFar} style={reduced ? undefined : { y: farY }}>
      <Image className={styles.beanFour} src="/images/coffee/coffee-bean.webp" alt="" width={40} height={39} />
      <Image className={styles.beanFive} src="/images/coffee/coffee-bean.webp" alt="" width={62} height={60} />
      <Image className={styles.beanSix} src="/images/coffee/coffee-bean.webp" alt="" width={33} height={32} />
    </motion.div>
  </div>;
}
