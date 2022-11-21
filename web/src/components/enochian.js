const office = document.getElementById("office");
const output = document.getElementById("output");
const generateBtn = document.getElementById("generatebtn");

generateBtn.addEventListener("click", () => {
  const inputText = office.value;
  const polarity = document.querySelector(
    'input[name="polarity"]:checked'
  ).value;
  const astrological = document.querySelector(
    'input[name="astrological"]:checked'
  ).value;

  const chart = Object.keys(planets).includes(astrological)
    ? "planet"
    : "zodiac";
  const hebrewWord = englishToHebrew(inputText.toLowerCase());
  const enochianWord = englishToEnochian(inputText.toLowerCase());
  const enochianName = enochianToName(
    enochianWord,
    chart,
    astrological,
    polarity
  );
  const pronounciation = enochianPronounciation(enochianName);
  const enochianImages = nameToImages(enochianName);

  output.innerHTML = `
    <p>Hebrew Transliteration: ${hebrewWord}</p>
    <p>Pronounciation: ${pronounciation}</p>
    ${enochianImages}
    `;
});

function enochianPronounciation(enochianName) {
  const inputArr = enochianName;
  const outputArr = [];
  for (let i = 0; i < inputArr.length; i++) {
    const enochianLetter = enochianName[i];
    const syllable = enochianSounds[enochianLetter];
    outputArr.push(syllable);
  }
  return outputArr.join("-");
}

function nameToImages(enochianName) {
  let output = "";
  for (let i in enochianName) {
    const letter = enochianName[i];
    const image = `<img class="enochian-letter" src="enochian-letters/${letter}.png">`;
    output = output + "\n" + image;
  }
  return output;
}

function enochianToName(enochianWord, chart, astrological, polarity) {
  const inputArr = enochianWord.split(" ");
  const outputArr = [];
  for (let i = 0; i < inputArr.length; i++) {
    const inputLetter = inputArr[i];
    const col =
      chart == "planet" ? planets[astrological] : zodiac[astrological];
    const row =
      polarity == "good"
        ? enochianOrder[inputLetter]
        : 20 - enochianOrder[inputLetter];
    const outputLetter =
      chart == "planet" ? planetMatrix[col][row] : zodiacMatrix[col][row];
    outputArr.push(outputLetter);
  }
  return outputArr;
}

function englishToEnochian(englishWord) {
  let enochianWord = "";
  for (let i = 0; i < englishWord.length; i++) {
    const englishLetter = englishWord.substring(i, i + 1);
    enochianWord = enochianWord + " " + englishToEnoch[englishLetter];
  }
  return enochianWord.trim();
}

function englishToHebrew(englishWord) {
  let hebrewWord = "";

  for (let i = 0; i < englishWord.length; i++) {
    const letter = englishWord.substring(i, i + 1);
    const secondLetter = englishWord.substring(i + 1, i + 2);
    switch (secondLetter) {
      case "h":
        const listOfFirstLetters = ["d", "g", "p", "s", "c", "k", "t"];
        if (listOfFirstLetters.includes(letter)) {
          hebrewWord = hebrewWord + convertDoubles[letter + secondLetter];
          i++;
        } else {
          hebrewWord = hebrewWord + convertSingles[letter];
        }
        break;
      case "s":
        if (letter == "t") {
          hebrewWord = hebrewWord + convertDoubles[letter + secondLetter];
          i++;
        } else {
          hebrewWord = hebrewWord + convertSingles[letter];
        }
        break;
      case "z":
        if (letter == "t") {
          hebrewWord = hebrewWord + convertDoubles[letter + secondLetter];
          i++;
        } else {
          hebrewWord = hebrewWord + convertSingles[letter];
        }
        break;
      default:
        hebrewWord = hebrewWord + convertSingles[letter];
    }
  }

  return hebrewWord;
}

const planets = {
  luna: 0,
  mercury: 1,
  venus: 2,
  sol: 3,
  jupiter: 4,
  mars: 5,
  saturn: 6,
};

const zodiac = {
  pisces: 0,
  aquarius: 1,
  capricorn: 2,
  sagittarius: 3,
  scorpio: 4,
  libra: 5,
  virgo: 6,
  leo: 7,
  cancer: 8,
  gemini: 9,
  taurus: 10,
  aries: 11,
};

const englishToEnoch = {
  a: "un",
  b: "pa",
  c: "veh",
  d: "gal",
  e: "graph",
  f: "or",
  g: "ged",
  h: "na",
  i: "gon",
  j: "gon",
  k: "veh",
  l: "ur",
  m: "tal",
  n: "drux",
  o: "med",
  p: "mals",
  q: "ger",
  r: "don",
  s: "fam",
  t: "gisg",
  u: "van",
  v: "van",
  w: "van van",
  x: "pal",
  y: "gon",
  z: "ceph",
};

