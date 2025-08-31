let selectedVehicle = "";
let historyStack = [];

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkmode-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });

  navigateTo('urgency');
});

function navigateTo(id) {
  document.querySelectorAll(".container > div").forEach(div => {
    div.style.display = "none";
  });
  if (historyStack.length === 0 || historyStack[historyStack.length-1] !== id) {
    historyStack.push(id);
  }
  document.getElementById(id).style.display = "block";
  document.getElementById("back-btn").style.display =
    historyStack.length > 1 ? "block" : "none";
}

function goBack() {
  historyStack.pop();
  const prev = historyStack.pop();
  if (prev) navigateTo(prev);
}

function selectUrgency(isUrgent) {
  if (isUrgent) {
    alert("📞 Anruf an Helpdesk 051 222 18 53!");
  } else {
    navigateTo('vehicle-selection');
  }
}

function goToCategory(vehicle) {
  selectedVehicle = vehicle;
  navigateTo('category-selection');
}

function showInstructions(category) {
  let vehicleKey = "";
  if (selectedVehicle.includes("DPZ")) vehicleKey = "dpz";
  else if (selectedVehicle.includes("DTZ")) vehicleKey = "dtz";
  else if (selectedVehicle.includes("RVD")) vehicleKey = "rvd";
  else if (selectedVehicle.includes("HVZ")) vehicleKey = "hvzd";

  fetch(`content/${vehicleKey}/${category}.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('instruction-text').innerHTML =
        `<strong>Fahrzeug: ${selectedVehicle}</strong><br><br>` + data;
      navigateTo('instructions');
    })
    .catch(() => {
      document.getElementById('instruction-text').innerHTML =
        `<strong>Fahrzeug: ${selectedVehicle}</strong><br><br><p>Keine Anleitung gefunden für: <em>${category}</em></p>`;
      navigateTo('instructions');
    });
}