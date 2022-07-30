var Question = /** @class */ (function () {
    function Question(image, content, options, correctAnswer) {
        this.image = image;
        this.content = content;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
    Question.prototype.shuffleOptions = function () {
        var correctAnswer = this.options[this.correctAnswer];
        this.options = this.options.sort(function () { return Math.random() - 0.5; });
        this.correctAnswer = this.options.indexOf(correctAnswer);
    };
    Question.prototype.isCorrect = function (answerIndex) {
        return this.correctAnswer === answerIndex;
    };
    return Question;
}());
var QuizControl = /** @class */ (function () {
    function QuizControl() {
        this.theme = 'dark';
        this.currentQuestion = 0;
        this.score = 0;
        this.haveSounds = false;
        this.shuffleOptions = false;
        this.shuffleQuestions = false;
        this.questions = [];
        this.guesses = [];
    }
    QuizControl.prototype.setSounds = function (correctSoundElement, wrongSoundElement) {
        this.correctSoundElement = correctSoundElement;
        this.wrongSoundElement = wrongSoundElement;
        this.haveSounds = true;
    };
    QuizControl.prototype.setTheme = function (theme) {
        this.theme = theme;
    };
    QuizControl.prototype.setShuffleOptions = function (shuffle) {
        this.shuffleOptions = shuffle;
    };
    QuizControl.prototype.setShuffleQuestions = function (shuffle) {
        this.shuffleQuestions = shuffle;
    };
    QuizControl.prototype.shuffleQuestionsArray = function () {
        this.questions = this.questions.sort(function () { return Math.random() - 0.5; });
    };
    QuizControl.prototype.addQuestion = function (image, content, options, correctAnswer) {
        var newQuestion = new Question(image, content, options, correctAnswer);
        this.questions.push(newQuestion);
    };
    QuizControl.prototype.start = function (container) {
        this.container = container;
        this.container.innerHTML = "";
        this.applyStyles();
        if (this.shuffleQuestions)
            this.shuffleQuestionsArray();
        this.renderQuestion(this.currentQuestion);
    };
    QuizControl.prototype.reset = function () {
        this.currentQuestion = 0;
        this.score = 0;
        this.guesses = [];
        if (this.shuffleQuestions)
            this.shuffleQuestionsArray();
        this.renderQuestion(this.currentQuestion);
    };
    QuizControl.prototype.showResult = function () {
        var _this = this;
        this.container.innerHTML = "\n      <div class=\"quizJSContent\">\n        <div id=\"quizJSQuestionsOverall\"></div>\n        <div class=\"quizJScore\">\n          <strong>Voc\u00EA acertou ".concat(this.score, " de ").concat(this.questions.length, " perguntas!</strong>\n          <button id=\"quizJSRemakeButton\">Refazer</button>\n        </div>\n      </div>\n    ");
        this.renderQuestionsOverall();
        var remakeButton = document.getElementById('quizJSRemakeButton');
        remakeButton.addEventListener('click', function () {
            _this.reset();
        });
    };
    QuizControl.prototype.renderQuestion = function (index) {
        var _this = this;
        var data = this.questions[index];
        if (this.shuffleOptions)
            data.shuffleOptions();
        this.container.innerHTML = "\n      <div class=\"quizJSContent\">\n\n        <div id=\"quizJSQuestionsOverall\"></div>\n\n        <img src=\"".concat(data.image, "\">\n        <strong>").concat(data.content, "</strong>\n\n        <div id=\"quizJSColumn\"></div>\n\n      </div>\n    ");
        var buttonsDiv = document.getElementById('quizJSColumn');
        var _loop_1 = function (i) {
            var button = document.createElement("button");
            button.addEventListener('click', function () {
                if (data.isCorrect(i)) {
                    _this.score++;
                    _this.guesses.push('correct');
                    if (_this.haveSounds) {
                        _this.correctSoundElement.currentTime = 0;
                        _this.correctSoundElement.play();
                    }
                }
                else {
                    _this.guesses.push('wrong');
                    if (_this.haveSounds) {
                        _this.wrongSoundElement.currentTime = 0;
                        _this.wrongSoundElement.play();
                    }
                }
                if (_this.currentQuestion < _this.questions.length - 1) {
                    _this.currentQuestion++;
                    _this.renderQuestion(_this.currentQuestion);
                }
                else {
                    _this.showResult();
                }
            });
            button.innerHTML = data.options[i];
            buttonsDiv.appendChild(button);
        };
        for (var i = 0; i < data.options.length; i++) {
            _loop_1(i);
        }
        this.renderQuestionsOverall();
    };
    QuizControl.prototype.renderQuestionsOverall = function () {
        var questionsOverral = document.getElementById('quizJSQuestionsOverall');
        for (var i = 0; i < this.guesses.length; i++) {
            var question = document.createElement("span");
            question.dataset.type = this.guesses[i];
            questionsOverral.appendChild(question);
        }
        for (var i = 0; i < this.questions.length - this.guesses.length; i++) {
            var question = document.createElement("span");
            if (i == 0) {
                question.dataset.type = 'current';
            }
            questionsOverral.appendChild(question);
        }
    };
    QuizControl.prototype.applyStyles = function () {
        var primaryColor;
        var backgroundColor;
        var ButtonHover;
        var titleColor;
        var textColor;
        var currentType;
        if (this.theme == 'dark') {
            backgroundColor = '#1F2937';
            ButtonHover = '#9CA3AF';
            primaryColor = '#CBD5E1';
            titleColor = '#FFFFFF';
            textColor = '#404040';
            currentType = '#94A3B8';
        }
        else {
            backgroundColor = '#94A3B8';
            ButtonHover = '#9CA3AF';
            primaryColor = '#CBD5E1';
            titleColor = 'black';
            textColor = '#404040';
            currentType = '#64748b';
        }
        var styles = "\n      #".concat(this.container.id, " {\n        display: flex;\n        justify-content: center;\n\n        user-select: none;\n        -webkit-user-drag: none\n      }\n      \n      #quizJSQuestionsOverall {\n        padding-top: 1.625rem;\n\n        flex-wrap: wrap;\n\n        display: flex;\n        align-items: center;\n        justify-content: center;\n\n        gap: 1.625rem;\n      }\n\n      #quizJSQuestionsOverall span {\n        width: 24px;\n        height: 24px;\n        \n        border-radius: 999px;\n        background-color: ").concat(primaryColor, ";\n      }\n\n      #quizJSQuestionsOverall span[data-type=\"correct\"] {\n        background-color: #4ade80;\n      }\n\n      #quizJSQuestionsOverall span[data-type=\"wrong\"] {\n        background-color: #f87171;\n      }\n\n      #quizJSQuestionsOverall span[data-type=\"current\"] {\n        background-color: ").concat(currentType, ";\n      }\n      \n      .quizJSContent {\n        width: 84.5rem;\n        min-height: 40.75rem;\n      \n        background-color: ").concat(backgroundColor, ";\n      \n        display: flex;\n        flex-direction: column;\n        align-items: center;\n      \n        border-radius: 8px;\n      \n        color: ").concat(titleColor, ";\n\n        padding-bottom: 1rem;\n      \n        font-family: 'Andale Mono', monospace;\n      }\n      \n      .quizJSContent img {\n        width: 42rem;\n        height: 15.875rem;\n        padding-top: 1.187rem;\n      \n        object-fit: cover;\n\n        border-radius: 8px;\n      }\n      \n      .quizJSContent button {\n        width: 17.937rem;\n        height: 4.125rem;\n    \n        background-color: ").concat(primaryColor, ";\n    \n        color: ").concat(textColor, ";\n\n        border-radius: 4px;\n        border: 0;\n    \n        transition: background-color 0.4s;\n    \n        font-family: 'Andale Mono', monospace;\n        font-weight: bold;\n      }\n      \n      .quizJSContent button:hover {\n        background-color: ").concat(ButtonHover, ";\n      \n      }\n      \n      .quizJSContent strong {\n        font-weight: bold;\n        font-size: 1.562rem;\n        line-height: 22px;    \n    \n        padding: 1.812rem 0;\n      }\n      \n      #quizJSColumn {\n        display: flex;\n        flex-direction: row;\n        flex-wrap: wrap;\n      \n        justify-content: center;\n      \n        gap: 1.375rem;\n      }\n\n      .quizJScore {\n        width: 100%;\n        height: 100%;\n\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n\n        text-shadow: 0 0 1px ").concat(titleColor, ";\n      }\n    ");
        var style = document.createElement('style');
        style.innerHTML = styles;
        style.type = 'text/css';
        document.head.appendChild(style);
    };
    return QuizControl;
}());
