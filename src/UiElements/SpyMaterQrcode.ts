import {UiElement} from "./UIElement"
import {CodeNamesGame} from "../Game"
import { BoardCodec } from "../BoradCodec";

declare var QRCode: any;

export class SpyMaterQrcode extends UiElement {

    Game:CodeNamesGame;
    
    constructor(game:CodeNamesGame){
        super();
        this.Game = game;
    }

    CopyCodeButton()
    {
        const el = document.createElement('textarea');
        el.value = this.Game.GetSpyMasterUrl();
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    
    ReadyButtonClick()
    {
        this.DomElement.parentNode.removeChild(this.DomElement);
    }

    Render(outputElement: HTMLElement)
    {
        let html :string = `<div class="SpyMasterOverlay">
                                <div class="SpyMaterQrcode">
                                    <div class="Qrcode"></div>
                                    <div class="ButtonDiv">
                                        <button class="CopyCodeButton">Copy code</button>
                                        <button class="ReadyButton">Ready</button>
                                    </div>
                                </div>
                            </div>`;

        this.DomElement = this.htmlToElement(html);
        outputElement.append(this.DomElement);

        let qrOutput = this.DomElement.getElementsByClassName('Qrcode')[0];

        new QRCode(qrOutput, {
            text: this.Game.GetSpyMasterUrl(),
            width: 150,
            height: 150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            quiteZone : 10
        });
    
        this.DomElement.querySelector('.CopyCodeButton').addEventListener('click', (e:Event) => this.CopyCodeButton());
        this.DomElement.querySelector('.ReadyButton').addEventListener('click', (e:Event) => this.ReadyButtonClick());    
    }

}