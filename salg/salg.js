const products = [
  {
    description: "Højeffektivt rensemiddel til fjernelse af snavs og misfarvninger på fliser, beton og sten. Koncentrat, blandes op med vand 1:2. Til udendørs brug. Fare. Forårsager hudirritation (H315). Forårsager alvorlig øjenskade (H319).",
    price: 300,
    image: "../item1.jpg"
  },
  {
    description: "IBF Fliserens er et rengøringsmiddel baseret på biologisk nedbrydelige kationiske overfladeaktive stoffer. Produktet virker kemisk rensende og er velegnet til at fjerne smuds, snavs og fedt fra hårde overflader, såsom tagsten, fliser og belægningssten.",
    price: 200,
    image: "../item2.webp"
  },
  {
    description: "Befa fliserens er en stærk alkalisk fliserens. Til udendørsbrug som grundrengøring før evt. imprægnering. Løsner effektivt skidt, snavs og lavsvampe fra betonfliser. Biologisk nedbrydeligt.",
    price: 150,
    image: "../item3.png"
  },
  {
    description: "Her får du en praktisk højtryksrenser, som fungerer hvor som helst, og den kan både stå op eller ligge ned, som den eneste på markedet. Den er let at transportere og opbevare, og det er gennemtænkt i forhold til opbevaring.",
    price: 6700,
    image: "../item4.jpg"
  },
  {
    description: "Rengør fliser, gangarealer, indkørsler, gulve mv. Monteret med HONDA motor og højtrykspumpe, som yder 150 bar. Iforhold til fliserensning med almindelig højtryksrenser er EASY CLEAN 5 gange mere effektiv. Nem foldehåndtag, så den ikke fylder meget i bilen. Tilkøb: højtryksrenser pistolgreb samt sandblæsningsudstyr (ej lagervare).",
    price: 30000,
    image: "../item5.jpg"
  }
  // Tilføj andre produkter her
];






const kurvContainer = document.getElementById("kurvContainer");

function opretSalgElement(product) {
  const salgElement = document.createElement("div");
  salgElement.classList.add("salg");

  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add("salg-description");
  descriptionElement.innerHTML = `<p>${product.description}</p>`;

  const buttonElement = document.createElement("button");
  buttonElement.textContent = "Læg i kurv";
  buttonElement.addEventListener("click", () => handleLægIKurv(product));

  const priceElement = document.createElement("div");
  priceElement.classList.add("salg-price");
  priceElement.innerHTML = `<p>Pris: ${product.price}kr</p>`;

  const imageElement = document.createElement("img");
  imageElement.classList.add("salgImg");
  imageElement.src = product.image;
  imageElement.alt = "";

  salgElement.appendChild(descriptionElement);
  salgElement.appendChild(buttonElement);
  salgElement.appendChild(priceElement);
  salgElement.appendChild(imageElement);

  return salgElement;
}









function handleLægIKurv(product) {
  // Hent kurv fra localStorage
  let kurv = JSON.parse(localStorage.getItem("kurv")) || [];

  // Tilføj det valgte produkt til kurven
  kurv.push(product);

  // Opdater localStorage med den opdaterede kurv
  localStorage.setItem("kurv", JSON.stringify(kurv));

  // Opdater kurvCount
  opdaterKurvCount();

  console.log("Produkt tilføjet til kurv:", product);
}









function opdaterKurvCount() {
  // Hent kurv fra localStorage
  let kurv = JSON.parse(localStorage.getItem("kurv")) || [];

  // Opdater kurvCount i DOM'en
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = kurv.length.toString();
}

// Initialiser
window.addEventListener("DOMContentLoaded", (event) => {
  // Hent eksisterende kurv fra localStorage og opdater kurvCount
  opdaterKurvCount();

  products.forEach((product) => {
    const salgElement = opretSalgElement(product);
    kurvContainer.appendChild(salgElement);
  });
});








let kurv = JSON.parse(localStorage.getItem("kurv")) || [];
console.log(kurv);
const indkøbsProdukterContainer = document.getElementById("indkøbsProdukter");
const samletPrisContainer = document.getElementById("samletPris");












