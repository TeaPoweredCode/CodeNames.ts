enum eCardType { RedSpy, BlueSpy, Neutral, Assassin}

function htmlToElement(html : string) : HTMLElement{
    let template = document.createElement('template'); 
    template.innerHTML = html.trim();
    return <HTMLElement>template.content.firstChild;
}

let board: Board = new Board();
board.Render(document.body);