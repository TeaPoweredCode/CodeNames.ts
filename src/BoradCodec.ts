import {CodeNamesGame} from "./Game"
import { eCardType } from "./enums";
import { Card } from "./UIElements/Card";
import { Words } from "./WordList"; 

export class BoardCodec
{
    ToString(game :CodeNamesGame) : string 
    {
        let wordOrder: string = ""; 
        let typeOrder: string = ""; 

        for(let i = 0; i < game.Cards.length; i++){
            let card : Card = game.Cards[i];

            let wordIndex : number = Words.indexOf(card.word);
            wordOrder += this.Pad(wordIndex.toString(36),2);

            typeOrder += card.CardType.toString();
        }

        typeOrder = parseInt(typeOrder, 4).toString(36);
        return wordOrder + typeOrder;
    }

    Pad(num: string, size: number): string{
        let temp : string = num;
        while (temp.length < size) temp = "0" + temp;
        return temp;
    }

    FromString(game :CodeNamesGame, stringVal :string)
    {
        let startingTeam: eCardType;
        let cards: Array<Card> = [];
        
        let wordOrder: string = stringVal.slice(0, 50); 
        let typeOrder: string = stringVal.slice(50); 

        typeOrder = this.Pad(parseInt(typeOrder,36).toString(4),25);

        let wordIndexArray :Array<string> = wordOrder.match(/.{1,2}/g);

        let typecount : number = 0;

        for(let i = 0; i < wordIndexArray.length; i++)
        {
            let word = Words[parseInt(wordIndexArray[i],36)];
            let cardTypeNumber : number = parseInt(typeOrder[i]);
            typecount += cardTypeNumber;

            cards.push(new Card(word,<eCardType>cardTypeNumber));
        }

        game.Cards = cards;
        game.StartingTeam = (typecount == 25 ? eCardType.RedSpy : eCardType.BlueSpy); // 25 red 26 blue
    }
}