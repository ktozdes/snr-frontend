import { Model } from "./Model";
export class Organization extends Model {
    constructor(model = {}) {
		super(model);
		this.id = model.id || null;
		this.name = model.name || null;
		this.email = model.email || null;
		this.phone = model.phone || null;
		this.address = model.address || null;
		this.keywords = model.keywords || [];
		this.logo = model.logo || [];
    }
    reset(payload) {
		super.reset(payload);
    }
}
