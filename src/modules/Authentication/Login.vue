<template>
    <div class="md-layout text-center">
        <div
            class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
        >
            <login-card header-color="grey">
                <h4 slot="title" class="title">Log in</h4>
                <md-field class="md-form-group" slot="inputs" :class="[{ 'md-error': validationError.email }]">
                    <md-icon>email</md-icon>
                    <label>Email...</label>
                    <md-input v-model="email" type="email"></md-input>
                        <span v-for="(error, key) in validationError.email"
                              :key="key"
                              class="md-error">{{ error }}</span>
                </md-field>
                <md-field class="md-form-group" slot="inputs" :class="[{ 'md-error': validationError.password }]">
                    <md-icon>lock_outline</md-icon>
                    <label>Password...</label>
                    <md-input v-model="password" type="password" @keyup.enter="login"></md-input>
                    <div v-if="validationError.password" >
                        <span v-for="(error, key) in validationError.password"
                              :key="key"
                              class="md-error">{{ error }}</span>
                    </div>
                </md-field>
                <md-button slot="footer" class="md-simple md-success md-lg" @click="login">
                    Lets Go
                </md-button>
<!--                <md-button slot="footer" class="md-simple md-success md-lg" @click="testApi">-->
<!--                    test close-->
<!--                </md-button>-->
            </login-card>
        </div>
    </div>
</template>
<script>
import {LoginCard} from "@/components";
import {User} from "@/interfaces/User";

export default {
    components: {
        LoginCard
    },
    data() {
        return {
            email: null,
            password: null,
            validationError: [],
        };
    },
    methods: {
        login() {
            let bodyFormData = new FormData();
            bodyFormData.append('email', this.email);
            bodyFormData.append('password', this.password);
            this.axios.post(process.env.VUE_APP_API_URL + '/login', bodyFormData)
                .then(response => {
                    if ('access_token' in response.data ) {
                        let user = new User(response.data.user);
                        user.access_token = response.data.access_token;
                        user.is_authorized = true;
                        this.$store.dispatch('login', user);
                        this.$router.push("regular-table");
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
        testApi() {
            this.axios.get(process.env.VUE_APP_API_URL + '/test-close')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
        }
    }
};
</script>

<style></style>
