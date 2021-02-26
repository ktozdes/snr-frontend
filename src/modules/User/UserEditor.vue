<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>{{ user.id ? 'edit' : 'add' }}</md-icon>
                        <md-icon>account_box</md-icon>
                    </div>
                    <h4 class="title">{{
                            (user.id ? 'Edit user' : 'Create user') | translate
                        }}</h4>
                </md-card-header>
                <md-card-content>
                    <md-card-content>
                        <md-field :class="{'md-invalid' : !nameIsValid}">
                            <label>{{ 'Name' | translate }}</label>
                            <md-input v-model="user.name" type="text" required></md-input>
                            <span class="md-error" v-if="!user.name">{{
                                    'This field is required.' | translate
                                }}</span>
                            <span v-for="(error, key) in validationError.name"
                                  :key="key"
                                  class="md-error">{{ error }}</span>
                        </md-field>
                        <md-field :class="{'md-invalid' : validationError.email}">
                            <label>{{ 'Email' | translate }}</label>
                            <md-input v-model="user.email" type="email" :disabled="user.id ? true : false"></md-input>
                            <span v-for="(error, key) in validationError.email"
                                  :key="key"
                                  class="md-error">{{ error }}</span>
                        </md-field>
                        <md-field :class="{'md-invalid' : validationError.phone}">
                            <label>{{ 'Phone' | translate }}</label>
                            <md-input v-model="user.phone" type="text"></md-input>
                            <span v-for="(error, key) in validationError.phone"
                                  :key="key"
                                  class="md-error">{{ error }}</span>
                        </md-field>
                        <md-switch v-if="user.id" v-model="setPassword">{{ 'Reset password' | translate }}</md-switch>
                        <div class="md-layout" v-if="setPassword">
                            <div class="md-layout-item">
                                <md-field :class="{'md-invalid' : validationError.password}">
                                    <label>{{ 'Password' | translate }}</label>
                                    <md-input v-model="user.password" type="password"></md-input>
                                    <span v-for="(error, key) in validationError.password"
                                          :key="key"
                                          class="md-error">{{ error }}</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <md-field :class="{'md-invalid' : validationError.password_confirmation}">
                                    <label>{{ 'Repeat password' | translate }}</label>
                                    <md-input v-model="user.password_confirmation" type="password"></md-input>
                                    <span v-for="(error, key) in validationError.password_confirmation"
                                          :key="key"
                                          class="md-error">{{ error }}</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout">
                            <div class="md-layout-item">
                                <md-field :class="{'md-invalid' : validationError.organization_id}">
                                    <label for="organization_id">{{ 'Organization' | translate }}</label>
                                    <md-select v-model="user.organization_id" id="organization_id">
                                        <md-option value="">{{ 'No organization' | translate }}</md-option>
                                        <md-option v-for="(organization, index) in organizations" :key="index"
                                                   :value="organization.id">{{ organization.name }}
                                        </md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <md-field :class="{'md-invalid' : validationError.user_role_id}">
                                    <label for="role_id">{{ 'Role' | translate }}</label>
                                    <md-select v-model="user.user_role_id" id="role_id">
                                        <md-option v-for="(role, index) in roles" :key="index" :value="role.id">
                                            {{ role.name }}
                                        </md-option>
                                    </md-select>
                                    <span v-for="(error, key) in validationError.user_role_id"
                                          :key="key"
                                          class="md-error">{{ error }}</span>
                                </md-field>
                            </div>
                        </div>

                    </md-card-content>


                    <md-card-actions md-alignment="left">
                        <md-button class="md-success" @click="submit">
                            {{ (user.id ? 'Edit' : 'Create') | translate }}
                        </md-button>
                    </md-card-actions>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import {User} from "@/interfaces/User";

export default {
    data() {
        return {
            user: new User(),
            keywords: [],
            roles: [],
            organizations: [],
            setPassword: true,
            validationError: [],
        };
    },
    created() {
        if (this.$route.params?.id) {
            this.user.id = this.$route.params?.id;
            this.setPassword = false;
        }
        this.getUser();
    },
    methods: {
        getUser() {
            this.axios.get(process.env.VUE_APP_API_URL + '/user/edit' + (this.user.id ? '/' + this.user.id : ''))
                .then(response => {
                    this.user = new User(response.data.user);
                    this.organizations = response.data.organizations;
                    this.roles = response.data.roles;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submit() {
            const url = process.env.VUE_APP_API_URL + ((this.user.id) ? '/user/update/' + this.user.id : '/user/store');
            this.axios.post(url, this.user)
                .then(response => {
                    if (response.status === 200) {
                        this.$router.push({name: 'UserList'});
                    }
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                        console.log(this.validationError);
                    }
                });
        }
    },
    computed: {
        nameIsValid() {
            let valid = true;
            if (!this.user.name) {
                valid = false;
            }
            if (this.validationError.name) {
                valid = false;
            }
            return valid;
        },
    }
};
</script>
<style scoped>
</style>
