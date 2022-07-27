const quizControl = new QuizControl()

quizControl.setSounds(
  document.getElementById('sound-correct'),
  document.getElementById('sound-wrong')
)

quizControl.setShuffleOptions(true)

quizControl.setShuffleQuestions(true)

quizControl.addQuestion(
  'https://gallasdisperati.com.br/blog/wp-content/uploads/sites/2/2021/12/capital-da-holanda-2.jpg',
  'É um país da Europa! seu idioma é o Holandes, que país é este?',
  [
    'Holanda',
    'Alemanha',
    'Inglaterra',
    'Espanha'
  ],
  0
)

quizControl.addQuestion(
  'https://wallpapercave.com/wp/wp3090399.jpg',
  'Com quantos anos nasceu Vladimir Putin',
  [
    '3',
    '1914', 
    '0', 
    '19'
  ],
  2
)

quizControl.addQuestion(
  'https://tm.ibxk.com.br/2015/02/20/20123037880334.jpg',
  'Quem criou o minecraft',
  [
    'Xbox comporation', 
    'Notch', 
    'Java', 
    'Mojang'
  ],
  1
)

quizControl.addQuestion(
  'https://aventurasnahistoria.uol.com.br/media/_versions/personagem/condessadndn_widelg.jpg',
  'Qual é o feminino de conde?',
  [
    'Condessa', 
    'Travesti',
    'Conda', 
    'Conde-mia',
  ],
  0
)

quizControl.addQuestion(
  'https://cdn.britannica.com/50/6850-050-7858DDE6/Brazil-map-features-locator.jpg',
  'Ceará, Alagoas e Sergipe são estados de que região do Brasil?',
  [
    'Indonésia', 
    'Nordeste', 
    'Centro-Oeste', 
    'Sul'
  ], 
  1
)

quizControl.start(document.getElementById('quizJSContainer'))