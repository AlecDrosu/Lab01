// #####################SNOW##############################

const snow = document.getElementById("snow");
const ctx = snow.getContext("2d");
const particles = 300;
const particlesArray = [];

let width = (snow.width = window.innerWidth);
let height = (snow.height = window.innerHeight);

const letItSnow = document.querySelector(".snow__active");

function createParticles() {
	for (let i = 0; i < particles; i++) {
		const particle = {
			x: Math.random() * width,
			y: Math.random() * height,
			radius: Math.random() * 3 + 1,
			vx: -1 + Math.random() * 4,
			vy: -1 + Math.random() * 10,
			speed: Math.random(),
		};
		particlesArray.push(particle);
	}
}

function draw() {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "white";
	ctx.beginPath();
	for (let i = 0; i < particlesArray.length; i++) {
		const p = particlesArray[i];
		ctx.moveTo(p.x, p.y);
		ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
	}
	ctx.fill();
}

function resize() {
	width = window.innerWidth;
	height = window.innerHeight;
	snow.width = width;
	snow.height = height;
}

window.addEventListener("resize", resize);

function moveSnow() {
	for (let i = 0; i < particlesArray.length; i++) {
		const p = particlesArray[i];
		p.y += p.vy * p.speed;
		p.x += p.vx * p.speed;
		if (p.x > width + 5 || p.x < -5 || p.y > height) {
			if (i % 3 > 0) {
				particlesArray.push({
					x: Math.random() * width,
					y: -10,
					radius: p.radius,
					vx: p.vx,
					vy: p.vy,
					speed: p.speed,
				});
			}
			particlesArray.splice(i, 1);
		}
	}
}

// function mouseLeave() {
// 	for (let i = 0; i < particlesArray.length; i++) {
// 		const p = particlesArray[i];
// 		p.x = Math.random() * width;
// 		p.y = Math.random() * height;
// 	}
// }

function mouseMove(e) {
	const mx = e.clientX;
	const my = e.clientY + 120;
	for (let i = 0; i < particlesArray.length; i++) {
		const p = particlesArray[i];
		const dx = mx - p.x;
		const dy = my - p.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const minDist = 100;
		const pull = -0.5;
		if (distance < minDist) {
			const angle = Math.atan2(dy, dx);
			const tx = p.x + Math.cos(angle) * (minDist - distance) * pull;
			const ty = p.y + Math.sin(angle) * (minDist - distance) * pull;
			p.x = tx;
			p.y = ty;
		}
	}
}

function updateSnowFall() {
	moveSnow();
	draw();
	requestAnimationFrame(updateSnowFall);
}

letItSnow.addEventListener("click", createParticles);
draw();
updateSnowFall();
// fix mouseMove so it actually tracks the mouse and nothing else
window.addEventListener("mousemove", mouseMove);
// window.addEventListener("mouseleave", mouseLeave);

// ############################# Menu Items #############################

const menuOpen = document.querySelector(".menu__open");
menuOpen.addEventListener("click", () => {
    document.querySelector(".dropdown__menu").classList.toggle("dropdown__menu_active");
});

// when the user clicks on one of the menu items, the menu should close
const menuItems = document.querySelectorAll(".menu__item");
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".dropdown__menu").classList.remove("dropdown__menu_active");
    });
});