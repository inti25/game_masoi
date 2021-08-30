import Config from "./../config.js";
import NavBar from "./../views/navBar.js";
import CardView from "./cardView.js";

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
    this.menu = {};
    this.games = ['1', '2', '3'];
    this.cards = [];
    this.initLayout();
  }

  initLayout() {
    this.menu = this.addChild(new NavBar("Danh sach phong", this.onBack, this.onClose))
    for(var i = 0; i < 5; i++) {
      var row = (i - ( i % 3 ) ) / 3;
      var col = (i % 3);
      var x = 5 + col * 105;
      var y = 80 + row * 155;
      var cardItem = new CardView(app.loader.resources, "alo 1234");
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
    for(var i = 0; i < this.cards.length; i++) {
      this.cards[i].update(delta);
    }
  }
}
