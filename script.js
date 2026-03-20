// ─── SCENE SETUP ──────────────────────────────────────────
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,                                    // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1,                                   // near clip
  1000                                   // far clip
);
camera.position.set(0, 30, 80);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ─── ORBIT CONTROLS (drag + zoom) ─────────────────────────
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;     // smooth motion
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 150;

// ─── LIGHTING ─────────────────────────────────────────────
// Sunlight from center
const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

// Soft ambient light so planets aren't pitch black on the dark side
const ambientLight = new THREE.AmbientLight(0x111133, 1);
scene.add(ambientLight);

// ─── STARS BACKGROUND ─────────────────────────────────────
function createStars() {
  const geometry = new THREE.BufferGeometry();
  const count = 8000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 800;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.4,
    sizeAttenuation: true
  });

  return new THREE.Points(geometry, material);
}
scene.add(createStars());

// ─── TEXTURE LOADER ───────────────────────────────────────
const loader = new THREE.TextureLoader();

// Helper: create a planet sphere
function createPlanet(radius, color, emissive = false) {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: color,
    emissive: emissive ? color : 0x000000,
    emissiveIntensity: emissive ? 0.3 : 0,
    roughness: 0.8,
    metalness: 0.1
  });
  return new THREE.Mesh(geo, mat);
}

// ─── NEBULA CLOUDS ────────────────────────────────────────
function createNebula(color, x, y, z, size) {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, color.replace('1)', '0.18)'));
  gradient.addColorStop(0.5, color.replace('1)', '0.07)'));
  gradient.addColorStop(1, color.replace('1)', '0)'));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const sprite = new THREE.Sprite(mat);
  sprite.position.set(x, y, z);
  sprite.scale.set(size, size, 1);
  scene.add(sprite);
}

// Add several nebula clouds around the scene
createNebula('rgba(50,80,255,1)',   60,  10, -80,  120);
createNebula('rgba(150,30,200,1)', -90,  20,  40,  100);
createNebula('rgba(0,150,200,1)',   30, -15,  90,   90);
createNebula('rgba(200,50,100,1)', -60,   5, -60,   80);
createNebula('rgba(30,200,150,1)',  80,  -5,  50,   70);

