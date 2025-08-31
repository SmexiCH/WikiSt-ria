# Recursive Subcategories Patch (Exact-Mode)

Dieser Patch ergänzt NUR die Logik, dass Unterordner wieder als eigene, klickbare Felder erscheinen – und zwar beliebig tief (Unterordner von Unterordnern). Design/Grössen/Darkmode bleiben unverändert.

## Installation
1) `app.js` in deinem Repo durch die beiliegende Version ersetzen.
2) Hart neu laden (PC: Ctrl/Cmd+Shift+R, Handy: Cache leeren).

## Strukturregeln für Inhalte
- Einstieg: `showInstructions('kategorie')` (unverändert).
- Für ein **Untermenü** lege in `content/<fahrzeug>/<kategorie>/` eine Datei **`_index.json`** an:
  ```json
  {
    "title": "Untermenü-Titel",
    "items": [
      { "key": "teil-a", "label": "Teil A", "emoji": "🛠️" },
      { "key": "teil-b", "label": "Teil B" }
    ]
  }
  ```
- Für jeden Eintrag:
  - **Unterordner-Menü**: eigener Ordner `content/<fahrzeug>/<kategorie>/teil-a/` mit eigener **`_index.json`**.
  - **Blatt/Seite**: Datei `content/<fahrzeug>/<kategorie>/teil-a.html` (normales HTML mit deiner Anleitung).

> Faustregel: Ordner mit `_index.json` = neues klickbares Feld.  
> Datei `<name>.html` = End-Seite mit Inhalt.

Damit kannst du beliebig tief verschachteln – jeder Knoten kann wieder ein neues Menü sein.