const planetMatrix = [
  [
    "pa",
    "tal",
    "pal",
    "pa",
    "tal",
    "pal",
    "pa",
    "tal",
    "pal",
    "pa",
    "tal",
    "pal",
    "pa",
    "tal",
    "pal",
    "pa",
    "tal",
    "pal",
    "pa",
    "tal",
    "pal",
    "pa",
    "tal",
    "pal",
  ],
  [
    "veh",
    "gon",
    "med",
    "veh",
    "gon",
    "med",
    "veh",
    "gon",
    "med",
    "veh",
    "gon",
    "med",
    "veh",
    "gon",
    "med",
    "veh",
    "gon",
    "med",
    "veh",
    "gon",
    "med",
    "veh",
    "gon",
    "med",
  ],
  [
    "ged",
    "na",
    "don",
    "ged",
    "na",
    "don",
    "ged",
    "na",
    "don",
    "ged",
    "na",
    "don",
    "ged",
    "na",
    "don",
    "ged",
    "na",
    "don",
    "ged",
    "na",
    "don",
  ],
  [
    "gal",
    "ur",
    "ceph",
    "gal",
    "ur",
    "ceph",
    "gal",
    "ur",
    "ceph",
    "gal",
    "ur",
    "ceph",
    "gal",
    "ur",
    "ceph",
    "gal",
    "ur",
    "ceph",
    "gal",
    "ur",
    "ceph",
  ],
  [
    "or",
    "mals",
    "van",
    "or",
    "mals",
    "van",
    "or",
    "mals",
    "van",
    "or",
    "mals",
    "van",
    "or",
    "mals",
    "van",
    "or",
    "mals",
    "van",
    "or",
    "mals",
    "van",
  ],
  [
    "un",
    "ger",
    "fam",
    "un",
    "ger",
    "fam",
    "un",
    "ger",
    "fam",
    "un",
    "ger",
    "fam",
    "un",
    "ger",
    "fam",
    "un",
    "ger",
    "fam",
    "un",
    "ger",
    "fam",
  ],
  [
    "graph",
    "drux",
    "gisg",
    "graph",
    "drux",
    "gisg",
    "graph",
    "drux",
    "gisg",
    "graph",
    "drux",
    "gisg",
    "graph",
    "drux",
    "gisg",
    "graph",
    "drux",
    "gisg",
    "graph",
    "drux",
    "gisg",
  ],
];

const zodiacMatrix = [
  [
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
  ],
  [
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
  ],
  [
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "ger",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "ger",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "ger",
  ],
  [
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
  ],
  [
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "van",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "van",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "van",
    "drux",
  ],
  [
    "un",
    "ceph",
    "gon",
    "gisg",
    "ger",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "ger",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "ger",
    "ged",
    "pal",
  ],
  [
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
  ],
  [
    "tal",
    "fam",
    "ur",
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "veh",
    "drux",
    "or",
    "don",
  ],
  [
    "gon",
    "gisg",
    "mals",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "mals",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "mals",
    "ged",
    "pal",
    "un",
    "ceph",
  ],
  [
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
    "na",
    "pa",
    "ger",
    "gal",
    "med",
    "graph",
    "van",
  ],
  [
    "ur",
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
    "ur",
    "veh",
    "drux",
    "or",
    "don",
    "tal",
    "fam",
  ],
  [
    "mals",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "mals",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
    "mals",
    "ged",
    "pal",
    "un",
    "ceph",
    "gon",
    "gisg",
  ],
];

const enochianOrder = {
  pa: 0,
  veh: 1,
  ged: 2,
  gal: 3,
  or: 4,
  un: 5,
  graph: 6,
  tal: 7,
  gon: 8,
  na: 9,
  ur: 10,
  mals: 11,
  ger: 12,
  drux: 13,
  pal: 14,
  med: 15,
  don: 16,
  ceph: 17,
  van: 18,
  fam: 19,
  gisg: 20,
};

const convertDoubles = {
  dh: "ד",
  gh: "ג",
  ph: "פ",
  sh: "ש",
  ch: "ח",
  kh: "ח",
  th: "ת",
  tz: "צ",
  ts: "צ",
};
const convertSingles = {
  a: "א",
  b: "ב",
  c: "כ",
  d: "ד",
  e: "א",
  f: "פ",
  g: "ג",
  h: "ה",
  i: "י",
  j: "י",
  k: "ח",
  l: "ל",
  m: "מ",
  n: "נ",
  o: "ו",
  p: "פ",
  q: "ק",
  r: "ר",
  s: "ס",
  t: "ט",
  u: "ו",
  v: "ו",
  w: "ו",
  x: "ס",
  y: "י",
  z: "ז",
  " ": "  ",
};

const enochianSounds = {
  pa: "B",
  veh: "C",
  ged: "G",
  gal: "D",
  or: "F",
  un: "A",
  graph: "E",
  tal: "M",
  gon: "I",
  na: "H",
  ur: "L",
  mals: "P",
  ger: "Q",
  drux: "N",
  pal: "X",
  med: "O",
  don: "R",
  ceph: "Z",
  van: "V",
  fam: "S",
  gisg: "T",
};
