const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

const me = path.resolve(process.argv[1], '..');

const data = JSON.parse(fs.readFileSync(process.argv[2] || path.resolve(me, '../dist/symboliccontrollerdb.json')).toString('utf8'));

const buttonTmpl = hbs.compile(fs.readFileSync(path.resolve(me, '_button.html.hbs')).toString('utf8'));

function resolve(buttons) {
	let out = {};
	Object.entries(buttons).forEach(([k, v]) => {
		out[k] = buttonTmpl({bg: v.bg, fg: v.fg, ...data.symbols.buttons[v.type]});
	});
	return out;
}

function distinct(arr) {
	let s = new Set();
	arr.forEach(e => s.add(e));
	return [...s];
}

let ctx = {
	controllers: [],
	icons: Object.entries({
		circle: "circle.svg",
		bumper_left: "bumper-left.svg",
		bumper_right: "bumper-right.svg",
		trigger_left: "trigger-left.svg",
		trigger_right: "trigger-right.svg",
		xbox: "xbox-swish.svg",
		triangle_up: "mdi/menu-up.svg",
		triangle_down: "mdi/menu-down.svg",
		triangle_left: "mdi/menu-left.svg",
		triangle_right: "mdi/menu-right.svg",
		dpad_inward_up: "mdi/gamepad-up.svg",
		dpad_inward_down: "mdi/gamepad-down.svg",
		dpad_inward_left: "mdi/gamepad-left.svg",
		dpad_inward_right: "mdi/gamepad-right.svg",
		dpad_cross_up: "mdi/gamepad-round-up.svg",
		dpad_cross_down: "mdi/gamepad-round-down.svg",
		dpad_cross_left: "mdi/gamepad-round-left.svg",
		dpad_cross_right: "mdi/gamepad-round-right.svg",
		circle_cluster_up: "mdi/gamepad-circle-up.svg",
		circle_cluster_down: "mdi/gamepad-circle-down.svg",
		circle_cluster_left: "mdi/gamepad-circle-left.svg",
		circle_cluster_right: "mdi/gamepad-circle-right.svg",
		arrow_up: "mdi/arrow-up.svg",
		arrow_down: "mdi/arrow-down.svg",
		arrow_left: "mdi/arrow-left.svg",
		arrow_right: "mdi/arrow-right.svg",
		power: "mdi/power.svg",
		circle_outline: "circle-inner.svg",
		square: "square.svg",
		cross: "mdi/close.svg",
		triangle: "triangle.svg",
		minus: "mdi/minus.svg",
		plus: "mdi/plus.svg",
		stick_down: "stick-down.svg",
		home: "mdi/home.svg",
		playstation: "playstation.svg",
		rectangle_horizontal: "rectangle.svg",
		long_triangle_right: "long-triangle-right.svg",
		skip_next: "mdi/skip-forward.svg",
		skip_prev: "mdi/skip-backward.svg",
		pill: "mdi/ellipse.svg",
		menu: "mdi/menu.svg",
		view: "view.svg",
		lozenge_vertical: "lozenge-vertical.svg",
		lozenge_horizontal: "lozenge-horizontal.svg",
		radiate: "radiate.svg",
		box: "mdi/square-medium.svg",
		circle_medium: "circle-medium.svg",
		lozenge_curved_horizontal: "lozenge-curved-horizontal.svg",
		lozenge_curved_vertical: "lozenge-curved-vertical.svg",
		bean_left: "bean-left.svg",
		bean_right: "bean-right.svg",
		xbox_original: "xbox-original.svg",
	}).map(([k, v]) => ({symbol:k,icon:v.replace("mdi/", "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/")})),
	shapes: distinct([
		...Object.values(data.symbols.buttons).map(v => v.shape),
		...Object.values(data.symbols.buttons).map(v => v.icon)
	]).filter(v => v != null).sort()
};
data.controllers.forEach((ctrl) => {
	ctx.controllers.push({
		name: ctrl.name,
		conventions: {
			[ctrl.conventions.accept]: " convention-accept",
			[ctrl.conventions.back]: " convention-back"
		},
		...resolve(ctrl.buttons)
	});
});
ctx.colors = Object.entries(data.symbols.colors).map(([k, v]) => ({name:k,bg:v[0],fg:v[1]}));
fs.writeFileSync('index.html', hbs.compile(fs.readFileSync(path.resolve(me, 'index.html.hbs')).toString('utf8'))(ctx));
