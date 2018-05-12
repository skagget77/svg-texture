"use strict";
/*!
 * svg-texture
 * Copyright (c) 2018 Johan Andersson <skagget77@gmail.com>
 * MIT License
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sax_1 = require("sax");
class Style {
}
exports.Style = Style;
function parseStyle(style) {
    let s = style.split(':');
    if (s[1].length > 2) {
        s[1] = s[1].slice(1, -1);
    }
    return { fill: s[0] == 'fill', rgb: s[1] };
}
class Circle {
    constructor(x, y, r, style) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.style = style;
    }
    render(painter, scale) {
        const x = this.x * scale;
        const y = this.y * scale;
        const r = this.r * scale;
        painter.circle(x, y, r, this.style);
    }
}
function renderTexture(painter, svg, scale = 1) {
    let shapes = new Array();
    let parser = new sax_1.SAXParser(true, null);
    parser.onopentag = (tag) => {
        switch (tag.name) {
            case 'svg':
                break;
            case 'circle':
                const x = Number(tag.attributes['cx']);
                const y = Number(tag.attributes['cy']);
                const r = Number(tag.attributes['r']);
                const s = String(tag.attributes['style']);
                shapes.push(new Circle(x, y, r, parseStyle(s)));
                break;
            default:
                console.log(`unrecognized tag: ${tag.name}`);
                break;
        }
    };
    parser.write(svg);
    for (const shape of shapes) {
        shape.render(painter, scale);
    }
}
exports.renderTexture = renderTexture;
//# sourceMappingURL=svg-texture.js.map