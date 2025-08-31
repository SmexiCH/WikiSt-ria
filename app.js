// WikiStöria - Recursive Subcategories Patch (Exact-Mode)
// - Fügt NUR die Logik hinzu, dass Unterordner erneut als klickbare Felder erscheinen (beliebig tief).
// - Keine Änderungen am Design, keine Button-Grössen, kein Darkmode-Verhalten.
// - Funktioniert weiterhin mit showInstructions('kategorie').

let selectedVehicle = "";
let historyStack = [];
let currentCategory = "";

// --- Theme (unverändert) ---
function applyLight(){document.body.classList.add("light");const t=document.getElementById("darkmode-toggle");if(t)t.textContent="☀️";try{localStorage.setItem("theme","light");}catch{}}
function applyDark(){document.body.classList.remove("light");const t=document.getElementById("darkmode-toggle");if(t)t.textContent="🌙";try{localStorage.setItem("theme","dark");}catch{}}

document.addEventListener("DOMContentLoaded",()=>{
  const toggleBtn=document.getElementById("darkmode-toggle");
  let saved=null;try{saved=localStorage.getItem("theme");}catch{}
  if(saved==="light") applyLight();
  else if(saved==="dark") applyDark();
  else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) applyLight();
  else applyDark();
  if(toggleBtn){toggleBtn.addEventListener("click",()=>{if(document.body.classList.contains("light")) applyDark(); else applyLight();});}

  ensureSubcatView();
  if (document.getElementById('urgency')) navigateTo('urgency');
  else if (document.getElementById('vehicle-selection')) navigateTo('vehicle-selection');
  else navigateTo('category-selection');
});

function ensureSubcatView(){
  const container = document.querySelector('.container');
  if(!container) return;
  if(!document.getElementById('subcat-selection')){
    const sub = document.createElement('div');
    sub.id = 'subcat-selection';
    sub.style.display = 'none';
    sub.innerHTML = '<h2 id="subcat-title">Unterbereich wählen</h2><div class="category-grid" id="subcat-grid"></div>';
    container.appendChild(sub);
  }
}

function navigateTo(id){
  document.querySelectorAll('.container > div').forEach(d=>d.style.display='none');
  if(historyStack.length===0 || historyStack[historyStack.length-1]!==id) historyStack.push(id);
  const el = document.getElementById(id); if(el) el.style.display='block';
  const back = document.getElementById('back-btn'); if(back) back.style.display = historyStack.length>1 ? 'block' : 'none';
}

function goBack(){ historyStack.pop(); const prev=historyStack.pop(); if(prev) navigateTo(prev); }

// --- Öffentliche API, bleibt kompatibel ---
function selectUrgency(isUrgent){ if(isUrgent){ alert('📞 Anruf an Helpdesk 051 222 18 53!'); } else { navigateTo('vehicle-selection'); } }
function goToCategory(vehicle){ selectedVehicle = vehicle; navigateTo('category-selection'); }

function vehicleKeyFromName(){
  if (selectedVehicle && selectedVehicle.includes('DPZ')) return 'dpz';
  if (selectedVehicle && selectedVehicle.includes('DTZ')) return 'dtz';
  if (selectedVehicle && selectedVehicle.includes('RVD')) return 'rvd';
  if (selectedVehicle && selectedVehicle.includes('HVZ')) return 'hvzd';
  return 'dpz';
}

// ---- RECURSIVE SUBCATS ----
// showInstructions(category) bleibt Einstiegspunkt.
// Es versucht zuerst einen Unterordner (/_index.json).
// Wenn keiner vorhanden: lädt content-HTML.
function showInstructions(category){
  currentCategory = category;
  const vkey = vehicleKeyFromName();
  openPathRecursive(`content/${vkey}/${category}`);
}

// Kern: Öffnet einen Pfad rekursiv
// 1) Gibt es <path>/_index.json ? → Unterkachel-Menü bauen (Items klicken → erneut openPathRecursive(path/item.key))
// 2) Sonst: <path>.html laden und anzeigen (Blatt/Ende).
function openPathRecursive(path){
  fetch(`${path}/_index.json`, {cache:'no-store'}).then(r=>{
    if(!r.ok) throw new Error('no subcats here');
    return r.json();
  }).then(data=>{
    const title = (data && data.title) ? data.title : 'Unterbereich wählen';
    const items = Array.isArray(data.items) ? data.items : [];
    buildSubcatGrid(title, path, items);
    navigateTo('subcat-selection');
  }).catch(()=>{
    // Kein _index.json → versuche <path>.html
    fetch(`${path}.html`, {cache:'no-store'}).then(r=>r.text()).then(html=>{
      const t = document.getElementById('instruction-text');
      if(t) t.innerHTML = `<strong>Fahrzeug: ${selectedVehicle||'DPZ'}</strong><br><br>` + html;
      navigateTo('instructions');
    }).catch(()=>{
      const t = document.getElementById('instruction-text');
      if(t) t.innerHTML = '<p>Keine Anleitung gefunden.</p>';
      navigateTo('instructions');
    });
  });
}

function buildSubcatGrid(title, basePath, items){
  const titleEl = document.getElementById('subcat-title');
  const grid = document.getElementById('subcat-grid');
  if(!titleEl || !grid) ensureSubcatView();
  if(document.getElementById('subcat-title')) document.getElementById('subcat-title').textContent = title;
  if(document.getElementById('subcat-grid')){
    const g = document.getElementById('subcat-grid');
    g.innerHTML = '';
    items.forEach(item=>{
      const key = item.key;
      const label = item.label || key;
      const emoji = item.emoji || '📄';
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<div class="emoji">${emoji}</div><span>${label}</span>`;
      div.onclick = ()=>openPathRecursive(`${basePath}/${key}`);
      g.appendChild(div);
    });
  }
}

// ---- Ende Patch ----
