<template>
    <div class="md-layout text-center">
        <div
            class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
        >
            <login-card header-color="grey">
                <h4 slot="title" class="title">Log in</h4>
                <md-field class="md-form-group" slot="inputs">
                    <md-icon>email</md-icon>
                    <label>Email...</label>
                    <md-input v-model="email" type="email"></md-input>
                </md-field>
                <md-field class="md-form-group" slot="inputs">
                    <md-icon>lock_outline</md-icon>
                    <label>Password...</label>
                    <md-input v-model="password" type="password" @keyup.enter="login"></md-input>
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
            password: null
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
                    console.log(error)
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
