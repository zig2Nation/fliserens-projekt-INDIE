const billederArray = [
    "fliserens 1.jpg",
    "fliserens 2.jpg",
    "fliserens 3.jpg"
];


let slideshowInterval;
let skifter = 0;


function startBilledslideshow() {
    slideshowInterval = setInterval(() => {
        skifter = (skifter + 1) % billederArray.length;
        opdaterBillede();
    }, 2000); //hvert antal millisekunder
}

function opdaterBillede() {
    const slideshowBillede = document.getElementById('slideshowImg');
    slideshowBillede.src = billederArray[skifter];
}

// Starter slide show
startBilledslideshow();































const FORM = document.querySelector(".contactForm");

let success;

FORM.addEventListener("submit", submitHandler);


function submitHandler(event) {
  event.preventDefault();
  success = true;

  Array.from(event.target).forEach(validate);

  if (success) {
    // Gem formularen i localStorage
    gemFormularData();
    
  }
}

function validate(field) {
  if (field.nodeName === "BUTTON") return; // guard clause

  const label = field.closest("label"); // find det overordnede label-element

  label.style.border = ""; // nulstil grænsestil

  field.nextElementSibling.textContent = "";

  if (field.required && !field.value) {
    field.nextElementSibling.textContent = "Feltet må ikke være tomt!";
    label.style.borderBottom = "1px solid red"; // tilføj rød kant ved fejl
    success = false;
  }

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

        if(field.value.length < field.minLength
            || field.value.length > field.maxLength
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

function gemFormularData() {
    const formData = {
      navn: FORM.querySelector('input[name="name"]').value,
      email: FORM.querySelector('input[name="email"]').value,
      telefon: FORM.querySelector('input[name="phone"]').value,
      besked: FORM.querySelector('textarea[name="message"]').value,
    };
  
    // gemmer det som en streng i localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
  
    // viser en succsesbesked når formularen er sendt
    alert("den blev succesfuldt sendt!");
  }









































