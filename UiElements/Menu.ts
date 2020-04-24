import { UiElement } from "./UiElement";
import {CodeNamesGame } from "../Game"
import { BoardMenu } from "./BoardMenu";
import { SpyMasterMenu } from "./SpyMasterMenu"; 

export class Menu  extends UiElement {

    Game:CodeNamesGame;

    constructor(game:CodeNamesGame)
    {
        super();
        this.Game = game;
    }

    MenuButtonClick()
    {   
        if(this.DomElement.dataset.open != "true")
        {
            this.DomElement.dataset.open = "true";
            (<HTMLElement>this.DomElement.querySelector(".TopBar")).style.transform = "rotate(-45deg)";
            (<HTMLElement>this.DomElement.querySelector(".ButtonBar")).style.transform = "rotate(45deg)";
        }
        else
        {
            this.DomElement.dataset.open = "false";
            (<HTMLElement>this.DomElement.querySelector(".TopBar")).style.transform = "rotate(45deg)";
            (<HTMLElement>this.DomElement.querySelector(".ButtonBar")).style.transform = "rotate(-45deg)";
        }


        this.DomElement.classList.toggle("MenuHidden");
        this.DomElement.classList.toggle("TopBar");     
    }

    Render(outputElement: HTMLElement)
    {
        let html :string = `<div data-open="false" class="Menu MenuTransform MenuHidden">
                                <div class="MenuPanel">
                                    Menu
                                    <div class="MenuInsert"></div>
                                    <div class="Info">
                                        <div class="MenuExtra"></div>
                                        <div class="version">v 0.8</div>
                                    </div>
                                </div>
                                <button title="Menu" class="MenuButton">
                                    <div class="InnerButton">
                                        <div class="TopBar MenuTransform"></div>
                                        <div class="ButtonBar MenuTransform"></div>
                                    </div>
                                </button>
                            </div>`;
        this.DomElement = this.htmlToElement(html);        
        outputElement.appendChild(this.DomElement);

        let menuInsertDiv = <HTMLElement>this.DomElement.querySelector('.MenuInsert');
        let extraInsertDiv = <HTMLElement>this.DomElement.querySelector('.MenuExtra');

        if(!this.Game.SpyMaster){
            new BoardMenu(this).Render(menuInsertDiv,extraInsertDiv);
        }
        else{
            new SpyMasterMenu(this).Render(menuInsertDiv)
        }

        this.DomElement.querySelector('.MenuButton').addEventListener("click", (e:Event) => this.MenuButtonClick());
    }
}