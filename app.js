// WikiStöria - app.js with theme persistence (light/dark)
let selectedVehicle = "";
let historyStack = [];

// --- Theme helpers ---
function applyLight() {
  document.body.classList.add("light");
  const t = document.getElementById("darkmode-toggle");
  if (t) t.textContent = "☀️";
  try { localStorage.setItem("theme", "light"); } catch {}
}
function applyDark() {
  document.body.classList.remove("light");
  const t = document.getElementById("darkmode-toggle");
  if (t) t.textContent = "🌙";
  try { localStorage.setItem("theme", "dark"); } catch {}
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkmode-toggle");

  // 1) Load saved choice
  let saved;
  try { saved = localStorage.getItem("theme"); } catch { saved = null; }
  if (saved === "light") applyLight();
  else if (saved === "dark") applyDark();
  // 2) Fallback: OS preference on first visit
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyLight();
  } else {
    applyDark(); // default
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (document.body.classList.contains("light")) applyDark();
      else applyLight();
    });
  }

  navigateTo("urgency");
});

// --- Navigation ---
function navigateTo(id) {
  document.querySelectorAll(".container > div").forEach(div => div.style.display = "none");
  if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== id) {
    historyStack.push(id);
  }
  const view = document.getElementById(id);
  if (view) view.style.display = "block";
  const back = document.getElementById("back-btn");
  if (back) back.style.display = historyStack.length > 1 ? "block" : "none";
}

function goBack() {
  historyStack.pop();
  const prev = historyStack.pop();
  if (prev) navigateTo(prev);
}

// --- Flow handlers ---
function selectUrgency(isUrgent) {
  if (isUrgent) {
    alert("📞 Anruf an Helpdesk 051 222 18 53!");
  } else {
    navigateTo("vehicle-selection");
  }
}

function goToCategory(vehicle) {
  selectedVehicle = vehicle;
  navigateTo("category-selection");
}

function showInstructions(category) {
  let vehicleKey = "";
  if (selectedVehicle.includes("DPZ")) vehicleKey = "dpz";
  else if (selectedVehicle.includes("DTZ")) vehicleKey = "dtz";
  else if (selectedVehicle.includes("RVD")) vehicleKey = "rvd";
  else if (selectedVehicle.includes("HVZ")) vehicleKey = "hvzd";

  fetch(`content/${vehicleKey}/${category}.html`)
    .then(r => r.text())
    .then(data => {
      const el = document.getElementById("instruction-text");
      if (el) el.innerHTML = `<strong>Fahrzeug: ${selectedVehicle}</strong><br><br>` + data;
      navigateTo("instructions");
    })
    .catch(() => {
      const el = document.getElementById("instruction-text");
      if (el) el.innerHTML = `<strong>Fahrzeug: ${selectedVehicle}</strong><br><br><p>Keine Anleitung gefunden für: <em>${category}</em></p>`;
      navigateTo("instructions");
    });
}
