import { UiElement } from "./UiElement";
import { Menu } from "./Menu";
import { eCardType } from "../enums"
import { Card } from "./Card";

declare var QRCode: any;

export class SpyMasterMenu  extends UiElement {

    MainMenu : Menu;

    constructor(mainMenu : Menu)
    {
        super();
        this.MainMenu = mainMenu;
    }

    Render(menuInsertElement: HTMLElement, bottomInsertElement: HTMLElement = null ) 
    {
        let menuhtml :string = `<div class="SpyMasterTypeGrid">
                                    <div>Red<ul class="redList"></ul></div> 
                                    <div>Bule<ul class="blueList"></ul></div>
                                    <div>Neutral<ul class="neutralList"></ul></div>
                                    <div>Assassin<ul class="assassinList"></ul></div>
                               </div>`;
        this.DomElement = this.htmlToElement(menuhtml);        
        
        let redCards: Array<Card>;
        let blueCards: Array<Card>;
        let neutralCards: Array<Card>;
        let assassinCards: Card; 

        for(let i = 0; i < this.MainMenu.Game.Cards.length; i++)
        {
            let queryId : string;

            switch(this.MainMenu.Game.Cards[i].CardType)
            {
                case eCardType.RedSpy: queryId = '.redList'; break;
                case eCardType.BlueSpy: queryId = '.blueList'; break;
                case eCardType.Neutral: queryId = '.neutralList'; break;
                case eCardType.Assassin: queryId = '.assassinList'; break;
            }

            this.DomElement.querySelector(queryId)
                           .appendChild(this.htmlToElement(`<li>${this.MainMenu.Game.Cards[i].Word}</li>`))
        }
        
        menuInsertElement.appendChild(this.DomElement);
    }
}