import { Model } from "./Model";
export class Post extends Model {
    constructor(model = {}) {
		super(model);
		this.id = model.id || null;
		this.date = model.date || null;
		this.code = model.code || null;
		this.thumbnail = model.thumbnail || null;
		this.process_type = model.process_type || null;
		this.content = model.content || null;
		this.author_id = model.author_id || null;
		this.author_username = model.author_username || null;
		this.like_count = model.like_count || null;
    }
    reset(payload) {
		super.reset(payload);
    }
}
