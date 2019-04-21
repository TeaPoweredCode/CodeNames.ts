enum eCardType { RedSpy, BlueSpy, Neutral, Assassin}

let words: Array<string> = [
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

class Board {
    cards: Array<Card> = [];
    StartingTeam: eCardType;

    constructor()
    {
        this.StartingTeam = Math.floor(Math.random() * 2) == 1 ? eCardType.RedSpy : eCardType.BlueSpy;

        let cardOrder: Array<eCardType> = [eCardType.Assassin,
        eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral,
        eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy,
        eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy,
        this.StartingTeam];            

        this.ShuffleArray(cardOrder);

        let randomNumbers: Array<number> = [];
        while (randomNumbers.length < cardOrder.length)
        {
            let randomnumber = Math.floor(Math.random() * words.length);
            if (randomNumbers.indexOf(randomnumber) > -1) continue;
            randomNumbers[randomNumbers.length] = randomnumber;
        }

        for (let i = 0; i < cardOrder.length; i++)
            this.cards.push(new Card(words[randomNumbers[i]], cardOrder[i]));
    }


    ShuffleArray(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    Render(outputEle: HTMLElement)
    {
        let gemColor: string = (this.StartingTeam == eCardType.BlueSpy ? "Blue" : "Red");
        let html :string = `<div class="Board">
                            <div class="Gem Gem1" style="background-color:${gemColor}"></div>
                            <div class="Gem Gem2" style="background-color:${gemColor}"></div>
                            <div class="PlayArea"></div>
                            <div class="Gem Gem3" style="background-color:${gemColor}"></div>
                            <div class="Gem Gem4" style="background-color:${gemColor}"></div>
                            </div>`;

        outputEle.innerHTML = html;

        let playArea : HTMLElement = outputEle.querySelector(".PlayArea");
        this.cards.forEach(function (card) {
            card.Render(playArea);
        })
    }
}


class Card {
    word: string;
    CardType: eCardType;
    Cardrender: HTMLElement;


    constructor(pword: string, cardType: eCardType)
    {
        this.word = pword;
        this.CardType = cardType;
    }

    Click()
    {
        this.Cardrender.style.color = this.ToggledColor();
        return true;
    }

    ToggledColor()
    {
        let color: string;
        switch (this.CardType)
        {
            case eCardType.Assassin: color = "Black"; break;
            case eCardType.Neutral: color = "Gray"; break;
            case eCardType.RedSpy: color = "Red"; break;
            case eCardType.BlueSpy: color = "Blue"; break;
        }
        return color;
    }

    Render(outputEle: HTMLElement)
    {
        this.Cardrender = document.createElement('div');
        this.Cardrender.className = 'Card';
        this.Cardrender.style.color = 'Green';
        this.Cardrender.innerHTML = this.word;
        this.Cardrender.addEventListener('click', (e:Event) => this.Click());
        outputEle.appendChild(this.Cardrender);
    }
}

let main: HTMLElement = document.createElement('div');
document.body.appendChild(main);

let board: Board = new Board();
board.Render(main);