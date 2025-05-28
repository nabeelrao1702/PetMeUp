import  { useState } from "react";
import BasicPricing from "./BasicPricing";
import StandardPricing from "./StandardPricing";
import PremiumPricing from "./PremiumPricings";

const GigPricingTable = ({ basic, standard, premium }) => {
  const [basicPricing, setBasicPricing] = useState(true);
  const [standardPricing, setStandardPricing] = useState(false);
  const [premiumPricing, setPremiumPricing] = useState(false);

  const basicPricingHandler = () => {
    setBasicPricing(true);
    setStandardPricing(false);
    setPremiumPricing(false);
  };

  const standardPricingHandler = () => {
    setBasicPricing(false);
    setStandardPricing(true);
    setPremiumPricing(false);
  };

  const premiumPricingHandler = () => {
    setBasicPricing(false);
    setStandardPricing(false);
    setPremiumPricing(true);
  };

  return (
    <div>
      <div className="item bg-gray-100 border-b ">
        <div className="grid overflow-hidden divide-x text-lg justify-evenly items-center font-bold tracking-wide text-left text-black-600 border-b cursor-pointer grid-cols-3 grid-rows-1  text-center w-auto h-auto">
          {/* <div
            onClick={basicPricingHandler}
            className={
              basicPricing
                ? "box underline text-gray-500 my-4"
                : "box hover:underline hover:text-gray-500 "
            }
          >
            User's Budget
          </div> */}
          <div
            onClick={standardPricingHandler}
            className={
              standardPricing
                ? "box text-gray-500 my-4"
                : "box hover:underline hover:text-gray-500 "
            }
          >
            Request 
          </div>
          {/* <div
            onClick={premiumPricingHandler}
            className={
              premiumPricing
                ? "box underline text-gray-500 my-4"
                : "box hover:underline hover:text-gray-500 "
            }
          >
            Premium
          </div> */}
        </div>
      </div>
      {/* {basicPricing && <BasicPricing basic={basic} />} */}
      {standardPricing && <StandardPricing standard={standard} />}
      {/* {premiumPricing && <PremiumPricing premium={premium} />} */}
    </div>
  );
};

export default GigPricingTable;
