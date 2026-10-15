// ====== À MODIFIER ======
const WA_NUMBER = "2250566104520"; // numéro WhatsApp sans le +
const PRODUCTS = [
  {name:"Tapis de prière classique", 
    cat:"Tapis", price:"5 000 FCFA", 
    icon:"🕌",
    img:"images/Tapis-perso-blanc.jpg",
     desc:"Doux et antidérapant, motif mihrab."

    },

  {name:"Tapis de prière pliable", 
    cat:"Tapis", price:"12 000 FCFA",
        img:"images/Tapis-pliable.jpg",
     icon:"🕌", desc:"Mousse confortable, idéal pour les longues prières."
    },

  {name:"Saint Coran (arabe)", 
    cat:"Corans", price:"4 500 FCFA", 
    icon:"📖", 
            img:"images/Coran.jpg",
    desc:"Mushaf à la calligraphie claire, couverture rigide."
  },

  {name:"Coran bilingue Arabe/Français", 
    cat:"Corans", 
    price:"7 500 FCFA",
     icon:"📖", 
                 img:"images/Coran-bilingue.jpg",
     desc:"Texte arabe et traduction française en regard."
    },

  {name:"Chapelet (tasbih) 99 perles",
     cat:"Chapelets",
      price:"2 000 FCFA", 
      icon:"📿", 
      img:"images/chapelet.jpg",
      desc:"Perles lisses, cordon résistant."
    },

  {name:"Bakhoor &amp; encensoir",
     cat:"Parfums",
      price:"6 000 FCFA",
      img:"images/encensoir.jpg" ,
      icon:"🌿", desc:"Parfum oriental envoûtant pour la maison."
    }
];

const bd=[...Array(14)].map((_,i)=>{const a=i/14*6.283;return `<circle cx='${(60+34*Math.cos(a)).toFixed(1)}' cy='${(48+34*Math.sin(a)).toFixed(1)}' r='6' fill='#b8913a' stroke='#8a6a22'/>`}).join("");
const ART={
 Tapis:`<svg viewBox='0 0 120 120'><rect x='28' y='10' width='64' height='100' rx='6' fill='#0f3d2e' stroke='#b8913a' stroke-width='3'/><rect x='36' y='18' width='48' height='84' rx='3' fill='none' stroke='#b8913a' stroke-width='1.5'/><path d='M44 96V62q0-28 16-28t16 28v34z' fill='#b8913a'/><path d='M51 96V64q0-18 9-18t9 18v32z' fill='#0f3d2e'/><path d='M34 4v6M44 4v6M54 4v6M64 4v6M74 4v6M84 4v6M34 110v6M44 110v6M54 110v6M64 110v6M74 110v6M84 110v6' stroke='#b8913a' stroke-width='2'/></svg>`,
 Corans:`<svg viewBox='0 0 120 120'><rect x='22' y='14' width='76' height='92' rx='6' fill='#0f3d2e' stroke='#b8913a' stroke-width='3'/><rect x='22' y='14' width='10' height='92' rx='3' fill='#b8913a' opacity='.5'/><rect x='40' y='26' width='48' height='68' rx='3' fill='none' stroke='#b8913a' stroke-width='2'/><circle cx='64' cy='52' r='13' fill='#b8913a'/><circle cx='69' cy='49' r='11' fill='#0f3d2e'/><path d='M64 72l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z' fill='#b8913a'/></svg>`,
 Chapelets:`<svg viewBox='0 0 120 130'>${bd}<path d='M60 82v16' stroke='#b8913a' stroke-width='2'/><circle cx='60' cy='102' r='6' fill='#0f3d2e' stroke='#b8913a' stroke-width='2'/><path d='M60 108l-5 14M60 108v16M60 108l5 14' stroke='#b8913a' stroke-width='2' stroke-linecap='round'/></svg>`,
 Parfums:`<svg viewBox='0 0 120 120'><path class='smoke' d='M60 72c-12-12 12-20 0-34s12-18 0-30' fill='none' stroke='#b8913a' stroke-width='3' stroke-linecap='round' opacity='.7'/><path d='M28 78h64q-4 26-32 26t-32-26z' fill='#b8913a' stroke='#8a6a22' stroke-width='2'/><rect x='46' y='104' width='28' height='6' rx='2' fill='#8a6a22'/><ellipse cx='60' cy='78' rx='32' ry='5' fill='#8a6a22'/></svg>`
};

document.querySelectorAll("[data-art]").forEach(e=>e.innerHTML=ART[e.dataset.art]);

// Apparition au scroll
const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});

function reveal(){
  document.querySelectorAll("h2,.card,#filters").forEach(el=>{
    if(el.dataset.r) return;
    el.dataset.r=1;
    el.style.animationDelay=([...el.parentNode.children].indexOf(el)%3)*0.12+"s";
    el.classList.add("reveal"); io.observe(el);
  });
}
const waLink = t => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=waLink(a.dataset.wa);a.target="_blank";a.rel="noopener"});

const grid = document.getElementById("grid"), filters=document.getElementById("filters");

function render(cat="Tous") {
  
  grid.innerHTML=PRODUCTS.filter(p=>cat==="Tous"||p.cat===cat).map(p=>`
    <article class="card overflow-hidden">

<div class="h-48 flex items-center justify-center overflow-hidden" style="background:linear-gradient(135deg,color-mix(in srgb,var(--green) 22%,var(--card)),color-mix(in srgb,var(--brass) 20%,var(--card)))">
  ${p.img
      ? `<img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover">`
      :` <span class="ico">${ART[p.cat]}</span> `
      }
</div>
      <div class="p-5">
        <h3 class="font-semibold">${p.name}</h3>
        <p class="text-sm mt-1" style="color:var(--muted)">${p.desc}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="font-semibold" style="color:var(--brass)">${p.price}</span>
          <a class="btn btn-brass text-sm !py-2 !px-4" target="_blank" rel="noopener"
             href="${waLink("Bonjour SadiaShop, je souhaite commander : "+p.name.replace("&amp;","&")+" ("+p.price+")")}">Commander</a>
        </div>
      </div>
    </article>`).join("");
  reveal();
}
["Tous",...new Set(PRODUCTS.map(p=>p.cat))].forEach((c,i)=>{
  const b=document.createElement("button");
  b.textContent=c; b.className="btn btn-line text-sm !py-1.5 !px-4";
  b.onclick=()=>{render(c);[...filters.children].forEach(x=>x.style.background="");b.style.background="var(--brass)";b.style.color="#16241d"};
  filters.appendChild(b); if(i===0) b.click();
});

document.getElementById("menuBtn").onclick=()=>document.getElementById("mobileMenu").classList.toggle("hidden");
document.querySelectorAll("#mobileMenu a").forEach(a=>a.onclick=()=>document.getElementById("mobileMenu").classList.add("hidden"));
document.getElementById("year").textContent=new Date().getFullYear();