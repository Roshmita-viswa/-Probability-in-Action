
let coinScore = { heads: 0, tails: 0 };
let coinHistory = [];
let diceHistory = [];
let diceCounts = [0, 0, 0, 0, 0, 0];

const coinChart = new Chart(document.getElementById('coinChart'), {
  type: 'bar',
  data: {
    labels: ['Heads', 'Tails'],
    datasets: [{
      label: 'Results',
      data: [0, 0],
      backgroundColor: ['green', 'yellow']
    }]
  }
});

const diceChart = new Chart(document.getElementById('diceChart'), {
  type: 'bar',
  data: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [{
      label: 'Results',
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: 'skyblue'
    }]
  }
});

function tossCoin() {
  const result = Math.random() < 0.5 ? 'heads' : 'tails';
  coinScore[result]++;
  coinHistory.unshift(result);
  coinHistory = coinHistory.slice(0, 5);

  document.getElementById('coinScore').innerText = `Heads: ${coinScore.heads} | Tails: ${coinScore.tails}`;
  updateList('coinHistory', coinHistory);
  updateCoinChart();
  document.getElementById('dingSound').play();
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceHistory.unshift(roll);
  diceHistory = diceHistory.slice(0, 5);
  diceCounts[roll - 1]++;

  updateList('diceHistory', diceHistory);
  updateDiceChart();
  document.getElementById('dingSound').play();
}

function updateList(id, history) {
  const list = document.getElementById(id);
  list.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    list.appendChild(li);
  });
}

function updateCoinChart() {
  coinChart.data.datasets[0].data = [coinScore.heads, coinScore.tails];
  coinChart.update();
}

function updateDiceChart() {
  diceChart.data.datasets[0].data = diceCounts;
  diceChart.update();
}

function resetCoin() {
  coinScore = { heads: 0, tails: 0 };
  coinHistory = [];
  updateList('coinHistory', []);
  updateCoinChart();
  document.getElementById('coinScore').innerText = "Heads: 0 | Tails: 0";
}

function resetDice() {
  diceCounts = [0, 0, 0, 0, 0, 0];
  diceHistory = [];
  updateList('diceHistory', []);
  updateDiceChart();
}
