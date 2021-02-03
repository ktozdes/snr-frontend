import Vue from 'vue';

Vue.mixin({
	data() {
		return {
			userRole: null,
            permissions: this.$store.getters.getPermissions
		}
	},
	created() {
	},
	methods: {
		showFlashMessages(params) {
			if (params?.success_message) {
				params.success_message.forEach(message => {
					this.$notify({
						timeout: 5000,
						message: message,
						icon: "add_alert",
						horizontalAlign: 'top',
						verticalAlign: 'left',
						type: 'success'
					});
				});
			}
			else if (params?.error_message) {
				params.error_message.forEach(message => {
					this.$notify({
						timeout: 5000,
						message: message,
						icon: "add_alert",
						horizontalAlign: 'top',
						verticalAlign: 'left',
						type: 'danger'
					});
				});
			}
		},
		canDo(permission, action) {
			if (this.permissions[permission] && this.permissions[permission][action] ) {
				return this.permissions[permission][action];
			}
			return false;
		},
		isJson(str) {
			try {
				JSON.parse(str);
			} catch (e) {
				return false;
			}
			return true;
		},
	},
	computed: {
		mixinMessage() {
			return 'mixinMessage';
		},
	}

});