/*!
 * svg-texture
 * Copyright (c) 2018 Johan Andersson <skagget77@gmail.com>
 * MIT License
 */

import { SAXParser } from 'sax'

/**
 * Graphical style of a geometry/shape.
 */
export class Style {
    /**
     * Whether the geometry/shape should be filled or stroked.
     */
    fill: boolean;

    /**
     * RGB color given as three hexadecimal bytes, e.g. F086BA.
     */
    rgb: string;
}

/**
 * Parses an SVG style attribute.
 *
 * @param style String value of an SVG style attribute.
 * @return Style instance.
 */
function parseStyle(style: string): Style {
    let s = style.split(':');

    if (s[1].length > 2) {
	s[1] = s[1].slice(1, -1);
    }
    
    return { fill: s[0] == 'fill', rgb: s[1] } as Style;
}

/**
 * TexturePainter interface, used by framework specific adapters to translate
 * the texture rendering operations.
 */
export interface TexturePainter {
    /**
     * Draws a circle with the specified radius at the given center point.
     *
     * @param x Center point x coordinate.
     * @param y Center point y coordiante.
     * @param r Radius.
     * @param style Graphical style.
     */
    circle(x: number, y: number, r: number, style: Style): void;
}

/**
 * Shape interface, root interface for the different type of geometries that
 * can be rendered.
 */
interface Shape {
    /**
     * Renders the Shape using the specified TexturePainter implementation.
     *
     * @param painter TexturePainter implementation.
     * @param scale Scale at which to render the Geometry, 1.0 is equal to 100
     *     percent.
     */
    render(painter: TexturePainter, scale: number): void;
}

/**
 * Circle.
 */
class Circle implements Shape {
    // Geometry.
    private x: number;
    private y: number;
    private r: number;

    // Style.
    private style: Style;

    /**
     * Creates a new Circle.
     *
     * @param x Center point x coordinate.
     * @param y Center point y coordinate.
     * @param r Radius.
     * @param style Graphical style.
     */
    constructor(x: number, y: number, r: number, style: Style) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.style = style;
    }

    // Documented in base interface.
    render(painter: TexturePainter, scale: number) {
	const x = this.x * scale;
	const y = this.y * scale;
	const r = this.r * scale;

	painter.circle(x, y, r, this.style);
    }
}

/**
 * Renders the SVG document using the specified TexturePainter implementation.
 *
 * @param painter TexturePainter implementation.
 * @param svg SVG document.
 * @param scale Scale at which to render the Geometry, 1.0 is equal to 100
 *     percent.
 */
export function renderTexture(painter: TexturePainter, svg: string, scale = 1) {
    let shapes = new Array<Shape>();

    // Parse SVG document.
    let parser = new SAXParser(true, null);

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

    // Render collected shapes.
    for (const shape of shapes) {
	shape.render(painter, scale);
    }
}
