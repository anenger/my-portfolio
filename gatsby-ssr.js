// Adds lang attribute to the body element
export function onRenderBody({ setHtmlAttributes }) {
  setHtmlAttributes({ lang: "en" });
}
