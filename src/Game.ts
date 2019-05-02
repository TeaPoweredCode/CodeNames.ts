import { eCardType } from "./enums";
import { words } from "./WordList";
import { Board } from "./UIElements/Board";
import { Card } from "./UIElements/Card";

export class Game
{
    StartingTeam: eCardType;
    Cards: Array<Card> = [];
    Board: Board;
    
    constructor()
    {
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
        
        this.Board = new Board(this);
        this.Board.Render(document.body);
    }

    BuildArray(cardData :Array<Array<eCardType|number>>) : Array<eCardType>
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

    ShuffleArray(a:Array<eCardType>) : Array<eCardType> {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}