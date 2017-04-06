var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log("[PAGE CONSOLE] " + msg);
}

page.onError = function (msg, trace) {
  console.log("[ERROR] " + msg);
  trace.forEach(function(item) {
    console.log('[TRACER]  ', item.file, ':', item.line);
  });
};

page.open('http://localhost:8000/socket_test.html', function(status) {
  console.log("Page opened. Status: " + status);

  window.setTimeout(function () {
    page.render('example.png');
    page.evaluate(function() {
      websocket.send('Sent from phantomJS');
    });
  }, 1000);

  window.setTimeout(function () {
    console.log('Exiting...')
    phantom.exit();
  }, 2000);
});
