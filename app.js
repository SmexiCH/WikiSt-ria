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
  let instructionText = "";

  switch (category) {
    case "fahrsperre":
      instructionText = "Kategorie: Fahrsperre\nAnleitung für " + selectedVehicle;
      break;
    case "reset":
      instructionText = "Kategorie: Reset\nAnleitung für " + selectedVehicle;
      break;
    case "leittechnik":
      instructionText = "Kategorie: Leittechnik\nAnleitung für " + selectedVehicle;
      break;
    case "pneumatik":
      instructionText = "Kategorie: Pneumatik\nAnleitung für " + selectedVehicle;
      break;
    case "bremsen":
      instructionText = "Kategorie: Bremsen\nAnleitung für " + selectedVehicle;
      break;
    case "zugbeeinflussung":
      instructionText = "Kategorie: Zugbeeinflussung\nAnleitung für " + selectedVehicle;
      break;
    case "teloc":
      instructionText = "Kategorie: TELOC / V-Messer\nAnleitung für " + selectedVehicle;
      break;
    case "schleppen":
      instructionText = "Kategorie: Schleppen\nAnleitung für " + selectedVehicle;
      break;
    case "tueren":
      instructionText = "Kategorie: Türen\nAnleitung für " + selectedVehicle;
      break;
    case "kupplung":
      instructionText = "Kategorie: Kupplung\nAnleitung für " + selectedVehicle;
      break;
    case "hlk":
      instructionText = "Kategorie: HLK\nAnleitung für " + selectedVehicle;
      break;
    case "funk":
      instructionText = "Kategorie: KIS/TIMS/Funk\nAnleitung für " + selectedVehicle;
      break;
    case "wc":
      instructionText = "Kategorie: WC\nAnleitung für " + selectedVehicle;
      break;
    case "dokumente":
      instructionText = "Kategorie: Dokumente\nAnleitung für " + selectedVehicle;
      break;
    default:
      instructionText = "Allgemeine Anleitung.";
  }

  document.getElementById('instruction-text').textContent =
    "Fahrzeug: " + selectedVehicle + "\n\n" + instructionText;

  navigateTo('instructions');
}