import { useSelector } from "react-redux";

export const getIsVisible = ({ id }) => {
  const is_visible = useSelector(({ configuration }: any) => {
    return configuration?.normalisedConfig[id]?.props?.is_visible;
  });

  return is_visible;
};
