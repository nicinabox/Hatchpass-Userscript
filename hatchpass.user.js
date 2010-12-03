// ==UserScript==
// @name          Hatchpass
// @namespace     http://nicinabox.com
// @description   Create secure passwords. Don't remember any of them.
// @include       *
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function require_jQuery() {
    if (!$) {
        document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        script.async = true;  // download in background before executing
        document.body.appendChild(script);
    }
    function wait() {
        if (!$) {
            window.setTimeout(wait, 100);
        } else { return; }
    }
    wait()
}

function addJQuery(callback) {
  if (!$) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    document.body.appendChild(script);
  }
  script.addEventListener('load', function() {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}, false);
  
}   
// the guts of this userscript
function main() {
  
  // URL vars
  var host = self.location.hostname;
  var loadUrl = "http://hatchpass.org/post.php";
  
  // Element IDs (in case they need to be tweeked later)
  var popId = "hpop";
  var contId = "hcont";
  var optId = "hoptions";

  // Options Icon
  var optIcon = "data:image/png;base64,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";
  
  // Build the html
  var cont = '<div class="'+contId+'"></div>';
  var opt = 
    '<div id="optPanel"> \
      <input type="text" placeholder="ID" value="" id="hs_id" /> <br /> \
      <input type="text" placeholder="Length" value="10" id="hs_strlen" /> <br /> \
      <input type="checkbox" id="hs_symbols" checked/> <label for="hs_symbols">Symbols</label> <br /> \
      <input type="checkbox" id="hs_caps" checked/> <label for="hs_caps">Caps</label> <br /> \
      <input type="radio" name="alt" id="hs_default" checked/> <label for="hs_default">Default</label> \
      <input type="radio" name="alt" id="hs_legacy" /> <label for="hs_legacy">Legacy</label> \
    </div>';
  var pop = 
    '<div class="'+popId+'"> \
      <input type="password" id="pop_master" /> \
      <a id="'+optId+'" href="#"> \
      <img style="margin-bottom: -1px" src="'+optIcon+'" alt="Settings"/></a>'+opt+' \
    </div>';
  
  // Insert Into page
  var $pw = $("input[type='password']");
  $pw.wrap(cont);
  $("."+contId).append(pop);
  
  // Load ID
  var db = openDatabase('hatchdb', '1.0', 'HatchPass Database', 20000);
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM settings', [], function (tx, results) {
      var url = results.rows.urlId;
//      console.log(url);
      console.log(results);
    });
  });
  
  var hs_id = localStorage.getItem("hs_id"); 
  $('#hs_id').val(hs_id);
  
  // Some shortcuts for later
  var $p = $("."+popId);
  var $pi = $("."+popId+" input");
  var $c = $("."+contId);
  var $o = $("#"+optId);
  var $op = $("#optPanel");
  
  // Widths
  var popWidth = $p.width($pi.width()+27+"px");
  
  // CSS  
  $c.css({
    position: 'relative',
    display: 'inline'
    });
  $op.css({
    display: 'none',
    "font-family": 'arial',
    "font-size": '13px',
    color: '#444'
    });
  $p.css({
    position: 'absolute',
    display: 'none',
    'z-index': '9999',
    top: '-18px',
    left: '-10px',
    padding: '10px',
    'min-width': '165px',
    '-webkit-border-radius': '3px',
    '-moz-border-radius': '3px',
    '-webkit-box-shadow': '0 0 3px #222',
    '-moz-box-shadow': '0 0 3px #222',
    });
  $('.hpop').css({
    background: '-webkit-gradient(linear, left top, left bottom, from(#efefef), to(#ddd))', 
  //  background: '-moz-linear-gradient( top, #efefef, #ddd )'
  });  
  $("."+popId+" input").css({
    'min-width': '152px'
  });
  $("."+popId+" a").css({
    background: "none", 
    display: "inline",
    });  
    
  // Options panel
  $o.click(function() {
    $('#optPanel').slideToggle('fast');
    // $(this).children('img').toggle(function() {
    //   $(this).css({'-webkit-transform': 'rotate(90deg);'});
    // }, function() {
    //   $(this).css({'-webkit-transform': 'rotate(0deg)'});
    // });
    
  });

  // Save some settings 
  $("#hs_id").change(function() {
    var itemVal = $(this).val();
    var itemId = $(this).attr('id');
    
    if (itemVal !== "") {
      // set in local storage (temp)
      localStorage.setItem(itemId, itemVal);
      
      var master = $('#master').val();
      
      $.post(loadUrl,{str: master, action: "hashString"},
       function(hash){
         db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS settings (urlId VARCHAR, hash VARCHAR)');
            tx.executeSql('INSERT INTO settings (urlId, hash) VALUES (?, ?)', [itemVal, hash], function (tx, result){
              console.log(result);
            });
          });
      });
      
    } else {
      $.post(loadUrl,{str: master, action: "hashString"},
       function(hash){
         db.transaction(function (tx) {
            tx.executeSql('DELETE FROM settings WHERE hash = "'+hash+'"');
          });
      });      
    }
  });
  
  // Activate the popup
  $pw.dblclick(function(){
    $p.fadeIn('fast');
    $pi.select().focus();
  });
  
  // Get submit
  $pi.keypress(function(e){
    if(e.keyCode == 13) { // Enter key
      var master = $(this).val();
      // TODO: settings load
      var mySettings = {
        "id"      : $('#hs_id').val(),
        "symbols"	: "1",
   			"caps"		: "1",
   			"strlen"	: $('#hs_strlen').val(),
   			"h_algorithm"	: "default"
      };
            // 
            // if (mySettings == "" || !mySettings) {
            //   var mySettings = {
            //            "id"    : hs_id,
            //            "symbols" : "1",
            //            "caps"    : "1",
            //            "strlen"  : "10",
            //            "h_algorithm" : "default"
            //          }
            // }
      // FIXME: needs to use GET
      $.post(loadUrl,{
				master: master, 
				host: host,
				settings: mySettings,
				action: "makeHash"
			},
         function(data){
           $pw.val(data);
           console.log(data);
         });
      $p.fadeOut('fast');
    }
  });
  
  // Close/cancel the popup
  $(document).click(function() {
    $p.fadeOut('fast');
  });

  $c.click(function(event){
    event.stopPropagation();
  });
  
}
addJQuery(main);