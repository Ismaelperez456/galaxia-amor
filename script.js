// ======================================
// PARTE 2 - ESCENA 3D
// ======================================

// Canvas
const canvas = document.getElementById("c");

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Escena
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);

// Variables de la cámara
// Distancia final de la cámara
let targetDist = 300;

// La cámara comienza muy lejos
let currentDist = 2500;

// Estado del viaje
let cinematic = false;
let rotX = 0.2;
let rotY = 0;

// Cargar textura del fondo
const loader = new THREE.TextureLoader();

scene.background = new THREE.Color(0x000010);

// Ajustar tamaño de la ventana
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
// ======================================
// PARTE 3 - ESTRELLAS
// ======================================

function createStars(count = 2000, radius = 3000) {

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        const r = radius * (0.3 + Math.random() * 0.7);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] =
            r * Math.sin(phi) * Math.cos(theta);

        positions[i * 3 + 1] =
            r * Math.cos(phi);

        positions[i * 3 + 2] =
            r * Math.sin(phi) * Math.sin(theta);

    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        depthWrite: false
    });

    const stars = new THREE.Points(
        geometry,
        material
    );

    scene.add(stars);

}

createStars();

// ======================================
// PARTE 4 - NÚCLEO DE LA GALAXIA
// ======================================

// Luz principal
const light = new THREE.PointLight(0xffffff, 3);
light.position.set(0, 0, 0);
scene.add(light);

// Luz ambiental
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Material del núcleo
const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x222222,
    transparent: true,
    opacity: 0.65,
    shininess: 200
});

// Esfera central
const core = new THREE.Mesh(
    new THREE.SphereGeometry(40, 64, 64),
    coreMaterial
);

scene.add(core);

// ===============================
// TEXTO CENTRAL
// ===============================

function createCenterTexture(text) {

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,512,512);

    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#ff0044";

    ctx.shadowColor = "#ff77aa";
    ctx.shadowBlur = 45;

    ctx.fillText(text,256,256);

    return new THREE.CanvasTexture(canvas);

}

const centerTexture =
    createCenterTexture("TE AMO ❤️");

const centerSprite = new THREE.Sprite(

    new THREE.SpriteMaterial({

        map:centerTexture,
        transparent:true

    })

);

centerSprite.scale.set(60,60,1);

scene.add(centerSprite);

// ======================================
// PARTE 5 - RESPLANDOR Y ANILLOS
// ======================================

// Crear textura de brillo
function createGlowTexture(size = 768) {

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        size * 0.05,
        size / 2,
        size / 2,
        size * 0.5
    );

    gradient.addColorStop(0, "rgba(255,170,0,0.9)");
    gradient.addColorStop(0.5, "rgba(255,80,0,0.5)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return new THREE.CanvasTexture(canvas);

}

// Sprite brillante
const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
        map: createGlowTexture(),
        transparent: true,
        depthWrite: false
    })
);

glow.scale.set(500, 500, 1);

scene.add(glow);

// ----------------------------
// Anillos
// ----------------------------

const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
});

const ring1 = new THREE.Mesh(
    new THREE.RingGeometry(60, 80, 128),
    ringMaterial
);

ring1.rotation.x = Math.PI / 2;

scene.add(ring1);

const ring2 = new THREE.Mesh(
    new THREE.RingGeometry(85, 100, 128),
    ringMaterial.clone()
);

ring2.material.opacity = 0.25;

ring2.rotation.x = Math.PI / 2;

scene.add(ring2); 

// ======================================
// PARTE 6 - FRASES FLOTANTES
// ======================================

