/* <reference types="./../types/pixi.js" /> */
import Config from "./config.js";
import Assets from "./assets.js";
import Menu from "./stages/menu.js";
import ScrolledBackground from "./views/scrolledBackground.js";
import Register from "./stages/register.js";
import {setLoading} from "./core/fabrics.js";
import ListGames from "./stages/listGames.js";

const app = new PIXI.Application(Config.renderOptions);

//Because now we use module-mode, this scripts was be isolated from global scope.
//Pass app reference to window object manually
window.app = app;

document
    .querySelector('.container')
    .appendChild(app.view);

//Load reosurces from asset database from assets.js
app.loader.baseUrl = Assets.baseUrl;
app.loader
    .add(Assets.assetList)
    .load(init);

/**
 * MapLike object of game Stages
 */
let stages = {};

let currentStage = undefined;

/**
 * Init game after loading
 */
function init() {
    stages = {
        menu : new Menu(app),
        register : new Register(app),
        listGame : new ListGames(app)
    };

    let size = {
        width : Config.renderOptions.width,
        height : Config.renderOptions.height
    };

    app.background = new ScrolledBackground(app.loader.resources, size);

    app.stage.addChild(app.background);
    app.setStage("menu");

    app.ticker.add(update, this);
    setLoading(false);
}

/**
 * Update app instance and stages
 * @param {number} delta
 */
function update(delta) {
    if(currentStage) {
        currentStage.update(delta);
    }
    app.background.update(delta);
}

/**
 * Change stages
 * @param {number} name
 */
app.setStage = function(name) {
    if(stages[name]){
        if(currentStage) {
            currentStage.onDestroy();
            app.stage.removeChild(currentStage);
        }
        currentStage = stages[name];
        app.stage.addChild(currentStage);
        currentStage.onStart();
    }
}
