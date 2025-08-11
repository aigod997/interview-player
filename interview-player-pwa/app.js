// Simple PWA audio player template
const tracks = [
  { title: "Pitt 01 (placeholder)", src: "audio/pitt01.wav" },
  { title: "Pitt 02 (placeholder)", src: "audio/pitt02.wav" }
];

const audio = document.getElementById("audio");
const list  = document.getElementById("playlist");
let index = 0;

function load(i){
  index = (i + tracks.length) % tracks.length;
  audio.src = tracks[index].src;
  audio.play().catch(()=>{});
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: tracks[index].title,
      artist: "Interview",
      album: "PWA",
      artwork: [{ src: "icons/icon-192.png", sizes: "192x192", type: "image/png" }]
    });
  }
}

tracks.forEach((t,i)=>{
  const li = document.createElement("li");
  li.textContent = t.title;
  li.onclick = ()=>load(i);
  list.appendChild(li);
});

document.getElementById("play").onclick = ()=> audio.paused ? audio.play() : audio.pause();
document.getElementById("prev").onclick = ()=> load(index-1);
document.getElementById("next").onclick = ()=> load(index+1);

if ("mediaSession" in navigator) {
  navigator.mediaSession.setActionHandler("previoustrack", ()=> load(index-1));
  navigator.mediaSession.setActionHandler("nexttrack", ()=> load(index+1));
  navigator.mediaSession.setActionHandler("play", ()=> audio.play());
  navigator.mediaSession.setActionHandler("pause", ()=> audio.pause());
}

// Register the service worker (enables offline + installability)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

load(0);