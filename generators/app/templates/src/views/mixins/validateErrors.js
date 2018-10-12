export default {
	methods: {
		first(name) {
			return this.has(name) ? this.errors.items.find(field=>field.field==name).msg : '';
		},
		has(name) {
			return this.errors.items.findIndex(field=>field.field==name) != -1;
		}
	}
}