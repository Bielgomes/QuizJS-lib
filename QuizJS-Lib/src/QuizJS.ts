class Question {

  image: URL;
  content: string;
  options: string[];
  correctAnswer: number;

  constructor(image: URL, content: string, options: string[], correctAnswer: number) {
    this.image = image;
    this.content = content;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  shuffleOptions(): void {
    const correctAnswer = this.options[this.correctAnswer];
    this.options = this.options.sort(() => Math.random() - 0.5)
    this.correctAnswer = this.options.indexOf(correctAnswer);
  }

  isCorrect(answerIndex: number): boolean {
    return this.correctAnswer === answerIndex;
  }
}

class QuizControl {
  theme: 'dark' | 'light'
  currentQuestion: number
  score: number;
  haveSounds: boolean
  shuffleOptions: boolean
  shuffleQuestions: boolean
  questions: Question[];
  guesses: string[];
  container: HTMLDivElement;
  correctSoundElement: HTMLAudioElement;
  wrongSoundElement: HTMLAudioElement;

  constructor() {
    this.theme = 'dark'
    this.currentQuestion = 0
    this.score = 0
    this.haveSounds = false
    this.shuffleOptions = false
    this.shuffleQuestions = false
    this.questions = [];
    this.guesses = []
  }

  setSounds(correctSoundElement: HTMLAudioElement, wrongSoundElement: HTMLAudioElement): void {
    this.correctSoundElement = correctSoundElement
    this.wrongSoundElement = wrongSoundElement

    this.haveSounds = true
  }

  setTheme(theme: 'dark' | 'light'): void {
    this.theme = theme
  }

  setShuffleOptions(shuffle: boolean): void {
    this.shuffleOptions = shuffle
  }

  setShuffleQuestions(shuffle: boolean): void {
    this.shuffleQuestions = shuffle
  }

  shuffleQuestionsArray(): void {
    this.questions = this.questions.sort(() => Math.random() - 0.5)
  }

  addQuestion(image: URL, content: string, options: string[], correctAnswer: number): void {
    const newQuestion = new Question(image, content, options, correctAnswer)
    this.questions.push(newQuestion)
  }

  start(container: HTMLDivElement): void {
    this.container = container
    this.container.innerHTML = ""
    this.applyStyles()

    if (this.shuffleQuestions)
      this.shuffleQuestionsArray()

    this.renderQuestion(this.currentQuestion)
  }

  reset(): void {
    this.currentQuestion = 0
    this.score = 0
    this.guesses = []

    if (this.shuffleQuestions)
      this.shuffleQuestionsArray()

    this.renderQuestion(this.currentQuestion)
  }

  showResult(): void {
    this.container.innerHTML = `
      <div class="quizJSContent">
        <div id="quizJSQuestionsOverall"></div>
        <div class="quizJScore">
          <strong>Você acertou ${this.score} de ${this.questions.length} perguntas!</strong>
          <button id="quizJSRemakeButton">Refazer</button>
        </div>
      </div>
    `
    this.renderQuestionsOverall()

    const remakeButton = document.getElementById('quizJSRemakeButton')!
    remakeButton.addEventListener('click', () => {
      this.reset()
    })
  }

  renderQuestion(index: number): void {
    const data = this.questions[index];

    if (this.shuffleOptions)
      data.shuffleOptions()

    this.container.innerHTML = `
      <div class="quizJSContent">

        <div id="quizJSQuestionsOverall"></div>

        <img src="${data.image}">
        <strong>${data.content}</strong>

        <div id="quizJSColumn"></div>

      </div>
    `

    const buttonsDiv = document.getElementById('quizJSColumn')!

    for (let i = 0; i < data.options.length; i++) {
      let button = document.createElement("button")

      button.addEventListener('click', () => {
        if (data.isCorrect(i)) {
          this.score++
          this.guesses.push('correct')

          if (this.haveSounds) {
            this.correctSoundElement.currentTime = 0
            this.correctSoundElement.play()
          }
        } else {
          this.guesses.push('wrong')
          if (this.haveSounds) {
            this.wrongSoundElement.currentTime = 0
            this.wrongSoundElement.play()
          }
        }

        if (this.currentQuestion < this.questions.length - 1) {
          this.currentQuestion++
          this.renderQuestion(this.currentQuestion)
        } else {
          this.showResult()
        }
      })

      button.innerHTML = data.options[i];
      buttonsDiv.appendChild(button);
    }

    this.renderQuestionsOverall()
  }

  renderQuestionsOverall(): void {
    const questionsOverral = document.getElementById('quizJSQuestionsOverall')!

    for (let i = 0; i < this.guesses.length; i++) {
      let question = document.createElement("span")
      question.dataset.type = this.guesses[i]
      questionsOverral.appendChild(question)
    }

    for (let i = 0; i < this.questions.length - this.guesses.length; i++) {
      let question = document.createElement("span")
      
      if (i == 0) {
        question.dataset.type = 'current'
      }

      questionsOverral.appendChild(question)
    }
  }

  applyStyles(): void {
    let primaryColor: string
    let backgroundColor: string
    let ButtonHover: string
    let titleColor: string
    let textColor: string
    let currentType: string

    if (this.theme == 'dark') {
      backgroundColor = '#1F2937'
      ButtonHover = '#9CA3AF'
      primaryColor = '#CBD5E1'
      titleColor = '#FFFFFF'
      textColor = '#404040'
      currentType = '#94A3B8'
    } else {
      backgroundColor = '#94A3B8'
      ButtonHover = '#9CA3AF'
      primaryColor = '#CBD5E1'
      titleColor = 'black'
      textColor = '#404040'
      currentType = '#64748b'
    }

    let styles = `
      #${this.container.id} {
        display: flex;
        justify-content: center;

        user-select: none;
        -webkit-user-drag: none
      }
      
      #quizJSQuestionsOverall {
        padding-top: 1.625rem;

        flex-wrap: wrap;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 1.625rem;
      }

      #quizJSQuestionsOverall span {
        width: 24px;
        height: 24px;
        
        border-radius: 999px;
        background-color: ${primaryColor};
      }

      #quizJSQuestionsOverall span[data-type="correct"] {
        background-color: #4ade80;
      }

      #quizJSQuestionsOverall span[data-type="wrong"] {
        background-color: #f87171;
      }

      #quizJSQuestionsOverall span[data-type="current"] {
        background-color: ${currentType};
      }
      
      .quizJSContent {
        width: 84.5rem;
        min-height: 40.75rem;
      
        background-color: ${backgroundColor};
      
        display: flex;
        flex-direction: column;
        align-items: center;
      
        border-radius: 8px;
      
        color: ${titleColor};

        padding-bottom: 1rem;
      
        font-family: 'Andale Mono', monospace;
      }
      
      .quizJSContent img {
        width: 42rem;
        height: 15.875rem;
        padding-top: 1.187rem;
      
        object-fit: cover;

        border-radius: 8px;
      }
      
      .quizJSContent button {
        width: 17.937rem;
        height: 4.125rem;
    
        background-color: ${primaryColor};
    
        color: ${textColor};

        border-radius: 4px;
        border: 0;
    
        transition: background-color 0.4s;
    
        font-family: 'Andale Mono', monospace;
        font-weight: bold;
      }
      
      .quizJSContent button:hover {
        background-color: ${ButtonHover};
      
      }
      
      .quizJSContent strong {
        font-weight: bold;
        font-size: 1.562rem;
        line-height: 22px;    
    
        padding: 1.812rem 0;
      }
      
      #quizJSColumn {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      
        justify-content: center;
      
        gap: 1.375rem;
      }

      .quizJScore {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        text-shadow: 0 0 1px ${titleColor};
      }
    `

    const style = document.createElement('style')
    style.innerHTML = styles;
    style.type = 'text/css';
    document.head.appendChild(style);
  }
}
