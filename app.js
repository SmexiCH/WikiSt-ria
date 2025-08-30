let selectedVehicle = "";
let historyStack = [];

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkmode-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
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
  let instructionText = "Kategorie: " + category + "\nAnleitung für " + selectedVehicle;
  document.getElementById('instruction-text').textContent =
    "Fahrzeug: " + selectedVehicle + "\n\n" + instructionText;
  navigateTo('instructions');
}