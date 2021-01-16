<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <signup-card>
                <h2 class="title text-center" slot="title">Register</h2>
                <div class="md-layout-item mr-auto" slot="content-center">
                    <md-field class="md-form-group" :class="[{ 'md-error': validationError.name }]">
                        <md-icon>face</md-icon>
                        <label>Full name...</label>
                        <md-input v-model="name" type="text"></md-input>
                    </md-field>
                    <md-field class="md-form-group" :class="[{ 'md-error': validationError.email }]">
                        <md-icon>email</md-icon>
                        <label>Email...</label>
                        <md-input v-model="email" type="email"></md-input>
                    </md-field>

                    <md-field class="md-form-group" :class="[{ 'md-error': validationError.password }]">
                        <md-icon>lock_outline</md-icon>
                        <label>Password</label>
                        <md-input v-model="password" type="password"></md-input>
                    </md-field>
                    <md-field class="md-form-group" :class="[{ 'md-error': validationError.password_confirmation }]">
                        <md-icon>lock_outline</md-icon>
                        <label>Repeat Password..</label>
                        <md-input v-model="password_confirmation" type="password"></md-input>
                    </md-field>

                    <!--                    <md-checkbox v-model="boolean">I agree to the <a>terms and conditions</a>.</md-checkbox>-->
                    <div class="button-container">
                        <md-button href class="md-success md-round mt-4" slot="footer" @click="register">Get Started
                        </md-button>
                    </div>
                </div>
            </signup-card>
        </div>
    </div>
</template>
<script>
import {SignupCard} from "@/components";

export default {
    components: {
        SignupCard
    },
    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            validationError: [],
        };
    },
    methods: {
        register() {
            let bodyFormData = new FormData();
            if ( this.name ) {
                bodyFormData.append('name', this.name);
            }
            if ( this.email ) {
                bodyFormData.append('email', this.email);
            }
            if ( this.password ) {
                bodyFormData.append('password', this.password);
            }
            if ( this.password_confirmation ) {
                bodyFormData.append('password_confirmation', this.password_confirmation);
            }
            this.axios.post(process.env.VUE_APP_API_URL + '/register', bodyFormData)
                .then(response => {
                    if (response.data.message) {
                        this.notify('success', response.data.message);
                        this.$router.push('login');
                    }
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                        this.$notify({
                            timeout: 5000,
                            message:
                                error.response.data.message,
                            icon: "add_alert",
                            horizontalAlign: 'top',
                            verticalAlign: 'left',
                            type: 'danger'
                        });
                    }
                });
        },
        notify(type, messages) {
            messages.forEach((message) => {
                this.$notify({
                    timeout: 5000,
                    message:
                        message,
                    icon: "add_alert",
                    horizontalAlign: 'top',
                    verticalAlign: 'left',
                    type: type
                });
            })
        }
    }
};
</script>
<style></style>
