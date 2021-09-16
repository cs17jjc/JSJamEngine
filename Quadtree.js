class QuadNode {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.isSplit = false;

        this.objects = [];
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    split() {
        this.topLeft = new QuadNode(this.x, this.y, this.width / 2, this.height / 2);
        this.topRight = new QuadNode(this.x + (this.width / 2), this.y, this.width / 2, this.height / 2);
        this.bottomLeft = new QuadNode(this.x, this.y + (this.height / 2), this.width / 2, this.height / 2);
        this.bottomRight = new QuadNode(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, this.height / 2);
        this.isSplit = true;
    }

    addObject(object) {
        if (this.objects.length > 3) {
            if (!this.isSplit) {
                this.split();
            }

            if (checkIfPointInRectange(object, this.topLeft)) {
                this.topLeft.addObject(object);
            } else if (checkIfPointInRectange(object, this.topRight)) {
                this.topRight.addObject(object);
            } else if (checkIfPointInRectange(object, this.bottomLeft)) {
                this.bottomLeft.addObject(object);
            } else if (checkIfPointInRectange(object, this.bottomRight)) {
                this.bottomRight.addObject(object);
            }

        } else {
            this.objects.push(object);
        }
    }

    query(queryRect) {
        var returnObjects = this.objects.filter(o => checkIfPointInRectange(o, queryRect));
        if (this.isSplit) {
            returnObjects = returnObjects.concat(this.topLeft.query(queryRect));
            returnObjects = returnObjects.concat(this.topRight.query(queryRect));
            returnObjects = returnObjects.concat(this.bottomLeft.query(queryRect));
            returnObjects = returnObjects.concat(this.bottomRight.query(queryRect));
        }
        return returnObjects;
    }

    getAllRects() {
        var rects = [{ x: this.x, y: this.y, width: this.width, height: this.height }];
        if (this.isSplit) {
            rects = rects.concat(this.topLeft.getAllRects());
            rects = rects.concat(this.topRight.getAllRects());
            rects = rects.concat(this.bottomLeft.getAllRects());
            rects = rects.concat(this.bottomRight.getAllRects());
        }
        return rects;
    }

}