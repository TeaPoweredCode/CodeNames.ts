import { eCardType } from "../enums"
import { UiElement } from "./UiElement";
import { Menu } from "./Menu";

declare var QRCode: any;

export class BoardMenu  extends UiElement {

    MainMenu : Menu;

    constructor(mainMenu : Menu)
    {
        super();
        this.MainMenu = mainMenu;
    }

    NewGameClick()
    {
        location.reload();
    }

    CopyCodeButton()
    {
        const el = document.createElement('textarea');
        el.value = this.MainMenu.Game.GetSpyMasterUrl();
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    Render(menuInsertElement: HTMLElement, bottomInsertElement: HTMLElement)
    {
        let menuhtml :string = `<ul>
                                <li id="NewGameItem">New game</li>
                            </ul>`;
        let menu = this.htmlToElement(menuhtml);        
        menuInsertElement.appendChild(menu);

        menu.querySelector('#NewGameItem').addEventListener("click", (e:Event) => this.NewGameClick());


        let menuQRhtml :string = `<div class="BoardMenuExtras">
                                    <div class="Qrcode"></div>
                                    <button class="CopyCodeButton">Copy code</button>
                                 </div>`;
        let menuQR = this.htmlToElement(menuQRhtml); 
        let qrOutput = menuQR.getElementsByClassName('Qrcode')[0];

        new QRCode(qrOutput, {
            text: this.MainMenu.Game.GetSpyMasterUrl(),
            width: 150,
            height: 150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            quiteZone : 10
        });
        
        menuQR.querySelector('.CopyCodeButton').addEventListener("click", (e:Event) => this.CopyCodeButton());

        bottomInsertElement.appendChild(menuQR);
    }
}