const WORDS = [

"❤️ Te amo",
"💕 Mi amor",
"🥰 Mi vida",
"💖 Mi reina",
"👑 Mi princesa",
"🌸 Macarena",
"❤️ Te extraño",
"💕 Siempre tú",
"💍 Para siempre",
"✨ Eres luz",
"🌹 Mi cielo",
"🤍 Mi paz",
"🌙 Mi universo",
"💫 Mi estrella",
"🌎 Mi mundo",
"☀️ Mi sol",
"🦋 Mi alegría",
"💞 Mi corazón",
"🌺 Mi todo",
"❤️ Solo tú",
"💕 Eres única",
"🥰 Mi felicidad",
"🌹 Mi destino",
"💖 Amor eterno",
"✨ Mi razón",
"🤍 Eres magia",
"🌸 Contigo",
"❤️ Siempre juntos",
"💕 Te elijo",
"🥰 Mi sueño",
"💍 Nuestro amor",
"🌙 Sin límites",
"💫 Mi inspiración",
"🌹 Mi tesoro",
"🤍 Amor infinito",
"❤️ Siempre aquí",
"💕 Eres perfecta",
"🌸 Mi bonita",
"🥰 Mi refugio",
"💖 Mi persona",
"✨ Mi esperanza",
"🌺 Mi ilusión",
"🌎 Mi hogar",
"💞 Mi futuro",
"❤️ Solo nosotros",
"💕 Mi corazón late",
"🌹 Te adoro",
"🤍 Eres especial",
"💫 Amor verdadero",
"🌸 Macarena ❤️",
"❤️ Mi reina",
"💕 Mi tesoro",
"🥰 Mi bonita",
"💖 Mi ángel",
"🌹 Mi cielo",
"✨ Mi luz",
"🤍 Mi calma",
"🌸 Mi ilusión",
"🌙 Mi destino",
"💍 Mi futuro",
"💞 Mi pasión",
"🌎 Mi razón",
"☀️ Mi alegría",
"💫 Mi sueño",
"🌺 Mi encanto",
"🦋 Mi esperanza",
"👑 Eres única",
"❤️ Eres todo",
"💕 Siempre amor",
"🥰 Solo tú",
"💖 Para ti",
"🌹 Mi sonrisa",
"✨ Mi fuerza",
"🤍 Mi refugio",
"🌸 Mi corazón",
"🌙 Mi estrella",
"💍 Amor puro",
"💞 Amor sincero",
"🌎 Amor real",
"☀️ Dulce amor",
"💫 Mi eternidad",
"🌺 Mi felicidad",
"🦋 Mi princesa",
"👑 Mi mujer",
"❤️ Mi bebé",
"💕 Mi niña",
"🥰 Mi persona",
"💖 Mi compañera",
"🌹 Mi inspiración",
"✨ Mi primavera",
"🤍 Mi infinito",
"🌸 Mi universo",
"🌙 Mi milagro",
"💍 Amor eterno",
"💞 Siempre fiel",
"🌎 Siempre juntos",
"☀️ Junto a ti",
"💫 Contigo siempre",
"🌺 Te elegiré",
"🦋 Eres hogar",
"❤️ Mi ilusión eterna",
"💕 Eres mi refugio",
"🥰 Amor sin fin",
"💖 Mi dulce cielo",
"🌹 Mi flor favorita",
"✨ Eres increíble",
"🤍 Mi eterno amor",
"🌸 Eres preciosa",
"🌙 Mi noche feliz",
"💍 Mi promesa",
"💞 Mi mejor mitad",
"🌎 Eres mi destino",
"☀️ Cada día tú",
"💫 Mi Gordita",
"🌺 Amor infinito",
"🦋 Mi linda chica",
"👑 Reina hermosa",
"❤️ Mi amorcito",
"💕 Mi dulzura",
"🥰 Mi consentida",
"💖 Mi bella vida",
"🌹 Amor verdadero",
"✨ Mi linda sonrisa",
"🤍 Mi mayor suerte",
"🌸 Mi hermosa flor",
"🌙 Dulces sueños",
"💍 Tú y siempre",
"💞 Juntos siempre",
"🌎 Mi única niña",
"☀️ Mi linda reina",
"💫 Amor bonito",
"🌺 Mi gran tesoro",
"🦋 Mi corazón feliz",
"👑 La más bella",
"❤️ Siempre enamorado",
"💕 Mi mayor alegría",
"🥰 Mi pequeña reina",
"💖 Mi razón diaria",
"🌹 Siempre feliz",
"✨ Mi dulce princesa",
"🤍 Lo mejor mío",
"🌸 Mi alegría eterna",
"🌙 Mi sueño eterno",
"💍 Eres mi suerte",
"💞 Mi paz eterna",
"🌎 Mi amor sincero",
"☀️ Mi bella luz",
"💫 Mi cielo azul",
"🌺 Eres especial",
"🦋 Mi única estrella",
];

