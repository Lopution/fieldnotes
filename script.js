const modes = {
  direct: {
    code: "Human ↔ AI",
    description: "AI 本身成为直接交流对象。",
    nodes: [
      { id: "h1", type: "human", x: 165, y: 128, label: "Human" },
      { id: "a1", type: "ai", x: 355, y: 128, label: "AI" }
    ],
    edges: [
      { from: "h1", to: "a1", kind: "double", tone: "ai" }
    ]
  },
  mediated: {
    code: "Human → AI → Human",
    description: "AI 参与人与人之间的信息产生、修改或解释。",
    nodes: [
      { id: "h1", type: "human", x: 100, y: 128, label: "Human" },
      { id: "a1", type: "ai", x: 260, y: 128, label: "AI" },
      { id: "h2", type: "human", x: 420, y: 128, label: "Human" }
    ],
    edges: [
      { from: "h1", to: "a1", kind: "single", tone: "ai" },
      { from: "a1", to: "h2", kind: "single", tone: "ai" }
    ]
  },
  agentic: {
    code: "Human → AI ↔ AI ← Human",
    description: "代理代表不同的人进入同一条交流链。",
    nodes: [
      { id: "h1", type: "human", x: 72, y: 128, label: "Human" },
      { id: "a1", type: "ai", x: 190, y: 128, label: "Agent" },
      { id: "a2", type: "ai", x: 330, y: 128, label: "Agent" },
      { id: "h2", type: "human", x: 448, y: 128, label: "Human" }
    ],
    edges: [
      { from: "h1", to: "a1", kind: "single", tone: "ai" },
      { from: "a1", to: "a2", kind: "double", tone: "clay" },
      { from: "h2", to: "a2", kind: "single-reverse", tone: "ai" }
    ]
  },
  environment: {
    code: "System ⇢ Human ↔ Group",
    description: "AI 通过平台、排序或总结机制塑造交流条件。",
    nodes: [
      { id: "s1", type: "system", x: 260, y: 72, label: "System" },
      { id: "h1", type: "human", x: 155, y: 170, label: "Human" },
      { id: "g1", type: "group", x: 365, y: 170, label: "Group" }
    ],
    edges: [
      { from: "s1", to: "h1", kind: "single", tone: "ai", dashed: true },
      { from: "s1", to: "g1", kind: "single", tone: "ai", dashed: true },
      { from: "h1", to: "g1", kind: "double", tone: "clay" }
    ]
  }
};

const svg = document.querySelector("#topology-diagram");
const codeEl = document.querySelector("#structure-code");
const descEl = document.querySelector("#structure-description");
const tabButtons = [...document.querySelectorAll(".specimen-tabs button")];
const NS = "http://www.w3.org/2000/svg";

function el(name, attrs = {}) {
  const node = document.createElementNS(NS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

function renderDefs() {
  const defs = el("defs");
  ["ink", "moss", "clay"].forEach((name) => {
    const marker = el("marker", {
      id: `arrow-${name}`,
      viewBox: "0 0 10 10",
      refX: "8.2",
      refY: "5",
      markerWidth: "6",
      markerHeight: "6",
      orient: "auto-start-reverse"
    });
    marker.appendChild(el("path", {
      d: "M 0 0 L 10 5 L 0 10 z",
      fill: name === "moss" ? "#718069" : name === "clay" ? "#c26548" : "#b9aea1"
    }));
    defs.appendChild(marker);
  });
  svg.appendChild(defs);
}

function nodeRadius(type) {
  return type === "system" ? 30 : type === "group" ? 28 : 24;
}

function renderEdge(edge, nodeMap) {
  const a = nodeMap[edge.from];
  const b = nodeMap[edge.to];
  const ar = nodeRadius(a.type);
  const br = nodeRadius(b.type);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;

  const x1 = a.x + ux * ar;
  const y1 = a.y + uy * ar;
  const x2 = b.x - ux * br;
  const y2 = b.y - uy * br;

  const toneName = edge.tone === "clay" ? "clay" : edge.tone === "ai" ? "moss" : "ink";
  const path = el("path", {
    d: `M ${x1} ${y1} L ${x2} ${y2}`,
    class: `diagram-edge ${edge.tone === "ai" ? "is-ai" : edge.tone === "clay" ? "is-clay" : ""} ${edge.dashed ? "is-dashed" : ""}`
  });

  if (edge.kind === "double") {
    path.setAttribute("marker-start", `url(#arrow-${toneName})`);
    path.setAttribute("marker-end", `url(#arrow-${toneName})`);
  } else if (edge.kind === "single") {
    path.setAttribute("marker-end", `url(#arrow-${toneName})`);
  } else if (edge.kind === "single-reverse") {
    path.setAttribute("marker-start", `url(#arrow-${toneName})`);
  }
  svg.appendChild(path);
}

function renderNode(node) {
  const g = el("g", { transform: `translate(${node.x} ${node.y})`, class: `node-${node.type}` });

  if (node.type === "human") {
    g.appendChild(el("circle", { class: "outer", cx: 0, cy: 0, r: 20 }));
    g.appendChild(el("circle", { class: "inner", cx: 0, cy: 0, r: 4 }));
  } else if (node.type === "ai") {
    g.appendChild(el("rect", { x: -20, y: -20, width: 40, height: 40, rx: 11 }));
    g.appendChild(el("circle", { cx: 0, cy: 0, r: 4 }));
  } else if (node.type === "group") {
    g.appendChild(el("circle", { cx: -9, cy: 0, r: 13 }));
    g.appendChild(el("circle", { cx: 9, cy: 0, r: 13 }));
    g.appendChild(el("circle", { cx: 0, cy: -8, r: 13 }));
  } else if (node.type === "system") {
    g.appendChild(el("rect", { class: "frame", x: -27, y: -19, width: 54, height: 38, rx: 10 }));
    [[-8,-6],[8,-6],[-8,7],[8,7]].forEach(([cx,cy]) => g.appendChild(el("circle", { cx, cy, r: 2.5 })));
  }

  const label = el("text", {
    class: "node-label",
    x: 0,
    y: node.type === "system" ? 39 : 44,
    "text-anchor": "middle"
  });
  label.textContent = node.label;
  g.appendChild(label);
  svg.appendChild(g);
}

function render(modeName) {
  const mode = modes[modeName];
  svg.replaceChildren();
  renderDefs();

  const nodeMap = Object.fromEntries(mode.nodes.map(n => [n.id, n]));
  mode.edges.forEach(edge => renderEdge(edge, nodeMap));
  mode.nodes.forEach(renderNode);

  codeEl.textContent = mode.code;
  descEl.textContent = mode.description;
  svg.setAttribute("aria-label", `${mode.code}：${mode.description}`);

  tabButtons.forEach(btn => {
    btn.setAttribute("aria-pressed", String(btn.dataset.mode === modeName));
  });
}

tabButtons.forEach(btn => btn.addEventListener("click", () => render(btn.dataset.mode)));
render("direct");

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

// Keyboard support for the topology segmented control.
tabButtons.forEach((button, index) => {
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabButtons.length - 1;
    tabButtons[nextIndex].focus();
    tabButtons[nextIndex].click();
  });
});

// Keep navigation orientation visible without adding another navigation layer.
const sectionLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
const observedSections = sectionLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach(link => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, .2, .6] });

  observedSections.forEach(section => observer.observe(section));
}
