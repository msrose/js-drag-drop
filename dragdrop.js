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

  var defaults = {
    numSquares: 1,
    squareSize: 100,
    squareColors: ["gray"],
    showNumbering: false,
    randomColors: null,
    border: { size: 0, format: "solid", color: "black" }
  };

  function Dragdrop(options) {
    options = options || {};

    buildOptions(options, defaults);
    buildOptions(options.border, defaults.border);

    if(options.randomColors) {
      var colors = [];
      for(var i = 0; i < options.randomColors; i++) {
        colors.push(randHex());
      }

      options.squareColors = colors;
    }

    for(var property in options) {
      this[property] = options[property];
    }
  }

  Dragdrop.prototype.draw = function(containerId) {
    var dragItem = null;
    var initialLeft;
    var initialTop;
    var initialClientX;
    var initialClientY;
    var currentHighIndex = 1;

    var squareStyles = {
      border: this.border.size + "px " + this.border.format + " " + this.border.color,
      fontSize: this.squareSize / 2 + "px",
      height: this.squareSize - this.border.size + "px",
      width: this.squareSize - this.border.size + "px"
    };

    var container = document.getElementById(containerId);
    container.style.position = "relative";
    container.style.overflow = "hidden";

    var squaresPerRow = parseInt(container.offsetWidth / this.squareSize);
    var col = 0;
    var row = 0;

    for(var i = 0; i < this.numSquares; i++) {
      var newSquare = document.createElement("div");
      newSquare.className = "dragdrop square";

      squareStyles.left = col * this.squareSize + "px";
      squareStyles.top = row * this.squareSize + "px";

      col++;
      if (col >= squaresPerRow) {
        col = 0;
        row++;
      }

      if(this.squareColors.length > 0) {
        squareStyles.backgroundColor = this.squareColors[i % this.squareColors.length];
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

      if(this.showNumbering) {
        var divLabel = document.createElement("span");
        divLabel.style.lineHeight = this.squareSize + "px";
        divLabel.innerText = i + 1;
        newSquare.appendChild(divLabel);
      }

      container.appendChild(newSquare);
    }

    container.onmousemove = function(e) {
      if(dragItem) {
        if(this.offsetTop <= e.clientY && e.clientY <= this.offsetTop + this.offsetHeight) {
          dragItem.style.top = initialTop + e.clientY - initialClientY + "px";
        }
        if(this.offsetLeft <= e.clientX && e.clientX <= this.offsetLeft + this.offsetWidth) {
          dragItem.style.left = initialLeft + e.clientX - initialClientX + "px";
        }
      }
    };

    container.onmouseup = function(e) {
      dragItem = null;
    };
  };

  return {
    create: function(options) {
      return new Dragdrop(options);
    },
    defaults: defaults
  };
})();