const textGroup = new THREE.Group();
scene.add(textGroup);
const fotos = [];

// =====================================
// ❤️ HEART OF STARS
// =====================================

const heartGroup = new THREE.Group();
scene.add(heartGroup);

const HEART_POINTS = 10000;

const heartGeometry = new THREE.BufferGeometry();

const heartPositions =
new Float32Array(HEART_POINTS * 3);

const heartColors =
new Float32Array(HEART_POINTS * 3);

const pink = new THREE.Color(0xff2d96);
const lightPink = new THREE.Color(0xff80d5);
const white = new THREE.Color(0xffffff);

let p = 0;
let c = 0;

for(let i = 0; i < HEART_POINTS; i++){

    const t = Math.random() * Math.PI * 2;

    const x = 16 * Math.pow(Math.sin(t),3);

    const y =
        13 * Math.cos(t)
        -5 * Math.cos(2*t)
        -2 * Math.cos(3*t)
        -Math.cos(4*t);

    const spread = (Math.random()-0.5) * 2.5;

    heartPositions[p++] = x * 3 + spread;
    heartPositions[p++] = y * 3 + 170 + spread;
    heartPositions[p++] = spread * 3;

    const r = Math.random();

    const color =
        r < 0.55 ? pink :
        r < 0.90 ? lightPink :
        white;

    heartColors[c++] = color.r;
    heartColors[c++] = color.g;
    heartColors[c++] = color.b;

}

heartGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        heartPositions,
        3
    )
);

heartGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(
        heartColors,
        3
    )
);

const heartMaterial = new THREE.PointsMaterial({

    size: 1.8,

    vertexColors: true,

    transparent: true,

    opacity: 0.95,

    depthWrite: false,

    blending: THREE.AdditiveBlending

});

const heart = new THREE.Points(
    heartGeometry,
    heartMaterial
);

heart.position.set(0,10,0);

heartGroup.add(heart);


let descubiertas = 0;
function createTextTexture(text, color = "#ffffff") {

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,512,128);

    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = color;

    ctx.shadowColor = color;
    ctx.shadowBlur = 25;

    ctx.fillText(text,256,64);

    return new THREE.CanvasTexture(canvas);

}
function crearFoto(ruta, x, y, z, mensaje) {

    const textura = new THREE.TextureLoader().load(ruta);

    const material = new THREE.SpriteMaterial({
        map: textura,
        transparent: true
    });

    const foto = new THREE.Sprite(material);

    foto.position.set(x, y, z);
    foto.scale.set(40, 40, 1);

   const radio = Math.sqrt(x * x + y * y + z * z);

foto.userData = {
    mensaje: mensaje,
    radius: radio,
    theta: Math.atan2(z, x),
    phi: Math.acos(y / radio),
    speed: 0.0008
};

    scene.add(foto);
    fotos.push(foto);

}

WORDS.forEach((word, index) => {

    const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: createTextTexture(word),
            transparent: true
        })
    );

    sprite.scale.set(50,16,1);

    const phi = Math.acos(2*Math.random()-1);
    const theta = Math.random()*Math.PI*2;
    const radius = 170 + Math.random()*100;

    sprite.position.set(
        radius*Math.sin(phi)*Math.cos(theta),
        radius*Math.cos(phi),
        radius*Math.sin(phi)*Math.sin(theta)
    );

    sprite.userData = {
        phi,
        theta,
        radius,
        speed:0.001 + Math.random()*0.001
    };

    textGroup.add(sprite);

});

