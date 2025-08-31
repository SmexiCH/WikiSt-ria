// Build nested tree from manifest
async function buildNav() {
  const res = await fetch('pages.json');
  const manifest = await res.json();

  // Build tree structure
  const tree = {};
  for (const p of manifest) {
    const segs = p.segments;
    let node = tree;
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i].replace('.md','');
      if (!node[seg]) node[seg] = { __children: {}, __path: null, __title: null };
      if (i === segs.length - 1) {
        node[seg].__path = p.path;
        node[seg].__title = p.title;
      }
      node = node[seg].__children;
    }
  }

  // Render sidebar
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = renderTree(tree, 0);

  // Add listeners
  sidebar.addEventListener('click', (e) => {
    const el = e.target.closest('[data-path]');
    if (el) {
      e.preventDefault();
      const path = el.getAttribute('data-path');
      if (path) loadMarkdown(path);
    }
  });
}

function renderTree(node, level) {
  let html = '<ul class="nav-level'+level+'">';
  const keys = Object.keys(node).sort();
  for (const key of keys) {
    const entry = node[key];
    const title = entry.__title || prettyTitle(key);
    const path = entry.__path;
    const hasChildren = Object.keys(entry.__children).length > 0;
    html += '<li>';
    if (path) {
      html += `<a href="#" data-path="${path}">${title}</a>`;
    } else {
      html += `<span class="nav-section">${prettyTitle(key)}</span>`;
    }
    if (hasChildren) {
      html += renderTree(entry.__children, level+1);
    }
    html += '</li>';
  }
  html += '</ul>';
  return html;
}

function prettyTitle(slug) {
  return slug
    .split(/[\/_-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
    .replace(/\bDtz\b/,'DTZ').replace(/\bDpz\b/,'DPZ').replace(/\bHvzd\b/,'HVZ-D').replace(/\bRvd\b/,'RVD');
}

async function loadMarkdown(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Not found');
    const text = await res.text();
    document.getElementById('content').innerHTML = marked.parse(text);
    window.scrollTo(0,0);
  } catch (e) {
    document.getElementById('content').innerHTML = '<p>Content not found.</p>';
  }
}

// Responsive sidebar toggle
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  buildNav();
});
