(() => {
  const host = window.location.hostname;          // espminicam1.local or IP
  const streamUrl = `http://${host}:8080`;
  const snapUrl   = `http://${host}:8081`;

  document.body.innerHTML = `
    <div class="wrap">
      <header class="top">
        <div class="title">
          <div class="name">ESPminiCam1</div>
          <div class="sub">${host}</div>
        </div>
        <div class="chip"><span class="dot" id="dot"></span><span id="txt">Checking…</span></div>
      </header>

      <section class="card">
        <div class="cardHead">
          <div>Live Camera</div>
          <div class="muted">stream :8080</div>
        </div>

        <div class="viewer" id="viewer">
          <iframe id="frame" src="${streamUrl}" title="stream"></iframe>
        </div>

        <div class="row">
          <button id="reload" class="btn primary">Reload</button>
          <a class="btn" href="${
