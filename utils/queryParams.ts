const getParameterByName = (name, url = window.location.href) => {
  const sanitizedName = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${sanitizedName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) return null;
  return results[2] ? decodeURIComponent(results[2].replace(/\+/g, " ")) : "";
};

export default getParameterByName;
