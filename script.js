const billederArray = [
    "fliserens 1.jpg",
    "fliserens 2.jpeg",
    "fliserens 3.jpg"
];

let skifter = 0;
let slideshowInterval;

function startBilledslideshow() {
    slideshowInterval = setInterval(() => {
        skifter = (skifter + 1) % billederArray.length;
        opdaterBillede();
    }, 2000); // Skift billede hvert 2. sekund
}

function stopBilledslideshow() {
    clearInterval(slideshowInterval);
}

function opdaterBillede() {
    const slideshowImg = document.getElementById("slideshowImg");
    slideshowImg.src = billederArray[skifter];
}

// Initial opkald for at starte billedslideshowet
startBilledslideshow();

const products = [
    {
        description: "Højeffektivt rensemiddel til fjernelse af snavs og misfarvninger på fliser, beton og sten. Koncentrat, blandes op med vand 1:2. Til udendørs brug. Fare. Forårsager hudirritation (H315). Forårsager alvorlig øjenskade (H319).",
        price: 300,
        image: "item1.jpg"
    },
    {
        description: "IBF Fliserens er et rengøringsmiddel baseret på biologisk nedbrydelige kationiske overfladeaktive stoffer. Produktet virker kemisk rensende og er velegnet til at fjerne smuds, snavs og fedt fra hårde overflader, såsom tagsten, fliser og belægningssten.",
        price: 200,
        image: "item2.webp"
    },
    {
        description: "Befa fliserens er en stærk alkalisk fliserens. Til udendørsbrug som grundrengøring før evt. imprægnering. Løsner effektivt skidt, snavs og lavsvampe fra betonfliser. Biologisk nedbrydeligt.",
        price: 150,
        image: "item3.png"
    },
    {
        description: "Her får du en praktisk højtryksrenser, som fungerer hvor som helst, og den kan både stå op eller ligge ned, som den eneste på markedet. Den er let at transportere og opbevare, og det er gennemtænkt i forhold til opbevaring.",
        price: 6700,
        image: "item4.jpg"
    },
    {
        description: "Rengør fliser, gangarealer, indkørsler, gulve mv. Monteret med HONDA motor og højtrykspumpe, som yder 150 bar. Iforhold til fliserensning med almindelig højtryksrenser er EASY CLEAN 5 gange mere effektiv. Nem foldehåndtag, så den ikke fylder meget i bilen. Tilkøb: højtryksrenser pistolgreb samt sandblæsningsudstyr (ej lagervare).",
        price: 30000,
        image: "item5.jpg"
    }
    // Tilføj andre produkter her
];

// Opret variabel til salgContainer
const salgContainer = document.getElementById("salgContainer");

// Opret variabel til indkøbsvognikon
const kurvContainer = document.querySelector(".indkøbsvogn");
const kurvAntalElement = document.getElementById("cartCount");
let kurvAntal = 0;

// Fjern eksisterende salgselementer fra salgContainer
salgContainer.innerHTML = '';

// Loop gennem produkter og tilføj dem til salgContainer
products.forEach(product => {
    const salgElement = document.createElement("div");
    salgElement.classList.add("salg");

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("salg-description");
    descriptionElement.innerHTML = `<p>${product.description}</p>`;

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Læg i kurv";
    buttonElement.addEventListener("click", () => {
        kurvAntal++;
        kurvAntalElement.textContent = kurvAntal;
        // Her kan du tilføje yderligere logik, hvis nødvendigt
    });

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

    salgContainer.appendChild(salgElement);
});

// Tilføj eventlistener til indkøbsvognikon
kurvContainer.addEventListener("click", () => {
    // Her kan du tilføje logik for at vise indkøbskurven
});










const cartDropdown = document.getElementById("cartDropdown");
const cartItemList = document.getElementById("cartItemList");

// Funktion til at vise eller skjule dropdown'en
function toggleCartDropdown() {
    cartDropdown.classList.toggle("show");
}

// Lyt efter klik på indkøbskurv-containeren
const cartContainer = document.getElementById("cartContainer");
cartContainer.addEventListener("click", toggleCartDropdown);

// Opdater indkøbskurv-dropdown'en
function updateCartDropdown() {
    // Fjern eksisterende elementer i dropdown
    cartItemList.innerHTML = '';
  
    // Tilføj hvert element i indkøbskurven til dropdown'en
    for (const product of kurv) {
        const listItem = document.createElement("li");
        listItem.textContent = product.description;
        cartItemList.appendChild(listItem);
    }
}