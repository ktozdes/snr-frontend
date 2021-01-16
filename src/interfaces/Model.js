export class Model {
    constructor(model = {}) {
    }
    assign (data = {}) {
        Object.getOwnPropertyNames(this).forEach( (key) => {
            if (typeof data[key] !== 'undefined' ) {
                this[key] = data[key];
            }
        });
    }
    reset(skipFields = []) {
        Object.getOwnPropertyNames(this).forEach( (key) => {
            if (!skipFields.includes(key)) {
                this[key] = null;
            }
        });
    }
    resetWith(skipFields = []) {
        Object.getOwnPropertyNames(this).forEach( (key) => {
            if (skipFields.includes(key)) {
                this[key] = null;
            }
        });
    }
}
