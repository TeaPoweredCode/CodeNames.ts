import { eCardType } from "../enums"
import { Card } from "./Card"
import { words } from "../WordList"
import { UiElement} from "./UiElement"

export class Board extends UiElement {
    Cards: Array<Card> = [];
    StartingTeam: eCardType;
    
    constructor()
    {
        super();
        this.StartingTeam = Math.floor(Math.random() * 2) == 1 ? eCardType.RedSpy : eCardType.BlueSpy;

        let cardOrder: Array<eCardType> = this.BuildArray([[eCardType.Neutral,7],
                                                           [eCardType.RedSpy,8],
                                                           [eCardType.BlueSpy,8],
                                                           [eCardType.Assassin,1],
                                                           [this.StartingTeam,1]]);
        this.ShuffleArray(cardOrder);

        let randomNumbers: Array<number> = [];
        while (randomNumbers.length < cardOrder.length)
        {
            let randomnumber = Math.floor(Math.random() * words.length);
            if (randomNumbers.indexOf(randomnumber) > -1) continue;
            randomNumbers[randomNumbers.length] = randomnumber;
        }

        for (let i = 0; i < cardOrder.length; i++)
            this.Cards.push(new Card(words[randomNumbers[i]], cardOrder[i]));
    }
    
    BuildArray(cardData :Array<Array<eCardType|number>>)
    {
        let cardPack:Array<eCardType> = [];

        for (let pair of cardData)
        {
            for(let i = 0 ; i < pair[1]; i++)
            {
                cardPack.push(pair[0]);
            }
        }

        return cardPack;
    }

    ShuffleArray(a:Array<eCardType>) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    Render(outputElement: HTMLElement)
    {
        let gemColor: string = (this.StartingTeam == eCardType.BlueSpy ? "Blue" : "Red");
        let html :string = `<div class="Board">`+
                            `<div class="Gem Gem1" style="background-color:${gemColor}"></div>` +
                            `<div class="Gem Gem2" style="background-color:${gemColor}"></div>` +
                            `<div class="PlayArea"></div>` +
                            `<div class="Gem Gem3" style="background-color:${gemColor}"></div>` +
                            `<div class="Gem Gem4" style="background-color:${gemColor}"></div>` +
                            `</div>`;
        this.DomElement = this.htmlToElement(html);
        outputElement.append(this.DomElement);

        let playArea : HTMLElement = this.DomElement.querySelector(".PlayArea");
        this.Cards.forEach(function (card) {
            card.Render(playArea);
        })
    }
}