const billederArray = [
    "stecks.jpg",
    "juskAlgeservice.jpg",
    "herning.jpg",
    "Alge-rens-gif-1.gif",
    "algeBehandling.png",
];

let slideshowInterval;
let skifter = 0;

function startBilledslideshow() {
    slideshowInterval = setInterval(() => {
        skifter = (skifter + 1) % billederArray.length;
        opdaterBillede();
    }, 2000); // Skift hvert 2. sekund (2000 millisekunder)
}

function opdaterBillede() {
    const slideshowBillede = document.getElementById('slide');
    slideshowBillede.src = billederArray[skifter];
}

// Starter slide show ved indlæsning af siden
window.addEventListener("load", startBilledslideshow);





function opdaterBillede() {
    const slideshowBillede = document.getElementById('slide');
    
    if (slideshowBillede) {
        // Tilføj en klasse for at starte fade-out-effekten
        slideshowBillede.classList.add('hidden');

        // Vent et kort øjeblik før vi opdaterer billedet
        setTimeout(() => {
            // Opdater billedets kilde
            slideshowBillede.src = billederArray[skifter];
            
            // Fjern klassen for at starte fade-in-effekten
            slideshowBillede.classList.remove('hidden');
        }, 500); // Vent 0.5 sekunder (500 millisekunder) inden vi opdaterer billedet
    } else {
        console.error("Billedetselementet blev ikke fundet.");
    }
}

// Starter slide show ved indlæsning af siden
window.addEventListener("load", startBilledslideshow);