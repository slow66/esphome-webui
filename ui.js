window.addEventListener("load", () => {
  document.body.innerHTML = `
    <div style="padding:24px;font-family:system-ui;color:white">
      <h1>Custom UI is running ✅</h1>
      <p>Host: ${location.hostname}</p>
    </div>
  `;
});
