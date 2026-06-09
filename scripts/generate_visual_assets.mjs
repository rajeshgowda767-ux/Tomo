import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("frontend/assets/images");

const palettes = {
  yellow: ["#F5D47D", "#D98F3D", "#6FA45B"],
  white: ["#FFF8EA", "#D8CCB7", "#6FA45B"],
  red: ["#C85A3D", "#87352B", "#F1D082"],
  orange: ["#E49A49", "#A8552C", "#77A866"],
  green: ["#A8C96C", "#5F944D", "#F4D27B"],
  brown: ["#B8794D", "#7D432B", "#F4D27B"],
  pink: ["#E9A2A7", "#C46573", "#FFF0B8"],
  cream: ["#F7E4BC", "#C9914F", "#77A866"],
  purple: ["#B180B8", "#76518C", "#F4D27B"],
};

const assets = [
  ["dishes", "dosa", "yellow", "flat"], ["dishes", "idli", "white", "rounds"], ["dishes", "pongal", "yellow", "bowl"],
  ["dishes", "poha", "yellow", "flakes"], ["dishes", "upma", "cream", "bowl"], ["dishes", "appam", "white", "flat"],
  ["dishes", "aloo-paratha", "cream", "flat"], ["dishes", "paratha", "cream", "flat"], ["dishes", "bread-omelette", "yellow", "square"],
  ["dishes", "pesarattu", "green", "flat"], ["dishes", "puttu", "white", "stack"], ["dishes", "rajma-chawal", "red", "bowl"],
  ["dishes", "rajma-rice", "red", "bowl"], ["dishes", "sambar-rice", "orange", "bowl"], ["dishes", "lemon-rice", "yellow", "bowl"],
  ["dishes", "khichdi", "yellow", "bowl"], ["dishes", "fish-curry-rice", "red", "bowl"], ["dishes", "fish-curry", "red", "bowl"],
  ["dishes", "chicken-curry-rice", "red", "bowl"], ["dishes", "chicken-curry", "red", "bowl"], ["dishes", "curd-rice", "white", "bowl"],
  ["dishes", "dal-rice", "yellow", "bowl"], ["dishes", "bisibelebath", "orange", "bowl"], ["dishes", "pulao", "green", "bowl"],
  ["dishes", "chapati-dal", "yellow", "combo"], ["dishes", "egg-curry", "red", "bowl"], ["dishes", "paneer-curry", "orange", "bowl"],
  ["dishes", "rasam-rice", "red", "bowl"], ["dishes", "veg-kurma", "cream", "bowl"], ["dishes", "noodles", "orange", "nest"],
  ["dishes", "soup-bowls", "orange", "bowl"], ["dishes", "fish-stew", "cream", "bowl"], ["dishes", "biryani", "orange", "bowl"],
  ["dishes", "home-bowl", "yellow", "bowl"], ["dishes", "breakfast-default", "yellow", "flat"], ["dishes", "lunch-default", "orange", "bowl"],
  ["dishes", "dinner-default", "red", "bowl"], ["snacks", "pakora", "orange", "bits"], ["snacks", "mirchi-bajji", "green", "long"],
  ["snacks", "samosa", "cream", "triangles"], ["snacks", "vada-pav", "brown", "stack"], ["snacks", "sandwich", "green", "square"],
  ["snacks", "chicken-65", "red", "bits"], ["snacks", "momos", "white", "rounds"], ["snacks", "bhel-puri", "yellow", "flakes"],
  ["snacks", "pav-bhaji", "red", "combo"], ["snacks", "bread-pakora", "orange", "square"], ["snacks", "snacks-default", "orange", "bits"],
  ["drinks", "chai", "brown", "cup"], ["drinks", "masala-chai", "brown", "cup"], ["drinks", "filter-coffee", "brown", "cup"],
  ["drinks", "badam-milk", "yellow", "cup"], ["drinks", "lassi", "white", "cup"], ["drinks", "rose-milk", "pink", "cup"],
  ["drinks", "buttermilk", "white", "cup"], ["drinks", "fresh-juice", "orange", "cup"], ["drinks", "drinks-default", "brown", "cup"],
  ["desserts", "gulab-jamun", "brown", "rounds"], ["desserts", "kheer", "white", "bowl"], ["desserts", "payasam", "cream", "bowl"],
  ["desserts", "rasmalai", "white", "rounds"], ["desserts", "halwa", "orange", "bowl"], ["desserts", "laddoo", "yellow", "rounds"],
  ["desserts", "jalebi", "orange", "rings"], ["desserts", "semiya-payasam", "cream", "bowl"], ["desserts", "carrot-halwa", "orange", "bowl"],
  ["desserts", "rava-kesari", "yellow", "bowl"], ["desserts", "sweet-pongal", "yellow", "bowl"], ["desserts", "dessert-default", "pink", "rounds"],
  ["salads", "sprouts-bowl", "green", "bowl"], ["salads", "chickpea-salad", "yellow", "bowl"], ["salads", "cucumber-salad", "green", "bowl"],
  ["salads", "fruit-bowl", "pink", "bowl"], ["salads", "paneer-salad", "white", "bowl"], ["salads", "kachumber-salad", "green", "bowl"],
  ["salads", "carrot-kosambari", "orange", "bowl"], ["salads", "cucumber-peanut-salad", "green", "bowl"], ["salads", "salad-default", "green", "bowl"],
  ["ingredients", "rice", "white", "grain"], ["ingredients", "wheat", "cream", "grain"], ["ingredients", "poha", "yellow", "grain"],
  ["ingredients", "oats", "cream", "grain"], ["ingredients", "millet", "yellow", "grain"], ["ingredients", "onion", "purple", "veg"],
  ["ingredients", "tomato", "red", "veg"], ["ingredients", "potato", "cream", "veg"], ["ingredients", "spinach", "green", "leaf"],
  ["ingredients", "carrot", "orange", "veg"], ["ingredients", "brinjal", "purple", "veg"], ["ingredients", "egg", "white", "oval"],
  ["ingredients", "paneer", "white", "cube"], ["ingredients", "chicken", "red", "protein"], ["ingredients", "fish", "red", "protein"],
  ["ingredients", "dal", "yellow", "grain"], ["ingredients", "chickpea", "yellow", "rounds"], ["ingredients", "chilli", "red", "long"],
  ["ingredients", "turmeric", "yellow", "spice"], ["ingredients", "pepper", "brown", "spice"], ["ingredients", "curry-leaves", "green", "leaf"],
  ["hero", "pongal-hero", "yellow", "bowl"], ["hero", "dosa-hero", "yellow", "flat"], ["hero", "chai-hero", "brown", "cup"],
  ["hero", "khichdi-hero", "yellow", "bowl"],
];

