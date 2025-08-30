let selectedVehicle = "";

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkmode-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
});

function selectUrgency(isUrgent) {
  if (isUrgent) {
    alert("Bitte rufen Sie sofort die Notfallnummer an!");
  } else {
    document.getElementById('urgency').style.display = 'none';
    document.getElementById('vehicle-selection').style.display = 'block';
  }
}

function goToCategory(vehicle) {
  selectedVehicle = vehicle;
  document.getElementById('vehicle-selection').style.display = 'none';
  document.getElementById('category-selection').style.display = 'block';
}

function showInstructions(category) {
  document.getElementById('category-selection').style.display = 'none';
  document.getElementById('instructions').style.display = 'block';

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
}