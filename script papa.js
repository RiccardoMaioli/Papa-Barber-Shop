// Menu mobile
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Anno nel footer
document.getElementById("year").textContent = new Date().getFullYear();

// Evidenzia il giorno corrente negli orari
const rows = document.querySelectorAll(".hours tr");
const map = [6, 0, 1, 2, 3, 4, 5]; // getDay(): 0 = domenica
if (rows.length === 7) rows[map[new Date().getDay()]].classList.add("today");

// Animazione allo scroll
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}
