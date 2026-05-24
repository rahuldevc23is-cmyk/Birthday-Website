# 🎂 Lakshmishree B K — Birthday Website
### Glamorous Gold Edition 👑

---

## 📁 File Structure — What Each File Does

```
lacchi-birthday/
│
├── index.html              ← Open this in a browser to view the website
│
├── css/
│   └── style.css           ← All colours, fonts, animations & layout
│
├── js/
│   ├── letter.js           ← 💌 Edit the birthday letter for Angel
│   ├── wishes.js           ← 🌸 Edit / add birthday wish cards
│   ├── timeline.js         ← ⭐ Edit / add "Through the Years" memories
│   ├── photos.js           ← 📸 Add paths to Lacchi's photos
│   ├── videos.js           ← 🎬 Add paths to videos / YouTube links
│   ├── music.js            ← 🎵 Set path to her favourite song
│   └── app.js              ← ⚙️  Engine — you do NOT need to edit this
│
├── photos/                 ← CREATE this folder, put her photos here
├── music/                  ← CREATE this folder, put her .mp3 here
├── videos/                 ← CREATE this folder, put her .mp4 here
│
└── README.md               ← This file
```

---

## 🚀 How to Open

1. Download / extract all files keeping the folder structure intact
2. Open **index.html** in Chrome, Safari, Firefox or Edge
3. The website loads instantly — no internet needed (fonts need internet)

---

## ✏️ How to Edit Each Section

### 💌 Letter for Angel  →  `js/letter.js`
Open the file and change:
- `greeting` — the opening line
- `body`     — the full letter (use `\n\n` for a new paragraph)
- `sign`     — how you sign off

---

### 🌸 Birthday Wishes  →  `js/wishes.js`
Each wish card looks like:
```js
{
  name: "From the Heart",
  text: "Your message here..."
},
```
Copy and paste a block to add more cards. The grid expands automatically.

---

### ⭐ Through the Years  →  `js/timeline.js`
Each memory card:
```js
{
  label: "✦ 2024",
  title: "Our Best Day 🌸",
  text:  "A short description of this memory."
},
```
Cards alternate left / right automatically on desktop.

---

### 📸 Photos  →  `js/photos.js`
1. Create a folder called `photos/` next to `index.html`
2. Copy Lacchi's photos into it (`.jpg` `.jpeg` `.png` `.webp` all work)
3. Open `js/photos.js` and fill in the `src` field:
```js
{ src: "photos/lacchi1.jpg", caption: "My Angel 💛" },
```
You can also **tap any empty photo card** directly in the browser
to upload a photo on the spot without editing any file.

---

### 🎬 Videos  →  `js/videos.js`
**Local video (.mp4):**
1. Create a folder `videos/` next to `index.html`
2. Put your `.mp4` files inside
3. Set `src: "videos/memory.mp4"` and `type: "local"`

**YouTube video:**
1. Go to the YouTube video → Share → Embed
2. Copy the URL from `src="..."` in the embed code
3. Set `src: "https://www.youtube.com/embed/VIDEO_ID"` and `type: "youtube"`

---

### 🎵 Music  →  `js/music.js`
1. Create a folder `music/` next to `index.html`
2. Put her favourite `.mp3` inside
3. Open `js/music.js` and set:
```js
src: "music/favourite.mp3"
```
Guests tap the **"Play music"** pill at the top to start/stop.

---

### 🎨 Colours & Fonts  →  `css/style.css`
At the top of the file, find `:root { ... }` — change the colour values there:
```css
:root {
  --gold:  #c9a84c;   /* main gold  */
  --rose:  #d4527a;   /* pink/rose  */
  --ink:   #030108;   /* background */
}
```

---

## 🌐 Website Sections (in order)

| Scene | Section |
|-------|---------|
| S1 | Floating envelope — tap to open |
| S2 | Name reveal animation |
| S3 | Surprise countdown |
| S4 | Interactive birthday cake — tap to blow candles |
| S5 | Photo gallery slideshow |
| S6 | Video gallery |
| S7 | Birthday wishes |
| S8 | Letter for Angel (parchment paper) |
| S9 | Through the Years — memories timeline |
| S10 | Finale — fireworks + name particle explosion |

---

Made with love for **Lakshmishree B K** — our Lacchi, our Angel 💛👑
