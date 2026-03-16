# 🌌 Space Portfolio

An interactive 3D space-themed portfolio website built with **Three.js**. Showcase your skills, projects, and experience through an immersive planetary experience.

## ✨ Features

- **3D Space Environment** – Fully interactive 3D scene with orbiting planets
- **Interactive Planets** – Click on planets to view different sections (About, Skills, Projects, Experience, Contact)
- **Smooth Animations** – Camera transitions, planet rotations, shooting stars, and smooth orbit controls
- **Responsive Design** – Works seamlessly on desktop browsers
- **Ambient Music** – Toggle background space ambient music
- **Custom Styling** – Glassmorphism design with blue/cyan color scheme
- **OrbitControls** – Drag to rotate, scroll to zoom
- **Nebula Clouds** – Beautiful gradient nebula backgrounds

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser
3. **Interact** with the planets by hovering and clicking

No build process or installation needed – everything runs in the browser!

## 📖 How It Works

### Planets
Each planet represents a different section of your portfolio:

| Planet | Section | Color |
|--------|---------|-------|
| Mercury | About Me | Light Blue |
| Venus | Skills | Golden |
| Earth | Projects | Blue |
| Mars | Experience | Red |
| Saturn | Contact | Tan |

### Controls
- **Hover** over planets to see labels
- **Click** a planet to view its content
- **Drag** to rotate the camera
- **Scroll** to zoom in/out
- **Music button** (bottom-right) to toggle ambient music

## 🎨 Customization

### Edit Your Information
Open `script.js` and find the `planetData` array (around line 140). Modify:

```javascript
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
      <p>Your content here...</p>
    `
  },
  // ... more planets
];
```

### Customize Colors
- **Planet colors** – Change the `color` hex values in `planetData`
- **Text colors** – Edit `style.css` for color schemes
- **Nebula colors** – Modify the `createNebula()` calls in `script.js`

### Change Resume Link
In `index.html`, update:
```html
<a id="resume-btn" href="your-resume.pdf" download>⬇ Resume</a>
```

### Update Social Links
In the Contact planet's content, replace links with your actual profiles.

## 🛠️ Technology Stack

- **Three.js r128** – 3D rendering library
- **OrbitControls** – Camera controls
- **HTML5** – Structure
- **CSS3** – Styling (with backdrop-filter, gradients)
- **JavaScript** – Logic and interactivity

## 📁 File Structure

```
space-portfolio/
├── index.html       # Main HTML file
├── style.css        # Styling and animations
├── script.js        # Three.js scene and logic
├── assets/
│   └── textures/    # Texture files (optional)
└── README.md        # This file
```

## 🌐 Browser Support

Works best on modern browsers supporting:
- WebGL
- CSS Grid & Flexbox
- Backdrop-filter
- ES6+ JavaScript

**Tested on:** Chrome, Firefox, Edge, Safari (latest versions)

## 🎵 Audio

The portfolio uses a free ambient space track from **Pixabay**. You can:
- Replace the URL in `script.js` (line 470) with your own audio
- Keep it as-is for the default atmosphere

## ✅ Tips for Best Results

1. **Customize the intro text** – Replace "YOUR NAME" in `index.html`
2. **Add real links** – Update GitHub, LinkedIn, and email links
3. **Test on different devices** – Chrome DevTools mobile view
4. **Adjust planet speeds** – Lower speeds = slower orbits (more stable)
5. **Optimize performance** – Reduce star count if running slowly

## 🐛 Troubleshooting

**Planets not showing?**
- Check browser console for errors (F12 → Console)
- Ensure JavaScript is enabled

**Can't interact with planets?**
- Clear cache (Ctrl+Shift+Delete) and reload
- Try a different browser

**Performance issues?**
- Reduce star count in `createStars()` function
- Close other tabs
- Update graphics drivers

## 📝 License

Feel free to use and modify this template for your own portfolio!

## 👨‍💻 Made with ❤️

Built with Three.js and a passion for interactive web experiences.

---

**Happy coding! 🚀**
