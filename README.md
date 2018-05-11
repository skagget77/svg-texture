# SVG Texture
Create textures from SVG images in a framework agnostic way.

## Example
The example below uses Typescript and Phaser 3 (https://phaser.io).
```Typescript
import * as Phaser from 'phaser';
import { Style, TexturePainter, renderTexture } from 'svg-texture';

// Phaser specific TexturePainter implementation.
class PhaserPainter implements TexturePainter {
    private g: Phaser.GameObjects.Graphics;

    constructor(g: Phaser.GameObjects.Graphics) {
	this.g = g;
    }

    circle(x: number, y: number, r: number, style: Style) {
	let c = Phaser.Display.Color.HexStringToColor(style.rgb).color;

	if (style.fill) {
	    this.g.fillStyle(c);
	    this.g.fillCircle(x, y, r);
	}
	else {
	    this.g.lineStyle(1, c);
	    this.g.strokeCircle(x, y, r);
	}
    }
}

function create() {
    // Render SVG document onto a Phaser 3 texture scaling it up to 200%.
    let scene = game.scene.add("main", {}, true);
    renderTexture(new PhaserPainter(scene.add.graphics()), svgDoc, 2.0);
}
```

# Limitations
The implementation is currently extremly limited and only support circle geometries. However, the implementation is very flexible and can easily be extended to support multiple SVG element types.
