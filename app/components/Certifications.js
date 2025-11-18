"use client";

import SectionHeader from "./SectionHeader";
import BentoGrid from "./BentoGrid";
import BentoItem from "./BentoItem";

export default function Certifications() {
  const certs = [
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera – Andrew Ng",
      year: "2024",
    },
    {
      title: "DeepLearning.AI Generative AI",
      issuer: "DeepLearning.AI",
      year: "2024",
    },
    {
      title: "Python for Everybody",
      issuer: "University of Michigan",
      year: "2023",
    },
  ];

  return (
    <section className="mt-20" id="certifications">
      <SectionHeader title="Certifications" />

      <BentoGrid>
        {certs.map((c, i) => (
          <BentoItem key={i}>
            <h3 className="text-lg font-bold">{c.title}</h3>
            <p className="text-accent mt-1">{c.issuer}</p>
            <p className="text-gray-400 mt-1 text-sm">{c.year}</p>
          </BentoItem>
        ))}
      </BentoGrid>
    </section>
  );
}
