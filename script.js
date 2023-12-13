const billederArray = [
    "fliserens_foer_efter 1.jpg",
    "ydelser_produkter-02.png",
    "fliserens 3.jpg"
 ];
 
 let slideshowInterval;
 let skifter = 0;
 
 function startBilledslideshow() {
    slideshowInterval = setInterval(() => {
        skifter = (skifter + 1) % billederArray.length;
        opdaterBillede();
    }, 2000); // hvert antal millisekunder
 }
 
 function opdaterBillede() {
    const slideshowBillede = document.getElementById('slideshowImg');
    slideshowBillede.src = billederArray[skifter];
 }
 
 // Starter slideshow
 startBilledslideshow();
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 const FORM = document.querySelector(".contactForm");
let success;

FORM.addEventListener("submit", submitHandler);

function submitHandler(event) {
    event.preventDefault();
    success = true;

    Array.from(event.target).forEach(validate);
    
    if (success) {
        gemFormularData();
        event.target.submit();
    }
}

function validate(field) {
    if (field.nodeName === "BUTTON") return; // guard clause

    field.nextElementSibling.textContent = "";

    if (field.required && !field.value) {
        field.nextElementSibling.textContent = "Feltet må ikke være tomt!";
        success = false;
    }

    if (field.type === "text" && !field.value) {
        // input fejl
        field.nextElementSibling.textContent = "Skriv dit navn!";
        success = false;
    }

    if (field.type === "email") {
        const indexOfAt = field.value.indexOf("@");
        const indexOfDot = field.value.indexOf(".");

        if (indexOfAt === -1
            || indexOfAt === 0
            || indexOfAt === field.value.length - 1
            || indexOfDot === -1
            || indexOfDot === 0
            || indexOfDot === field.value.length - 1
            || indexOfDot < indexOfAt
            || indexOfAt === indexOfDot - 1) {
            field.nextElementSibling.textContent = "Du skal skrive en korrekt email adresse!";
            success = false;
        }
    }

    if (field.type === "tel") {
        // Konverter telefonnummeret til et tal
        const telefonNummer = Number(field.value);

        if (telefonNummer.toString() !== field.value || telefonNummer.toString().length !== field.value.length) {
            field.nextElementSibling.textContent = "Du skal bruge tal og maksimalt 8 cifre";
            success = false;
        }
    }

    if (field.nodeName === "TEXTAREA") {
        if (field.value.length < 15
            || field.value.length > 255) {
            field.nextElementSibling.textContent = "Besked skal være mellem 15 og 255 tegn";
            success = false;
        }
    }
}

function gemFormularData() {
    const formData = {
        navn: FORM.querySelector('input[name="name"]').value,
        email: FORM.querySelector('input[name="email"]').value,
        telefon: FORM.querySelector('input[name="phone"]').value,
        besked: FORM.querySelector('textarea[name="message"]').value,
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    
    // Viser en succesbesked når formularen er sendt
    alert("Den blev succesfuldt sendt!");
}