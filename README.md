# WikiStöria – Subcategories Enable Patch

Dieses Patch macht die Unterordner sichtbar, **ohne** dass du deine `index.html` anfassen musst.
Es erkennt automatisch `content/<fahrzeug>/<kategorie>/_index.json` und zeigt dafür ein Untermenü.

## Installation
1. Ersetze deine `app.js` mit der beiliegenden Version.
2. Stelle sicher, dass deine Unterordner-Struktur existiert, z.B.:
   ```
   content/dpz/reset/_index.json
   content/dpz/reset/abtrennung-von-motordrehgestellen.html
   content/dpz/reset/leittechnik-reset.html
   ```
3. Hart neu laden (PC: Ctrl/Cmd+Shift+R, Handy: Cache leeren).

## Wie es funktioniert
- Deine bestehenden Klicks wie `showInstructions('reset')` bleiben gleich.
- Das Skript versucht zuerst `content/<v>/<k>/_index.json`. Wenn vorhanden → Unterkachel-Menü.
- Wenn nicht vorhanden → lädt wie bisher `content/<v>/<k>.html`.

Viel Erfolg!
