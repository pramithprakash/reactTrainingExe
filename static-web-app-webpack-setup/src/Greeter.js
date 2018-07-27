module.exports = class Greeter {
    constructor(name="World1") {
        this.name = name
    }

    greet() {
        return `hello, ${this.name}`;
    }
}