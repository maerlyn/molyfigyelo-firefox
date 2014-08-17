
var molyWatcher = {

  unreadCanvas: 0,
  textedCanvas: [],
  interval: 0,
  interval2: 0,
  hasMessage: false,
  xhr_count: false,
  xhr_messages: false,

  getUnreadCanvas: function(which) {
    var ctx = molyWatcher.unreadCanvas.getContext('2d');
    if (which == null) { which = "unread"; }
    for (var y = 0; y < molyWatcher.unreadCanvas.width; y++) {
      for (var x = 0; x < molyWatcher.unreadCanvas.height; x++) {
        if (molyWatcher.pixelMaps.icons[which][y][x]) {
          ctx.fillStyle = molyWatcher.pixelMaps.icons[which][y][x];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    return molyWatcher.unreadCanvas;
  },

  getIcon: function(which) {
    return molyWatcher.getUnreadCanvas(which).toDataURL('image/png');
  },  

  drawUnreadCount: function(unread, which) {
    if (which == null) { which = "unread"; }
  
    var iconCanvas = molyWatcher.getUnreadCanvas(which);
    var localCanvas = document.getElementById("localcanvas");
    localCanvas.height = localCanvas.width = iconCanvas.width;
    var ctx = localCanvas.getContext('2d');
    ctx.drawImage(iconCanvas, 0, 0);
    
    ctx.fillStyle = "#fef4ac";
    ctx.strokeStyle = "#dabc5c";
    ctx.strokeWidth = 1;
    
    var count = unread.length;
    
    if (count > 4) {
      unread = "1k+";
      count = unread.length;
    }
    
    var bgHeight = molyWatcher.pixelMaps.numbers[0].length;
    var bgWidth = 0;
    var padding = count < 4 ? 1 : 0;
    var topMargin = 2;
    
    for(var index = 0; index < count; index++) {
      bgWidth += molyWatcher.pixelMaps.numbers[unread[index]][0].length;
      if(index < count-1) {
        bgWidth += padding;
      }
    }
    bgWidth = bgWidth > localCanvas.width-4 ? localCanvas.width-4 : bgWidth;
    
    ctx.fillRect(localCanvas.width-bgWidth-4,topMargin,bgWidth+4,bgHeight+4);
    
    var digit;
    var digitsWidth = bgWidth;
    for(var index = 0; index < count; index++) {
      digit = unread[index];
      
      if (molyWatcher.pixelMaps.numbers[digit]) {
        var map = molyWatcher.pixelMaps.numbers[digit];
        var height = map.length;
        var width = map[0].length;
        
        ctx.fillStyle = "#2c3323";
        
        for (var y = 0; y < height; y++) {
          for (var x = 0; x < width; x++) {
            if(map[y][x]) {
              ctx.fillRect(14- digitsWidth + x, y+topMargin+2, 1, 1);
            }
          }
        }
        
        digitsWidth -= width + padding;
      }
    }  
    
    ctx.strokeRect(localCanvas.width-bgWidth-3.5,topMargin+.5,bgWidth+3,bgHeight+3);
      
    return localCanvas;
  },

  setIcon: function(icon) {
    document.getElementById("molywatcher-image").src = icon;
  },

  maxker: function(items) {
    var maxkey = null;
    for (var key in items) {
    if ((!maxkey && items[key] != -1) ||
        (maxkey && items[maxkey] < items[key])) {
      
      maxkey = key;
    }
    }
    return maxkey;
  },

  alertContents: function() {
    if (molyWatcher.xhr_count.readyState == 4 && molyWatcher.xhr_count.status == 200) {    
      if (molyWatcher.xhr_count.responseText.substring(0, 4) == "null") { //nincs bejelentkezve senki
        molyWatcher.setIcon("chrome://molywatcher/content/images/moly-inactive.png");
      }
      else 
      {
        var items = JSON.parse(molyWatcher.xhr_count.responseText);
        var tooltip = document.getElementById("molywatcher-tooltip");
        var itemtypes = { 
          "Advertisement":        "Ajánló",
          "AuthorReview":         "Alkotóértékelés",
          "BadgeOwnership":       "Kitüntetés",
          "Book":                 "Könyv", 
          "Campaign":             "Kihívás",
          "Citation":             "Idézet", 
          "Comment":              "Molyos blogbejegyzéshez hozzászólás",
          "Copy":                 "Könyvpéldány",
          "Cover":                "Borító", 
          "Description":          "Fülszöveg",
          "Edition":              "Kiadás",
          "Entry":                "Blog", 
          "Event":                "Esemény",
          "Follow":               "Figyelés",
          "Lend":                 "Kölcsönkérés",
          "Link":                 "Link",
          "LoveLetter":           "Szerelmeslevél",
          "Node":                 "Enciklopédia",
          "Poll":                 "Szavazás",
          "Post":                 "Molyos blogbejegyzés",
          "Recommendation":       "Ajánlás",
          "Reading":              "Olvasás", 
          "Report":               "Hír",
          "Review":               "Értékelés",
          "Share":                "Megosztás",
          "Sight":                "Észlelés",
          "Statement":            "Karc", 
          "SuggestionVote":       "Csoportos ajánlás",
          "Tale":                 "Polc",
          "Traveler":             "Utazókönyv",
          "Topic":                "Téma",
          "User":                 "Tag",
          "ZoneVote":             "Zóna"
        };
        
        while (tooltip.firstChild) tooltip.removeChild(tooltip.firstChild);
          
        var sum = 0;
        var key;
        while (key = molyWatcher.maxker(items)) {
          var row = document.createElement("row");
          var lbl1 = document.createElement("label");
          lbl1.setAttribute("class", "bold");
          lbl1.setAttribute("value", items[key]);
          lbl1.style.width = "15px";
          row.appendChild(lbl1);
          var lbl2 = document.createElement("label");
          lbl2.setAttribute("value", itemtypes[key]);
          row.appendChild(lbl2);
          
          sum += items[key];
          tooltip.appendChild(row);
          
          items[key] = -1;
        }
        
        if (sum == 0) {
          molyWatcher.setIcon(molyWatcher.getIcon(molyWatcher.hasMessage ? "green" : "unread"));
          document.getElementById("molywatcher-statusbarpanel").setAttribute("tooltip", "");
        } else {
          molyWatcher.setIcon(molyWatcher.drawUnreadCount(
            String(sum),
            (molyWatcher.hasMessage ? "green" : "unread")
          ).toDataURL("image/png"));
          document.getElementById("molywatcher-statusbarpanel").setAttribute("tooltip", "molywatcher-tooltip");
        }
        
      }
    }
    else if (molyWatcher.xhr_count.readyState == 4 && molyWatcher.xhr_count.status != 200) {
      molyWatcher.setIcon(molyWatcher.getUnreadCanvas("red").toDataURL('image/png'));
    }
  },
};
