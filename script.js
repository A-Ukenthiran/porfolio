// Light / dark theme toggle. Saved locally in this browser.
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const themeColorMeta = document.getElementById("themeColorMeta");
const savedTheme = localStorage.getItem("ukenthiran-theme");
const preferredTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const dark = theme === "dark";
  themeIcon.className = dark ? "bi bi-sun" : "bi bi-moon-stars";
  themeLabel.textContent = dark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  themeColorMeta.setAttribute("content", dark ? "#22223B" : "#F2E9E4");
}
applyTheme(savedTheme || preferredTheme);
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem("ukenthiran-theme", nextTheme);
  applyTheme(nextTheme);
});

// ===== PERSONAL CONFIGURATION =====
// Get a free access key at https://web3forms.com/ using a.ukenthiran@gmail.com
const WEB3FORMS_ACCESS_KEY = "8a28fea6-5f25-41c6-9ca5-4fea79149cf4";
// Enter your WhatsApp number with country code, without +, spaces or dashes.
const WHATSAPP_NUMBER = "919600165024";
const WHATSAPP_MESSAGE = "Hi Ukenthiran, I saw your portfolio and would like to discuss a website project.";

document.getElementById("year").textContent = new Date().getFullYear();

// Reveal elements when they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Scroll progress.
const progressBar = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + "%";
}, { passive: true });

// WhatsApp links.
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
["whatsappFloat", "asideWhatsapp"].forEach(id => {
  const link = document.getElementById(id);
  if (link) link.href = whatsappUrl;
});

// Close mobile navigation after selecting a section.
document.querySelectorAll("#mainNav .nav-link, #mainNav .nav-cta").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});

// Multi-step enquiry form.
const form = document.getElementById("projectForm");
const steps = [...document.querySelectorAll(".form-step")];
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const progressFill = document.getElementById("progressFill");
const stepCaption = document.getElementById("stepCaption");
const stepName = document.getElementById("stepName");
const alertBox = document.getElementById("formAlert");
const successPanel = document.getElementById("successPanel");
const stepNames = ["YOUR DETAILS", "PROJECT BRIEF", "FEATURES & BUDGET", "TIMELINE"];
let currentStep = 0;

function updateStep() {
  steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
  progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  stepCaption.textContent = `STEP ${String(currentStep + 1).padStart(2, "0")} / 04`;
  stepName.textContent = stepNames[currentStep];
  prevBtn.hidden = currentStep === 0;
  nextBtn.hidden = currentStep === steps.length - 1;
  submitBtn.hidden = currentStep !== steps.length - 1;
  alertBox.textContent = "";
}

function validateCurrentStep() {
  const activeStep = steps[currentStep];
  const requiredFields = [...activeStep.querySelectorAll("[required]")];
  for (const field of requiredFields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

nextBtn.addEventListener("click", () => {
  if (!validateCurrentStep()) return;
  currentStep = Math.min(currentStep + 1, steps.length - 1);
  updateStep();
});
prevBtn.addEventListener("click", () => {
  currentStep = Math.max(currentStep - 1, 0);
  updateStep();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateCurrentStep()) return;
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.includes("PASTE_YOUR")) {
    alertBox.textContent = "Please add your Web3Forms access key in script.js before testing the form.";
    return;
  }
  const data = new FormData(form);
  data.set("access_key", WEB3FORMS_ACCESS_KEY);
  data.set("features", [...form.querySelectorAll('input[name="features"]:checked')].map(el => el.value).join(", ") || "Not specified");
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending... <span class="spinner-border spinner-border-sm ms-2" aria-hidden="true"></span>';
  alertBox.textContent = "";
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });
    const result = await response.json();
    if (response.ok && result.success) {
      form.hidden = true;
      successPanel.hidden = false;
    } else {
      throw new Error(result.message || "Your enquiry could not be sent. Please try again.");
    }
  } catch (error) {
    alertBox.textContent = error.message || "Something went wrong. Please email me directly.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send enquiry <i class="bi bi-send ms-2"></i>';
  }
});

document.getElementById("newEnquiry").addEventListener("click", () => {
  form.reset();
  form.hidden = false;
  successPanel.hidden = true;
  currentStep = 0;
  updateStep();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});
