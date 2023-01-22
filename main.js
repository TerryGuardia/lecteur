let open_lib = document.querySelector(".open_lib");
let library = document.querySelector(".library");
let musique = document.querySelectorAll(".borderBottom");

let image = document.querySelector(".couverture");
let titre = document.querySelector(".titre_musique");
let artiste = document.querySelector(".artiste");

let btnPMusique = document.querySelector(".fa-step-backward");
let sliderProgression = document.querySelector(".progression");
let lecteur = document.querySelector("#player");
let tempsTotal = document.querySelector(".total");
let tempsActuel = document.querySelector(".actuel");
let btnNMusique = document.querySelector(".fa-step-forward");

let btnMute = document.querySelector(".fa-volume-down");
let sliderVolume = document.querySelector(".volume");

let btnAlea = document.querySelector(".aleatoire i");
let btnStop = document.querySelector(".stop");
let btnPlayPause = document.querySelector(".playpause");
let btnBoucle = document.querySelector(".boucle i");

let effet = document.querySelectorAll(".trait");
let liste = [
  {
    img: "./img/adventure.jpeg",
    nom_titre: "Adventure Of A Lifetime",
    artiste: "Coldplay",
    musique: "./music/adventure.mp3",
  },
  {
    img: "./img/numb.jpg",
    nom_titre: "Numb",
    artiste: "Linkin Park",
    musique: "./music/numb.mp3",
  },
  {
    img: "./img/ninelie.jpg",
    nom_titre: "Ninelie",
    artiste: "Aimer",
    musique: "./music/ninelie.mp3",
  },
  {
    img: "./img/sparkle.jpg",
    nom_titre: "Sparkle",
    artiste: "RADWIMPS",
    musique: "./music/sparkle.mp3",
  },
  {
    img: "./img/paint.jpg",
    nom_titre: "Paint It, Black",
    artiste: "The Rolling Stones",
    musique: "./music/paint.mp3",
  },
];

let lectureEnCours;
let musiqueChoisi = 0;
let updateTimer;
lecteur.volume = sliderVolume.value / 100;

chargeMusique(musiqueChoisi);
// Fait apparaître ou disparaître la liste des musiques.
open_lib.addEventListener("click", () => {
  library.classList.toggle("jsDNone");
});

function chargeMusique(musiqueChoisi) {
  clearInterval(updateTimer);
  reset();

  lecteur.src = liste[musiqueChoisi].musique;
  image.style.backgroundImage = "url(" + liste[musiqueChoisi].img + ")";
  titre.textContent = liste[musiqueChoisi].nom_titre;
  artiste.textContent = liste[musiqueChoisi].artiste;

  musique.forEach((element, index) => {
    if (index === musiqueChoisi) {
      element.classList.add("jsMusicActuel");
    } else {
      element.classList.remove("jsMusicActuel");
    }
  });
}
//Lance la lecture de la musique séléctionnée.
function play() {
  lecteur.play();
  lectureEnCours = true;
  btnPlayPause.innerHTML = '<i class="fa fa-pause fa-5x"></i>';
  effet.forEach((element) => {
    element.classList.add("jsEnLecture");
  });

  updateTimer = setInterval(update, 1000);
  lecteur.addEventListener("ended", nextMusique);
}

//Pause la lecture de la musique séléctionnée.
function pause() {
  lecteur.pause();
  lectureEnCours = false;
  btnPlayPause.innerHTML = '<i class="fa fa-play fa-5x"></i>';
  effet.forEach((element) => {
    element.classList.remove("jsEnLecture");
  });
}

// lance soit play() soit pause() selon l'état actuel.
function playPause() {
  if (lectureEnCours) {
    pause();
  } else {
    play();
  }
}
btnPlayPause.addEventListener("click", playPause);