function shapeSvg(kind, colors, size) {
  const [a, b, c] = colors;
  const center = size / 2;
  const food = [];
  if (["bowl", "cup"].includes(kind)) {
    food.push(`<ellipse cx="${center}" cy="${center + size * 0.05}" rx="${size * 0.28}" ry="${size * 0.20}" fill="${a}"/>`);
    food.push(`<ellipse cx="${center}" cy="${center - size * 0.02}" rx="${size * 0.23}" ry="${size * 0.14}" fill="${b}" opacity=".72"/>`);
  } else if (kind === "flat") {
    food.push(`<ellipse cx="${center}" cy="${center}" rx="${size * 0.30}" ry="${size * 0.18}" fill="${a}" transform="rotate(-10 ${center} ${center})"/>`);
    food.push(`<ellipse cx="${center + size * 0.08}" cy="${center - size * 0.02}" rx="${size * 0.10}" ry="${size * 0.055}" fill="${b}" opacity=".8"/>`);
  } else if (["rounds", "bits", "grain"].includes(kind)) {
    for (let i = 0; i < 9; i++) {
      const x = center + Math.cos(i * 0.9) * size * (0.05 + (i % 3) * 0.035);
      const y = center + Math.sin(i * 0.9) * size * (0.04 + (i % 2) * 0.035);
      food.push(`<circle cx="${x}" cy="${y}" r="${size * 0.048}" fill="${i % 2 ? a : b}"/>`);
    }
  } else if (kind === "long") {
    food.push(`<rect x="${center - size * 0.18}" y="${center - size * 0.055}" width="${size * 0.36}" height="${size * 0.11}" rx="${size * 0.055}" fill="${a}" transform="rotate(-14 ${center} ${center})"/>`);
    food.push(`<rect x="${center - size * 0.16}" y="${center + size * 0.04}" width="${size * 0.32}" height="${size * 0.09}" rx="${size * 0.045}" fill="${b}" transform="rotate(10 ${center} ${center})"/>`);
  } else if (kind === "square") {
    food.push(`<rect x="${center - size * 0.18}" y="${center - size * 0.16}" width="${size * 0.36}" height="${size * 0.32}" rx="${size * 0.055}" fill="${a}" transform="rotate(-6 ${center} ${center})"/>`);
    food.push(`<rect x="${center - size * 0.13}" y="${center - size * 0.10}" width="${size * 0.26}" height="${size * 0.20}" rx="${size * 0.035}" fill="${b}" opacity=".55"/>`);
  } else if (kind === "leaf") {
    food.push(`<ellipse cx="${center - size * 0.05}" cy="${center}" rx="${size * 0.11}" ry="${size * 0.24}" fill="${a}" transform="rotate(-28 ${center - size * 0.05} ${center})"/>`);
    food.push(`<ellipse cx="${center + size * 0.08}" cy="${center}" rx="${size * 0.10}" ry="${size * 0.22}" fill="${b}" transform="rotate(24 ${center + size * 0.08} ${center})"/>`);
  } else if (kind === "rings") {
    for (let i = 0; i < 3; i++) food.push(`<circle cx="${center + (i - 1) * size * 0.09}" cy="${center + (i % 2) * size * 0.04}" r="${size * 0.085}" fill="none" stroke="${i % 2 ? a : b}" stroke-width="${size * 0.035}"/>`);
  } else if (kind === "triangles") {
    food.push(`<path d="M${center} ${center - size * 0.20} L${center - size * 0.19} ${center + size * 0.14} L${center + size * 0.19} ${center + size * 0.14}Z" fill="${a}"/>`);
    food.push(`<path d="M${center + size * 0.08} ${center - size * 0.10} L${center - size * 0.08} ${center + size * 0.16} L${center + size * 0.25} ${center + size * 0.16}Z" fill="${b}" opacity=".75"/>`);
  } else {
    food.push(`<ellipse cx="${center}" cy="${center}" rx="${size * 0.25}" ry="${size * 0.18}" fill="${a}"/>`);
  }
  food.push(`<circle cx="${center - size * 0.08}" cy="${center - size * 0.06}" r="${size * 0.018}" fill="${c}"/>`);
  food.push(`<circle cx="${center + size * 0.10}" cy="${center + size * 0.04}" r="${size * 0.014}" fill="${c}"/>`);
  return food.join("\n");
}

