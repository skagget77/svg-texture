import { assert } from 'chai';

// SUT.
import { Style, TexturePainter, renderTexture } from '../src/index';

// SVG test document.
const svgDoc = `
  <?xml version="1.0" encoding="iso-8859-1"?>
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px" y="0px" viewBox="0 0 511.996 511.996"
      style="enable-background:new 0 0 511.996 511.996;"
      xml:space="preserve">
    <circle style="fill:#365980;" cx="254.311" cy="258.24" r="253.756"/>
    <circle style="fill:#77ACDE;" cx="254.311" cy="258.24" r="210.236"/>
    <circle style="fill:#F0D933;" cx="254.311" cy="258.24" r="156.321"/>
    <circle style="fill:#D05C4F;" cx="254.311" cy="258.24" r="97.772"/>
    <circle style="fill:#ECE5D5;" cx="254.311" cy="258.24" r="27.068"/>
  </svg>`;

// Mocks.
class MockPainter implements TexturePainter {
    text = new Array<string>();
    
    circle(x: number, y: number, r: number, s: Style) {
	this.text.push(`circle(${x}, ${y}, ${r}, ${s.fill}, ${s.rgb})`);
    }
}

// Test suite.
suite('toTexture', () => {
    test('@ 100%', () => {
	let p = new MockPainter();

	renderTexture(p, svgDoc);

	assert.equal(p.text[0], 'circle(254.311, 258.24, 253.756, true, 365980)');
	assert.equal(p.text[1], 'circle(254.311, 258.24, 210.236, true, 77ACDE)');
	assert.equal(p.text[2], 'circle(254.311, 258.24, 156.321, true, F0D933)');
	assert.equal(p.text[3], 'circle(254.311, 258.24, 97.772, true, D05C4F)');
	assert.equal(p.text[4], 'circle(254.311, 258.24, 27.068, true, ECE5D5)');
    });

    test('@ 200%', () => {
	let p = new MockPainter();

	renderTexture(p, svgDoc, 2.0);

	assert.equal(p.text[0], 'circle(254.311, 258.24, 507.512, true, 365980)');
	assert.equal(p.text[1], 'circle(254.311, 258.24, 420.472, true, 77ACDE)');
	assert.equal(p.text[2], 'circle(254.311, 258.24, 312.642, true, F0D933)');
	assert.equal(p.text[3], 'circle(254.311, 258.24, 195.544, true, D05C4F)');
	assert.equal(p.text[4], 'circle(254.311, 258.24, 54.136, true, ECE5D5)');
    });
});
