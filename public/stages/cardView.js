import {createText, createSpriteWithSize} from "./../core/fabrics.js";

export default class CardView extends PIXI.Container {

  constructor(resources, title = undefined) {
    super();
    this.resources = resources;
    this.title = title;
    this.interactive = true;
    this.buttonMode = true
    this.background = 'card_bg_1';
    this.on("pointerup", this.pointerUp);
    this.on("pointerdown", this.pointerDown);
    this.needUpdate = true;
  }

  pointerDown() {
    this.background = 'card_bg_2';
    this.needUpdate = true;
  }
  pointerUp() {
    this.background = 'card_bg_1';
    this.needUpdate = true;
  }

  initLayout() {
    while(this.children[0]) {
      this.removeChild(this.children[0]);
    }
    let size = {
      width : 100,
      height : 150
    };
    this.layer = createSpriteWithSize(this.resources[this.background].texture, size)
    this.img = createSpriteWithSize(this.resources['ship_straight'].texture, {width : 90, height : 90});
    this.img.x = size.width/2;
    this.img.y = size.height/2 - 20;
    this.img.anchor.set(0.5);
    this.addChild(this.layer);
    this.addChild(this.img);
    if (this.title) {
      var text = {
        text : this.title,
        position : {
          x : size.width/2 , y : size.height - 20
        },
        style : {
          fontFamily : "VT323, monospace",
          fontSize: 15
        }
      }
      let textEntry = createText(text.text, text.style);
      textEntry.name = "game_name";
      textEntry.position.set(text.position.x, text.position.y);
      this.addChild(textEntry);
    }
  }

  update(delta) {
    if (this.needUpdate === true) {
      console.log('CardView update!!!!');
      this.initLayout();
      this.needUpdate = false;
    }
  }
}
