function makePhoton(cap=Infinity, affect=false, base=true) {
	if (pData.expand >= 0 && !affect) return;
	player.points += Math.floor(Math.pow(Math.min(cap, player.base.atoms), 1+upgrades.base[1].bought*0.2)*(1+upgrades.base[3].bought*9)*(1+(player.base.super.effect&&!upgrades.ref[2].bought)*2)*star.effect*(1+(player.star.primary == "He")*3))*(1+(player.star.primary == "Ne")*19)*(1+(player.star.primary == "Kr")*99)*(1+(player.star.primary == "Ra")*9999)*star.energyBuffs[0];
	player.unlocks.photon = true;
	if (player.points >= 50) player.unlocks.atoms = true;
	if (player.points >= 500) player.unlocks.auto = true;
	if (player.points >= 2500) player.unlocks.upgrade = true;
	if (player.points >= 55555 && player.base.atoms >= 55 && player.base.auto >= 5) player.unlocks.super = true;
	if (player.points >= 1e9) player.unlocks.star = true;
	if (base) pData.expand = Math.max(0, pData.expand);
	if (player.options.drawPhotons && (pData.lastPhotonTicks[0] == undefined || !(pData.lastPhotonTicks[0][0]-new Date().getTime() >= -50))) {for (var i = 0; i++ < (1+upgrades.base[3].bought*9)*(1+(player.base.super.effect&&!upgrades.ref[2].bought)*2);) pData.lastPhotonTicks.unshift([new Date().getTime(), random()*360, pData.electronPositions]);}
	if (pData.lastPhotonTicks.length > 2000) pData.lastPhotonTicks = pData.lastPhotonTicks.slice(0, 2000)
	if (random() < effect.reflectors) {
		setTimeout(makePhoton, 150-(upgrades.ref[2].bought && player.base.super.effect)*112.5, cap, true, false);
	}
	for (var i = 0; i++ < 1+upgrades.star[0].bought*19;) {
		if (random() < effect.reflectors*0.5 && upgrades.ref[0].bought) {
			player.base.atoms += upgrades.star[2].bought?Math.pow(star.effect, 0.2):1;
		}
	}
}
function activateSuper() {
	if (player.base.super.effect || player.base.atoms < 4) return;
	player.base.super.effect = 1;
	player.base.atoms -= 3;
}
document.addEventListener("keydown", _=> {
	if (_.code == "Space") {
		spacePressed = 1;
		_.preventDefault();
	}
})
document.addEventListener("keyup", _=> {
	if (_.code == "Space") {
		spacePressed = 0;
		_.preventDefault();
	}
})

var lastTick = new Date().getTime();
const gameLoop = function (diff) {
	if (player.gameEndTicks >= 12) return;
	diff /= 1000;
	lastTick = new Date().getTime();
	if (upgrades.ref[2].bought && player.base.super.effect) diff *= 4;
	drawAtom(diff);
	if (spacePressed) makePhoton();
	if (player.base.auto) {
		player.base.autoTicks += diff;
		if (player.base.autoTicks > 0) {
			for (player.base.autoTicks; player.base.autoTicks > 0; player.base.autoTicks -= effect.auto[1]) {
				makePhoton(effect.auto[0], true);
				if (upgrades.base[1].bought && random() < 0.3+(player.star.primary == "Ra")*0.6) player.base.autoCrit = 1;
				else player.base.autoCrit = 0;
			}
		}
	}
	if (upgrades.ref[2].bought && player.base.super.effect) diff /= 4;
	if (player.base.super.effect) {
		player.base.super.time += diff;
		if (player.base.super.time > 60) {
			player.base.super.effect = 0;
			player.base.super.time = 0;
		}
	}
	if (player.star.reactor.isReacting) {
		if (reactions[player.star.reactor.create].update)
			reactions[player.star.reactor.create].update(Math.min(diff, reactions[player.star.reactor.create].time-player.star.reactor.time));
			player.star.reactor.time += diff;
		if (player.star.reactor.time >= reactions[player.star.reactor.create].time) {
			reactions[player.star.reactor.create].finish();
			player.star.reactor.isReacting = false;
			player.star.reactor.time = 0;
		}
	}
	if (player.auto.autoFluc && player.auto.unlAutoFluc) buy.auto();
	if (player.auto.autoRef && player.auto.unlAutoRef) buy.reflectors(true);
	if (player.auto.autoWarp && player.auto.unlAutoWarp) buy.warps();
	if (!(player.base.super.effect || player.base.atoms < 4) && player.auto.autoSuper && player.auto.unlAutoSuper) activateSuper();
	player.star.energy += star.dysonEffect*diff;
	if (player.star.primary == "Ra") {
		player.star.stars += star.resetGain*0.01*diff;
		updateStars();
	}
	if (player.star.secondary.U.t) {
		player.gameEndTicks += diff;
		if (player.gameEndTicks >= 3) player.gameEndColour = "#ff0";
		if (player.gameEndTicks >= 9) player.gameEndOpacity = 0;
	}
}
var loop = setInterval(_=>{gameLoop(new Date().getTime()-lastTick)}, 20)