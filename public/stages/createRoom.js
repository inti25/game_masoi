import Config from "./../config.js";
import {createInputText, createText, showPopupError} from "./../core/fabrics.js";
import {getString, storeString} from "./../services/StoreManager.js";
import MaSoiServices from "./../services/MaSoiServices.js";
import NavBar from "../views/navBar.js";

const centerX = Config.renderOptions.width * 0.5;
const centerY = Config.renderOptions.height * 0.5;

let menuTextEntries = {
  name : {
    text : "Tên phòng",
    isInputText : true,
    position: {
      x : centerX, y : 150
    }
  },
  email : {
    text : "số người chơi",
    isInputText : true,
    position : {
      x : centerX , y : 250
    }
  },
  play : {
    text: "Tạo phòng",
    isButton : true,
    position : {
      x: centerX, y : centerY * 1.5
    },
    style : {
      fontFamily : "VT323, monospace",
    }
  }
};
let appInstance;
export default class CreateRoom extends PIXI.Container {
  /**
   * Create register stage
   * @param {PIXI.Application} app
   */
  constructor(app) {
    super();
    this.app = app;
    appInstance = app;
    this.entries = {};
    this.name = "";
    this.maxPlayer = "";
  }

  onStart() {
    this.phone_number = getString("phone_number");
    this.initLayout();
  }

  onDestroy() {

  }

  initLayout() {
    this.addChild(new NavBar("Tạo phòng", this.onBack, this.onClose));
    for(let key in menuTextEntries)
    {
      let text = menuTextEntries[key].text;
      let style = menuTextEntries[key].style;
      let position = menuTextEntries[key].position || {x : 0, y : 0};
      let isButton = menuTextEntries[key].isButton;
      let isInput = menuTextEntries[key].isInputText;

      let textEntry = createText(text, style);
      textEntry.name = key;
      textEntry.position.set(position.x, position.y);

      if(isButton) {
        this.makeButton(textEntry);
      } else if (isInput) {
        textEntry = createInputText(text, position);
      }

      this.addChild(textEntry);
      this.entries[key] = textEntry;
    }

    this.entries.name.on('input', txt => {
      this.name = txt;
    })
    this.entries.email.on('input', txt => {
      this.maxPlayer = txt;
    })

    //Swich stage to 'game' when click to Play button
    this.entries.play.on("pointerdown", async ()=>{
      let res = await new MaSoiServices().createRoom(this.name, this.maxPlayer, this.phone_number);
      if (res.error) {
        showPopupError(res.error, function () {
            console.log("close call back");
        })
      } else {
        this.app.setStage("listGame");
      }
    });
  }

  onBack() {
    appInstance.setStage("listGame");
  }

  onClose() {
    appInstance.setStage("listGame");
  }
  /**
   * Mark object as Button and add outline
   * @param {PIXI.Container} obj
   */
  makeButton(obj) {
    let size = obj.getBounds();
    size.width *=1.2;
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
