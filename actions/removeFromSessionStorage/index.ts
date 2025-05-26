export const removeFromSessionStorage = (props) => {
  const { key } = props;
  try {
    return sessionStorage?.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
