import { NextPage } from "next";
const features = [
  {
    header: "All in one",
    text: "store all your links in one place, then share only one",
  },
  {
    header: "Simple",
    text: "tool, which works without overhelming you",
  },
  {
    header: "Easy to start",
    text: "register with few clicks and you are ready to go",
  },
  {
    header: "Unlimited",
    text: "have as many links as you want, we don't limit you",
  },
];

const Features: NextPage = () => {
  return (
    <div id="features" className="section centered flex-col">
      <h3 className="text-3xl mb-8">Features</h3>
      <div className="flex flex-wrap justify-center">
        {features.map((feature) => {
          return (
            <Feature
              key={feature.header}
              header={feature.header}
              text={feature.text}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Features;

export type FeatureProps = {
  text: string;
  header: string;
};
const Feature: React.FC<FeatureProps> = ({ text, header }) => {
  return (
    <div className="max-w-sm p-4 ">
      <div className="flex h-full flex-col rounded-lg bg-grey-400 p-8 dark:bg-gray-50 shadow-grey-200 shadow-md ">
        <div className="mb-3 flex items-center">
          <h2 className="text-2xl font-bold text-grey-800 dark:text-grey-800">
            {header}
          </h2>
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <p className="text-base leading-relaxed text-white dark:text-gray-800">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};