
// Theme persistence (light/dark)
let selectedVehicle = "";
let historyStack = [];
let currentCategory = "";

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
  navigateTo("vehicle-selection");
});

function navigateTo(id){
  document.querySelectorAll(".container > div").forEach(d=>d.style.display="none");
  if(historyStack.length===0 || historyStack[historyStack.length-1]!==id) historyStack.push(id);
  const el=document.getElementById(id); if(el) el.style.display="block";
  const back=document.getElementById("back-btn"); if(back) back.style.display=historyStack.length>1?"block":"none";
}

function goBack(){ historyStack.pop(); const prev=historyStack.pop(); if(prev) navigateTo(prev); }

function goToCategory(vehicle){ selectedVehicle=vehicle; navigateTo("category-selection"); }

function vehicleKeyFromName(){ return 'dpz'; } // in diesem Build nur DPZ

function openCategory(category){
  currentCategory = category;
  const vkey = vehicleKeyFromName();
  fetch(`content/${vkey}/${category}/_index.json`).then(r=>{
    if(!r.ok) throw new Error('no subcats');
    return r.json();
  }).then(data=>{
    document.getElementById('subcat-title').textContent = data.title || 'Unterbereich wählen';
    const grid=document.getElementById('subcat-grid'); grid.innerHTML='';
    (data.items||[]).forEach(item=>{
      const div=document.createElement('div');
      div.className='card';
      div.innerHTML=`<div class="emoji">${item.emoji||'📄'}</div><span>${item.label}</span>`;
      div.onclick=()=>openSubcategoryItem(category,item.key);
      grid.appendChild(div);
    });
    navigateTo('subcat-selection');
  }).catch(()=>{
    fetch(`content/${vkey}/${category}.html`).then(r=>r.text()).then(html=>{
      document.getElementById('instruction-text').innerHTML = html;
      navigateTo('instructions');
    }).catch(()=>{
      document.getElementById('instruction-text').innerHTML = '<p>Keine Anleitung gefunden.</p>';
      navigateTo('instructions');
    });
  });
}

function openSubcategoryItem(category,key){
  const vkey = vehicleKeyFromName();
  fetch(`content/${vkey}/${category}/${key}.html`).then(r=>r.text()).then(html=>{
    document.getElementById('instruction-text').innerHTML = html;
    navigateTo('instructions');
  }).catch(()=>{
    document.getElementById('instruction-text').innerHTML = '<p>Keine Anleitung gefunden.</p>';
    navigateTo('instructions');
  });
}
