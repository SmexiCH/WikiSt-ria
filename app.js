let selectedVehicle = "";

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
        case "bremsen":
            instructionText = "🛑 Überprüfen Sie die Bremsen des Fahrzeugs.";
            break;
        case "fahrsperre":
            instructionText = "🚦 Kontrollieren Sie die Fahrsperre und starten Sie neu.";
            break;
        case "elektronik":
            instructionText = "⚡ Überprüfen Sie die Elektronik.";
            break;
        default:
            instructionText = "Befolgen Sie die allgemeinen Wartungsrichtlinien.";
    }

    document.getElementById('instruction-text').textContent =
        "Fahrzeug: " + selectedVehicle + "\n\n" + instructionText;
}