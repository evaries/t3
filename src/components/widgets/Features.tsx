import { type NextPage } from "next";
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
      <h3 className="mb-8 text-3xl">Features</h3>
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
      <div className="bg-grey-400 shadow-grey-200 flex h-full flex-col rounded-lg p-8 shadow-md dark:bg-gray-50 ">
        <div className="mb-3 flex items-center">
          <h2 className="text-grey-800 dark:text-grey-800 text-2xl font-bold">
            {header}
          </h2>
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <p className="text-base leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
};
