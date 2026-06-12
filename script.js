const services = {
  leak: {
    title: "Leak Repair",
    desc: "Targeted repairs for fixture leaks, supply lines, valves, and moisture concerns before they become larger damage.",
    signs: ["Water stains or soft drywall", "Running meter with fixtures off", "Musty cabinet odors", "Dripping valves or supply lines"],
    included: ["Leak source check", "Shutoff and pressure review", "Repair options", "Cleanup and flow test"],
    time: "Estimated time: 1-3 hours",
    price: "Starting at $189"
  },
  drain: {
    title: "Drain Cleaning",
    desc: "Professional clearing for slow or blocked sinks, tubs, showers, kitchen drains, and accessible branch lines.",
    signs: ["Slow draining fixtures", "Gurgling sounds", "Recurring clogs", "Odors near drains"],
    included: ["Drain diagnosis", "Cable or auger clearing", "Fixture trap review", "Final flow test"],
    time: "Estimated time: 60-90 minutes",
    price: "Starting at $149"
  },
  heater: {
    title: "Water Heater Repair",
    desc: "Service for inconsistent hot water, leaks, noise, pilot or ignition trouble, and safety control concerns.",
    signs: ["No hot water", "Rust-colored water", "Popping or rumbling", "Moisture near tank"],
    included: ["Safety check", "Temperature review", "Tank and valve inspection", "Repair or replacement quote"],
    time: "Estimated time: 90-150 minutes",
    price: "Starting at $229"
  },
  emergency: {
    title: "Emergency Plumbing",
    desc: "Priority response for active leaks, backups, burst pipes, and plumbing failures that need immediate stabilization.",
    signs: ["Active water leak", "Sewer backup", "Burst pipe", "Loss of hot water"],
    included: ["Phone triage", "Priority dispatch", "Temporary stabilization", "Written repair plan"],
    time: "Estimated time: 45-90 minutes for initial visit",
    price: "Starting at $249"
  },
  pipe: {
    title: "Pipe Repair",
    desc: "Repair for damaged copper, PEX, PVC, drain piping, and fixture connections using suitable materials.",
    signs: ["Visible corrosion", "Low pressure", "Noisy pipes", "Localized water damage"],
    included: ["Pipe inspection", "Material matching", "Section repair", "Pressure and leak test"],
    time: "Estimated time: 2-4 hours",
    price: "Starting at $275"
  },
  toilet: {
    title: "Toilet Repair",
    desc: "Repair for running toilets, leaks, weak flushes, clogs, damaged seals, and loose fixtures.",
    signs: ["Constant running", "Water at base", "Frequent clogs", "Weak or double flush"],
    included: ["Tank part check", "Clog diagnosis", "Seal and flange review", "Flush test"],
    time: "Estimated time: 60-120 minutes",
    price: "Starting at $165"
  },
  disposal: {
    title: "Garbage Disposal Repair",
    desc: "Kitchen disposal service for jams, leaks, electrical issues, and drain connection problems.",
    signs: ["Humming but not spinning", "Leaking under sink", "Bad odors", "Frequent resets"],
    included: ["Jam inspection", "Electrical reset check", "Drain connection review", "Repair or replacement options"],
    time: "Estimated time: 45-90 minutes",
    price: "Starting at $145"
  }
};

const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalSigns = document.getElementById("modalSigns");
const modalIncluded = document.getElementById("modalIncluded");
const modalTime = document.getElementById("modalTime");
const modalPrice = document.getElementById("modalPrice");

function fillList(node, items) {
  node.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    node.appendChild(li);
  });
}

document.querySelectorAll("[data-service]").forEach(card => {
  card.addEventListener("click", () => {
    const service = services[card.dataset.service];
    modalTitle.textContent = service.title;
    modalDesc.textContent = service.desc;
    fillList(modalSigns, service.signs);
    fillList(modalIncluded, service.included);
    modalTime.textContent = service.time;
    modalPrice.textContent = service.price;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeDialogs() {
  document.querySelectorAll(".modal.open, .lightbox.open").forEach(dialog => {
    dialog.classList.remove("open");
    dialog.setAttribute("aria-hidden", "true");
  });
}
document.querySelectorAll(".modal-close").forEach(btn => btn.addEventListener("click", closeDialogs));
document.querySelectorAll(".modal a[href^='#']").forEach(link => link.addEventListener("click", closeDialogs));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDialogs();
});
document.querySelectorAll(".modal, .lightbox").forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeDialogs();
  });
});

const estimateService = document.getElementById("estimateService");
const estimateUrgency = document.getElementById("estimateUrgency");
const estimateOutput = document.getElementById("estimateOutput");
function updateEstimate() {
  const base = Number(estimateService.value);
  const urgency = Number(estimateUrgency.value);
  const low = base + urgency;
  const high = low + Math.round(base * 0.65);
  estimateOutput.textContent = `$${low}-$${high} estimated starting range`;
}
estimateService?.addEventListener("change", updateEstimate);
estimateUrgency?.addEventListener("change", updateEstimate);
updateEstimate();

const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");
    const category = filter.dataset.filter;
    galleryItems.forEach(item => {
      item.classList.toggle("hidden", category !== "all" && item.dataset.category !== category);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.img;
    lightboxImg.alt = item.dataset.title;
    lightboxCaption.textContent = `${item.dataset.title} • ${item.dataset.category}`;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = new FormData(form).get("name") || "there";
  document.getElementById("formNote").textContent = `Thanks, ${name}. This demo form is ready for integration with a booking or email service.`;
  form.reset();
});