function svg({ slug, category, palette, kind, size }) {
  const colors = palettes[palette] || palettes.yellow;
  const plate = category === "ingredients" ? "" : `<ellipse cx="${size / 2}" cy="${size / 2 + size * 0.035}" rx="${size * 0.33}" ry="${size * 0.25}" fill="rgba(255,255,255,.76)" stroke="rgba(194,130,77,.12)" stroke-width="${size * 0.012}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="bg" cx="35%" cy="22%" r="82%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#FFF4E8"/><stop offset="1" stop-color="#F6E6D6"/></radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="${size * 0.035}" stdDeviation="${size * 0.035}" flood-color="#7A4B2B" flood-opacity=".16"/></filter>
  </defs>
  <rect width="100%" height="100%" rx="${size * 0.11}" fill="url(#bg)"/>
  <ellipse cx="${size / 2}" cy="${size * 0.69}" rx="${size * 0.31}" ry="${size * 0.08}" fill="#8A5833" opacity=".10"/>
  <g filter="url(#shadow)">
    ${plate}
    ${shapeSvg(kind, colors, size)}
  </g>
</svg>`;
}

await fs.mkdir(root, { recursive: true });
for (const [category, slug, palette, kind] of assets) {
  const size = category === "hero" ? 1200 : category === "ingredients" ? 512 : 800;
  const dir = path.join(root, category);
  await fs.mkdir(dir, { recursive: true });
  const png = await sharp(Buffer.from(svg({ slug, category, palette, kind, size }))).png({ compressionLevel: 9 }).toBuffer();
  await fs.writeFile(path.join(dir, `${slug}.png`), png);
}

console.log(`Generated ${assets.length} CookBuddy visual assets in ${root}`);
