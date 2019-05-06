import {UiElement} from "./UIElement"
import {CodeNamesGame} from "../Game"
import { BoardCodec } from "../BoradCodec";

declare var QRCode: any;

export class SpyMaterQrcode extends UiElement {

    SpyMasterUrl : string = "https://mrluxan.github.io/CodeNames_TypeScript/SM?";
    GameEncode : string = "";

    constructor(game:CodeNamesGame){
        super();
        this.GameEncode = new BoardCodec().ToString(game);
    }

    Render(outputElement: HTMLElement)
    {
        let html :string = `<div class="SpyMaterQrcode"><div class="Qrcode"></div><div class="QRReadyButton"></div></div>`;
        this.DomElement = this.htmlToElement(html);
        outputElement.append(this.DomElement);

        let qrOutput = this.DomElement.getElementsByClassName('Qrcode')[0];

        var qrcode = new QRCode(qrOutput, {
            text: this.SpyMasterUrl + this.GameEncode,
            width: 150,
            height: 150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });



        //qrcode.makeCode(this.SpyMasterUrl + this.GameEncode);

        console.log(qrcode);
    }

}