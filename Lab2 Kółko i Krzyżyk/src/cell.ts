export class Cell{

    constructor(public index: number, public htmlElement: HTMLElement) {
        this.content = ""
    }
    
    private _content : "" | "X" | "O";
    public get content() : "" | "X" | "O"{
        return this._content;
    }
    public set content(v : "" | "X" | "O") {
        this._content = v;
        this.htmlElement.innerHTML = v;
    }
}