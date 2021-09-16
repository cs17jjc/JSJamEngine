class ObjectContainer {

    constructor() {
        this.list = [];
        this.map = new Map();
    }

    add(obj, id = null) {
        if (id == null) {
            obj.id = obj.objClass + this.genId();
        } else {
            obj.id = id;
        }
        this.list.push(obj);
        this.map.set(obj.id, obj);
    }

    removeDead() {
        this.list.filter(o => !o.alive).forEach(o => this.map.delete(o.id));
        this.list = this.list.filter(o => o.alive);
    }

    get(id) {
        return this.map.get(id);
    }

    all() {
        return this.list.filter(o => o.alive);
    }

    genId() {
        var id = (Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
        while (this.map.has(id)) {
            id = (Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
        }
        return id;
    }
}