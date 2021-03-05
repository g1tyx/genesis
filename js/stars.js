const star = {
	get resetGain() { return Math.floor(Math.pow(player.points/1e9, 1/3)*(upgrades.star[4].bought?upgrades.star[4].effect:10)*star.energyBuffs[0]) },
	get nextAt() { return Math.pow((this.resetGain+1)/(upgrades.star[4].bought?upgrades.star[4].effect:1)/star.energyBuffs[0], 3)*1e9 },
	get effect() { return Math.pow(1+player.star.stars, 1.5) },
	get nextAtom() {
		switch(player.star.unlockedAtoms) {
			case 0: return 2;
			case 1: return 10;
			case 2: return 100;
			case 3: return 10000;
			case 4: return 100000;
			case 5: return 2e7;
			case 6: return 3e9;
			case 7: return 2e12;
			case 8: return 5e13;
			case 9: return Infinity;
		}
	},
	get dysonEffect() { return Math.pow(player.star.dysons, 2)*Math.pow(player.star.stars, 0.2)*(1+(player.star.primary == "Ra")*3) },
	get dysonCosts() { return [Math.floor(20*Math.pow(player.star.dysons+1, 1.5)), Math.floor(15*Math.pow(player.star.dysons+1, 1.5))] },
	get energyBuffs() { return [Math.pow(Math.log10(player.star.energy+1)/4+1, 3), Math.pow(player.star.energy+1, 0.4)] }
}
const getAtomCosts = {
	get C() { return Math.floor(Math.pow(1.2, player.star.secondary.C.t)*50) },
	get O() { return Math.floor(Math.pow(1.2, player.star.secondary.O.t)*50) },
	get Si() { return Math.floor(Math.pow(1.4, player.star.secondary.Si.t)*100) },
	get Fe() { return Math.floor(Math.pow(1.5, player.star.secondary.Fe.t)*200) },
	get Cu() { return Math.floor(Math.pow(1.6, player.star.secondary.Cu.t)*300) },
	get Cs() { return Math.floor(Math.pow(2.5, player.star.secondary.Cs.t)*1000) },
	U: 5e45
}
function doStarReset() {
	if (player.points < 1e9) return;
	player.star.stars += star.resetGain;
	player.points = 0;
	player.base.atoms = 1;
	player.base.auto = 0;
	player.base.autoTicks = 0;
	player.base.super.effect = 0;
	player.base.super.time = 0;
	Vue.set(player.star, "secondary", initPlayer().star.secondary)
	player.star.reactor.time = 0;
	player.star.reactor.amt = 0;
	player.star.reactor.isReacting = false;
	player.star.energy = 0;
	Vue.set(player.star.reactor, "products", initPlayer().star.reactor.products)
	if (player.auto.unlAutoRef) player.ref.reflectors = 10;
	updateStars();
}
function updateStars() {
	if (player.star.stars >= 2) {
		player.star.unlockedAtoms = Math.max(1, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 10) {
		player.star.unlockedAtoms = Math.max(2, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 100) {
		player.star.unlockedAtoms = Math.max(3, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 10000) {
		player.star.unlockedAtoms = Math.max(4, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 100000) {
		player.star.unlockedAtoms = Math.max(5, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 2e7) {
		player.star.unlockedAtoms = Math.max(6, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 3e9) {
		player.star.unlockedAtoms = Math.max(7, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 2e12) {
		player.star.unlockedAtoms = Math.max(8, player.star.unlockedAtoms);
	}
	if (player.star.stars >= 5e13) {
		player.star.unlockedAtoms = Math.max(9, player.star.unlockedAtoms);
	}
}
function buySecondaryAtom(atom) {
	if (getAtomCosts[atom] > player.points) return;
	player.points -= getAtomCosts[atom];
	player.star.secondary[atom].t++;
	player.star.secondary[atom].a++;
}

const reactions = {
	CO2: {
		get amt() { return player.star.reactor.isReacting?player.star.reactor.amt:Math.floor(Math.min(player.star.secondary.C.a, player.star.secondary.O.a/2)) },
		get effectDisplay() { return [
			`Multiply photon amount by ${n(this.effects[0], 2)}`
		]},
		get effects() { return [
			Math.pow(Math.log10(this.amt+1+player.star.reactor.products.CO2)/5+1, 4)/Math.pow(Math.log10(player.star.reactor.products.CO2+1)/5+1, 4)
		]},
		start() {
			player.points *= this.effects[0];
			var a = this.amt;
			player.star.reactor.amt = a;
		},
		finish() {
			var a = this.amt;
			player.star.reactor.products.CO2 += a;
			player.star.secondary.C.a -= a;
			player.star.secondary.O.a -= a*2;
		},
		time: 3
	},
	Fe2O3: {
		get amt() { return player.star.reactor.isReacting?player.star.reactor.amt:Math.floor(Math.min(player.star.secondary.Fe.a/2, player.star.secondary.O.a/3)) },
		get effectDisplay() { return [
			`Multiply photon amount by ${n(this.effects[0], 2)} over the course of 30 seconds`,
			`While reaction active, make fluctuations x${n(this.effects[1], 2)} faster`
		]},
		get effects() { return [
			Math.pow(Math.log10(this.amt+1+player.star.reactor.products.Fe2O3)/5+1, 4)/Math.pow(Math.log10(player.star.reactor.products.Fe2O3+1)/5+1, 4),
			Math.pow(Math.log10(this.amt+10)/2+0.5, 3)
		]},
		start() {
			player.star.reactor.amt = this.amt;
		},
		update(diff) {
			player.points *= Math.pow(this.effects[0], diff/30);
		},
		finish() {
			var a = this.amt;
			player.star.reactor.products.Fe2O3 += a;
			player.star.secondary.Fe.a -= a*2;
			player.star.secondary.O.a -= a*3;
		},
		time: 30
	},
	Cs2O: {
		get amt() { return player.star.reactor.isReacting?player.star.reactor.amt:Math.floor(Math.min(player.star.secondary.Cs.a/2, player.star.secondary.O.a)) },
		get effectDisplay() { return [
			`Multiply photon amount by ${n(this.effects[0], 2)}`,
			`Multiply atom amount by ${n(Math.pow(this.effects[0], 0.5), 2)}`
		]},
		get effects() { return [
			Math.pow(((this.amt+player.star.reactor.products.Cs2O)/3+1)/(player.star.reactor.products.Cs2O/3+1), 0.7)
		]},
		start() {
			player.star.reactor.amt = this.amt;
			player.points *= this.effects[0];
			player.base.atoms *= Math.pow(this.effects[0], 0.5);
		},
		finish() {
			var a = this.amt;
			player.star.reactor.products.Cs2O += a;
			player.star.secondary.Cs.a -= a*2;
			player.star.secondary.O.a -= a;
		},
		time: 1.5
	}
}
function startReaction () {
	if (player.star.reactor.isReacting) return;
	reactions[player.star.reactor.create].start()
	player.star.reactor.isReacting = true;
}
function isReacting(atom) {
	return player.star.reactor.isReacting && player.star.reactor.create == atom;
}
function buyDyson() {
	if (player.star.secondary.Si.a < star.dysonCosts[0] || player.star.secondary.Cu.a < star.dysonCosts[1]) return;
	player.star.dysons++;
}