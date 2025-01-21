const mount = () => {
  document.getElementById("hello").onclick = () => {
    console.log("Hello static");
  };
};

globalThis.addEventListener("load", () => {
  mount();
});
