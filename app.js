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
  if (category === "fahrsperre" && selectedVehicle.includes("DPZ")) {
    let instructionHTML = `
      <h3>Fahrsperre aktiv</h3>
      <p><strong>Ausgangslage:</strong></p>
      <ul>
        <li>Fst. ist aufgerüstet</li>
        <li>Lf kann keine Traktion aufbauen. Fahrsperre leuchtet</li>
      </ul>
      <p><strong>Behebungsmassnahmen:</strong></p>
      <ul>
        <li>EP-Bremshebel auf Endstellung kontrollieren (EP Hebel nochmals ziehen und lösen)</li>
        <li>Wendeschalter in Fahrtrichtung stellen (Kontrolle ob Sicherheitseinrichtungen angesprochen haben)</li>
        <li>Federspeicherbremse lose kontrollieren
          <ul>
            <li>Falls Federspeicherbremse nicht löst (Fsp. Lampe leuchtet dauernd): Fz nochmals in Parkstellung bringen, und erneut aus Park nehmen</li>
          </ul>
        </li>
        <li>Kontrolle Türschlaufe/Türschliessung</li>
        <li>Kontrolle Luftvorrat (HL+SL)</li>
        <li>Hauptschalter/Stromabnehmer ein?</li>
        <li>Bei mehreren Einheiten Kontrolle ob alle auf Präsenz vorhanden</li>
        <li>Federspeicherbremse Notgelöst? (Kleiner Kasten aussen an DG Bt/AB Offen?)</li>
      </ul>
    `;

    document.getElementById('instruction-text').innerHTML =
      "<strong>Fahrzeug: " + selectedVehicle + "</strong><br><br>" + instructionHTML;

    navigateTo('instructions');
    return;
  }

  if (category === "reset" && selectedVehicle.includes("DPZ")) {
    navigateTo('submenu-reset');
    return;
  }

  document.getElementById('instruction-text').innerHTML =
    "<strong>Fahrzeug: " + selectedVehicle + "</strong><br><br>" +
    "<p>Keine spezifische Anleitung verfügbar für: <em>" + category + "</em></p>";
  navigateTo('instructions');
}

function showSubInstruction(topic) {
  let text = "";
  switch (topic) {
    case "motordrehgestelle":
      text = "<h3>Abtrennung von Motordrehgestellen (nur DPZ)</h3><p>Hier folgt die Anleitung …</p>";
      break;
    case "leittechnik":
      text = "<h3>Leittechnik Reset (nur DPZ)</h3><p>Hier folgt die Anleitung …</p>";
      break;
    case "funk":
      text = "<h3>Funk Reset (nur DPZ)</h3><p>Hier folgt die Anleitung …</p>";
      break;
  }

  document.getElementById('instruction-text').innerHTML =
    "<strong>Fahrzeug: " + selectedVehicle + "</strong><br><br>" + text;
  navigateTo('instructions');
}