var french_words = [
  "aimer", "amour", "animer", "animal", "année", "appareil", "appartement", "appeler", "apprendre",
  "argent", "arrêter", "arriver", "attention", "attraper", "aujourd'hui", "autant", "avancer", "baisser",
  "bataille", "beaucoup", "besoin", "bonjour", "bouger", "cadeau", "campagne", "candidat", "capable",
  "capital", "caractère", "certain", "certainement", "certitude", "chaleur", "chance", "changer", "chanson",
  "chaque", "charme", "chasser", "chemin", "chercher", "cheval", "choisir", "chose", "cinéma", "classe",
  "collègue", "colline", "comprendre", "conduire", "confiance", "connaître", "conscience", "considérer",
  "courage", "courir", "couvrir", "crainte", "créer", "croire", "danger", "danser", "demander", "demeurer",
  "descendre", "désirer", "détruire", "devenir", "deviner", "différent", "difficile", "directeur", "disparaître",
  "distinguer", "docteur", "dominer", "donner", "doucement", "douleur", "douter", "doux", "drame", "droit",
  "écouter", "écrire", "effet", "également", "éloigner", "émotion", "empêcher", "employer", "enceinte", "endroit",
  "enfance", "enfant", "ensemble", "entendre", "entrer", "envoyer", "époque", "espérer", "esprit", "essayer",
  "essentiel", "estimer", "examiner", "exister", "expliquer", "exprimer", "extérieur", "famille", "fatigue",
  "fauteuil", "favorable", "fidèle", "figure", "fille", "finalement", "finir", "flamme", "fonction", "fonctionner",
  "force", "forcer", "former", "frapper", "frère", "furieux", "gagner", "garder", "général", "généralement",
  "gentil", "gouvernement", "grand", "habitude", "heureux", "histoire", "homme", "honneur", "horrible", "humain",
  "imaginer", "immense", "importance", "important", "impossible", "impression", "incroyable", "indiquer", "inquiéter",
  "insister", "intelligent", "intéressant", "intérêt", "inviter", "jamais", "jardin", "journal", "juste", "laisser",
  "langue", "lancer", "légume", "liberté", "limite", "loger", "lumière", "lutter", "magnifique", "maintenant",
  "maison", "malgré", "manière", "manquer", "marcher", "mardi", "mémoire", "menace", "métier", "mettre", "miracle",
  "moi-même", "monde", "montrer", "mourir", "mouvement", "musique", "nature", "nettoyer", "nommer", "nouveau",
  "observer", "obtenir", "occasion", "occuper", "odeur", "offrir", "opinion", "organiser", "oublier", "ouvrir",
  "parler", "parvenir", "passer", "patience", "payer", "peindre", "pendant", "penser", "perdre", "permettre",
  "personne", "plaisir", "plein", "pleurer", "plonger", "pouvoir", "préférer", "premier", "prendre", "préparer",
  "présence", "préserver", "presque", "prétendre", "prévenir", "prévoir", "principal", "problème", "profond",
  "promettre", "protéger", "prouver", "public", "puisque", "puisse", "qualité", "quand", "quant", "quarante",
  "quartier", "quitter", "raison", "ramasser", "rapporter", "recommencer", "reconnaître", "réduire", "regarder",
  "remarquer", "remplacer", "remplir", "rencontre", "rendre", "répondre", "reposer", "représenter", "respect",
  "respirer", "ressentir", "rester", "retenir", "retrouver", "réussir", "réveiller", "revenir", "riche", "rire",
  "risquer", "rompre", "rouler", "royal", "saison", "salle", "saluer", "santé", "satisfaction", "sauter", "savoir",
  "secret", "sembler", "sentiment", "sentir", "serrer", "service", "seulement", "silence", "simple", "situation",
  "société", "sommeil", "sonner", "sortir", "souffrir", "souhaiter", "soulager", "souligner", "souvenir", "spectacle",
  "statue", "stupéfait", "succès", "suffire", "suivre", "superbe", "table", "tâcher", "taire", "talent", "tardif",
  "tellement", "temps", "tendre", "tenir", "terminer", "terrain", "terrible", "tête", "théâtre", "tirer", "tomber",
  "tourner", "toujours", "traduire", "tragique", "trahir", "trainer", "traiter", "trente", "trésor", "triste", "tromper",
  "trouver", "utiliser", "valeur", "valoir", "vérité", "verser", "victoire", "visible", "visiter", "vivant", "vivre",
  "volonté", "votre", "vouloir", "voyager", "vraiment", "éclairer", "éloigner", "émettre", "émotion", "empêcher",
  "enseigner", "essayer", "étonner", "examiner", "excuser", "exister", "expliquer", "exprimer"
];


let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let score = 0;
let gameEnded = false;

const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const rainSound = document.getElementById('rainSound');

// Ajustement du volume des sons
winSound.volume = 0.7;
loseSound.volume = 0.7;
correctSound.volume = 0.5;
wrongSound.volume = 0.5;
rainSound.volume = 0.3; // Volume réduit pour le bruit de pluie de fond

// Vérifiez si le son de la pluie est chargé
rainSound.addEventListener('canplaythrough', () => {
  console.log('Rain sound can play through');
});

function toggleRainSound() {
  if (rainSound.paused) {
    rainSound.play().catch((error) => {
      console.error('Error playing rain sound:', error);
    });
  } else {
    rainSound.pause();
  }
}

function randomWord() {
  answer = french_words[Math.floor(Math.random() * french_words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `');"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

window.handleGuess = function(chosenLetter) { // Attacher la fonction à l'objet window
  if (gameEnded) return;

  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  const button = document.getElementById(chosenLetter);
  if (button) {
    button.setAttribute('disabled', true);
    button.classList.add('btn-chosen');
  }

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
    correctSound.play();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
    wrongSound.play();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.png';
  const hangmanPic = document.getElementById('hangmanPic');
  hangmanPic.classList.add('shake');
  setTimeout(() => hangmanPic.classList.remove('shake'), 500);
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = '<span class="game-message game-message-win">Tu as gagné!!!</span>';
    winSound.play();
    score += 10;
    document.getElementById('score').innerHTML = 'Score: ' + score;
    setTimeout(reset, 5000);  // Relance le jeu après 5 secondes
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = '<span class="game-message">La réponse était : ' + answer + '</span>';
    document.getElementById('keyboard').innerHTML = '<span class="game-message game-message-lose">Tu as perdu!!!</span>';
    loseSound.play();
    score -= 5;
    document.getElementById('score').innerHTML = 'Score: ' + score;
    setTimeout(reset, 5000);  // Relance le jeu après 5 secondes
  }
}


function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join(' ');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  gameEnded = false;
  document.getElementById('hangmanPic').src = './images/0.png';
  document.getElementById('hint').innerHTML = '';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

function changeTheme(theme) {
  document.body.className = theme + '-theme';
  document.querySelectorAll('button').forEach(button => {
    button.className = `btn btn-lg m-2 ${theme}-theme`;
  });
}

document.getElementById('playRainSound').addEventListener('click', function() {
  if (rainSound.paused) {
    rainSound.play().catch((error) => {
      console.error('Error playing rain sound:', error);
    });
    this.innerText = 'Pause Rain Sound';
  } else {
    rainSound.pause();
    this.innerText = 'Play Rain Sound';
  }
});


document.getElementById('maxWrong').innerHTML = maxWrong;

document.addEventListener('DOMContentLoaded', (event) => {
  randomWord();
  generateButtons();
  guessedWord();
});
