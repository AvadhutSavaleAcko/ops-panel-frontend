export const scrollIntoViewWrapper = (element, blockType = "center") => {
  const target = document.getElementById(element);
  // disableBodyScroll(target);
  target &&
    target?.scrollIntoView({
      behavior: "smooth",
      //@ts-ignore
      block: blockType,
      inline: "center"
    });
};
