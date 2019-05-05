import { eCardType } from "../enums"
import { UiElement} from "./UiElement"
import { Game } from "../Game";

export class Board extends UiElement {

    Game: Game;
    
    constructor(game: Game)
    {
        super();
        this.Game = game;
    }
    
    Render(outputElement: HTMLElement)
    {
        let gemColor: string = (this.Game.StartingTeam == eCardType.BlueSpy ? "Blue" : "Red");
        let html :string = `<div class="Board">`+
                            //`<div class="Gem Gem1" style="background-color:${gemColor}"></div>` +
                            //`<div class="Gem Gem2" style="background-color:${gemColor}"></div>` +
                            `<div class="PlayArea"></div>` +
                            //`<div class="Gem Gem3" style="background-color:${gemColor}"></div>` +
                            //`<div class="Gem Gem4" style="background-color:${gemColor}"></div>` +
                            `</div>`;
        this.DomElement = this.htmlToElement(html);
        outputElement.append(this.DomElement);

        let playArea : HTMLElement = this.DomElement.querySelector(".PlayArea");
        this.Game.Cards.forEach(function (card) {
            card.Render(playArea);
        })
    }
}