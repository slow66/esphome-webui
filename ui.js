(function () {
  const host = window.location.hostname;
  const streamUrl = "http://" + host + ":8080";
  const snapUrl = "http://" + host + ":8081";

  function inject() {
    if (document.getElementById("minicam-launcher")) return;

    const panel = document.createElement("div");
    panel.id = "minicam-launcher";

    panel.innerHTML =
      '<div class="mc-wrap">' +
        '<div class="mc-top">' +
          '<div>' +
            '<div class="mc-title">ESPminiCam1</div>' +
            '<div class="mc-sub">' + host + '</div>' +
          '</div>' +
          '<div class="mc-pill"><span class="mc-dot" id="mc-dot"></span><span id="mc-status">Checking…</span></div>' +
        '</div>' +

        '<div class="mc-card">' +
          '<div class="mc-cardhead">' +
            '<span>Camera</span>' +
            '<span class="mc-muted">Ports 8080 / 8081</span>' +
          '</div>' +

          // Preview (snapshot refresh)
          '<div class="mc-preview">' +
            '<img id="mc-preview-img" alt="preview" />' +
          '</div>' +

          '<div class="mc-row">' +
            '<a class="mc-btn mc-primary" href="' + streamUrl + '">Open Live Stream</a>' +
            '<a class="mc-btn" href="' + snapUrl + '">Open Snapshot</a>' +
          '</div>' +

          '<div class="mc-row">' +
            '<button class="mc-btn" id="mc-fullscreen">Fullscreen Stream</button>' +
            '<button class="mc-btn" id="mc-refresh">Refresh Preview</button>' +
          '</div>' +

          '<div class="mc-hint">Tip: Add this page to your phone’s Home Screen.</div>' +
        '</div>' +
      '</div>';

    document.body.prepend(panel);
    document.body.classList.add("mc-skin");

    // Wire buttons
    const btnFull = document.getElementById("mc-fullscreen");
    const btnRef = document.getElementById("mc-refresh");
    const img = document.getElementById("mc-preview-img");
    const dot = document.getElementById("mc-dot");
    const status = document.getElementById("mc-status");

    function setOnline(ok) {
      dot.classList.toggle("ok", ok);
      status.textContent = ok ? "Online" : "Offline";
    }

    // Snapshot preview loop (looks “live” without iframe issues)
    let timer = null;
    const FPS = 2; // bump to 4-6 if you want smoother preview
    const intervalMs = Math.round(1000 / FPS);

    function loadSnapshot() {
      const url = snapUrl + "?t=" + Date.now();
      img.onload = function () { setOnline(true); };
      img.onerror = function () { setOnline(false); };
      img.src = url;
    }

    function startPreview() {
      stopPreview();
      loadSnapshot();
      timer = setInterval(loadSnapshot, intervalMs);
    }

    function stopPreview() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    // Fullscreen stream in same tab
    btnFull.onclick = function () {
      const w = window.open(streamUrl, "_self");
      // _self navigation; w is usually null, but it navigates
    };

    btnRef.onclick = function () {
      loadSnapshot();
    };

    // Start preview automatically
    startPreview();

    // Pause preview when tab not visible
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopPreview();
      else startPreview();
    });
  }

  function start() {
    inject();
    setTimeout(inject, 500);
    setTimeout(inject, 1500);
    setTimeout(inject, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
