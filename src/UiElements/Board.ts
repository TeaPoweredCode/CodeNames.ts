import { eCardType } from "../enums"
import { UiElement} from "./UiElement"
import { CodeNamesGame } from "../Game";

export class Board extends UiElement {

    Game: CodeNamesGame;
    
    constructor(game: CodeNamesGame)
    {
        super();
        this.Game = game;
    }
    
    Render(outputElement: HTMLElement)
    {
        let html :string = `<div class="Board"><div class="PlayArea"></div></div>`;
        this.DomElement = this.htmlToElement(html);
        outputElement.append(this.DomElement);

        let playArea : HTMLElement = this.DomElement.querySelector(".PlayArea");
        this.Game.Cards.forEach(function (card) {
            card.Render(playArea);
        })
    }
}