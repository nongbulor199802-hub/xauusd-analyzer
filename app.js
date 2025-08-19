async function fetchData() {
  try {
    let response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/XAUUSD=X?interval=1m&range=1d");
    let data = await response.json();

    let timestamps = data.chart.result[0].timestamp;
    let prices = data.chart.result[0].indicators.quote[0].close;

    let labels = timestamps.map(ts => new Date(ts * 1000).toLocaleTimeString());
    let lastPrice = prices[prices.length - 1];

    // Chart update
    if (window.myChart) {
      window.myChart.data.labels = labels;
      window.myChart.data.datasets[0].data = prices;
      window.myChart.update();
    } else {
      const ctx = document.getElementById("priceChart").getContext("2d");
      window.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "XAUUSD Price",
            data: prices,
            borderColor: "gold",
            borderWidth: 2,
            fill: false
          }]
        }
      });
    }

    // Analysis (simple dummy ICT + Quarterly example)
    let entry = lastPrice * 0.995;
    let sl = lastPrice * 0.99;
    let tp = lastPrice * 1.01;
    let accuracy = (Math.random() * (95 - 70) + 70).toFixed(2);

    document.getElementById("analysis").innerHTML = `
      <h2>Analysis Result</h2>
      <p>Last Price: <b>${lastPrice.toFixed(2)}</b></p>
      <p>Entry: ${entry.toFixed(2)}</p>
      <p>Stop Loss: ${sl.toFixed(2)}</p>
      <p>Take Profit: ${tp.toFixed(2)}</p>
      <p>Estimated Accuracy: ${accuracy}%</p>
    `;

  } catch (err) {
    console.error("Error fetching data", err);
  }
}

// Refresh every 10 seconds
fetchData();
setInterval(fetchData, 10000);
