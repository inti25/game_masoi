import Config from "./../config.js";
import {createInputText, createText, setLoading} from "./../core/fabrics.js";

const centerX = Config.renderOptions.width * 0.5;
const centerY = Config.renderOptions.height * 0.5;

let menuTextEntries = {
  name : {
    text : "Nhap ten",
    isInputText : true,
    position: {
      x : centerX, y : 100
    }
  },
  email : {
    text : "Email",
    isInputText : true,
    position : {
      x : centerX , y : 200
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

export default class Register extends PIXI.Container {
  /**
   * Create register stage
   * @param {PIXI.Application} app
   */
  constructor(app) {
    super();
    this.app = app;
    this.entries = {};
    this.initLayout();
  }

  initLayout() {
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

    //Swich stage to 'game' when click to Play button
    this.entries.play.on("pointerdown", ()=>{
      // this.app.setStage("game");
      setLoading(true);
      axios.post('http://localhost:3000/users', {"name":"hungnqtest", "phone_number":"0358366439", "email": "test"})
      .then(response => {
        setLoading(false);
        console.log(response);
      });
    });
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
