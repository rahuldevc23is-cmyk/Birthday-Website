// ============================================
//  music.js — Music Playlist Configuration
//  For Lakshmishree B K (Lacchi / Angel) 💛
// ============================================

// 🎵 HOW TO ADD MUSIC:
// Option A — Local files:
//   1. Create a folder called "music" next to index.html
//   2. Put your .mp3 files inside
//   3. Set  src: "music/song-name.mp3"
//
// Option B — Online URL:
//   Set  src: "https://..."  (must be a direct .mp3 link)
//
// Leave src as "" to show a placeholder card.

const PLAYLIST = [
  {
    title: "Lacchi's Favourite Song",
    artist: "Add artist name",
    src: "",        // e.g. "music/fav-song.mp3"
    duration: "3:45"
  },
  {
    title: "Her Happy Song",
    artist: "Add artist name",
    src: "",
    duration: "4:02"
  },
  {
    title: "That Song She Always Hums",
    artist: "Add artist name",
    src: "",
    duration: "3:28"
  },
  {
    title: "Birthday Anthem",
    artist: "Add artist name",
    src: "",
    duration: "3:55"
  },
  {
    title: "Angel's Melody",
    artist: "Add artist name",
    src: "",
    duration: "4:15"
  },

  // ── Add more songs here ──
];

// Export
window.PLAYLIST = PLAYLIST;