function visIndkøbsProdukter() {
  indkøbsProdukterContainer.innerHTML = "";
  let samletPris = 0;

  const produktMængder = {};

  kurv.forEach((product) => {
    
    const key = products.findIndex((p) => p.description === product.description);

    if (produktMængder[key] !== undefined) {
      // Opdater mængden, hvis produktet allerede eksisterer
      produktMængder[key].quantity++;
    } else {
      // Opret en ny post i produktMængder, hvis produktet ikke eksisterer
      produktMængder[key] = {
        product,
        quantity: 1
      };
    }

    samletPris += product.price * product.quantity;
  });

  // Gennemgå produktMængder for at opdatere indkøbskurven
  for (const key in produktMængder) {
    const item = produktMængder[key];
    const product = products[key];

    const indkøbsProduktElement = document.createElement("div");
    indkøbsProduktElement.classList.add("indkøbs-produkt");

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("indkøbs-description");
    descriptionElement.innerHTML = `<p>${product.description}</p>`;

    const priceElement = document.createElement("div");
    priceElement.classList.add("indkøbs-price");
    priceElement.innerHTML = `<p>Pris: ${product.price}kr</p>`;

    // Vis mængden ved siden af beskrivelsen
    const quantityElement = document.createElement("div");
    quantityElement.classList.add("indkøbs-quantity");
    quantityElement.innerHTML = `<p>Mængde: ${item.quantity}</p>`;

    // Tilføj knap til at øge mængden
    const increaseQuantityButton = document.createElement("button");
    increaseQuantityButton.textContent = "+";
    increaseQuantityButton.addEventListener("click", () => {
      justerMængde(product.description, 1);
    });

    // Tilføj knap til at formindske mængden (ekstra funktionalitet)
    const decreaseQuantityButton = document.createElement("button");
    decreaseQuantityButton.textContent = "-";
    decreaseQuantityButton.addEventListener("click", () => {
      justerMængde(product.description, -1);
    });

    const imageElement = document.createElement("img");
    imageElement.classList.add("indkøbsImg");
    imageElement.src = product.image;
    imageElement.alt = "";

    indkøbsProduktElement.appendChild(descriptionElement);
    indkøbsProduktElement.appendChild(priceElement);
    indkøbsProduktElement.appendChild(quantityElement);
    indkøbsProduktElement.appendChild(increaseQuantityButton);
    indkøbsProduktElement.appendChild(decreaseQuantityButton);
    indkøbsProduktElement.appendChild(imageElement);

    indkøbsProdukterContainer.appendChild(indkøbsProduktElement);
  }

  samletPrisContainer.innerHTML = `<p>Samlet pris: ${samletPris}kr`;
}

visIndkøbsProdukter();

/**
 * 
 * @param {string} description 
 * @param {number} ændring
 * @description tal i kurv
 */
function justerMængde(description, ændring) {
  let kurv = JSON.parse(localStorage.getItem("kurv")) || [];
  const produktIndex = kurv.findIndex((product) => product.description === description);

  if (produktIndex !== -1) {
    kurv[produktIndex].quantity = kurv[produktIndex].quantity || 0;
    kurv[produktIndex].quantity += ændring;

    if (kurv[produktIndex].quantity <= 0) {
      kurv.splice(produktIndex, 1);
    }

    localStorage.setItem("kurv", JSON.stringify(kurv));
    opdaterKurvCount();
    visIndkøbsProdukter();

    const cartCountElement = document.getElementById("cartCount");
    cartCountElement.textContent = kurv.length.toString();

    opdaterSamletPris();
    console.log("Mængde justeret for produkt:", description);
    console.log("Ny mængde:", kurv[produktIndex].quantity);
    console.log("Opdateret kurv:", kurv);
  } else {
    console.log("Produktet blev ikke fundet i kurven:", description);
  }
}

/**
 * Opdater den samlede pris og visningen.
 */
function opdaterSamletPris() {
  let samletPris = 0;

  kurv.forEach((item) => {
    console.log(item.quantity)
    const product = products.find((p) => p.description === item.description);
    samletPris += product.price * item.quantity;
  });

  // Opdater visningen af den samlede pris
  samletPrisContainer.innerHTML = `<p>Samlet pris: ${samletPris}kr`;
}



















const tømKurv = document.getElementById("tømKurv");

tømKurv.addEventListener("click", () => {
  // Fjern alle produkter fra kurven
  localStorage.removeItem("kurv");

  // Nulstil kurv og opdater kurvCount
  kurv = [];
  opdaterKurvCount();

  // Opdater visningen af indkøbskurven med det samme
  visIndkøbsProdukter();
});