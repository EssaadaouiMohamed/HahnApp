const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target: "https://localhost:7038",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
