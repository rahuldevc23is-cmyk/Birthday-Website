/* ============================================================
   videos.js — Video Gallery · Memories in Motion
   ============================================================

   ✏️  HOW TO ADD VIDEOS:

   OPTION A — Local video file (.mp4):
     1. Create a folder called  videos/  next to index.html
     2. Put your .mp4 files inside it
     3. Set   src: "videos/your-video.mp4"
              type: "local"

   OPTION B — YouTube video:
     1. Open the YouTube video
     2. Click Share → Embed
     3. Copy the URL from the src="..." part of the iframe code
        It looks like:  https://www.youtube.com/embed/VIDEO_ID
     4. Set   src: "https://www.youtube.com/embed/VIDEO_ID"
              type: "youtube"

   Leave  src: ""  to show a placeholder card.
   ============================================================ */

const VIDEOS = [
  {
    title:       "Our Best Memory Together",
    description: "A moment I will never forget 💛",
    src:         "",      /* ← e.g. "videos/memory1.mp4" */
    type:        "local"  /* "local" or "youtube" */
  },
  {
    title:       "Happy Times",
    description: "When we laughed until we couldn't breathe ✨",
    src:         "",
    type:        "local"
  },
  {
    title:       "For My Angel",
    description: "A special video message, just for you 🌸",
    src:         "",
    type:        "local"
  },

  /* ── Add more videos below ── */

  // Example YouTube:
  // {
  //   title:       "Happy Birthday Song",
  //   description: "Her favourite 🎵",
  //   src:         "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   type:        "youtube"
  // },
];
