window.addEventListener("load", () => {
  const host = window.location.hostname;
  const snapUrl = `http://${host}:8081`;

  document.body.innerHTML = `
    <div class="wrap">
      <header class="top">
        <div class="title">
          <div class="name">espminicam1</div>
          <div class="sub">${host}</div>
        </div>
        <div class="chip"><span class="dot" id="dot"></span><span id="txt">Starting…</span></div>
      </header>

      <section class="card">
        <div class="cardHead">
          <div>Camera</div>
          <div class="muted">snapshot :8081</div>
        </div>

        <div class="viewer">
          <img id="img" alt="camera" />
        </div>

        <div class="row">
          <button id="start" class="btn primary">Start</button>
          <button id="stop" class="btn">Stop</button>
          <a class="btn" href="${snapUrl}" target="_blank" rel="noreferrer">Open Snapshot</a>
        </div>

        <div class="hint">If you want smoother, raise FPS in ui.js.</div>
      </section>
    </div>
  `;

  const dot = document.getElementById("dot");
  const txt = document.getElementById("txt");
  const img = document.getElementById("img");

  let timer = null;
  const FPS = 6; // 6fps looks pretty “live” on a phone without crushing the ESP
  const intervalMs = Math.round(1000 / FPS);

  function setOnline(ok) {
    dot.classList.toggle("ok", ok);
    txt.textContent = ok ? `Online • ${FPS}fps` : "Offline";
  }

  function refreshFrame() {
    const url = snapUrl + `?t=${Date.now()}`;
    img.onload = () => setOnline(true);
    img.onerror = () => setOnline(false);
    img.src = url;
  }

  function start() {
    stop();
    refreshFrame();
    timer = setInterval(refreshFrame, intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  document.getElementById("start").onclick = start;
  document.getElementById("stop").onclick = stop;

  // auto start
  start();
});
