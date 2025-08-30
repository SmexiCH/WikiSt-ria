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
  if (selectedVehicle.includes("DPZ")) {
    if (category === "fahrsperre") {
      let instructionText =
        "Fahrsperre aktiv\n\n" +
        "Ausgangslage:\n" +
        "- Fst. ist aufgerüstet\n" +
        "- Lf kann keine Traktion aufbauen. Fahrsperre leuchtet\n\n" +
        "Behebungsmassnahmen:\n" +
        "- EP-Bremshebel auf Endstellung kontrollieren (EP Hebel nochmals ziehen und lösen)\n" +
        "- Wendeschalter in Fahrtrichtung stellen (Kontrolle ob Sicherheitseinrichtungen angesprochen haben)\n" +
        "- Federspeicherbremse lose kontrollieren\n" +
        "  * Falls Federspeicherbremse nicht löst (Fsp. Lampe leuchtet dauernd): Fz nochmals in Parkstellung bringen, und erneut aus Park nehmen\n" +
        "- Kontrolle Türschlaufe/Türschliessung\n" +
        "- Kontrolle Luftvorrat (HL+SL)\n" +
        "- Hauptschalter/Stromabnehmer ein?\n" +
        "- Bei mehreren Einheiten Kontrolle ob alle auf Präsenz vorhanden\n" +
        "- Federspeicherbremse Notgelöst? (Kleiner Kasten aussen an DG Bt/AB Offen?)";
      
      document.getElementById('instruction-text').textContent =
        "Fahrzeug: " + selectedVehicle + "\n\n" + instructionText;
      navigateTo('instructions');
      return;
    }

    if (category === "reset") {
      navigateTo('submenu-reset');
      return;
    }
  }

  document.getElementById('instruction-text').textContent =
    "Fahrzeug: " + selectedVehicle + "\n\nKeine spezifische Anleitung verfügbar für: " + category;
  navigateTo('instructions');
}

function showSubInstruction(topic) {
  let text = "";
  switch (topic) {
    case "motordrehgestelle":
      text = "Anleitung: Abtrennung von Motordrehgestellen (nur DPZ)";
      break;
    case "leittechnik":
      text = "Anleitung: Leittechnik Reset (nur DPZ)";
      break;
    case "funk":
      text = "Anleitung: Funk Reset (nur DPZ)";
      break;
  }

  document.getElementById('instruction-text').textContent =
    "Fahrzeug: " + selectedVehicle + "\n\n" + text;
  navigateTo('instructions');
}