import { eCardType } from "../enums"
import { UiElement } from "./UiElement";
import { Board } from "./Board"


export class Card  extends UiElement {
    Word: string;
    CardType: eCardType;
    GameBoard: Board

    constructor(word: string, cardType: eCardType, board: Board)
    {
        super();
        this.Word = word;
        this.CardType = cardType;
        this.GameBoard = board;
    }

    Click()
    {
        if(this.GameBoard.Game.SpyMaster)
            this.ToggledColor();
        else
            this.CheckMarkCard();
    }

    ToggledColor()
    {
        let bgColor: string;
        switch (this.CardType)
        {
            case eCardType.Assassin: bgColor = "Black"; break;
            case eCardType.Neutral: bgColor = "Gray"; break;
            case eCardType.RedSpy: bgColor = "Red"; break;
            case eCardType.BlueSpy: bgColor = "Blue"; break;
        }

        this.DomElement.style.color = "#FFF";
        this.DomElement.style.backgroundColor = bgColor;
    }

    CheckMarkCard()
    {
        let checkMark = <HTMLElement>this.DomElement.querySelector('.CheckMark');
        checkMark.style.display = (checkMark.style.display == "none" ? "block" : "none");
    }

    Render(outputElement: HTMLElement)
    {
        let html :string = `<div class="Card"><div>${this.Word}</div><div>${this.Word}</div><div class="CheckMark">&#10003;</div></div>`;
        this.DomElement = this.htmlToElement(html);
        outputElement.appendChild(this.DomElement);

        this.DomElement.addEventListener('click', (e:Event) => this.Click());

        if(this.GameBoard.Game.SpyMaster)
            this.ToggledColor;
    }
}