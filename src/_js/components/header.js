export default () => {
  const toggleActive = e => {
    e.preventDefault();

    const header = document.querySelector("header");
    header.classList.toggle("active");

    const main = document.querySelector(".main-cover");
    main.classList.toggle("active");

    const btnx = document.querySelector(".menu-btn");
    btnx.classList.toggle("active");
  };

  const btn = document.querySelector(".menu-btn");
  btn.addEventListener("click", toggleActive);

  const mainc = document.querySelector(".main-cover");
  mainc.addEventListener("click", toggleActive);
};