// ─── SUN ──────────────────────────────────────────────────
const sunGeo = new THREE.SphereGeometry(8, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Sun glow (sprite)
const spriteMat = new THREE.SpriteMaterial({
  map: createGlowTexture(),
  color: 0xff8800,
  transparent: true,
  blending: THREE.AdditiveBlending
});
const sunGlow = new THREE.Sprite(spriteMat);
sunGlow.scale.set(30, 30, 1);
sun.add(sunGlow);

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,200,50,1)');
  gradient.addColorStop(0.3, 'rgba(255,100,0,0.5)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

// ─── PLANET DATA ──────────────────────────────────────────
const planetData = [
  {
    name: 'Mercury',
    label: 'About Me',
    color: 0x8899aa,
    radius: 1.8,
    orbitRadius: 18,
    speed: 0.8,
    content: `
      <h2>About Me</h2>
      <p>Hi, I'm <strong>Archit Garg</strong> — an aspiring engineer passionate about building things that matter.</p>
      <ul>
        <li>🎓 B.Tech CSE · SRM Institute of Science & Technology, Chennai</li>
        <li>📅 3rd Semester · Expected Graduation: May 2028</li>
        <li>⭐ Current CGPA: 9/10</li>
        <li>🔭 Committee Head of Design · Astrophilia SRM</li>
        <li>💡 Interested in Web Dev, AI/ML & Frontend Design</li>
      </ul>
    `
  },
  {
    name: 'Venus',
    label: 'Skills',
    color: 0xe8c97a,
    radius: 2.4,
    orbitRadius: 26,
    speed: 0.6,
    content: `
      <h2>Skills</h2>
      <ul>
        <li>💻 C · C++ · Java · JavaScript</li>
        <li>🌐 HTML · CSS · Frontend Design</li>
        <li>🧠 OOPs · Data Structures & Algorithms</li>
        <li>🛢️ MySQL (Basics)</li>
        <li>🤖 Basic AI / ML Concepts</li>
      </ul>
      <h2 style="margin-top:16px">Certifications</h2>
      <ul>
        <li>📜 Web Development Bootcamp – Udemy</li>
        <li>📜 OOP Fundamentals – NPTEL</li>
        <li>📜 DSA – NPTEL</li>
        <li>📜 AI & Cloud Internship – IBM</li>
      </ul>
    `
  },
  {
    name: 'Earth',
    label: 'Projects',
    color: 0x2277cc,
    radius: 2.6,
    orbitRadius: 36,
    speed: 0.45,
    content: `
      <h2>Projects</h2>
      <p><strong>🗓️ College Event & Certificate System</strong></p>
      <ul>
        <li>Database system using MySQL</li>
        <li>Manages student participation & certificates</li>
        <li>ER diagrams & relational schema design</li>
      </ul>
      <br/>
      <p><strong>🌐 Portfolio Website</strong></p>
      <ul>
        <li>Responsive site using HTML, CSS & JavaScript</li>
        <li>Sections for skills, projects & contact</li>
      </ul>
      <br/>
      <a href="https://github.com/Archit1906" target="_blank">🐙 View all on GitHub →</a>
    `
  },
  {
    name: 'Mars',
    label: 'Experience',
    color: 0xcc4422,
    radius: 2.0,
    orbitRadius: 47,
    speed: 0.35,
    content: `
      <h2>Experience</h2>
      <p><strong>🏢 Webanix – Web Development Intern</strong><br/>
      Duration: 1 Month</p>
      <ul>
        <li>Frontend development using HTML & CSS</li>
        <li>Worked on real-world layouts & UI improvements</li>
        <li>Gained exposure to teamwork & project workflows</li>
      </ul>
      <br/>
      <p><strong>🔭 Astrophilia SRM</strong></p>
      <ul>
        <li>Committee Head of Design Team</li>
        <li>Participated in technical & astronomy events</li>
        <li>Contributed to event planning & coordination</li>
      </ul>
    `
  },
  {
    name: 'Saturn',
    label: 'Contact',
    color: 0xddbb88,
    radius: 4.0,
    orbitRadius: 62,
    speed: 0.22,
    hasSaturnRings: true,
    content: `
      <h2>Contact</h2>
      <p>Let's connect and build something amazing together.</p>
      <br/>
      <ul>
        <li>📧 <a href="mailto:architgargdabs@gmail.com">architgargdabs@gmail.com</a></li>
        <li>📱 +91-9672963320</li>
        <li>💼 <a href="https://www.linkedin.com/in/archit-garg-8a4715328/" target="_blank">LinkedIn →</a></li>
        <li>🐙 <a href="https://github.com/Archit1906" target="_blank">GitHub →</a></li>
      </ul>
    `
  }
];

// ─── CREATE PLANETS + ORBITS ──────────────────────────────
const planets = [];

planetData.forEach(data => {
  // Planet mesh
  const mesh = createPlanet(data.radius, data.color);

  // Saturn rings
  if (data.hasSaturnRings) {
    const ringGeo = new THREE.RingGeometry(data.radius + 1.2, data.radius + 3, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xddcc99,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    mesh.add(ring);
  }

  scene.add(mesh);

  // Orbit ring (visual guide)
  const orbitGeo = new THREE.RingGeometry(
    data.orbitRadius - 0.05,
    data.orbitRadius + 0.05,
    128
  );
  const orbitMat = new THREE.MeshBasicMaterial({
    color: 0x334466,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.4
  });
  const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
  orbitRing.rotation.x = Math.PI / 2;
  scene.add(orbitRing);

  // Random starting angle so planets aren't all lined up
  const startAngle = Math.random() * Math.PI * 2;

  planets.push({
    mesh,
    data,
    angle: startAngle,
    originalColor: data.color
  });
});

// ─── RAYCASTER (for hover + click detection) ──────────────
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');
const panel = document.getElementById('panel');
const panelContent = document.getElementById('panel-content');
const closeBtn = document.getElementById('close-panel');

let hoveredPlanet = null;

// Update mouse position
window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  // Move tooltip to cursor position
  tooltip.style.left = (e.clientX + 16) + 'px';
  tooltip.style.top = (e.clientY - 10) + 'px';
});

// Click to open panel
window.addEventListener('click', () => {
  if (hoveredPlanet) {
    panelContent.innerHTML = hoveredPlanet.data.content;
    panel.classList.remove('hidden');

    // ── Camera zoom toward clicked planet ──
    const target = hoveredPlanet.mesh.position.clone();
    const direction = target.clone().normalize();
    const zoomPos = target.clone().sub(direction.multiplyScalar(-20));
    zoomPos.y += 10;

    // Smoothly move camera
    const startPos = camera.position.clone();
    const startTime = performance.now();
    const duration = 1200; // ms

    function zoomAnim(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t; // ease in-out

      camera.position.lerpVectors(startPos, zoomPos, ease);
      controls.target.lerp(target, ease * 0.3);

      if (t < 1) requestAnimationFrame(zoomAnim);
    }
    requestAnimationFrame(zoomAnim);
  }
});

