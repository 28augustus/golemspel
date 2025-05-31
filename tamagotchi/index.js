const groteEi = document.querySelector("#groteEi");

const krachtbronnen = document.querySelectorAll(".krachtbron");
const energiebronnen = document.querySelectorAll(".energieBron");
const biomeGolems = document.querySelectorAll(".biome");

const spelUitleg = document.querySelector("#speluitleg");

let gekozenBron = "";
let gekozenEi = "";
let isUitgebroed = false;

groteEi.addEventListener("click", broedUit);

// Hier kan de speler een ei kiezen om later uit te broeden
krachtbronnen.forEach((krachtbron) => {
  krachtbron.addEventListener("click", () => {
    gekozenEi = krachtbron.dataset.ei;
    groteEi.src = `afbeeldingen/${gekozenEi}_ei.svg`;
    groteEi.style.display = "block";
    document.querySelector(".sidebar").style.display = "none";
    spelUitleg.textContent = "Klik op jouw gekozen ei om hem uit te broeden";
    speelGeluid(gekozenEi);
  });
});

// Hier kan er een energiebron worden gekozen voor op de golem
energiebronnen.forEach((energiebron) => {
  energiebron.addEventListener("click", () => {
    gekozenBron = energiebron.dataset.energie;
    updateGolem();
    document.getElementById("energieBron").style.display = "none";
    document.getElementById("golemOpties").style.display = "block";
    spelUitleg.textContent =
      "Kies een biome waar jouw Golem in gaat leven (Als hij dat aankan)";
    speelGeluid(gekozenBron);
  });
});

// Hier kan je een biome kiezen voor de golem
biomeGolems.forEach((biomeGolem) => {
  biomeGolem.addEventListener("click", () => {
    const gekozen = biomeGolem.dataset.biome;
    controleerBiome(gekozen);
    spelUitleg.textContent = "OOOOOHHHHH....";
    speelGeluid(gekozen);
  });
});

// Dit laat de gekozen bron zien op de golem
function updateGolem() {
  if (gekozenEi && gekozenBron) {
    groteEi.src = `afbeeldingen/${gekozenBron}bron_${gekozenEi}_golem.svg`;
    groteEi.style.display = "block";
  } else {
    console.log("Ontbrekende keuze: ei of energie.");
  }
}

// Hier zie je welke golem je krijgt per ei
function broedUit() {
  if (groteEi.src.includes("obsidian_ei.svg")) {
    groteEi.src = "afbeeldingen/obsidian_golem.svg";
    speelGeluid("steen");
  } else if (gekozenEi === "water") {
    groteEi.src = "afbeeldingen/water_golem.svg";
    speelGeluid("water");
  } else if (gekozenEi === "zon") {
    groteEi.src = "afbeeldingen/zon_golem.svg";
    speelGeluid("zon");
  } else if (gekozenEi === "steen") {
    groteEi.src = "afbeeldingen/steen_golem.svg";
    speelGeluid("steen");
  } else {
    console.log("Geen ei gekozen.");
  }
  // Als je een ei hebt gekozen kan je hier de sidebar weer laten zien met de volgende stap
  document.querySelector(".sidebar").style.display = "block";
  document.getElementById("eieren").style.display = "none";
  document.getElementById("energieBron").style.display = "block";
  spelUitleg.textContent =
    "Kies een energiebron voor jouw Golem (dit bepaalt zijn toekomst)";
}

// Dit zorgt er voor dat de vorige elementen verborgen worden (sidebar) en je opnieuw een ei kan selecteren
function resetSpel() {
  gekozenEi = "";
  gekozenBron = "";
  document.getElementById("eieren").style.display = "block";
  document.getElementById("energieBron").style.display = "none";
  document.getElementById("golemOpties").style.display = "none";
  spelUitleg.textContent = "Welkom bij het einde";
}

// Verbegt de sidebar en laat de gekozen biome zien
function controleerBiome(geselecteerdeBiome) {
  document.getElementById("golemOpties").style.display = "none";
  groteEi.src = `afbeeldingen/${geselecteerdeBiome}_biome.svg`;

  // Kijkt of biome en bron gelijk zijn en geeft bij horende afbeelding
  setTimeout(function () {
    if (
      geselecteerdeBiome === gekozenEi &&
      geselecteerdeBiome === gekozenBron
    ) {
      groteEi.src = `afbeeldingen/obsidian_ei.svg`;
      gekozenEi = "obsidian";
      gekozenBron = "";
      spelUitleg.textContent =
        "Ooooh een nieuw ei soort??? Zie wat er gebeurt, klik er op!!!";
      speelGeluid("steen");
    } else {
      if (gekozenEi === "obsidian") {
        groteEi.src = `afbeeldingen/rip_obsidian.svg`;
      } else {
        groteEi.src = `afbeeldingen/rip_${gekozenBron}.svg`;
      }
      speelGeluid("fail");
      resetSpel();
    }
  }, 2000);
}

/* 
Geluidden bronvermelding:
water = Water Splash: Universfield URL: https://pixabay.com/sound-effects/search/water%20splash/
zon = Fire sounds effects: Alice_soundz URL: https://pixabay.com/sound-effects/search/vuur/
steen = Stone,Block,Drag,Wood,Grind: freesound_community URL: https://pixabay.com/sound-effects/search/stone/
fail = gameover freesound_community URL: https://pixabay.com/sound-effects/search/gameover-86548/
Licentie: Pixabay License (gratis voor commercieel en niet-commercieel gebruik)
Gedownload via: https://pixabay.com/sound-effects/ 
*/

// Bron:chatGpt promt: Nu wil ik geluid toevoegen. Als je klikt kan ik een functie maken met geluiden en dan die functie oproepen in stukjes tekst?
function speelGeluid(soort) {
  let geluid = new Audio(`geluiden/${soort}.mp3`);
  geluid.play();
}