crearFoto(
    "fotos/bebe.png",
    120,
    20,
    -80,
    `Si tuviera que volver
a elegir una persona
para compartir mi vida...

Te volvería a elegir
una y otra vez. ❤️`
);

crearFoto(
    "fotos/bebe1.png",
    -140,
    30,
    100,
     `Eres una mujer increíble.

Admiro tu corazón,
tu inteligencia
y la dedicación con la que ayudas
a tantas personas cada día.

Nunca dejes de ser tú. 💕`
);

crearFoto(
    "fotos/bebe2.png",
    180,
    40,
    -150,
    `Contigo aprendí que el amor también puede sentirse como hogar. ❤️`
 );   
crearFoto(
    "fotos/corazon.png",
    -190,
    60,
    100,
     `Si llegaste hasta aquí,
     quiero que recuerdes una sola cosa: te amo hoy, mañana y todos los días que me regale la vida. 
     Gracias por ser la mujer de mis sueños. ❤️`
);

// ======================================
// PARTE 7 - CONTROLES DE LA CÁMARA
// ======================================

let dragging = false;
let lastX = 0;
let lastY = 0;

function onMouseDown(event) {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
}

function onMouseMove(event) {

    if (!dragging) return;

    const dx = (event.clientX - lastX) / window.innerWidth;
    const dy = (event.clientY - lastY) / window.innerHeight;

    rotY -= dx * 3;
    rotX -= dy * 2.2;

    rotX = Math.max(-1.2, Math.min(1.2, rotX));

    lastX = event.clientX;
    lastY = event.clientY;
}

function onMouseUp() {
    dragging = false;
}

window.addEventListener("mousedown", onMouseDown);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);

// Zoom

window.addEventListener("wheel", (event) => {

    targetDist += event.deltaY * 0.25;

    targetDist = Math.max(
        160,
        Math.min(600, targetDist)
    );

}); 

let lastPinchDistance = null;

function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

window.addEventListener("touchmove", (e) => {

    if (e.touches.length !== 2) {
        lastPinchDistance = null;
        return;
    }

    e.preventDefault();

    const distance = getDistance(e.touches[0], e.touches[1]);

    if (lastPinchDistance !== null) {

        const delta = lastPinchDistance - distance;

        targetDist += delta * 0.8;

        targetDist = Math.max(160, Math.min(600, targetDist));
    }

    lastPinchDistance = distance;

}, { passive: false });

window.addEventListener("touchend", () => {
    lastPinchDistance = null;
});
// ======================================
// PARTE 8 - ANIMACIÓN
// ======================================

let time = 0;

function animate() {

    requestAnimationFrame(animate);

    time += 0.01;

    // Girar anillos
    ring1.rotation.z += 0.002;
    ring2.rotation.z -= 0.0015;

    // Pulso del núcleo
    const pulse = 1 + 0.05 * Math.sin(time * 3);

    core.scale.set(pulse, pulse, pulse);

    // Pulso del brillo
    const glowScale =
        500 * (1 + 0.03 * Math.sin(time * 0.4));

    glow.scale.set(glowScale, glowScale, 1);

    // Movimiento de los textos
    textGroup.children.forEach(sprite => {

        sprite.material.opacity =
            0.8 + 0.2 * Math.sin(time * 2);

        sprite.userData.theta += sprite.userData.speed;

        sprite.position.x =
            sprite.userData.radius *
            Math.sin(sprite.userData.phi) *
            Math.cos(sprite.userData.theta);

        sprite.position.z =
            sprite.userData.radius *
            Math.sin(sprite.userData.phi) *
            Math.sin(sprite.userData.theta);

    });
// Movimiento de las fotos
fotos.forEach(foto => {

    foto.userData.theta += foto.userData.speed;

    foto.position.x =
        foto.userData.radius *
        Math.sin(foto.userData.phi) *
        Math.cos(foto.userData.theta);

    foto.position.z =
        foto.userData.radius *
        Math.sin(foto.userData.phi) *
        Math.sin(foto.userData.theta);

    foto.position.y =
        foto.userData.radius *
        Math.cos(foto.userData.phi);

    foto.lookAt(camera.position);

});
   // ===============================
// VIAJE CINEMATOGRÁFICO
// ===============================

if (cinematic) {

    currentDist += (targetDist - currentDist) * 0.025;

    rotY += 0.004;

    if (Math.abs(currentDist - targetDist) < 3) {

        cinematic = false;
        currentDist = targetDist;

    }

} else {

    currentDist += (targetDist - currentDist) * 0.06;

}


const cx = Math.cos(rotX);
const sx = Math.sin(rotX);

const cy = Math.cos(rotY);
const sy = Math.sin(rotY);



camera.position.set(
    currentDist * sy * cx,
    currentDist * sx,
    currentDist * cy * cx
);

camera.lookAt(0,0,0);

// Durante el viaje el núcleo brilla más
if (cinematic) {

    glow.material.opacity = 1;

    core.rotation.y += 0.02;

} else {

    glow.material.opacity = 0.75;

}

renderer.render(scene, camera);

}

