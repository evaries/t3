import type { NextPage } from "next";
import Hero from "../widgets/Hero";
import Features from "../widgets/Features";
import HowItWorks from "../widgets/HowItWorks";

const Landing: NextPage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};
export default Landing;
