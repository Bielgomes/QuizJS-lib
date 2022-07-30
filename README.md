# Documentação
##### QuizJS é uma biblioteca simples para a criação de Quizzes com HTML e Javascript

# Iniciando

## Instalação
Basta incluir este código no body da sua página

```html
<script src="https://cdn.jsdelivr.net/gh/Bielgomes/QuizJS-lib@v1.0.2/QuizJS-Lib/dist/QuizJS.js"></script>
```

## Criando o Quiz
Primeiro você deve criar uma div com um id, e coloca-ló no seu body
```html
<div id="quizJSContainer"></div>
```
Dentro de um arquivo JS, você deve instanciar o QuizControl e adicionar suas perguntas:
```js
const quizControl = new QuizControl()

quizControl.addQuestion(
  'https://gallasdisperati.com.br/blog/wp-content/uploads/sites/2/2021/12/capital-da-holanda-2.jpg', // Imagem
  'É um país da Europa! seu idioma é o Holandes, que país é este?', // Pergunta
  [ // Array das respostas
    'Holanda',
    'Alemanha',
    'Inglaterra',
    'Espanha'
  ],
  0 // Index da resposta correta (Holanda)
)
```

## Iniciando o Quiz
Dentro do seu arquivo JS basta utilizar do DOM para pegar a div que foi criada nos passos anteriores e chamar a função start
```js
quizControl.start(document.getElementById('quizJSContainer'))
```

## Configurações extras
Você pode adicionar os sons de errar e acertar uma pergunta, basta incluir os áudios como a tag audio do html e definir seus ids, logo apos é só chamar a função setSounds
```js
quizControl.setSounds(
  document.getElementById('sound-correct'),
  document.getElementById('sound-wrong')
)
```

Podemos ativar o embaralhamento das questões e das respostas
```js
// Embaralha as respostas de cada questão
quizControl.setShuffleOptions(true) // Por padrão é false

// Embaralha a ordem em que as questões aparecem
quizControl.setShuffleQuestions(true) // Por padrão é false
```

Escolhendo o tema
```
// Por padrão é dark
quizControl.setTheme('light')
```
