// TradingView Chart
new TradingView.widget({
  "width": "100%",
  "height": 500,
  "symbol": "OANDA:XAUUSD",
  "interval": "60",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "allow_symbol_change": true,
  "container_id": "tradingview_chart"
});

// Dummy Data Analysis (ICT + Quarterly Concept)
const prices = [1900, 1910, 1925, 1915, 1930, 1940, 1920, 1950];
const labels = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];

// Example analysis: support, resistance, TP, SL
const support = Math.min(...prices);
const resistance = Math.max(...prices);
const entry = (support + resistance) / 2;
const sl = support - 10;
const tp = resistance + 10;

// Chart
const ctx = document.getElementById("analysisChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "XAUUSD Price",
      data: prices,
      borderColor: "gold",
      backgroundColor: "rgba(255,215,0,0.2)",
      fill: true,
      tension: 0.3
    }]
  }
});

// Show Analysis Result
document.getElementById("analysisResult").innerHTML = `
  <h2>Trading Analysis Result</h2>
  <p><b>Support:</b> ${support}</p>
  <p><b>Resistance:</b> ${resistance}</p>
  <p><b>Entry:</b> ${entry.toFixed(2)}</p>
  <p><b>Stop Loss:</b> ${sl}</p>
  <p><b>Take Profit:</b> ${tp}</p>
`;