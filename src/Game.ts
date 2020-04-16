import { eCardType } from "./enums";
import { Words } from "./WordList";
import { Board } from "./UIElements/Board";
import { Card } from "./UIElements/Card";
import { SpyMaterQrcode } from "./UiElements/SpyMaterQrcode"
import { BoardCodec } from "./BoradCodec";
import { Menu } from "./UIElements/Menu";

export class CodeNamesGame
{
    StartingTeam: eCardType;
    Cards: Array<Card> = [];
    Board: Board;
    SpyMaster: boolean = false;
    MainMenu: Menu;

    SpyMasterUrlBase : string = "https://mrluxan.github.io/CodeNames.ts/?SM=";
    GameEncode : string = "";

    GetSpyMasterUrl() : string
    {
        return this.SpyMasterUrlBase + this.GameEncode;
    }

    Run()
    {
        let spyMasterCode : string = this.ReadGETdata("SM");
        this.SpyMaster = spyMasterCode != null; 

        if(!this.SpyMaster){
            this.NewGame();
        }
        else{
            this.LoadSpyMaster(spyMasterCode);
        }

        this.MainMenu = new Menu(this);
        this.MainMenu.Render(document.body);

        document.body.style.backgroundImage = `url("./images/bg${(this.StartingTeam == eCardType.RedSpy ? "red" : "blue")}.png")`;
    }

    ReadGETdata(lookingFor : string) : string
    {           
        interface IDictionary {
            [key: string]: string;
        };

        if(window.location.href.indexOf('?') > 0)
        {
            let map :IDictionary = {};
            let getData : string = window.location.href.split( "?" )[1];
            let params : Array<string> = getData.split( "&" );
            for(var i = 0; i < params.length; i++)
            {
                let pair : string[] = params[i].split( "=" );
                map[pair[0]] = pair[1];
            }
    
            return(map[lookingFor]);
        }
        else
            return null;
    }


    NewGame()
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
            let randomnumber = Math.floor(Math.random() * Words.length);
            if (randomNumbers.indexOf(randomnumber) > -1) continue;
                randomNumbers[randomNumbers.length] = randomnumber;
        }

        this.Board = new Board(this);

        for (let i = 0; i < cardOrder.length; i++)
            this.Cards.push(new Card(Words[randomNumbers[i]], cardOrder[i], this.Board));
    
        this.Board.Render(document.body);

        this.GameEncode = new BoardCodec().ToString(this);
        new SpyMaterQrcode(this).Render(document.body);
    }

    LoadSpyMaster(spyMasterCode : string)
    {
        this.Board = new Board(this);
        new BoardCodec().FromString(this, spyMasterCode);
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