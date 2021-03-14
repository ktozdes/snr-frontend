import { Model } from "./Model";
export class User extends Model {
    constructor(model = {}) {
        super(model);
        this.id = model.id || null;
        this.name = model.name || null;
        this.email = model.email || null;
        this.phone = model.phone || null;
        this.access_token = model.access_token || null;

        this.user_role_id = model.user_role_id || null;
        this.organization_id = model.organization_id || null;
        this.is_authorized = model.is_authorized || null;
        this.permissions = model.permissions || [];
        this.logo = model.logo || [];
        this.keywords = model.keywords || [];

    }
    reset(payload) {
        super.reset(payload);
    }
}
