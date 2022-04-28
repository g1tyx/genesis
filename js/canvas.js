var canvas = document.querySelector("#c");
var ctx = canvas.getContext("2d");
var pData = {
	rotation: 0,
	expand: -1,
	expandMul: 0,
	lastPhotonTicks: [],
	electronPositions: []
}
var shells = [2, 8, 8, 18, 18, 32, 32, 1000]
var electronNum = {
	H: 1,
	He: 2,
	Ne: 10,
	Kr: 36,
	Ra: 88
}

function drawParticle(x, y, radius, colour="255, 255, 255") {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = `rgb(${colour})`
	ctx.fill();
}

function drawNucleus(radius=20) {
	drawParticle(innerWidth/2-8, innerHeight/2-8, radius, "200, 0, 0");
}
function drawShell(size) {
	ctx.beginPath();
	ctx.arc(innerWidth/2-8, innerHeight/2-8, size, 0, 2*Math.PI, false);
	ctx.strokeStyle="#555";
	ctx.stroke();
}
function drawElectron(rotation, radius) {
	drawParticle(innerWidth/2-8+Math.cos(rotation)*radius, innerHeight/2-8+Math.sin(rotation)*radius, 5, "255, 255, 255");
}
function drawPhoton(x, y, rotation, radius) {
	ctx.beginPath();
	ctx.strokeStyle="#994";
	ctx.lineWidth = 2;
	ctx.moveTo(x+Math.cos(rotation)*radius, y+Math.sin(rotation)*radius);
	ctx.lineTo(x+Math.cos(rotation)*(radius+5), y+Math.sin(rotation)*(radius+5));
	ctx.stroke();
}

function drawAtom(diff) {
	canvas.height = innerHeight-16;
	canvas.width = innerWidth-16;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (!player.unlocks.photon) return;

	pData.rotation += diff/3*Math.PI
	if (pData.expand >= 0) {
		pData.expand += diff*3*Math.PI*(1+(upgrades.base[0].bought*0.5))/(1+upgrades.base[3].bought*3)*effect.warps[0];
		if (pData.expand >= Math.PI) pData.expand = -1;
	}
	pData.electronPositions = [];

	if ((player.tab == "ref" || player.tab == "base") && player.options.draw) drawNucleus(player.tab == "ref"?7:30);

	const jump = (1+(Math.sin(Math.max(0, pData.expand))/2)*(1+upgrades.base[3].bought*2));
	var electronsLeft = electronNum[player.star.primary];
	if (pData.lastPhotonTicks.length > 2000) pData.lastPhotonTicks = pData.lastPhotonTicks.slice(0, 2000)
	if (player.tab == "base" && player.options.draw) {
		for (var i = 0; electronsLeft > 0; i++) {
			drawShell(70 + i*30);
			var tmpLeft = electronsLeft;
			for (var j = 0; j < shells[i] && tmpLeft > 0; j++) {
				tmpLeft--;
				drawElectron(pData.rotation + (1/Math.min(electronsLeft, shells[i]))*j*Math.PI*2, (70 + i*30)*jump);
				pData.electronPositions.push([innerWidth/2-8+Math.cos(pData.rotation + (1/Math.min(electronsLeft, shells[i]))*j*Math.PI*2)*(70 + i*30)*jump, innerHeight/2-8+Math.sin(pData.rotation + (1/Math.min(electronsLeft, shells[i]))*j*Math.PI*2)*(70 + i*30)*jump])
			}
			electronsLeft = tmpLeft;
		}
		for (var i = 0; i < pData.lastPhotonTicks.length && player.options.drawPhotons; i++) {
			for (var j = 0; j < pData.lastPhotonTicks[i][2].length; j++) {
				drawPhoton(pData.lastPhotonTicks[i][2][j][0], pData.lastPhotonTicks[i][2][j][1], pData.lastPhotonTicks[i][1], (new Date().getTime()-pData.lastPhotonTicks[i][0]))
			}
		}
	}
	if (pData.lastPhotonTicks.length) {
		var t = new Date().getTime()
		pData.lastPhotonTicks = pData.lastPhotonTicks.filter(_=> _[0]+1000 > t)
	}
	if (player.tab == "ref" && player.options.draw) {
		ctx.beginPath();
		ctx.strokeStyle = "#222";
		ctx.lineWidth = 5
		ctx.arc(innerWidth/2-8, innerHeight/2-8, 200, 0, 2 * Math.PI);
		ctx.stroke();
		if (player.ref.reflectors) {
			ctx.beginPath();
			ctx.strokeStyle = "#666";
			ctx.arc(innerWidth/2-8, innerHeight/2-8, 200, Math.sin(pData.rotation/10)*30, (2*effect.reflectors*Math.PI) + Math.sin(pData.rotation/10)*30);
			ctx.stroke();
		}
	}

	if (player.tab == "star" && player.options.draw) {
		drawParticle(innerWidth/2-8, innerHeight/2-8, 150, "255, 255, 0", 10);
	}
}