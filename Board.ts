class Board {
    cards: Array<Card> = [];
    StartingTeam: eCardType;

    constructor()
    {
        this.StartingTeam = Math.floor(Math.random() * 2) == 1 ? eCardType.RedSpy : eCardType.BlueSpy;

        let cardOrder: Array<eCardType> = [eCardType.Assassin,
        eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral, eCardType.Neutral,
        eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy, eCardType.RedSpy,
        eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy, eCardType.BlueSpy,
        this.StartingTeam];            

        this.ShuffleArray(cardOrder);

        let randomNumbers: Array<number> = [];
        while (randomNumbers.length < cardOrder.length)
        {
            let randomnumber = Math.floor(Math.random() * words.length);
            if (randomNumbers.indexOf(randomnumber) > -1) continue;
            randomNumbers[randomNumbers.length] = randomnumber;
        }

        for (let i = 0; i < cardOrder.length; i++)
            this.cards.push(new Card(words[randomNumbers[i]], cardOrder[i]));
    }


    ShuffleArray(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    Render(outputEle: HTMLElement)
    {
        let gemColor: string = (this.StartingTeam == eCardType.BlueSpy ? "Blue" : "Red");
        let html :string = `<div class="Board">
                            <div class="Gem Gem1" style="background-color:${gemColor}"></div>
                            <div class="Gem Gem2" style="background-color:${gemColor}"></div>
                            <div class="PlayArea"></div>
                            <div class="Gem Gem3" style="background-color:${gemColor}"></div>
                            <div class="Gem Gem4" style="background-color:${gemColor}"></div>
                            </div>`;

        outputEle.innerHTML = html;

        let playArea : HTMLElement = outputEle.querySelector(".PlayArea");
        this.cards.forEach(function (card) {
            card.Render(playArea);
        })
    }
}