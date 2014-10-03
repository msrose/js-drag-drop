window.dragdrop = (function() {
  return {
    create: function(containerId, options) {
      options = options || {};

      var defaults = {
        numSquares: 1,
        squareSize: 100,
        backgroundColor: "white",
        squareColors: ["black"],
        showNumbering: false
      };

      for(var property in defaults) {
        if(!options[property]) {
          options[property] = defaults[property];
        }
      }

      if(options.randomColors) {
        var hexMax = parseInt("FFFFFF", 16);
        var randHex = function() {
            return "#" + parseInt(Math.random() * hexMax).toString(16)
        }

        var colors = [];
        for(var i = 0; i < options.randomColors; i++) {
          colors.push(randHex());
        }

        options.squareColors = colors;
      }

      var container = document.getElementById(containerId);
      container.style.height = screen.height + "px";
      container.style.width = screen.width + "px";
      container.style.backgroundColor = options.backgroundColor;

      var dragItem;
      var initialLeft;
      var initialTop;
      var initialClientX;
      var initialClientY;
      var currentHighIndex = 1;

      var squareStyles = {
        border: "1px solid black",
        position: "absolute",
        cursor: "move",
        textAlign: "center",
        fontSize: options.squareSize / 2 + "px",
        fontFamily: "sans-serif",
        height: options.squareSize - 2 + "px",
        width: options.squareSize - 2 + "px"
      };

      var squaresPerRow = parseInt(container.offsetWidth / options.squareSize);
      var col = 0;
      var row = 0;

      for(var i = 0; i < options.numSquares; i++) {
        var newSquare = document.createElement("div");

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
          initialTop = dragItem.offsetTop;
          initialLeft = dragItem.offsetLeft;
          initialClientY = e.clientY;
          initialClientX = e.clientX;
        };

        newSquare.onmouseup = function(e) {
          currentHighIndex++;
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

      window.onmousemove = function(e) {
        if(dragItem) {
          dragItem.style.top = initialTop + e.clientY - initialClientY + "px";
          dragItem.style.left = initialLeft + e.clientX - initialClientX + "px";
        }
      };
    }
  };
})();
