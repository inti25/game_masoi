import Config from "./../config.js";
import {createText} from "./../core/fabrics.js";

const centerX = Config.renderOptions.width * 0.5;
const centerY = Config.renderOptions.height * 0.5;

export default class NavBar extends PIXI.Container {
  constructor(text, backCallback, closeCallback) {
    super();
    this.entries = {};
    let navBarEntries = {
      back : {
        text : "<",
        isButton: true,
        position: {
          x : 20, y : 40
        },
        style : {
          fontFamily : "VT323, monospace",
          // fill : "#e91e63",
          fontSize : 40,
        }
      },
      title : {
        text : text,
        position : {
          x : centerX , y : 40
        },
        style : {
          fontFamily : "VT323, monospace",
          fontSize: 30
        }
      },
      close : {
        text: "X",
        isButton: true,
        position : {
          x: Config.renderOptions.width - 20, y : 40
        },
        style : {
          fontFamily : "VT323, monospace",
          fontSize: 40
        }
      }
    };
    for(let key in navBarEntries)
    {
      let text = navBarEntries[key].text;
      let style = navBarEntries[key].style;
      let position = navBarEntries[key].position || {x : 0, y : 0};
      let isButton = navBarEntries[key].isButton;

      let textEntry = createText(text, style);
      textEntry.name = key;
      textEntry.position.set(position.x, position.y);

      if(isButton) {
        textEntry.interactive = true;
        textEntry.buttonMode = true;
      }

      this.addChild(textEntry);
      this.entries[key] = textEntry;
    }
    this.entries.back.on("pointerup", backCallback);
    this.entries.close.on("pointerdown", closeCallback);
  }
}
