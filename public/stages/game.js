/// <reference types="./../../types/pixi.js" />

import Config from "./../config.js";
import Runtime from "./../core/runtime.js";
import Bullitizer from "./../core/bullitizer.js";

import { PlayerModel, BasicModel } from "./../prefabs/modeles.js";
import { LineWave, VerticalSinWave } from "./../core/wave.js";

export default class Game extends PIXI.Container {
	/**
	 * Create game stage
	 * @param {PIXI.Application} app
	 */
	constructor(app) {
		super();
		this.app = app;
		let shipsContainer = new PIXI.Container();
		this.runtime = new Runtime(app, shipsContainer);

		this.waves = {
			line  : new LineWave(this.runtime),
			sine : new VerticalSinWave(this.runtime)
		};

		this.backgroundY = 0;

		this.player = new PlayerModel({
			bulletspeed : 10,
			bulletdamage : 1,
			bulettype : "dot",
			firemode : "sequential",
			firerate : 0,
			guns : [
				{
					offset : {x : -48, y : -60},
					dir : {x : 0, y : -1}
				},
				{
					offset : {x : 48, y : -60},
					dir : {x : 0, y : -1}
				}
			],
		});
	

		this.player.position.set(Config.renderOptions.width * 0.5, (Config.renderOptions.height * 2) / 3);
		this.player.target.copyFrom(this.player.position);
		this.runtime.add(this.player);

		this.waves.line.populate(10);
		this.waves.line.offset.y = 0;
		
		this.waves.sine.populate(10, "ufoBig", {
			rect : {
				width : Config.renderOptions.width * 0.5,
				height : 1000
			},
			period : 5,
			speed : 0.05
		});

		this.waves.sine.offset.y = -1000;
		this.waves.sine.offset.x = Config.renderOptions.width / 2;

		this.bindInput();
		this.addChild(shipsContainer);
	}

	bindInput() {
		this.interactive = true;
		this.hitArea = new PIXI.Rectangle(0, 0, Config.renderOptions.width, Config.renderOptions.height);

		this.on("pointermove", event => {
			let pos = event.data.global;

			//clamp target position
			pos.x = Math.max(64, Math.min(pos.x, Config.renderOptions.width - 64));
			pos.y = Math.max(
				Config.renderOptions.height - Config.renderOptions.width - 64 * 3,
				Math.min(pos.y, Config.renderOptions.height - 64)
			);

			this.player.target.copyFrom(pos);
		});

		let fire;
		this.on("pointerdown", event => {
			this.player.config.firerate = 10;
		});

		this.on("pointerup", event => {
			
			this.player.config.firerate = 0;
		});
	}

	/**
	 * Update stage
	 * @param {number} delta
	 */
	update(delta) {
		this.runtime.beforeUpdate(delta);

		//update wave runtime
		for(let key in this.waves) {
			this.waves[key].update(delta);
			this.waves[key].offset.y += 1 * delta;
			if(this.waves[key].offset.y > Config.renderOptions.height) {
				this.waves[key].offset.y = -500;
			}
		}
		//update core runtime
		this.runtime.update(delta);

		this.app.background.offset.set(-this.player.position.x / 10, -this.player.position.y / 10);

		this.runtime.afterUpdate(delta);
	}
}
