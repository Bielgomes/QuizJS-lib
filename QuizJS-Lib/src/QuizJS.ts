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
}

class QuizControl {

  questions: Question[];
  currentQuestion: number;
  score: number;
  container: HTMLDivElement;
  correctSoundElement: HTMLAudioElement;
  wrongSoundElement: HTMLAudioElement;
  haveSounds: boolean

  constructor() {
    this.questions = [];
    this.currentQuestion = 0;
    this.score = 0;
    this.haveSounds = false;
  }

  addQuestion(image: URL, content: string, options: string[], correctAnswer: number) {
    this.questions.push(new Question(image, content, options, correctAnswer))
  }

  setSounds(correctSoundElement: HTMLAudioElement, wrongSoundElement: HTMLAudioElement) {
    this.correctSoundElement = correctSoundElement
    this.wrongSoundElement = wrongSoundElement

    this.haveSounds = true
  }

  start(container: HTMLDivElement) {
    this.container = container;
    this.container.innerHTML = "";
    this.renderQuestion(this.currentQuestion);
    this.applyStyles();
  }

  renderQuestion(index: number) {
    const data = this.questions[index];

    this.container.innerHTML = `
      <div class="quizJSContent">

        <img src="${data.image}">
        <strong>${data.content}</strong>

        <div id="quizJSColumn"></div>

      </div>
    `

    const buttonsDiv = document.getElementById('quizJSColumn')!

    for(let i = 0; i < data.options.length; i++) {
      let button = document.createElement("button")

      button.addEventListener('click', () => {
        if (i === data.correctAnswer) {
          this.score++

          if (this.haveSounds) {
            this.correctSoundElement.currentTime = 0
            this.correctSoundElement.play()
          }
        } else {
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
  }

  applyStyles() {
    let styles = `
      #${this.container.id} {
        display: flex;
        justify-content: center;
      }
      
      .quizJSContent {
        width: 84.5rem;
        height: 40.75rem;
      
        background-color: #1F2937;
      
        display: flex;
        flex-direction: column;
        align-items: center;
      
        border-radius: 8px;
      
        color: #FFFFFF;
      
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
        justify-content: center;
        align-items: center;

        text-shadow: 0 0 1px #FFFFFF;
      }
    `

    const style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
  }

  showResult() {
    this.container.innerHTML = `
      <div class="quizJSContent">
        <div class="quizJScore">
          <strong>Você acertou ${this.score} de ${this.questions.length} perguntas!</strong>
        </div>
      </div>
    `
  }
}
