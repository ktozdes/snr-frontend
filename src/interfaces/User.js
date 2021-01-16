import { Model } from "./Model";
export class User extends Model {
    constructor(model = {}) {
        super(model);
        this.id = model.id || null;
        this.name = model.name || null;
        this.email = model.email || null;
        this.access_token = model.access_token || null;

        this.role = model.role || null;
        this.is_authorized = model.is_authorized || null;
        this.permissions = model.permissions || [];

    }
    reset(payload) {
        super.reset(payload);
    }
}
