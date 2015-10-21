Pebble.addEventListener("ready",
  function(e) {
    console.log("PebbleKit JS ready!");
  }
);

Pebble.addEventListener("showConfiguration",
  function(e) {
    //Load the remote config page
    //Pebble.openURL("https://dl.dropboxusercontent.com/u/10824180/pebble%20config%20pages/sdktut9-config.html");
    //Embedded entire HTML page above into URL below:
    Pebble.openURL("data:text/html," + encodeURIComponent(
        '<!DOCTYPE html><html>' +
        '<head><title>SDKTut9 Configuration</title></head>'+
        '<body>'+
          '<h1>Pebble Config Tutorial</h1>'+
          '<p>Choose watchapp settings</p>'+

          '<p>Invert watchapp:'+
          '<select id="invert_select">'+
            '<option value="off">Off</option>'+
            '<option value="on">On</option>'+
          '</select>'+
          '</p>'+

          '<p><button id="save_button">Save</button></p>'+

          '<script>'+
            //Setup to allow easy adding more options later
            'function saveOptions() {'+
              'var invertSelect = document.getElementById("invert_select");'+
              'var options = {"invert": invertSelect.options[invertSelect.selectedIndex].value};'+
              'return options;'+
            '};'+
            'var submitButton = document.getElementById("save_button");'+
            'submitButton.addEventListener("click", '+
              'function() {'+
                'console.log("Submit");'+
                'var options = saveOptions();'+
                'var location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(options));'+
                'document.location = location;'+
              '}, '+
            'false);'+
          '</script>'+
        '</body></html><!--.html'
      )
    );
  }
);

Pebble.addEventListener("webviewclosed",
  function(e) {
    //Get JSON dictionary
    var configuration = JSON.parse(decodeURIComponent(e.response));
    console.log("Configuration window returned: " + JSON.stringify(configuration));

    //Send to Pebble, persist there
    Pebble.sendAppMessage(
      {"KEY_INVERT": configuration.invert},
      function(e) {
        console.log("Sending settings data...");
      },
      function(e) {
        console.log("Settings feedback failed!");
      }
    );
  }
);
