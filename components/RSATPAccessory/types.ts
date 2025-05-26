export interface RSATPAccessoryProps {
  badge: {
    text: string;
    type: "PREMIUM" | "STANDARD";
  };
  heading: string;
  coverImage: {
    alt: string;
    width: number;
    height: number;
    imgSrc: string;
  };
  removeCtaText: string;
  primaryCtaText: string;
  price: {
    net_premium: number;
    gross_premium: number;
    gst: {
      gst: number;
    };
  };
  sum_assured_value: number;
  is_selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}
