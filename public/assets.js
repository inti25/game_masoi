import Config from "./config.js";

export default {
	baseUrl: Config.assetsBaseUrl,
	assetList: [
        //background
		{ key: "bg_tiled_layer1", url: "bg_tiled_layer1.png" },
		{ key: "bg_tiled_layer2", url: "bg_tiled_layer2_stars.png" },
		{ key: "card_bg_1", url: "card_bg_1.png" },
		{ key: "card_bg_2", url: "card_bg_2.png" },


        //ship
        { key: "ship_straight", url: "ship_straight.png" },
        { key: "ship_turn", url: "ship_turn.png" },

        //enemies
        { key: "snake", url: "snake.png" },
        { key: "enemy", url: "48_enemy.png" },

        //turel
        { key: "turel_base", url: "rail_gun_base.png" },
        { key: "turel_gun", url: "rail_gun.png" }

	]
};
