const FORM = document.querySelector(".beskeder");

let success;

FORM.addEventListener("submit", submitHandler);


function submitHandler(event) {
  event.preventDefault();
  success = true;

  Array.from(event.target).forEach(validate);
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
    
    if (field.nodeName === "TEXTAREA") {
        if (field.value.length < 15
            ||field.value.length > 255) {
                field.nextElementSibling.textContent = "besked max 255 ord min 15"
                success = false
            }
    }
    

}

























//laver stjerner
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('ratedStars')) {
        ratedStars = parseInt(localStorage.getItem('ratedStars'));
        updateStars();
    }
    if (localStorage.getItem('message')) {
        document.querySelector('textarea[name="message"]').value = localStorage.getItem('message');
    }
    const gemteVurderinger = JSON.parse(localStorage.getItem('vurderinger')) || [];
    visGemteVurderingerISlideshow(gemteVurderinger);
});

let ratedStars = 0;

function rate(stars) {
    ratedStars = stars;
    updateStars();
    console.log('Rated Stars:', ratedStars);
}

function highlightStars(stars) {
    updateStars(stars);
}

function resetStars() {
    updateStars();
}

function updateStars(highlight = 0) {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
        if (index + 1 <= ratedStars || index + 1 <= highlight) {
            star.classList.add('rated');
        } else {
            star.classList.remove('rated');
        }
    });
}








document.querySelector('textarea[name="message"]').addEventListener('input', function () {
    const message = this.value;
    console.log('Message:', message);
});

document.querySelector('.beskeder').addEventListener('submit', function (event) {
    
    const errorMessage = validateForm();
    if (errorMessage) {
        
        document.querySelector('.statusMessage').innerText = errorMessage;
        
        event.preventDefault();
    } else {
        // hvis der ikke er fejl skal den gemme i localStorage
        localStorage.setItem('ratedStars', ratedStars.toString());
        localStorage.setItem('message', document.querySelector('textarea[name="message"]').value);
        console.log('Form submitted. Data saved to localStorage.');
    }
});


function validateForm() {
    const message = document.querySelector('textarea[name="message"]').value;
    if (message.length < 15 || message.length > 255) {
        return 'Besked skal være mellem 15 og 255 tegn.';
    }
    return ''; // ingen fejl

}


















































document.querySelector('.beskeder').addEventListener('submit', function (event) {
    const fejlBesked = validateForm();
    if (fejlBesked) {
        document.querySelector('.statusMessage').innerText = fejlBesked;
        event.preventDefault();
    } else {
        // Hent eksisterende vurderinger fra localStorage
        const gemteVurderinger = JSON.parse(localStorage.getItem('vurderinger')) || [];

        // Tilføj den nye vurdering til listen
        gemteVurderinger.push({
            stjerner: ratedStars.toString(),
            besked: document.querySelector('textarea[name="message"]').value
        });

        // Gem den opdaterede liste i localStorage
        localStorage.setItem('vurderinger', JSON.stringify(gemteVurderinger));

        // Tøm indholdet af tekstSlide
        const tekstSlide = document.getElementById('tekstSlide');
        tekstSlide.innerHTML = '';

        // Opdater visningen i slideshow
        visGemteVurderingerISlideshow(gemteVurderinger);

        console.log('Formular sendt. Data gemt i localStorage.');
    }
});








function visGemteVurderingerISlideshow(gemteVurderinger) {
    const tekstSlide = document.getElementById('tekstSlide');

    // Fjern alle eksisterende slides
    tekstSlide.innerHTML = '';

    // Hent antallet af viste vurderinger fra localStorage
    let visteVurderinger = parseInt(localStorage.getItem('visteVurderinger')) || 0;

    // Hvis der er flere vurderinger, der ikke er blevet vist endnu
    if (visteVurderinger < gemteVurderinger.length) {
        // Vis den næste vurdering
        const nyVurdering = document.createElement('div');
        const stjernerHTML = Array.from({ length: parseInt(gemteVurderinger[visteVurderinger].stjerner) }, (_, index) => '&#9733;').join('');
        nyVurdering.innerHTML = `<p>Brugerens vurdering: ${stjernerHTML}</p><p>Besked: ${gemteVurderinger[visteVurderinger].besked}</p>`;
        tekstSlide.appendChild(nyVurdering);

        // Opdater antallet af viste vurderinger
        localStorage.setItem('visteVurderinger', (visteVurderinger + 1).toString());
    } else {
        // Hvis alle vurderinger er blevet vist, nulstil tælleren
        localStorage.removeItem('visteVurderinger');
    }
}
function submitHandler(event) {
    event.preventDefault();
    success = true;

    // Nulstil tælleren for viste vurderinger
    localStorage.removeItem('visteVurderinger');

    Array.from(event.target).forEach(validate);
}










document.querySelector(".tilVenstrePil").addEventListener('click', visForrigeVurdering);
document.querySelector(".tilHøjrePil").addEventListener('click', visNæsteVurdering);


function visNæsteVurdering() {
    // Hent eksisterende vurderinger fra localStorage
    const gemteVurderinger = JSON.parse(localStorage.getItem('vurderinger')) || [];

    // Hent antallet af viste vurderinger fra localStorage
    let visteVurderinger = parseInt(localStorage.getItem('visteVurderinger')) || 0;

    // Hvis der er flere vurderinger, der ikke er blevet vist endnu
    if (visteVurderinger < gemteVurderinger.length) {
        // Opdater visningen i slideshow
        visGemteVurderingerISlideshow(gemteVurderinger, visteVurderinger);

        // Opdater antallet af viste vurderinger
        localStorage.setItem('visteVurderinger', (visteVurderinger + 1).toString());
    }
    // Du kan tilføje en besked eller ændre visningen, hvis der ikke er flere vurderinger at vise
}



document.querySelector(".tilVenstrepil").addEventListener("click", visForrigeVurdering);

function visForrigeVurdering() {
    let visteVurderinger = parseInt(localStorage.getItem("visteVurderinger")) || 0;
    if (visteVurderinger > 0) {
        visteVurderinger--;

        // Hent eksisterende vurderinger fra localStorage
        const gemteVurderinger = JSON.parse(localStorage.getItem('vurderinger')) || [];

        // Opdater visningen i slideshow
        visGemteVurderingerISlideshow(gemteVurderinger, visteVurderinger);

        // Opdater antallet af viste vurderinger
        localStorage.setItem("visteVurderinger", visteVurderinger.toString());
    } else {
        localStorage.removeItem("visteVurderinger");
    }
}

function visGemteVurderingerISlideshow(gemteVurderinger, visteVurderinger) {
    const tekstSlide = document.getElementById("tekstSlide");

    // Fjern alle eksisterende slides
    tekstSlide.innerHTML = '';

    // Hvis der er flere vurderinger, der ikke er blevet vist endnu
    if (visteVurderinger >= 0 && visteVurderinger < gemteVurderinger.length) {
        // Vis den næste vurdering
        const nyVurdering = document.createElement('div');
        const stjernerHTML = Array.from({ length: parseInt(gemteVurderinger[visteVurderinger].stjerner) }, (_, index) => '&#9733;').join('');
        nyVurdering.innerHTML = `<p>Brugerens vurdering: ${stjernerHTML}</p><p>Besked: ${gemteVurderinger[visteVurderinger].besked}</p>`;
        tekstSlide.appendChild(nyVurdering);
    }
}
