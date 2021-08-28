import ObjectPool from "../core/objectPool.js";
import EmptySystem from "./emptySystem.js";

export default class BasicPresenter extends EmptySystem{
	/**
	 * Basic presenter
	 * @param {PIXI.Container} root
	 * @param {PIXI.IResourceDictionary} res
	 * @param {*} runtime,
	 * @param {Array} allows
	 */
	constructor(runtime, allows, root, res) {
		super(runtime, allows);

		this.root = root;
		this.runtime = runtime;
		this.res = res;

		this._pool = new ObjectPool(this.createView.bind(this), this.initView.bind(this), this.resetView.bind(this), 0);

		/**
		 * Actual view list. Refresh after presenting or pair
		 * @type Array
		 */
		this.actualViews = this._pool._used;
	}
	
	/**
	 * @public
	 * Synchronize models and views
	 * @param {any} args Any arguments
	 */
	process(model, args = undefined) {
		if (!this.selector[model.tag]) {
			return;
		}

		let view = model.view;

		if (!view) {
			view = this._pool.get();
			model.view = view;
			view.model = model;
		}

		this.presentPair(view, model, args);
	}
	
	/**
	 * Despawn all unused views
	 */
	flush() {
		const count = this._pool.usedSize;
		for (let i = count - 1; i >= 0; i--) {
			const view = this._pool._used[i];
			if (view.model == undefined || view.model.killMe) {
				this._pool.release(view);
			}
		}
		
		this.actualViews = this._pool._used;
	}

	/**
	 * Synchronize specific view with specific model
	 * @protected
	 * @param {*} view View
	 * @param {*} model Model
	 * @param {*} args Arguments from 'present' argumnets
	 */
	presentPair(view, model, args) {
		let { position } = model;
		let { delta = 1 } = args;

		model.position.x += model.vel.x * delta;
		model.position.y += model.vel.y * delta;
		view.position.set(position.x, position.y);
		view.tint = model.tint || 0xffffff;
		view.scale.set(model.size || 1);
	}

	/**
	 * @protected
	 * Create specific view, called from pool
	 */
	createView() {
		const basic = new PIXI.Sprite(PIXI.Texture.WHITE);
		basic.anchor.set(0.5);
		return basic;
	}

	/**
	 * Init view when models array changed, called from pool
	 */
	initView(view) {
		//debug
		this.root.addChild(view);
	}

	/**
	 * Reset view when models array changed, called from pool
	 */
	resetView(view) {
		if (view) {
			delete view.model;
			this.root.removeChild(view);
		}
		return !!view;
	}
}
