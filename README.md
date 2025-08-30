# Wikistörja - Prototyp V2

Dies ist die erweiterte Version des Mini-Prototyps für die App *Wikistörja*.  
Lokführer können ein Fahrzeug auswählen und dann aus 14 Kategorien die passende Störungsklasse aufrufen.

## Funktionen
- Auswahl, ob die Störung **dringend** ist oder nicht
- Fahrzeugauswahl (Kachel-Design)
  - Re 450 (DPZ)
  - RABe 514 (DTZ)
  - RABe 511 (RVD)
  - Re 420 (HVZ-D)
- 14 Störungskategorien pro Fahrzeug
- Anzeige von **Platzhalter-Anleitungen** (für spätere Inhalte)

## Aufbau
- **index.html** → Grundstruktur der App
- **style.css** → Modernes Design (mobilfreundlich, Kachel-Layout)
- **app.js** → Logik zur Navigation und Anzeige der Kategorien/Anleitungen

## Nutzung
1. Repository klonen oder ZIP herunterladen
2. `index.html` im Browser öffnen
3. Fahrzeug + Kategorie auswählen und Anleitungen anzeigen lassen

---
✉️ Inhalte können direkt in `app.js` im `switch(category)` ergänzt werden.
