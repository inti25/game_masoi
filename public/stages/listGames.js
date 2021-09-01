import Config from "./../config.js";
import NavBar from "./../views/navBar.js";
import CardView from "./cardView.js";
import MSFrontEndService from "../services/MSFrontEndService.js";
import {createText} from "./../core/fabrics.js";

const centerX = Config.renderOptions.width * 0.5;
const centerY = Config.renderOptions.height * 0.5;

export default class ListGames extends PIXI.Container {
  /**
   * Create register stage
   * @param {PIXI.Application} app
   */
  constructor(app) {
    super();
    this.app = app;
    this.entries = {};
    this.lstGame = [];
    this.cards = [];
    this.unsubscribeGames = null;
  }

  onStart() {
    this.initData();
  }

  onDestroy() {
    if (this.unsubscribeGames != null)
      this.unsubscribeGames();
  }

  initData() {
    var _this = this;
    this.unsubscribeGames = new MSFrontEndService().subscribeListGame(
        function (games) {
          _this.lstGame = games;
          console.log('list Game: ', _this.lstGame);
          _this.initLayout();
        })
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

  initLayout() {
    console.log('list Game: initLayout');
    if (this.children.length > 0) {
      this.removeChildren(0, this.children.length - 1);
    }
    this.addChild(new NavBar("Phòng chờ", this.onBack, this.onClose));
    var btnCreate = {
      text: "Tạo phòng",
      isButton : true,
      position : {
        x: centerX, y : centerY * 1.8
      },
      style : {
        fontFamily : "VT323, monospace",
      }
    }

    let text = btnCreate.text;
    let style = btnCreate.style;
    let position = btnCreate.position || {x : 0, y : 0};
    let isButton = btnCreate.isButton;

    let textEntry = createText(text, style);
    textEntry.name = 'btnCreate';
    textEntry.position.set(position.x, position.y);

    if(isButton) {
      this.makeButton(textEntry);
    }
    this.addChild(textEntry);
    textEntry.on("pointerdown", ()=>{
      this.app.setStage("createRoom");
    });
    for (var i = 0; i < this.lstGame.length; i++) {
      var row = (i - (i % 3)) / 3;
      var col = (i % 3);
      var x = 5 + col * 105;
      var y = 80 + row * 155;
      var cardItem = new CardView(app.loader.resources, this.lstGame[i]);
      cardItem.x = x;
      cardItem.y = y;
      this.addChild(cardItem);
      this.cards.push(cardItem);
    }
  }

  onBack() {
    console.log('onBack');
  }

  onClose() {
    console.log('onClose');
  }

  /**
   * Update stage
   * @param {number} delta
   */
  update(delta) {
    // this.initLayout();
  //   for (var i = 0; i < this.cards.length; i++) {
  //     this.cards[i].update(delta);
  //   }
  }
}