// Close panel
closeBtn.addEventListener('click', () => {
  panel.classList.add('hidden');
});

// ─── ANIMATION LOOP ───────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  // Rotate sun
  sun.rotation.y = t * 0.1;

  // Orbit planets
  planets.forEach(p => {
    p.angle += p.data.speed * 0.005;
    p.mesh.position.x = Math.cos(p.angle) * p.data.orbitRadius;
    p.mesh.position.z = Math.sin(p.angle) * p.data.orbitRadius;
    p.mesh.rotation.y += 0.005; // self-rotation
  });

  // ── Raycasting for hover ──
  raycaster.setFromCamera(mouse, camera);
  const meshes = planets.map(p => p.mesh);
  const intersects = raycaster.intersectObjects(meshes);

  // Reset all planets to original color
  planets.forEach(p => {
    p.mesh.material.emissive.setHex(0x000000);
    p.mesh.material.emissiveIntensity = 0;
  });

  if (intersects.length > 0) {
    const hit = intersects[0].object;
    const found = planets.find(p => p.mesh === hit);
    if (found) {
      // Glow the hovered planet
      found.mesh.material.emissive.setHex(found.data.color);
      found.mesh.material.emissiveIntensity = 0.5;

      tooltip.textContent = found.data.label;
      tooltip.classList.remove('hidden');
      document.body.style.cursor = 'pointer';
      hoveredPlanet = found;
    }
  } else {
    tooltip.classList.add('hidden');
    document.body.style.cursor = 'default';
    hoveredPlanet = null;
  }
  updateShootingStars(); // ADD THIS LINE
  controls.update();
  renderer.render(scene, camera);
}

// ─── SHOOTING STARS ───────────────────────────────────────
// ─── SHOOTING STARS ───────────────────────────────────────
const shootingStars = [];

function createShootingStar() {
  const points = [];
  
  // Start position (wide area above the scene)
  const startX = (Math.random() - 0.5) * 400;
  const startY = Math.random() * 60 + 30;
  const startZ = (Math.random() - 0.5) * 400;

  // Trail length (10 points)
  const trailLength = 10;
  for (let i = 0; i < trailLength; i++) {
    points.push(
      new THREE.Vector3(startX + i * 3, startY + i * 1.5, startZ + i * 2)
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1.0
  });

  const star = new THREE.Line(geometry, material);
  scene.add(star);

  shootingStars.push({
    line: star,
    speed: new THREE.Vector3(
      -(Math.random() * 1.5 + 0.5),  // always moves left
      -(Math.random() * 0.8 + 0.3),  // always falls down
      -(Math.random() * 0.5)
    ),
    life: 1.0,
    decay: Math.random() * 0.01 + 0.008
  });
}

function updateShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    s.line.position.add(s.speed);
    s.life -= s.decay;
    s.line.material.opacity = Math.max(0, s.life);

    if (s.life <= 0) {
      scene.remove(s.line);
      s.line.geometry.dispose();
      s.line.material.dispose();
      shootingStars.splice(i, 1);
    }
  }
}

// Spawn one every 2 seconds
setInterval(createShootingStar, 2000);

animate();

// ─── RESIZE HANDLER ───────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ─── BACKGROUND MUSIC ─────────────────────────────────────
let musicPlaying = false;
let audioCtx = null;
let musicNode = null;

function createSpaceMusic() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Create layered tones that sound like space ambience
  const frequencies = [55, 110, 165, 220];
  
  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const panner = audioCtx.createStereoPanner();

    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Slowly drift the pitch for an eerie effect
    osc.frequency.linearRampToValueAtTime(
      freq * 1.02,
      audioCtx.currentTime + 8
    );

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(
      0.04 - i * 0.005,
      audioCtx.currentTime + 2
    );

    panner.pan.setValueAtTime((i % 2 === 0 ? -1 : 1) * 0.4, audioCtx.currentTime);

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(audioCtx.destination);
    osc.start();
  });
}

function toggleMusic() {
  const btn = document.getElementById('music-btn');

  if (!musicPlaying) {
    createSpaceMusic();
    btn.textContent = '🔊 Music';
    musicPlaying = true;
  } else {
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    btn.textContent = '🔇 Music';
    musicPlaying = false;
  }
}