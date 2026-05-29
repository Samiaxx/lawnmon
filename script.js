const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const GA_MEASUREMENT_ID = "";

if (GA_MEASUREMENT_ID) {
  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(analyticsScript);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll("section:not(.hero):not(.page-hero):not(.service-hero), article").forEach((element) => {
  element.classList.add("reveal");
  if (observer) observer.observe(element);
});

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    if (location.protocol !== "file:" && !location.hostname.includes("localhost")) return;
    event.preventDefault();
    const note = form.querySelector("[data-form-note]");
    if (note) note.hidden = false;
  });
});
