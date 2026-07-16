import React from "react";
import { Container } from "react-bootstrap";
import { motion, useReducedMotion } from "framer-motion";
import farmImage from "../../assets/images/farm.jpg";
import bakingImage from "../../assets/images/baking.jpg";
import weddingImage from "../../assets/images/wedding.JPG";
import gardeningImage from "../../assets/images/gardening.jpg";
import "../../pages/about/style.css";

type BeyondKeyboardCard = {
  image?: string;
  emoji?: string;
  alt?: string;
  title: string;
  description: string;
  animation: "sway" | "bounce" | "spin" | "hoverTilt" | "float";
};

const beyondKeyboardCards: BeyondKeyboardCard[] = [
  {
    image: farmImage,
    alt: "Rebecca on the farm",
    title: "Grew up on a farm",
    description: "Turns out debugging software is easier than persuading sheep.",
    animation: "sway",
  },
  {
    image: bakingImage,
    alt: "Weekend baking",
    title: "Weekend Baker",
    description: "Brownies are my preferred method of user acceptance testing.",
    animation: "bounce",
  },
  {
    image: weddingImage,
    alt: "Rebecca and James",
    title: "Married to James",
    description: "Can confirm planning a wedding is an excellent exercise in project management.",
    animation: "float",
  },
  {
    image: gardeningImage,
    alt: "Cosmos flower",
    title: "Gardening",
    description:
      "Currently trying to learn gardening. The plants are providing useful lessons in resilience.",
    animation: "float",
  },
];

const AnimatedEmoji = ({
  image,
  alt,
  emoji,
  animation,
}: Pick<BeyondKeyboardCard, "image" | "alt" | "emoji" | "animation">) => {
  const content = image ? (
    <img src={image} alt={alt ?? ""} className="beyond-card-image" loading="lazy" />
  ) : (
    <span className="beyond-emoji" aria-hidden="true">
      {emoji}
    </span>
  );

  return <div className="beyond-media">{content}</div>;
};

export const BeyondKeyboardSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <Container className="About-header">
      <motion.section
        id="beyond-the-keyboard"
        className="beyond-keyboard-section sec_sp"
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="section-heading">
          <p className="about-eyebrow">Beyond the Keyboard</p>
        </div>

        <div className="beyond-keyboard-grid">
          {beyondKeyboardCards.map((card) => (
            <motion.article
              key={card.title}
              className="beyond-keyboard-card"
              variants={shouldReduceMotion ? undefined : cardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.03,
                    }
              }
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AnimatedEmoji
                image={card.image}
                alt={card.alt}
                emoji={card.emoji}
                animation={card.animation}
              />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </Container>
  );
};
