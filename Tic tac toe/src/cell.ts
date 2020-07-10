export class Cell{

    constructor(public index: number, public htmlElement: HTMLElement) {
        this.content = ""
    }
    
    private _content : "" | "X" | "O";
    public get content() : "" | "X" | "O"{
        return this._content;
    }
    public set content(c : ""| "X" | "O") {
        this._content = c;
        this.htmlElement.innerHTML = c;
    }
}