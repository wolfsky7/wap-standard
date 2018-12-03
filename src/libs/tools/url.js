class MUrl {
    constructor(method, path) {
        this.method = method;
        this.path = path
    }

    toString() {
        return this.path
    }
}