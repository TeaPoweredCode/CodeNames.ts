enum eCardType { RedSpy, BlueSpy, Neutral, Assassin}

let main: HTMLElement = document.createElement('div');
document.body.appendChild(main);

let board: Board = new Board();
board.Render(main);