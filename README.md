# SVG Texture
Create textures from SVG images in a framework agnostic way.

## Example
The example below uses Typescript and Phaser (https://phaser.io).
```Typescript
import { Graphics } from 'phaser';
import { TexturePainter, renderTexture } from 'svg-texture';

// Phaser specific TexturePainter implementation.
class PhaserPainter implements TexturePainter {
    private g: Graphics;

    constructor(g: Graphics) {
        this.g = g;
    }

    circle(x: number, y: number, r: number, style: Style) {
        g.lineColor = style.rgb

        if (style.fill) {
            g.beginFill(style.rgb);
            g.drawCircle(x, y, r);
            g.endFill();
        }
        else {
            g.drawCircle(x, y, r);
        }
    }
}

// Render SVG document onto a Phaser texture scaling it up to 200%.
let g = new Graphics(game, 0, 0);
renderTexture(new PhaserPainter(g), svgDoc, 2.0);
let texture = g.generateTexture();
```

# Limitations
The implementation is currently extremly limited and only support circle geometries. However, the implementation is very flexible and can easily be extended to support multiple SVG element types.