animate();

// ================================
// REPRODUCTOR DE MÚSICA
// ================================
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const timeLabel = document.getElementById("time");

function fmt(s){
 if(!isFinite(s)) return "0:00";
 const m=Math.floor(s/60);
 const sec=Math.floor(s%60).toString().padStart(2,"0");
 return `${m}:${sec}`;
}
playBtn.addEventListener("click", async ()=>{
 if(audio.paused){
   try{
     await audio.play();
     playBtn.textContent="⏸️";
   }catch(e){console.error(e);}
 }else{
   audio.pause();
   playBtn.textContent="▶️";
 }
});
audio.addEventListener("timeupdate",()=>{
 if(audio.duration){
  progressBar.style.width=((audio.currentTime/audio.duration)*100)+"%";
  timeLabel.textContent=`${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
 }
});
progress.addEventListener("click",(e)=>{
 if(!audio.duration)return;
 const r=progress.getBoundingClientRect();
 audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration;
});
audio.addEventListener("ended",()=>playBtn.textContent="▶️");

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", async () => {

    cinematic = true;

    intro.classList.add("fadeIntro");

    try{
        await audio.play();
        playBtn.textContent = "⏸️";
    }catch(e){}

    setTimeout(()=>{
        intro.style.display = "none";
    },1500);

});
const introTitle = document.getElementById("introTitle");


startBtn.style.display = "none";

const mensajes = [
    "❤️ Feliz Día de la Novia ❤️",
    "Para la mujer que cambió mi vida...",
    "Preparé este pequeño universo solo para ti. ❤️"
];

let indice = 0;

function siguienteMensaje() {

    introTitle.style.opacity = "0";

    setTimeout(() => {

        introTitle.textContent = mensajes[indice];
        introTitle.style.opacity = "1";

        indice++;

        if (indice < mensajes.length) {

            setTimeout(siguienteMensaje, 4000);

        } else {

            setTimeout(() => {
                startBtn.style.display = "inline-block";
            }, 4000);

        }

    }, 600);

}

siguienteMensaje();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalText = document.getElementById("modalText");
const closePhoto = document.getElementById("closePhoto");
const finalModal = document.getElementById("finalModal");
const closeFinal = document.getElementById("closeFinal");



window.addEventListener("click", (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(fotos);

    if (hit.length > 0) {

    console.log(hit[0]);

    modal.style.display = "flex";

    modalImage.src = hit[0].object.material.map.image.src;

    modalText.textContent = hit[0].object.userData.mensaje;

}
const foto = hit[0].object;

if (!foto.userData.descubierta) {

    foto.userData.descubierta = true;
    descubiertas++;

   

}
});

closePhoto.addEventListener("click", () => {

    modal.style.display = "none";

    if (descubiertas === fotos.length) {

        setTimeout(() => {

            mostrarCartaFinal();

        }, 1000);

    }

});

closeFinal.addEventListener("click", () => {

    finalModal.style.display = "none";

});
function mostrarCartaFinal() {

    finalModal.style.display = "flex";

}
