window.dragdrop = (function() {
  function buildOptions(options, defaults) {
    for(var property in defaults) {
      if(!options[property]) {
        options[property] = defaults[property];
      }
    }
  }

  function randHex(max) {
    max = max || parseInt("FFFFFF", 16);
    var hexVal = parseInt(Math.random() * max + 1).toString(16);
    while(hexVal.length < 6) {
      hexVal = "0" + hexVal;
    }
    return "#" + hexVal;
  }

  return {
    create: function(containerId, options) {
      options = options || {};

      var defaults = {
        numSquares: 1,
        squareSize: 100,
        squareColors: ["gray"],
        showNumbering: false,
        randomColors: null,
        border: { size: 0, format: "solid", color: "black" }
      };

      buildOptions(options, defaults);
      buildOptions(options.border, defaults.border);

      if(options.randomColors) {
        var hexMax = parseInt("FFFFFF", 16);

        var colors = [];
        for(var i = 0; i < options.randomColors; i++) {
          colors.push(randHex(hexMax));
        }

        options.squareColors = colors;
      }

      var container = document.getElementById(containerId);
      container.style.position = "relative";
      container.style.overflow = "hidden";

      var dragItem = null;
      var initialLeft;
      var initialTop;
      var initialClientX;
      var initialClientY;
      var currentHighIndex = 1;

      var squareStyles = {
        border: options.border.size + "px " + options.border.format + " " + options.border.color,
        fontSize: options.squareSize / 2 + "px",
        height: options.squareSize - options.border.size + "px",
        width: options.squareSize - options.border.size + "px"
      };

      var squaresPerRow = parseInt(container.offsetWidth / options.squareSize);
      var col = 0;
      var row = 0;

      for(var i = 0; i < options.numSquares; i++) {
        var newSquare = document.createElement("div");
        newSquare.className = "dragdrop square";

        squareStyles.left = col * options.squareSize + "px";
        squareStyles.top = row * options.squareSize + "px";

        col++;
        if (col >= squaresPerRow) {
            col = 0;
            row++;
        }

        if(options.squareColors.length > 0) {
          squareStyles.backgroundColor = options.squareColors[i % options.squareColors.length];
        }

        for(var property in squareStyles) {
          newSquare.style[property] = squareStyles[property];
        }

        newSquare.onmousedown = function(e) {
          dragItem = this;
          dragItem.style.zIndex = currentHighIndex;
          currentHighIndex++;
          initialTop = dragItem.offsetTop;
          initialLeft = dragItem.offsetLeft;
          initialClientY = e.clientY;
          initialClientX = e.clientX;
        };

        newSquare.onmouseup = function(e) {
          dragItem = null;
        };

        if(options.showNumbering) {
          var divLabel = document.createElement("span");
          divLabel.style.lineHeight = options.squareSize + "px";
          divLabel.innerText = i + 1;
          newSquare.appendChild(divLabel);
        }

        container.appendChild(newSquare);
      }

      container.onmousemove = function(e) {
        if(dragItem) {
          dragItem.style.top = initialTop + e.clientY - initialClientY + "px";
          dragItem.style.left = initialLeft + e.clientX - initialClientX + "px";
        }
      };

      container.onmouseup = function(e) {
        dragItem = null;
      };
    }
  };
})();
