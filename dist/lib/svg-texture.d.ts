/*!
 * svg-texture
 * Copyright (c) 2018 Johan Andersson <skagget77@gmail.com>
 * MIT License
 */
export declare class Style {
    fill: boolean;
    rgb: string;
}
export interface TexturePainter {
    circle(x: number, y: number, r: number, style: Style): void;
}
export declare function renderTexture(painter: TexturePainter, svg: string, scale?: number): void;
