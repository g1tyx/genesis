var vdata = {
	el: "#v",
	data: {
		player,
		startColour: "#000",
		startOpacity: "1",
	}
}

Vue.component("app", {
	props: ["startcolour", "startopacity"],
	data: _=> { return {
		player,
	}},
	template: `<div style="height: 100%">
		<div v-if="startopacity >= 0" :style="{background: startcolour, opacity: startopacity, transitionDuration: '1s', transitionProperty: 'background, opacity',
		width: '200vw', height: '200vh', transform: 'translate(-50%, -50%)', position: 'absolute', zIndex: '100'}"></div>
		<div v-if="!player.unlocks.startedGame" :style="{width: '200vw', height: '200vh', background: '#000', transform: 'translate(-50%, -50%)', position: 'absolute', zIndex: '98'}"></div>
		<div id="thing" v-if="player.star.secondary.U.t > 0 && player.gameEndTicks < 10" :style="{width: '200vw', height: '200vh', background: player.gameEndColour, transform: 'translate(-50%, -50%)', position: 'absolute', zIndex: '989', opacity: player.gameEndOpacity, transitionDuration: '1s', transitionProperty: 'background, opacity'}"></div>
		<div v-if="!player.unlocks.startedGame" class="startButton" onclick="player.unlocks.startedGame = true"></div>
		<main-tab v-if="player.gameEndTicks < 6"></main-tab>
		<div v-else style="height: 100%; text-align: center">
			<br><br>
			<h1>Genesis</h1>
			<br>
			<h2>You have reached the end of the game!</h2>
			<br><br>
			<button onclick="player = initPlayer(); save(); location.reload()">Destroy everything and start over.</button>
		</div>
	</div>`
})
Vue.component("main-tab", {
	data: _=> { return {
		player,
		n,
		activateSuper,
		upgrades,
		star,
		doStarReset
	}},
	template: `<div style="height: 100%">
		<h1>Genesis</h1>
		<button @click="player.tab = 'base'">Main</button>
		<button @click="player.tab = 'ref'" v-if="player.unlocks.reflectors">Reflection</button>
		<button v-else disabled>Unlocked at 100 atoms</button>
		<button @click="player.tab = 'star'" v-if="player.unlocks.star">Stars</button>
		<button v-else disabled>Unlocked at 1.00e9 photons</button>
		<button @click="player.tab = 'auto'" v-if="upgrades.star[1].bought">Automation</button>
		<button @click="player.tab = 'options'">Options</button>
		<hr>
		<div style="position: relative; height: calc(100% - 120px)"><div style="position: absolute; right: 8px; overflow-y: auto; bottom: 8px; top: 0px" v-if="player[player.tab].upgrades != undefined">
			<h2 style="display: inline-block; cursor: pointer;" @click="player.options.showUpgrades = !player.options.showUpgrades">Upgrades &nbsp; &nbsp; <span style="position: absolute; right: 0px">{{player.options.showUpgrades?"v":">"}}</span></h2><hr>
			<div v-if="player.unlocks.upgrade && player.options.showUpgrades"><upgrade :layer="player.tab" v-for="(u, id) in upgrades[player.tab]" :upgrade="u" :id="id"></upgrade></div>
			<span v-else-if="player.options.showUpgrades">Unlocked at 2500 photons</span>
		</div>
		You have {{n(player.points)}} photons.
		<br>
		<button onclick="makePhoton()">Energize the atoms. (Press space)</button>
		<br>
		<button @click="activateSuper()" :disabled="!player.unlocks.super || player.base.super.effect || player.base.atoms < 4" v-if="player.unlocks.auto"><span v-if="player.unlocks.super">Super-energize the atoms{{player.base.super.effect?". (Time left: " + n(60-player.base.super.time) + " seconds)":(", " + (upgrades.ref[2].bought?"quadrupling time speed":"tripling photon generation") + " for 60 seconds but consuming 3 atoms.")}}</span><span v-else>Unlocked at 55555 photons, 55 atoms, and 5 fluctuations.</span></button>
		<div v-if="player.unlocks.super">
			<div v-if="player.unlocks.star"><br><br>
			You have <b style="color: #da2">{{n(player.star.stars)}}</b> stars, boosting photon generation by x{{n(star.effect, 2)}}<br>
			<button @click="doStarReset()" :disabled="player.points < 1e9">Reset photons, atoms, and fluctuations.<br>
			Gain <b>{{n(star.resetGain)}}</b> stars. (Next at {{n(star.nextAt)}})</button></div>
			<button v-else disabled>Unlocked at 1.00e9 photons</button>
		</div>
		<br><br><br>
		<component :is="player.tab+'-tab'"></component></div>
		<canvas id="c" style="transition: all 0s; position: absolute; top: 8px; left: 8px; width: calc(100vw - 16px); height: calc(100vh - 16px); z-index: -1"></canvas>
	</div>`
})
Vue.component("base-tab", {
	data: _=> {return {
		player,
		n,
		effect,
		upgrades
	}},
	template: `<div>
		<buyable layer="base" name="atoms" dispname="atoms" singname="atom" buydisp="Condense,photons into" :currAmnt="player.points"></buyable>
		<div v-if="!player.unlocks.atoms">Unlocked at 50 photons</div>
		<br>
		<buyable layer="base" name="auto" dispname="fluctuations" singname="fluctuation"
		:effectdisp="'exciting up to ' + n(effect.auto[0]) + ' atoms every ' + n(effect.auto[1], 2) + ' seconds'"
		buydisp="Deplete,photons to create" :currAmnt="player.points"></buyable>
		<div v-if="!player.unlocks.auto && player.unlocks.atoms">Unlocked at 500 photons</div>
	</div>`,
})
Vue.component("ref-tab", {
	data: _=> {return {
		player,
		n,
		effect,
		upgrades
	}},
	template: `<div>
		<buyable layer="ref" name="reflectors" dispname="reflectors" singname="reflector"
		:effectdisp="'giving a ' + n(effect.reflectors*100, 2) + '% chance to energize an atom again after energizing.<br>(This is applied 150 ms after the initial energization, and can happen more than once)'"
		buydisp="Use,atoms to create" :currAmnt="player.base.atoms" ncy="true"></buyable>
		<br>
		<buyable layer="ref" name="warps" dispname="perceptive warps" singname="perceptive warp"
		:effectdisp="'reducing the nerf of <b>High-energy Orbit</b> by /' + n(effect.warps[0], 2) + ',<br>and increasing the fluctuation cap by x' + n(effect.warps[1], 1)"
		buydisp="Construct,reflectors together to build" :currAmnt="player.ref.reflectors"></buyable>
	</div>`
})
Vue.component("star-tab", {
	data: _=> {return {
		player,
		n,
		nc,
		effect,
		star,
		doStarReset,
		reactions,
		startReaction,
		buyDyson
	}},
	template: `<div style="display: flex;">
	<div>
		<div v-if="player.star.unlockedAtoms >= 6">
			You have {{nc(player.star.dysons)}} dyson modules, producing {{n(star.dysonEffect)}} solar energy/s.<br>
			<button :disabled="player.star.secondary.Si.a < star.dysonCosts[0] || player.star.secondary.Cu.a < star.dysonCosts[1]" @click="buyDyson()">Use {{n(star.dysonCosts[0])}} silicon and {{n(star.dysonCosts[1])}} copper to create 1 dyson module.</button>
			<br><br>
			You have {{n(player.star.energy, 2)}} solar energy.<br>
			They are boosting photon and star gain by {{n(star.energyBuffs[0], 2)}},<br>and boosting the fluctuation cap by {{n(star.energyBuffs[1], 2)}}.
		</div>
		<h2 style="display: inline-block">Unlocked atom types</h2>
		<br>
		<h3>Next at: {{n(star.nextAtom)}} stars</h3>
		<br><br>
		<atom-display></atom-display>
	</div>
	<div style="width: 30px"></div>
	<div v-if="player.star.unlockedAtoms >= 2">
		<div style="border: 5px solid #fff; border-top: 5px dashed #fff8; background: #000a; width: 300px; height: 300px; padding: 5px;
		display: flex; flex-direction: column; align-items: center; justify-content: center;">
			<h2 style="display: inline-block">Reactor</h2>
			<br>
			<div v-if="!player.star.reactor.isReacting">The reaction will create {{reactions[player.star.reactor.create].amt}} <select v-model="player.star.reactor.create">
				<option>CO2</option>
				<option v-if="player.star.unlockedAtoms >= 4">Fe2O3</option>
				<option v-if="player.star.unlockedAtoms >= 7">Cs2O</option>
			</select>.
			</div>
			<div v-else style="text-align: center">Reaction undergoing, please wait for it to finish.<br>({{n(player.star.reactor.time, 2)}}/{{n(reactions[player.star.reactor.create].time, 2)}})</div>
			<br><br>
			Effects: <span v-for="e in reactions[player.star.reactor.create].effectDisplay" style="text-align: center">{{e}}<br></span>
			<br><br><button :disabled="player.star.reactor.isReacting || reactions[player.star.reactor.create].amt == 0" @click="startReaction()">Start reaction</button>
		</div>
	</div>
	</div>`
})
Vue.component("auto-tab", {
	data: _=> {return {
		player,
		buyAutoFluc() {
			if (player.points >= 5e14 && player.base.auto == 0) player.auto.unlAutoFluc = true;
		},
		buyAutoRef() {
			if (player.star.stars >= 500) player.auto.unlAutoRef = true;
		},
		buyAutoSuper() {
			if (player.points >= 1e18) player.auto.unlAutoSuper = true;
		},
		buyAutoWarp() {
			if (player.points >= 1e25 && !player.star.secondary.O.t) player.auto.unlAutoWarp = true;
		}
	}},
	template: `<div style="display: flex">
		<div style="display: flex; flex-direction: column;" id="autodiv"><button :class="{bought: player.auto.unlAutoFluc}" :disabled="player.points < 5e14 || player.base.auto > 0"
		@click="buyAutoFluc()">Reach 5.00e14 photons without fluctuations.<br>Autobuy fluctuations, and they don't consume photons.</button>
		<button :class="{bought: player.auto.unlAutoRef}" :disabled="player.star.stars < 500"
		@click="buyAutoRef()">Reach 500 stars.<br>
		Reflectors scale twice as slow but you don't keep them on resets.<br>Start each reset with 10 reflectors.</button>
		<button :class="{bought: player.auto.unlAutoSuper}" :disabled="player.points < 1e18"
		@click="buyAutoSuper()">Reach 1e18 photons.<br>
		Automatically super-energize.</button>
		<button :class="{bought: player.auto.unlAutoWarp}" :disabled="player.points < 1e25 || player.star.secondary.O.t > 0"
		@click="buyAutoWarp()">Reach 1e25 photons without buying oxygen atoms.<br>
		Autobuy perceptive warps.</button></div>
		<div style="margin: 0 5px"><br><span v-if="player.auto.unlAutoFluc">Auto-Fluctuations: <input type="checkbox" v-model="player.auto.autoFluc"/></span>
		<br><br><br><br>
		<span v-if="player.auto.unlAutoRef">Auto-Reflectors: <input type="checkbox" v-model="player.auto.autoRef"/></span><br><br><br><br>
		<span v-if="player.auto.unlAutoSuper">Auto-Super energy: <input type="checkbox" v-model="player.auto.autoSuper"/></span><br><br><br>
		<span v-if="player.auto.unlAutoWarp">Auto-Perceptive Warps: <input type="checkbox" v-model="player.auto.autoWarp"/></span></div>
	</div>`
})
Vue.component("options-tab", {
	data: _=> {return {
		player,
		yesno: t => t?"Yes":"No"
	}},
	template: `<div>
		<button style="width: 300px" @click="player.options.drawPhotons = !player.options.drawPhotons">
		Draw Photons: {{yesno(player.options.drawPhotons)}}
		</button><br><br>
		<button style="width: 300px" @click="player.options.draw = !player.options.draw">
		Draw Anything At All: {{yesno(player.options.draw)}}
		</button>
	</div>`
})
Vue.component("atom-display", {
	data: _=> {return {
		player,
		star,
		primary: [{
			symbol: "H",
			name: "Hydrogen",
			desc: "没有什么有趣的，从最开始的原子开始。",
			req: 0
		},
		{
			symbol: "He",
			name: "Helium",
			desc: "释放4倍的光子。",
			req: 1
		},
		{
			symbol: "Ne",
			name: "Neon",
			desc: "释放20倍的光子，并使波动便宜1.5倍。",
			req: 3
		},
		{
			symbol: "Kr",
			name: "Krypton",
			desc: "释放100倍的光子，并增加光子反射的机会。",
			req: 5
		},
		{
			symbol: "Ra",
			name: "Radium",
			desc: "释放10000倍的光子，将链式反应增加到90%，产生x4倍的太阳能，并获得重置时获得的1%的恒星。",
			req: 8
		}],
		secondary: [{
			symbol: "C",
			name: "Carbon",
			desc: "温室气体?",
			req: 2
		},
		{
			symbol: "O",
			name: "Oxygen",
			desc: "与碳发生反应，产生丰富的爆炸。",
			req: 2
		},
		{
			symbol: "Si",
			name: "Silicon",
			desc: "戴森球体的第1部分。",
			req: 6
		},
		{
			symbol: "Fe",
			name: "Iron",
			desc: "与氧气反应缓慢。",
			req: 4
		},
		{
			symbol: "Cu",
			name: "Copper",
			desc: "戴森球体的第2部分。",
			req: 6
		},
		{
			symbol: "Cs",
			name: "Caesium",
			desc: "甚至连接触氧气都受到严重破坏。",
			req: 7
		},
		{
			symbol: "U",
			name: "Uranium",
			desc: "这是它。自然找到的最后一个元素。",
			req: 9
		}],
	}},
	template: `<div style="width: 500px;">
		<div>
			Primary atoms
			<span style="position: absolute; left: 500px; cursor: pointer;"
			@click="player.options.displayPrimary = !player.options.displayPrimary">{{player.options.displayPrimary?"v":">"}}</span>
			<hr>
			<div v-if="player.options.displayPrimary" style="padding: 0 50px; text-align: center"><atom v-for="atom in primary" :obj="atom"></atom></div>
		</div>
		<div>
			Secondary atoms
			<span style="position: absolute; left: 500px; cursor: pointer;"
			@click="player.options.displaySecondary = !player.options.displaySecondary">{{player.options.displaySecondary?"v":">"}}</span>
			<hr>
			<div v-if="player.options.displaySecondary" style="padding: 0 50px; text-align: center"><atom2 v-for="atom in secondary" :obj="atom"></atom2></div>
		</div>
	</div>`
})
Vue.component("atom", {
	props: ["obj"],
	data: _=> {return {
		player
	}},
	template: `<button @click="player.star.primary = obj.symbol"
	:class="{atomBtn: true, bought: player.star.primary == obj.symbol}"
	v-if="player.star.unlockedAtoms >= obj.req"
	:tooltip="obj.name + ': ' + obj.desc + ' (点击设为主要对象)'">{{obj.symbol}}
	</button>`
})
Vue.component("atom2", {
	props: ["obj"],
	data: _=> {return {
		player,
		buySecondaryAtom,
		getAtomCosts,
		nc,
		n,
		slashChar: '\\'
	}},
	template: `<button @click="buySecondaryAtom(obj.symbol)"
	class="atomBtn"
	v-if="player.star.unlockedAtoms >= obj.req"
	:tooltip="obj.name + ': ' + obj.desc + ' 你有 ' + nc(player.star.secondary[obj.symbol].a) + ' (' + nc(player.star.secondary[obj.symbol].t) + ' 已购买) ' + obj.name + ' 原子. (购买 1. 成本: ' + n(getAtomCosts[obj.symbol]) + ' 光子)'"
	:disabled="getAtomCosts[obj.symbol] > player.points">{{obj.symbol}}
	</button>`
})
Vue.component("buyable", {
	props: ["layer", "name", "dispname", "singname", "effectdisp", "buydisp", "currAmnt", "canAfford", "ncy"],
	data: _=> {return {
		player,
		n,
		nc,
		buy,
		costs,
	}},
	template: `<div v-if="player.unlocks[name]">
		You have {{nc(player[layer][name])}} {{player[layer][name] == 1 ? singname : dispname}}<span v-if="effectdisp">, <span v-html="effectdisp"></span></span>.
		<br>
		<button @click="buy[name]()" :disabled="(!(canAfford==undefined) && !canAfford) || currAmnt < costs[name]">{{buydisp.split(",")[0]}} {{ncy?nc(costs[name]):n(costs[name])}} {{buydisp.split(",")[1]}} 1 {{singname}}.</button>
	</div>`
})
Vue.component("upgrade", {
	props: ["layer", "upgrade", "id"],
	data: _=> {return {
		player,
		n,
		buyUpg,
		upgrades,
		upgData
	}},
	template: `<div v-if="upgrade.show"><button :class="{upg: true, bought: upgrade.bought}" :disabled="upgrade.cost > upgData[layer].currLoc[upgData[layer].currName] || upgrade.bought || (!upgrade.canAfford && upgrade.canAfford != undefined)" @click="buyUpg(layer, id)">
		<h3 v-if="upgrade.title" style="display: inline-block;">{{upgrade.title}}</h3>
		<br><br>
		<span v-html="upgrade.desc"></span>
		<br><br>
		Cost: {{n(upgrade.cost)}} {{upgData[layer].currDisp}}
	</button></div>`
})

var v = new Vue(vdata);

setTimeout(_=>{v.startColour = "#888"}, 30)
setTimeout(_=>{v.startOpacity = "0"}, 2000)
setTimeout(_=>{v.startOpacity = "-1"}, 3000)