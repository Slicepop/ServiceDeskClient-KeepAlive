const triggered = localStorage.getItem("keepingAlive");
console.log(triggered);
if (!triggered || triggered == "false") {
  localStorage.setItem("keepingAlive", true);
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("keepingAlive", false);
  });
  const uselessRequest = async () => {
    try {
      await fetch("https://support.wmed.edu/LiveTime/services/v1/me", {
        headers: {
          accept: "application/json, text/plain, */*",
          "zsd-source": "LT",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      return;
    }

    console.log("Keeping Service Desk alive");

    setTimeout(uselessRequest, 60000);
  };
  uselessRequest();
}
// 600000 ms = 10 mins
