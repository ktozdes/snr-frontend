import { Model } from "./Model";
export class Word extends Model {
    constructor(model = {}) {
		super(model);
		this.id = model.id || null;
		this.word = model.word || null;
		this.index = model.index || null;
		this.type = model.type || null;
		this.process_type = model.process_type || null;

		this.positive_total = model.positive_total || null;
		this.negative_total = model.negative_total || null;
		this.neutral_total = model.neutral_total || null;
    }
    reset(payload) {
		super.reset(payload);
    }
}
