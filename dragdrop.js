(function(containerId, options) {
  options = options || {};

  var defaults = {
    numSquares: 10,
    squareSize: 100,
    backgroundColor: "white",
    squareColors: ["white"],
    initialOffset: 20,
    showNumbering: false
  };

  for(var property in defaults) {
    if(!options[property]) {
      options[property] = defaults[property];
    }
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
    fontSize: "2em",
    fontFamily: "sans-serif",
    height: options.squareSize + "px",
    width: options.squareSize + "px"
  };

  for(var i = 0; i < options.numSquares; i++) {
    var newSquare = document.createElement("div");
    squareStyles.left = options.initialOffset + i * options.squareSize + "px";

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

    var divLabel = document.createElement("span");
    divLabel.style.lineHeight = options.squareSize + "px";
    if(options.showNumbering) {
      divLabel.innerText = i + 1;
    }

    newSquare.appendChild(divLabel);
    container.appendChild(newSquare);
  }

  window.onmousemove = function(e) {
    if(dragItem) {
      dragItem.style.top = initialTop + e.clientY - initialClientY + "px";
      dragItem.style.left = initialLeft + e.clientX - initialClientX + "px";
    }
  };
})("main", { backgroundColor: "blue", squareColors: ["red", "green", "yellow"], showNumbering: true });
