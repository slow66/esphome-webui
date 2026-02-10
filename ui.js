(function () {
  const host = window.location.hostname;
  const streamUrl = `http://${host}:8080`;
  const snapUrl = `http://${host}:8081`;

  function inject() {
    // Avoid double-inject
    if (document.getElementById("minicam-launcher")) return;

    const panel = document.createElement("div");
    panel.id = "minicam-launcher";
    panel.innerHTML = `
      <div class="mc-wrap">
        <div class="mc-top">
          <div>
            <div class="mc-title">ESPminiCam1</div>
            <div class="mc-sub">${host}</div>
          </div>
          <div class="mc-pill"><span class="mc-dot" id="mc-dot"></span><span id="mc-status">Checking…</span></div>
        </div>

        <div class="mc-card">
          <div class="mc-cardhead">
            <span>Camera</span>
            <span class="mc-muted">Ports 8080 / 8081</span>
          </div>

          <div class="mc-row">
            <a class="mc-btn mc-primary" href="${streamUrl}" target="_blank" rel="noreferrer noopener">Open Live Stream</a>
            <a class="mc-btn" href="${snapUrl}" target="_blank" rel="noreferrer noopener">Open Snapshot</a>
          </div>

          <div class="mc-hint">
            Tip: Add this page to your phone’s Home Screen.
          </div>
        </div>
      </div>
    `;

    // Put our launcher at the top of the page
    document.body.prepend(panel);

    // Optional: hide ESPHome sections below (CSS also helps)
    document.body.classList.add("mc-skin");

    // Online check (snapshot is lightweight)
    const dot = document.getElementById("mc-dot");
    const status = document.getElementById("mc-status");

    async function ping() {
      try {
        await fetch(`${snapUrl}?t=${Date.now()}`, { mode: "no-cors", cache: "no-store" });
        dot.classList.add("ok");
        status.textContent = "Online";
      } catch (e) {
        dot.classList.remove("ok");
        status.textContent = "Offline";
      }
    }

    ping();
    setInterval(ping, 5000);
  }

  // Run a few times because ESPHome v2 UI can render after DOMContentLoaded
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
