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






















const FORM = document.querySelector(".contactForm")
console.log(FORM);
let success


FORM.addEventListener("submit", submitHandler)

function submitHandler(event) {
	event.preventDefault()
    success = true

	Array.from(event.target).forEach(validate)
    if(success) {
        event.target.submit()
    }
}


function validate(field) {
	if (field.nodeName === "BUTTON") return // guard clause

	field.nextElementSibling.textContent = ""

	if (field.required && !field.value) {
		field.nextElementSibling.textContent = "Feltet må ikke være tomt!"
        success = false
	}

	if (field.type === "text" && !field.value) {
		// input fejl
		field.nextElementSibling.textContent = "Skriv dit navn!"
        success = false
	}

	if (field.type === "email") {
		// gør noget her
		const indexOfAt = field.value.indexOf("@")
		const indexOfDot = field.value.indexOf(".")

		if (indexOfAt === -1
				|| indexOfAt === 0
				|| indexOfAt === field.value.length - 1
				|| indexOfDot === -1
				|| indexOfDot === 0
				|| indexOfDot === field.value.length - 1
				|| indexOfDot < indexOfAt
				|| indexOfAt === indexOfDot - 1) {
			field.nextElementSibling.textContent = "Du skal skrive en korrekt email adresse din nar!"
            success = false
		}
	}

    if(field.type === "tel"){

        if(field.value.length < field.minlength
            || field.value.length > field.maxlength
            || isNaN(field.value)){
            field.nextElementSibling.textContent = "du skal bruge tal og max 8 tal"
            success = false
        }
    }
    if (field.nodeName === "TEXTAREA") {
        if (field.value.length < 15
            ||field.value.length > 255) {
                field.nextElementSibling.textContent = "besked max 255 ord min 15"
                success = false
            }
    }

}