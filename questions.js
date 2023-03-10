const questions = [
  {
    id: 0,
    category: "Science & Nature",
    type: "multiple",
    difficulty: "hard",
    question: "Which of these chemical compounds is NOT found in gastric acid?",
    correct_answer: "Sulfuric acid",
    answerChoices: [
      "Hydrochloric acid",
      "Potassium chloride",
      "Sodium chloride",
      "Sulfuric acid",
    ],
  },
  {
    id: 1,
    category: "Science & Nature",
    type: "multiple",
    difficulty: "easy",
    question: "The asteroid belt is located between which two planets?",
    correct_answer: "Mars and Jupiter",
    answerChoices: [
      "Jupiter and Saturn",
      "Mars and Jupiter",
      "Mercury and Venus",
      "Earth and Mars",
    ],
  },
  {
    id: 2,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "What name does the little headcrab in Half Life 2 have?",
    correct_answer: "Lamarr",
    answerChoices: ["Jumperr", "Drett", "Lamarr", "Jerry"],
  },
  {
    id: 3,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "Which game in the Monster Hunter series introduced the Insect Glaive weapon?",
    correct_answer: "Monster Hunter 4",
    answerChoices: [
      "Monster Hunter Freedom",
      "Monster Hunter Stories",
      "Monster Hunter 2",
      "Monster Hunter 4",
    ],
  },
  {
    id: 4,
    category: "Geography",
    type: "multiple",
    difficulty: "hard",
    question: "What is the land connecting North America and South America?",
    correct_answer: "Isthmus of Panama",
    answerChoices: [
      "Isthmus of Suez",
      "Urals",
      "Isthmus of Panama",
      "Australasia",
    ],
  },
  {
    id: 5,
    category: "Politics",
    type: "multiple",
    difficulty: "medium",
    question: "Which of these is NOT one of Donald Trump's children?",
    correct_answer: "Julius",
    answerChoices: ["Donald Jr.", "Julius", "Ivanka", "Eric"],
  },
  {
    id: 6,
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "Released in 2001, the first edition of Apples Mac OS X operating system (version 10.0) was given what animal code name?",
    correct_answer: "Cheetah",
    answerChoices: ["Cheetah", "Puma", "Tiger", "Leopard"],
  },
  {
    id: 7,
    category: "Entertainment: Video Games",
    type: "boolean",
    difficulty: "easy",
    question:
      "Several characters in Super Mario 64 blink their eyes, including Mario himself.",
    correct_answer: "True",
    answerChoices: ["True", "False"],
  },
  {
    id: 8,
    category: "Celebrities",
    type: "multiple",
    difficulty: "hard",
    question: "Gabe Newell was born in which year?",
    correct_answer: "1962 ",
    answerChoices: ["1970", "1962", "1960", "1972"],
  },
  {
    id: 9,
    category: "History",
    type: "multiple",
    difficulty: "hard",
    question:
      "The Bohemian Revolt (1618-1620) started after Protestants in Prague did what to their Catholic Lords Regents?",
    correct_answer: "Threw them out of a window",
    answerChoices: [
      "Insulted their mothers",
      "Locked them in stockades",
      "Threw them out of a window",
      "Hung them.",
    ],
  },
  {
    id: 10,
    category: "History",
    type: "multiple",
    difficulty: "medium",
    question:
      "In what year did Neil Armstrong and Buzz Aldrin land on the moon?",
    correct_answer: "1969",
    answerChoices: ["1965", "1966", "1973", "1969"],
  },
  {
    id: 11,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "In Clash Royale what is Arena 4 called?",
    correct_answer: "P.E.K.K.A's Playhouse",
    answerChoices: [
      "P.E.K.K.A's Playhouse",
      "Barbarian Bowl",
      "Spell Valley",
      "Royal Arena",
    ],
  },
  {
    id: 12,
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "medium",
    question: "Which of these artists do NOT originate from France?",
    correct_answer: "The Chemical Brothers",
    answerChoices: ["Air", "The Chemical Brothers", "Justice", "Daft Punk"],
  },
  {
    id: 13,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question:
      "Pokemon Go is a location-based augmented reality game developed and published by which company?",
    correct_answer: "Niantic",
    answerChoices: ["Rovio", "Zynga", "Supercell", "Niantic"],
  },
  {
    id: 14,
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which movie sequel had improved box office results compared to its original film?",
    correct_answer: "Toy Story 2",
    answerChoices: [
      "Sin City: A Dame to Kill For",
      "Speed 2: Cruise Control",
      "Toy Story 2",
      "Son of the Mask",
    ],
  },
  {
    id: 15,
    category: "Geography",
    type: "boolean",
    difficulty: "easy",
    question: "Ottawa is the capital of Canada.",
    correct_answer: "True",
    answerChoices: ["True", "False"],
  },
  {
    id: 16,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "By how many minutes are you late to work in Half-Life?",
    correct_answer: "30",
    answerChoices: ["5", "60", "15", "30"],
  },
  {
    id: 17,
    category: "Vehicles",
    type: "multiple",
    difficulty: "hard",
    question: "Which one of these chassis codes are used by BMW 3-series?",
    correct_answer: "E46",
    answerChoices: ["E39", "E46", "E85", "F10"],
  },
  {
    id: 18,
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Who is depicted on the US hundred dollar bill?",
    correct_answer: "Benjamin Franklin",
    answerChoices: [
      "George Washington",
      "Benjamin Franklin",
      "Abraham Lincoln",
      "Thomas Jefferson",
    ],
  },
  {
    id: 19,
    category: "Science & Nature",
    type: "multiple",
    difficulty: "medium",
    question:
      "What does the yellow diamond on the NFPA 704 fire diamond represent?",
    correct_answer: "Reactivity",
    answerChoices: ["Health", "Reactivity", "Flammability", "Radioactivity"],
  },
  {
    id: 20,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "Final Fantasy VI was originally released outside Japan under what name?",
    correct_answer: "Final Fantasy III",
    answerChoices: [
      "Final Fantasy III",
      "Final Fantasy VI",
      "Final Fantasy V",
      "Final Fantasy II",
    ],
  },
  {
    id: 21,
    category: "Geography",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the name of the peninsula containing Spain and Portugal?",
    correct_answer: "Iberian Peninsula",
    answerChoices: [
      "European Peninsula",
      "Peloponnesian Peninsula",
      "Iberian Peninsula",
      "Scandinavian Peninsula",
    ],
  },
  {
    id: 22,
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "How fast is USB 3.1 Gen 2 theoretically?",
    correct_answer: "10 Gb/s",
    answerChoices: ["10 Gb/s", "5 Gb/s", "8 Gb/s", "1 Gb/s"],
  },
  {
    id: 23,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question: "In TF2 Lore, what are the names of the Heavy's younger sisters?",
    correct_answer: "Yana and Bronislava",
    answerChoices: [
      "Gaba and Anna",
      "Yana and Bronislava",
      "Yanna and Gaba",
      "Anna and Bronislava",
    ],
  },
  {
    id: 24,
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "medium",
    question: "Lift Your Spirit is an album by which artist?",
    correct_answer: "Aloe Blacc",
    answerChoices: [
      "Aloe Blacc",
      "Lena Meyer-Landrut",
      "Stevie Wonder",
      "Taylor Swift",
    ],
  },
  {
    id: 25,
    category: "Geography",
    type: "multiple",
    difficulty: "medium",
    question: "What is the capital of Seychelles?",
    correct_answer: "Victoria",
    answerChoices: ["Luanda", "N'Djamena", "Tripoli", "Victoria"],
  },
  {
    id: 26,
    category: "Entertainment: Japanese Anime & Manga",
    type: "multiple",
    difficulty: "hard",
    question:
      "Which person from JoJo's Bizarre Adventure does NOT house a reference to a band, artist, or song earlier than 1980?",
    correct_answer: "Giorno Giovanna",
    answerChoices: [
      "Giorno Giovanna",
      "Josuke Higashikata",
      "Jolyne Cujoh",
      "Johnny Joestar",
    ],
  },
  {
    id: 27,
    category: "Vehicles",
    type: "multiple",
    difficulty: "hard",
    question:
      "What kind of train was Stepney, a train on the Bluebell Railway notable for his appearance in The Railway Series?",
    correct_answer: "LB & SCR A1X",
    answerChoices: [
      "LB & SCR E2",
      "LB & SCR J1",
      "LB & SCR A1X",
      "LB & SCR D1",
    ],
  },
  {
    id: 28,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "What was the main currency in Club Penguin?",
    correct_answer: "Coins",
    answerChoices: ["Stamps", "Tickets", "Gems", "Coins"],
  },
  {
    id: 29,
    category: "General Knowledge",
    type: "multiple",
    difficulty: "medium",
    question: "What is real haggis made of?",
    correct_answer: "Sheep's Heart, Liver and Lungs",
    answerChoices: [
      "Sheep's Heart, Liver and Lungs",
      "Sheep's Heart, Kidneys and Lungs",
      "Sheep's Liver, Kidneys and Eyes",
      "Whole Sheep",
    ],
  },
  {
    id: 30,
    category: "Entertainment: Video Games",
    type: "boolean",
    difficulty: "easy",
    question:
      "Several characters in Super Mario 64 blink their eyes, including Mario himself.",
    correct_answer: "True",
    answerChoices: ["True", "False"],
  },
  {
    id: 31,
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What is Tasmania?",
    correct_answer: "An Australian State",
    answerChoices: [
      "A flavor of Ben and Jerry's ice-cream",
      "A Psychological Disorder",
      "An Australian State",
      "The Name of a Warner Brothers Cartoon Character",
    ],
  },
  {
    id: 32,
    category: "Celebrities",
    type: "multiple",
    difficulty: "hard",
    question: "Who was Donald Trump's first wife?",
    correct_answer: "Ivana Zelnickova",
    answerChoices: [
      "Ivana Zelnickova",
      "Melania Knauss",
      "Marla Maples",
      "Nancy Davis",
    ],
  },
  {
    id: 33,
    category: "History",
    type: "boolean",
    difficulty: "medium",
    question: "The Korean War ended in 1953 without any ceasefire.",
    correct_answer: "False",
    answerChoices: ["True", "False"],
  },
  {
    id: 34,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the name of the adventurer you meet at the mines in Stardew Valley?",
    correct_answer: "Marlon",
    answerChoices: ["Marnie", "Morris", "Marlon", "Marvin"],
  },
  {
    id: 35,
    category: "Sports",
    type: "multiple",
    difficulty: "easy",
    question: "Which two teams played in Super Bowl XLII?",
    correct_answer: "The New York Giants  &  The New England Patriots",
    answerChoices: [
      "The Green Bay Packers  &  The Pittsburgh Steelers",
      "The Philadelphia Eagles  &  The New England Patriots",
      "The Seattle Seahawks  &  The Denver Broncos",
      "The New York Giants  &  The New England Patriots",
    ],
  },
  {
    id: 36,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "In the 2000 video game Crimson Skies, what was the name of the protagonists' zeppelin?",
    correct_answer: "Pandora",
    answerChoices: ["Helios", "Icarus", "Orion", "Pandora"],
  },
  {
    id: 37,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question:
      "In Divinity: Original Sin II, what is the name of the skeletal origin character?",
    correct_answer: "Fane",
    answerChoices: [
      "Lohse",
      "The Red Prince",
      "Fane",
      "There are no skeletal origin characters",
    ],
  },
  {
    id: 38,
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question: "In the Nintendo Game Splatoon 2, what is Marina's screen name?",
    correct_answer: "DJ_Hyperfresh",
    answerChoices: [
      "MC.princess",
      "DJ_Hyperfresh",
      "Kidnotsquid123",
      "I0ffTh3H00k",
    ],
  },
  {
    id: 39,
    category: "Entertainment: Video Games",
    type: "boolean",
    difficulty: "medium",
    question:
      "In Resident Evil, only Chris has access to the grenade launcher.",
    correct_answer: "False",
    answerChoices: ["True", "False"],
  },
];

module.exports = questions;
