const initPlayer = () => { return {
	points: 0,
	version: "v0.0",
	base: {
		atoms: 1,
		auto: 0,
		autoTicks: 0,
		autoCrit: 0,
		upgrades: 0,
		super: {
			effect: 0,
			time: 0
		}
	},
	ref: {
		reflectors: 0,
		warps: 0,
		upgrades: 0
	},
	star: {
		stars: 0,
		unlockedAtoms: 0,
		primary: "H",
		secondary: {
			C: {t:0, a:0},
			O: {t:0, a:0},
			Si: {t:0, a:0},
			Fe: {t:0, a:0},
			Cu: {t:0, a:0},
			Cs: {t:0, a:0},
			U: {t:0, a:0}
		},
		reactor: {
			create: "CO2",
			time: 0,
			amt: 0,
			isReacting: false,
			products: {
				CO2: 0,
				Fe2O3: 0,
				Cs2O: 0
			}
		},
		upgrades: 0,
		dysons: 0,
		energy: 0
	},
	auto: {
		unlAutoFluc: false,
		autoFluc: false,
		unlAutoRef: false,
		autoRef: false,
		unlAutoSuper: false,
		autoSuper: false,
		unlAutoWarp: false,
		autoWarp: false
	},
	options: {
		displayPrimary: true,
		displaySecondary: true,
		showUpgrades: true,
		drawPhotons: true,
		draw: true
	},
	unlocks: {
		startedGame: false,
		photon: false,
		atoms: false,
		auto: false,
		upgrade: false,
		super: false,
		reflectors: false,
		warps: false,
		star: false
	},
	tab: "base",
	gameEndColour: "#000",
	gameEndOpacity: 1,
	gameEndTicks: 0
}}
var player = initPlayer(), spacePressed = 0;

var rStart = new Date().getTime()*131071, iters = 0;
function random() {
	iters++;
	return ((iters*99999989)%524287)/524287
}