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