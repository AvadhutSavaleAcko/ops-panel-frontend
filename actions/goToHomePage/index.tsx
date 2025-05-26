// TODO: make this action type work via window location 
export const GoToHomePage = (args, blockType = "center") => {
  const elementId = args?.ids?.[0] || "";
  const target = document?.getElementById(elementId);
  if (!target) return;
  target?.scrollIntoView({
    behavior: "smooth",
    //@ts-ignore
    block: blockType,
    inline: "center"
  });
};
