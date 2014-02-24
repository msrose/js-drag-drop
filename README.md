# Drag and Drop

```html
<script src="dragdrop.js" type="text/javascript"></script>
```

## Usage

```html
...
<div id="containerId"></div>
...
<script type="text/javascript">
  dragdrop.create("containerId");
</script>
```

## Customization

| Option          | Description                                                       | Default |
| ---             | ---                                                               | ---     |
| backgroundColor | Background color of `containerId` div.                            | `white` |
| initialOffset   | Distance between leftmost square and the left side of the window. | `20`    |
| numSquares      | The number of squares to draw in the `<div>`.                     | `1`     |
| showNumbering   | Label each square with incrementing number as it is drawn.        | `false` |
| squareColors    | An array of colors used to draw the squares. Square `n` is assigned the color `squareColors[n % squareColors.length]`. | `["white"]` |
| squareSize      | The size of each square in pixels.                                | `100`   |

### Example

```js
dragdrop.create("main", {
  backgroundColor: "blue",
  initialOffset: 50,
  numSquares: 1,
  showNumbering: true,
  squareColors: ["red", "green", "yellow"],
  squareSize: 150
});
```