//Défini le volume et l'icon correspondant.
function volume() {
  lecteur.volume = sliderVolume.value / 100;
  if (btnMute.classList.contains("fa-volume-xmark") && lecteur.volume !== 0) {
    btnMute.classList.replace("fa-volume-xmark", "fa-volume-down");
  }
  if (lecteur.volume === 0) {
    btnMute.classList.replace("fa-volume-down", "fa-volume-xmark");
  }
}
sliderVolume.addEventListener("change", volume);

//Coupe le son.
function mute() {
  if (lecteur.volume > 0) {
    volumeActuel = lecteur.volume;
    lecteur.volume = 0;
    btnMute.classList.replace("fa-volume-down", "fa-volume-xmark");
    sliderVolume.value = 0;
  } else {
    lecteur.volume = volumeActuel;
    btnMute.classList.replace("fa-volume-xmark", "fa-volume-down");
    sliderVolume.value = volumeActuel * 100;
  }
}
btnMute.addEventListener("click", mute);

//Active ou désactive la lecture en boucle.
function enBoucle() {
  let hasLoop = lecteur.getAttribute("loop");
  if (!hasLoop) {
    lecteur.setAttribute("loop", "loop");
    btnBoucle.classList.add("jsWhite");
  }
  if (hasLoop) {
    lecteur.removeAttribute("loop");
    btnBoucle.classList.remove("jsWhite");
  }
}
btnBoucle.addEventListener("click", enBoucle);

function nextMusique() {
  if (
    musiqueChoisi < liste.length - 1 &&
    !btnAlea.classList.contains("jsWhite")
  ) {
    musiqueChoisi += 1;
  } else if (
    musiqueChoisi < liste.length - 1 &&
    btnAlea.classList.contains("jsWhite")
  ) {
    let random = Math.floor(Math.random() * liste.length);
    musiqueChoisi = random;
  } else {
    musiqueChoisi = 0;
  }
  chargeMusique(musiqueChoisi);
  if (lectureEnCours) {
    play();
  }
}
btnNMusique.addEventListener("click", nextMusique);

function prevMusique() {
  if (musiqueChoisi > 0) {
    musiqueChoisi -= 1;
  } else {
    musiqueChoisi = liste.length - 1;
  }
  chargeMusique(musiqueChoisi);
  if (lectureEnCours) {
    play();
  }
}
btnPMusique.addEventListener("click", prevMusique);

function progression() {
  lecteur.currentTime = lecteur.duration * (sliderProgression.value / 100);
}
sliderProgression.addEventListener("change", progression);

function update() {
  if (lecteur.duration) {
    sliderProgression.value = lecteur.currentTime * (100 / lecteur.duration);
    let minActu = Math.floor(lecteur.currentTime / 60);
    let secActu = Math.floor(lecteur.currentTime - minActu * 60);
    let minTotal = Math.floor(lecteur.duration / 60);
    let secTotal = Math.floor(lecteur.duration - minTotal * 60);

    if (secActu < 10) {
      secActu = "0" + secActu;
    }
    if (secTotal < 10) {
      secTotal = "0" + secTotal;
    }
    if (minActu < 10) {
      minActu = "0" + minActu;
    }
    if (minTotal < 10) {
      minTotal = "0" + minTotal;
    }

    tempsActuel.textContent = minActu + ":" + secActu;
    tempsTotal.textContent = minTotal + ":" + secTotal;
  }
}
function reset() {
  tempsActuel.textContent = "00:00";
  tempsTotal.textContent = "00:00";
  sliderProgression.value = 0;
}

function aleatoire() {
  btnAlea.classList.toggle("jsWhite");
}
btnAlea.addEventListener("click", aleatoire);

function arret() {
  pause();
  lecteur.currentTime = 0;
}
btnStop.addEventListener("click", arret);

musique.forEach((element, index) => {
  element.addEventListener("click", () => {
    musiqueChoisi = index;
    chargeMusique(musiqueChoisi);
    if (lectureEnCours) {
      play();
    }
  });
});
