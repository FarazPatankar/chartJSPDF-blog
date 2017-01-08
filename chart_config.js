window.devicePixelRatio = 4
var chartReady = false
var percentageCanvas = document.getElementById("percentageChart");
percentageCanvas.percentageValues = true;
var percentageChart = new Chart(percentageCanvas, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        animation: {
          onComplete: function () {
            drawBarValues(this)
            chartReady = true
          }
        },
        hover: { animationDuration: 0 },
        title: {
          display: true,
          text: 'Percentage Chart',
          fontSize: 20
        }
    }
});

var drawBarValues = function(el) {
    var ctx;
    ctx = el.chart.ctx;
    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
    ctx.fillStyle = el.chart.config.options.defaultFontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    el.data.datasets.forEach(function(dataset) {
    var i, model, originalValue;
    i = 0;
    while (i < dataset.data.length) {
        if (dataset.hidden === true && dataset._meta[Object.keys(dataset._meta)[0]].hidden !== false) {
      i++;
      continue;
        }
        model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
    if (ctx.canvas.percentageValues == true){
      ctx.fillText(dataset.data[i] + '%', model.x - 1, model.y - 5);
    } else {
      ctx.fillText(dataset.data[i], model.x - 1, model.y - 5);
    }
        i++;
    }
    });
};