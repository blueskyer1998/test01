const btn = document.getElementById('fish-btn');
const countSpan = document.getElementById('count');
const audio = document.getElementById('fish-sound');

let count = 0;                   // 功德計數

btn.addEventListener('click', () => {
  count++;
  countSpan.textContent = count.toLocaleString('en-US');

  // 若有 MP3 就播放；否則用 Web Audio 合成簡易敲擊聲
  if (audio && audio.readyState >= 2) {
    audio.currentTime = 0;
    audio.play().catch(()=>{});
  } else {
    playSynth();
  }
});

function playSynth() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.value = 450;                 // 頻率可自行調

  gain.gain.setValueAtTime(1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}
