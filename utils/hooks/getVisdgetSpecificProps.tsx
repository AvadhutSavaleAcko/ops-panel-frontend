import { useSelector } from "react-redux";

export const getIsVisible = ({ id }) => {
  const props = useSelector(({ configuration }: any) => {
    return configuration?.normalisedConfig[id]?.props;
  });

  return props;
};
