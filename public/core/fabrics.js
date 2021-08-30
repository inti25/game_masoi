import Config from '../config.js'

let defaultTextStyle = {
	align: "center",
	dropShadow: true,
	dropShadowAlpha: 0.4,
	dropShadowAngle: -2.7,
	dropShadowBlur: 5,
	dropShadowDistance: 4,
	fill: "#cccccc",
	fontFamily: "Impact",
	fontSize: 40,
	miterLimit: 2,
	padding: 14,
	stroke: "#414141",
	strokeThickness: 5,
};

/**
 * Create PIXI.Text element
 * @param {string} text
 * @param {*} options
 */
export function createText(text, options) {
	let style = Object.assign({}, defaultTextStyle , options || {});
	let textObject = new PIXI.Text(text, style);
	textObject.anchor.set(0.5);
	return textObject;
}

/**
 * Create tiled background
 * @param {PIXI.Texture} tex
 */
export function createBg(tex, options = undefined) {
	options = Object.assign({
		width : Config.renderOptions.width, height: Config.renderOptions.height
	},options);

	let tiling = new PIXI.TilingSprite(tex, options.width, options.height);
	return tiling;
}

export function createSpriteWithSize(tex, options = undefined) {
	options = Object.assign({
		width : Config.renderOptions.width, height: Config.renderOptions.height
	},options);

	let tiling = new PIXI.Sprite(tex);
	tiling.width = options.width;
	tiling.height = options.height;
	return tiling;
}

export function createAnimatedShip(resources) {

	let texLeft = resources['ship_turn'].texture;
	let texForward = resources['ship_straight'].texture;
	let texRight = new PIXI.Texture(texLeft.baseTexture, texLeft.frame);
	texRight.rotate = 12;
	let textures = [texForward, texLeft, texForward, texRight];

	let ship = new PIXI.AnimatedSprite(textures, false);

	ship.animationSpeed = 0.05;
	ship.scale.set(2);
	ship.anchor.set(0.5);

	return ship;
}

export function createEnemy(resources) {

	let obj = new PIXI.Sprite(resources['enemy'].texture);
    obj.anchor.set(0.5);
    obj.scale.set(2);
    obj.phase = 0;
    return obj;
}

export function createInputText(text, options) {
	var inputText = new PIXI.TextInput({
		input: {
			fontSize: options.fontSize || '20px',
			padding: options.padding || '10px',
			width: options.width || '200px',
			color: options.color || '#26272E'
		} ,
		box: {
			default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
			focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
			disabled: {fill: 0xDBDBDB, rounded: 12}
		}
	})

	inputText.placeholder = text
	inputText.x = options.x || 100
	inputText.y = options.y || 300
	inputText.pivot.x = inputText.width/2
	inputText.pivot.y = inputText.height/2

	return inputText;
}

export function setLoading(isloading) {
	if (isloading) {
		$('#page-loader').show();
	} else {
		$('#page-loader').hide();
	}
}
