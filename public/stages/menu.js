import {createText} from  "./../core/fabrics.js";
import Config from "./../config.js";
import MaSoiServices from "./../services/MaSoiServices.js";

const centerX = Config.renderOptions.width * 0.5;
const centerY = Config.renderOptions.height * 0.5;

let menuTextEntries = {
    logo : {
        text : "Masoi",
        position: {
            x : centerX, y : 100
        },
        style : {
            fontFamily : "Roboto, sans-serif",
            fill : "#e91e63",
            fontSize : 40,
            strokeThickness : 0
        }
    },
    name : {
        text : "phien ban loi",
        position : {
            x : centerX , y : 150
        },
        style : {
            fontFamily : "VT323, monospace",
            fontSize: 42
        }
    },
    play : {
        text: "Play",
        isButton : true,
        position : {
            x: centerX, y : centerY * 1.5
        },
        style : {
            fontFamily : "VT323, monospace",
        }
    }
};

export default class Menu extends PIXI.Container {

    /**
     * Create MainMenu stage
     * @param {PIXI.Application} app
     */
    constructor (app) {
        super();
        this.app = app;
        this.entries = {};
        this.inputText;
        this.phone_number;
    }

    onStart() {
        this.createBackgrounds();
        this.createTexts();
        this.makeinputText(this);
    }

    onDestroy() {

    }

    /**
     * Create scrolled Background
     */
    createBackgrounds() {

    }

    /**
     * Create texts entries from map
     */
    createTexts() {
        for(let key in menuTextEntries)
        {
            let text = menuTextEntries[key].text;
            let style = menuTextEntries[key].style;
            let position = menuTextEntries[key].position || {x : 0, y : 0};
            let isButton = menuTextEntries[key].isButton;

            let textEntry = createText(text, style);
            textEntry.name = key;
            textEntry.position.set(position.x, position.y);

            if(isButton) {
                this.makeButton(textEntry);
            }

            this.addChild(textEntry);
            this.entries[key] = textEntry;
        }

        //Swich stage to 'game' when click to Play button
        this.entries.play.on("pointerdown", async ()=>{
            // this.app.setStage("game");
            // console.log(this.phone_number);
            // this.app.setStage("register");
            // this.removeInput();
            let res = await new MaSoiServices().checkUserByPhone(this.phone_number);
            if (res.error) {
                this.app.setStage("register");
            } else {
                this.app.setStage("listGame");
            }
            console.log('check done', res);
        });
    }

    removeInput() {
        console.log('removeInput');
        this.removeChild(this.inputText);
        this.update(0);
    }
    /**
     * Mark object as InputText and add outline
     * @param {PIXI.Container} obj
     */
    makeinputText(obj) {
        this.inputText = new PIXI.TextInput({
            input: {
                fontSize: '20px',
                padding: '12px',
                width: '200px',
                color: '#26272E'
            },
            box: {
                default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
                focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })

        this.inputText.placeholder = 'So Dien Thoai'
        this.inputText.x = centerX
        this.inputText.y = 300
        this.inputText.pivot.x = this.inputText.width/2
        this.inputText.pivot.y = this.inputText.height/2
        this.inputText.on('input', txt => {
            this.phone_number = txt;
        })
        obj.addChild(this.inputText);
    }

    /**
     * Mark object as Button and add outline
     * @param {PIXI.Container} obj
     */
    makeButton(obj) {

        let size = obj.getBounds();
        size.width *=2;
        let outline = new PIXI.Graphics();
        outline
            .lineStyle(2, 0xcccccc)
            .beginFill(0x0, 0.001)
            .drawRect(-size.width / 2, -size.height / 2, size.width, size.height);

        obj.addChild(outline);
        obj.interactive = true;
        obj.buttonMode = true;

        obj.on("pointerover", ()=>{
            outline.tint = 0xff00000;
        });

        obj.on("pointerout", ()=>{
            outline.tint = 0xffffff;
        });

    }

    /**
     * Update stage
     * @param {number} delta
     */
    update(delta) {}
}
