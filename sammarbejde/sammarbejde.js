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
    }, 2000);
}

function opdaterBillede() {
    const slideshowBillede = document.getElementById('slide');
    slideshowBillede.src = billederArray[skifter];
}


window.addEventListener("load", startBilledslideshow);





function opdaterBillede() {
    const slideshowBillede = document.getElementById('slide');
    
    if (slideshowBillede) {
        // Tilføj en klasse for at starte fade out effekten
        slideshowBillede.classList.add('hidden');

        
        setTimeout(() => {
            
            slideshowBillede.src = billederArray[skifter];
            
            
            slideshowBillede.classList.remove('hidden');
        }, 500);
    } else {
        console.error("Billedetselementet blev ikke fundet.");
    }
}

// Starter slide show
window.addEventListener("load", startBilledslideshow);