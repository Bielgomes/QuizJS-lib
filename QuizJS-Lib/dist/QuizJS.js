var Question = /** @class */ (function () {
    function Question(image, content, options, correctAnswer) {
        this.image = image;
        this.content = content;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
    return Question;
}());
var QuizControl = /** @class */ (function () {
    function QuizControl() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.haveSounds = false;
    }
    QuizControl.prototype.addQuestion = function (image, content, options, correctAnswer) {
        this.questions.push(new Question(image, content, options, correctAnswer));
    };
    QuizControl.prototype.setSounds = function (correctSoundElement, wrongSoundElement) {
        this.correctSoundElement = correctSoundElement;
        this.wrongSoundElement = wrongSoundElement;
        this.haveSounds = true;
    };
    QuizControl.prototype.start = function (container) {
        this.container = container;
        this.container.innerHTML = "";
        this.renderQuestion(this.currentQuestion);
        this.applyStyles();
    };
    QuizControl.prototype.renderQuestion = function (index) {
        var _this = this;
        var data = this.questions[index];
        this.container.innerHTML = "\n      <div class=\"quizJSContent\">\n\n        <img src=\"".concat(data.image, "\">\n        <strong>").concat(data.content, "</strong>\n\n        <div id=\"quizJSColumn\"></div>\n\n      </div>\n    ");
        var buttonsDiv = document.getElementById('quizJSColumn');
        var _loop_1 = function (i) {
            var button = document.createElement("button");
            button.addEventListener('click', function () {
                if (i === data.correctAnswer) {
                    _this.score++;
                    if (_this.haveSounds) {
                        _this.correctSoundElement.currentTime = 0;
                        _this.correctSoundElement.play();
                    }
                }
                else {
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
    };
    QuizControl.prototype.applyStyles = function () {
        var styles = "\n      #".concat(this.container.id, " {\n        display: flex;\n        justify-content: center;\n      }\n      \n      .quizJSContent {\n        width: 84.5rem;\n        height: 40.75rem;\n      \n        background-color: #1F2937;\n      \n        display: flex;\n        flex-direction: column;\n        align-items: center;\n      \n        border-radius: 8px;\n      \n        color: #FFFFFF;\n      \n        font-family: 'Andale Mono', monospace;\n      }\n      \n      .quizJSContent img {\n        width: 42rem;\n        height: 15.875rem;\n        padding-top: 1.187rem;\n      \n        object-fit: cover;\n      }\n      \n      .quizJSContent button {\n        width: 17.937rem;\n        height: 4.125rem;\n    \n        background-color: #CBD5E1;\n    \n        color: #404040;\n    \n        border-radius: 4px;\n        border: 0;\n    \n        transition: background-color 0.4s;\n    \n        font-family: 'Andale Mono', monospace;\n      }\n      \n      .quizJSContent button:hover {\n        background-color: #9CA3AF;\n      \n      }\n      \n      .quizJSContent strong{\n          font-weight: bold;\n          font-size: 1.562rem;\n          line-height: 22px;    \n      \n          padding: 1.812rem 0;\n      }\n      \n      #quizJSColumn {\n        display: flex;\n        flex-direction: row;\n        flex-wrap: wrap;\n      \n        justify-content: center;\n      \n        gap: 1.375rem;\n      }\n\n      .quizJScore {\n        width: 100%;\n        height: 100%;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        text-shadow: 0 0 1px #FFFFFF;\n      }\n    ");
        var style = document.createElement('style');
        style.innerHTML = styles;
        document.head.appendChild(style);
    };
    QuizControl.prototype.showResult = function () {
        this.container.innerHTML = "\n      <div class=\"quizJSContent\">\n        <div class=\"quizJScore\">\n          <strong>Voc\u00EA acertou ".concat(this.score, " de ").concat(this.questions.length, " perguntas!</strong>\n        </div>\n      </div>\n    ");
    };
    return QuizControl;
}());
