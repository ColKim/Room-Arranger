class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Line {
	constructor(x1, y1, x2, y2) {
		this.p1 = new Point(x1, y1);
		this.p2 = new Point(x2, y2);
	}

	

}

module.exports = Line;