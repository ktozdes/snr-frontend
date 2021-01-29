import { Model } from "./Model";
export class Role extends Model {
    constructor(model = {}) {
		super(model);
		this.id = model.id || null;
		this.name = model.name || null;
		this.permissions = model.permissions || null;
    }
    reset(payload) {
		super.reset(payload);
    }
}
