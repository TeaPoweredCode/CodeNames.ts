var words = [
    "remain",
    "axiomatic",
    "thought",
    "sedate",
    "unit",
    "typical",
    "lewd",
    "cute",
    "amazing",
    "glamorous",
    "elbow",
    "collar",
    "own",
    "summer",
    "grain",
    "tawdry",
    "energetic",
    "melted",
    "oven",
    "adorable",
    "separate",
    "squalid",
    "cobweb",
    "calculate",
    "ball",
    "bathe",
    "marble",
    "ice",
    "vanish",
    "spot",
    "dirty",
    "toe",
    "structure",
    "entertain",
    "brother",
    "victorious",
    "appliance",
    "belong",
    "bent",
    "naughty",
    "adamant",
    "even",
    "bang",
    "meal",
    "arrogant",
    "fax",
    "mammoth",
    "unwritten",
    "roasted",
    "brown",
    "painful",
    "recognise",
    "spiky",
    "include",
    "rock",
    "unnatural",
    "drain",
    "loss",
    "important",
    "fold",
    "morning",
    "useless",
    "direction",
    "girls",
    "shade",
    "curved",
    "card",
    "swift",
    "alert",
    "imaginary",
    "love",
    "exist",
    "bomb",
    "notice",
    "tank",
    "parallel",
    "gabby",
    "goofy",
    "dinosaurs",
    "whine",
    "count",
    "lip",
    "tickle",
    "snow",
    "earth",
    "belligerent",
    "cake",
    "psychedelic",
    "letter",
    "strap",
    "rub",
    "confuse",
    "mitten",
    "creator",
    "puzzling",
    "joke",
    "spotted",
    "glue",
    "food",
    "sticky",
];
var Board = /** @class */ (function () {
    function Board() {
        this.Cards = [];
        this.StartingTeam = Math.floor(Math.random() * 2) == 1 ? eCardType.RedSpy : eCardType.BlueSpy;
        var cardOrder = this.BuildArray([[eCardType.Neutral, 7],
            [eCardType.RedSpy, 8],
            [eCardType.BlueSpy, 8],
            [eCardType.Assassin, 1],
            [this.StartingTeam, 1]]);
        this.ShuffleArray(cardOrder);
        var randomNumbers = [];
        while (randomNumbers.length < cardOrder.length) {
            var randomnumber = Math.floor(Math.random() * words.length);
            if (randomNumbers.indexOf(randomnumber) > -1)
                continue;
            randomNumbers[randomNumbers.length] = randomnumber;
        }
        for (var i = 0; i < cardOrder.length; i++)
            this.Cards.push(new Card(words[randomNumbers[i]], cardOrder[i]));
    }
    Board.prototype.BuildArray = function (cardData) {
        var cardPack = [];
        for (var _i = 0, cardData_1 = cardData; _i < cardData_1.length; _i++) {
            var pair = cardData_1[_i];
            for (var i = 0; i < pair[1]; i++) {
                cardPack.push(pair[0]);
            }
        }
        return cardPack;
    };
    Board.prototype.ShuffleArray = function (a) {
        var _a;
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
        }
        return a;
    };
    Board.prototype.Render = function (outputElement) {
        var gemColor = (this.StartingTeam == eCardType.BlueSpy ? "Blue" : "Red");
        var html = "<div class=\"Board\">\n                            <div class=\"Gem Gem1\" style=\"background-color:" + gemColor + "\"></div>\n                            <div class=\"Gem Gem2\" style=\"background-color:" + gemColor + "\"></div>\n                            <div class=\"PlayArea\"></div>\n                            <div class=\"Gem Gem3\" style=\"background-color:" + gemColor + "\"></div>\n                            <div class=\"Gem Gem4\" style=\"background-color:" + gemColor + "\"></div>\n                            </div>";
        this.BoardElement = htmlToElement(html);
        outputElement.append(this.BoardElement);
        var playArea = this.BoardElement.querySelector(".PlayArea");
        this.Cards.forEach(function (card) {
            card.Render(playArea);
        });
    };
    return Board;
}());
var Card = /** @class */ (function () {
    function Card(pword, cardType) {
        this.word = pword;
        this.CardType = cardType;
    }
    Card.prototype.Click = function () {
        this.Cardrender.style.color = "#FFF";
        this.Cardrender.style.backgroundColor = this.ToggledColor();
        return true;
    };
    Card.prototype.ToggledColor = function () {
        var color;
        switch (this.CardType) {
            case eCardType.Assassin:
                color = "Black";
                break;
            case eCardType.Neutral:
                color = "Gray";
                break;
            case eCardType.RedSpy:
                color = "Red";
                break;
            case eCardType.BlueSpy:
                color = "Blue";
                break;
        }
        return color;
    };
    Card.prototype.Render = function (outputElement) {
        var _this = this;
        var html = "<div class=\"Card\"><div>" + this.word + "</div><div>" + this.word + "</div></div>";
        this.Cardrender = htmlToElement(html);
        this.Cardrender.addEventListener('click', function (e) { return _this.Click(); });
        outputElement.appendChild(this.Cardrender);
    };
    return Card;
}());
var eCardType;
(function (eCardType) {
    eCardType[eCardType["RedSpy"] = 0] = "RedSpy";
    eCardType[eCardType["BlueSpy"] = 1] = "BlueSpy";
    eCardType[eCardType["Neutral"] = 2] = "Neutral";
    eCardType[eCardType["Assassin"] = 3] = "Assassin";
})(eCardType || (eCardType = {}));
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}
var board = new Board();
board.Render(document.body);
