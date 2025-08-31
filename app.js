// WikiStöria - Subcategories Enable Patch (drop-in)
// - Works even if index.html still calls showInstructions('...')
// - Detects content/<vehicle>/<category>/_index.json and shows a subcategory grid
// - Falls back to content/<vehicle>/<category>.html if no subcats exist
// - Keeps theme persistence and existing navigation

let selectedVehicle = "";
let historyStack = [];
let currentCategory = "";

// --- Theme helpers ---
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

  // Ensure subcat view exists (works with older index.html)
  ensureSubcatView();

  // If your page starts at 'urgency', keep it; otherwise adjust as needed:
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

// --- Flow handlers (existing API surface) ---
function selectUrgency(isUrgent){ if(isUrgent){ alert('📞 Anruf an Helpdesk 051 222 18 53!'); } else { navigateTo('vehicle-selection'); } }
function goToCategory(vehicle){ selectedVehicle = vehicle; navigateTo('category-selection'); }

function vehicleKeyFromName(){
  if (selectedVehicle && selectedVehicle.includes('DPZ')) return 'dpz';
  if (selectedVehicle && selectedVehicle.includes('DTZ')) return 'dtz';
  if (selectedVehicle && selectedVehicle.includes('RVD')) return 'rvd';
  if (selectedVehicle && selectedVehicle.includes('HVZ')) return 'hvzd';
  // fallback (common case: only DPZ)
  return 'dpz';
}

// Backward compatible: index.html may still call showInstructions(...)
// We intercept and try subcategories first
function showInstructions(category){
  currentCategory = category;
  const vkey = vehicleKeyFromName();
  // Try subcategory index first
  fetch(`content/${vkey}/${category}/_index.json`, {cache:'no-store'}).then(r=>{
    if(!r.ok) throw new Error('no subcats');
    return r.json();
  }).then(data=>{
    // Build grid
    const titleEl = document.getElementById('subcat-title');
    const grid = document.getElementById('subcat-grid');
    if(!titleEl || !grid){ ensureSubcatView(); }
    if(document.getElementById('subcat-title')) document.getElementById('subcat-title').textContent = data.title || 'Unterbereich wählen';
    if(document.getElementById('subcat-grid')){
      const g = document.getElementById('subcat-grid');
      g.innerHTML='';
      (data.items||[]).forEach(item=>{
        const div = document.createElement('div');
        div.className = 'card';
        const emoji = item.emoji || '📄';
        div.innerHTML = `<div class="emoji">${emoji}</div><span>${item.label}</span>`;
        div.onclick = ()=>openSubcategoryItem(category, item.key);
        g.appendChild(div);
      });
    }
    navigateTo('subcat-selection');
  }).catch(()=>{
    // Fallback to simple category content
    fetch(`content/${vkey}/${category}.html`, {cache:'no-store'}).then(r=>r.text()).then(html=>{
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

// New helper when subcat tile is clicked
function openSubcategoryItem(category, key){
  const vkey = vehicleKeyFromName();
  fetch(`content/${vkey}/${category}/${key}.html`, {cache:'no-store'}).then(r=>r.text()).then(html=>{
    const t = document.getElementById('instruction-text');
    if(t) t.innerHTML = `<strong>Fahrzeug: ${selectedVehicle||'DPZ'}</strong><br><br>` + html;
    navigateTo('instructions');
  }).catch(()=>{
    const t = document.getElementById('instruction-text');
    if(t) t.innerHTML = '<p>Keine Anleitung gefunden.</p>';
    navigateTo('instructions');
  });
}
