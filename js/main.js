if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("serviceworker.js");
}

window.addEventListener("orientationchange", () => {
  location.reload();
});
