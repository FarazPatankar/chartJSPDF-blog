var webpage = require('webpage');
var system  = require('system');
var input   = system.args[1];
var output  = system.args[2];
var page = webpage.create();
var capture = function (page, input, callback) {
  page.open(input, function (status) {
    console.log('Page Opened');
    var interval, allDone;
    interval = setInterval(function () {
      console.log('Waiting...');
      var allDone = page.evaluate(function () { return window.chartReady;});
      if (allDone) {
        console.log('Ready!');
        clearInterval(interval);
        callback();
      }
    }, 100);
  });
};

page.paperSize = {
  format: 'A4',
  orientation: 'portrait',
  margin: {top: '10px', right: '25px', bottom: '10px', left: '25px'},
};

page.settings.dpi = 300
page.viewportSize = {
  height: 800,
  width: 2200
}

page.zoomFactor = 4;

capture(page, input, function (err) {
    if (err) {
        console.log(err);
    } else {
        page.render(output, {format: 'pdf'});
    }
    phantom.exit();
});