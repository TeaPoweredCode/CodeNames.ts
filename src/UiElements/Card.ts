import { eCardType } from "../enums"
import { UiElement } from "./UiElement";

export class Card  extends UiElement {
    word: string;
    CardType: eCardType;

    constructor(pword: string, cardType: eCardType)
    {
        super();
        this.word = pword;
        this.CardType = cardType;
    }

    Click()
    {
        this.DomElement.style.color = "#FFF";
        this.DomElement.style.backgroundColor = this.ToggledColor();
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

    Render(outputElement: HTMLElement)
    {
        let html :string = `<div class="Card"><div>${this.word}</div><div>${this.word}</div></div>`;

        this.DomElement = this.htmlToElement(html);
        this.DomElement.addEventListener('click', (e:Event) => this.Click());
        outputElement.appendChild(this.DomElement);
    }
}