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

  answersAmount: number;
  score: number;
  haveSounds: boolean
  shuffleOptions: boolean
  shuffleQuestions: boolean
  originalQuestions: Question[];
  questions: Question[];
  guesses: string[];
  container: HTMLDivElement;
  correctSoundElement: HTMLAudioElement;
  wrongSoundElement: HTMLAudioElement;

  constructor() {
    this.answersAmount = 0
    this.score = 0
    this.haveSounds = false
    this.shuffleOptions = false
    this.shuffleQuestions = false
    this.originalQuestions = []
    this.questions = [];
    this.guesses = []
  }

  setSounds(correctSoundElement: HTMLAudioElement, wrongSoundElement: HTMLAudioElement): void {
    this.correctSoundElement = correctSoundElement
    this.wrongSoundElement = wrongSoundElement

    this.haveSounds = true
  }

  setShuffleOptions(shuffle: boolean): void {
    this.shuffleOptions = shuffle
  }

  setShuffleQuestions(shuffle: boolean): void {
    this.shuffleQuestions = shuffle
  }

  addQuestion(image: URL, content: string, options: string[], correctAnswer: number): void {
    const newQuestion = new Question(image, content, options, correctAnswer)
    
    if (this.shuffleOptions)
      newQuestion.shuffleOptions()
    
    this.questions.push(newQuestion)
  }

  start(container: HTMLDivElement): void {
    this.container = container
    this.container.innerHTML = ""
    this.originalQuestions = [...this.questions]
    this.renderQuestion(this.answersAmount)
    this.applyStyles()
  }

  reset(): void {
    this.answersAmount = 0
    this.score = 0
    this.guesses = []
    this.questions = [...this.originalQuestions]
    this.renderQuestion(this.answersAmount)
  }

  showResult(): void {
    this.container.innerHTML = `
      <div class="quizJSContent">
        <div id="quizJSQuestionsOverall"></div>
        <div class="quizJScore">
          <strong>Você acertou ${this.score} de ${this.originalQuestions.length} perguntas!</strong>
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
    let data: Question

    if (this.shuffleQuestions) {
      const randomIndex = Math.floor(Math.random() * this.questions.length)
      data = this.questions[randomIndex]
      this.questions.splice(randomIndex, 1)
    } else {
      data = this.questions[index];
    }

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

        if (this.answersAmount < this.originalQuestions.length - 1) {
          this.answersAmount++
          this.renderQuestion(this.answersAmount)
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

    for (let i = 0; i < this.originalQuestions.length - this.guesses.length; i++) {
      let question = document.createElement("span")
      
      if (i == 0) {
        question.dataset.type = 'current'
      }

      questionsOverral.appendChild(question)
    }
  }

  applyStyles(): void {
    let styles = `
      #${this.container.id} {
        display: flex;
        justify-content: center;

        user-select: none;
        user-drag: none;
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
        background-color: #CBD5E1;
      }

      #quizJSQuestionsOverall span[data-type="correct"] {
        background-color: #4ade80;
      }

      #quizJSQuestionsOverall span[data-type="wrong"] {
        background-color: #f87171;
      }

      #quizJSQuestionsOverall span[data-type="current"] {
        background-color: #94a3b8;
      }
      
      .quizJSContent {
        width: 84.5rem;
        min-height: 40.75rem;
      
        background-color: #1F2937;
      
        display: flex;
        flex-direction: column;
        align-items: center;
      
        border-radius: 8px;
      
        color: #FFFFFF;

        padding-bottom: 1rem;
      
        font-family: 'Andale Mono', monospace;
      }
      
      .quizJSContent img {
        width: 42rem;
        height: 15.875rem;
        padding-top: 1.187rem;
      
        object-fit: cover;
      }
      
      .quizJSContent button {
        width: 17.937rem;
        height: 4.125rem;
    
        background-color: #CBD5E1;
    
        color: #404040;
    
        border-radius: 4px;
        border: 0;
    
        transition: background-color 0.4s;
    
        font-family: 'Andale Mono', monospace;
      }
      
      .quizJSContent button:hover {
        background-color: #9CA3AF;
      
      }
      
      .quizJSContent strong{
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

        text-shadow: 0 0 1px #FFFFFF;
      }
    `

    const style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
  }
}
