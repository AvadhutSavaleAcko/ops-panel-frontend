import React, { useState } from "react";
import RSATPAccessory from "./index";

const Example: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
  };

  const handleRemove = () => {
    setIsSelected(false);
  };

  return (
    <RSATPAccessory
      badge={{
        text: "Peace of mind cover",
        type: "PREMIUM"
      }}
      heading="Select Extra Car Protection variant"
      coverImage={{
        alt: "extra_car_protect_icon",
        width: 80,
        height: 80,
        imgSrc:
          "https://storefront-consumer-assets.s3.ap-south-1.amazonaws.com/static/sdui-addons/key_protect.svg"
      }}
      removeCtaText="Remove"
      primaryCtaText="Add cover"
      price={{
        net_premium: 799,
        gross_premium: 942.82,
        gst: {
          gst: 143.82
        }
      }}
      sum_assured_value={5000000}
      is_selected={isSelected}
      onSelect={handleSelect}
      onRemove={handleRemove}
    />
  );
};

export default Example;
