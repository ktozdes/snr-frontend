<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>{{ role.id ? 'edit' : 'add' }}</md-icon>
                        <md-icon>business</md-icon>
                    </div>
                    <h4 class="title">{{ (role.id ? 'Edit role' : 'Create role') | translate }}</h4>
                </md-card-header>
                <md-card-content>
                    <md-card-content>
                        <md-field :class="{'md-invalid' : !nameIsValid}">
                            <label>{{ 'Role' | translate }}</label>
                            <md-input v-model="role.name" type="text" required></md-input>
                            <span class="md-error" v-if="!role.name">{{ 'This field is required.' | translate }}</span>
                            <span v-for="(error, key) in validationError.name"
                              :key="key"
                              class="md-error">{{ error }}</span>
                        </md-field>
                    </md-card-content>
                    <div v-if="role.permissions">
                        <md-table>
                            <md-table-row>
                                <md-table-head md-numeric>{{ 'Permission' | translate }}</md-table-head>
                                <md-table-head>{{ 'View' | translate }}</md-table-head>
                                <md-table-head>{{ 'Create' | translate }}</md-table-head>
                                <md-table-head>{{ 'Edit' | translate }}</md-table-head>
                                <md-table-head>{{ 'Delete' | translate }}</md-table-head>
                            </md-table-row>

                            <md-table-row v-for="(permission, index) in role.permissions" :key="index">
                                <md-table-head md-numeric>{{index | translate}}</md-table-head>
                                <md-table-cell>
                                    <md-checkbox v-model="role.permissions[index]['can_view']">{{ 'View' | translate}}</md-checkbox>
                                </md-table-cell>
                                <md-table-cell>
                                    <md-checkbox v-model="role.permissions[index]['can_create']">{{ 'Create' | translate }}</md-checkbox>
                                </md-table-cell>
                                <md-table-cell>
                                    <md-checkbox v-model="role.permissions[index]['can_edit']">{{ 'Edit' | translate }}</md-checkbox>
                                </md-table-cell>
                                <md-table-cell>
                                    <md-checkbox v-model="role.permissions[index]['can_delete']">{{ 'Delete' | translate }} </md-checkbox>
                                </md-table-cell>
                            </md-table-row>
                        </md-table>
                    </div>


                    <md-card-actions md-alignment="left">
                        <md-button class="md-success" @click="submit">{{ (role.id ? 'Edit' : 'Create') | translate }}
                        </md-button>
                    </md-card-actions>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import {Role} from "@/interfaces/Role";

export default {
    data() {
        return {
            role: new Role(),
            validationError: [],
        };
    },
    created() {
        if (this.$route.params?.id) {
            this.role.id = this.$route.params?.id;
        }
        this.getRolePermissions();
    },
    methods: {
        getRolePermissions() {
            this.axios.get(process.env.VUE_APP_API_URL + '/permission' + (this.role.id ? '/' + this.role.id : ''))
                .then(response => {
                    this.role = new Role(response.data.role);
                    this.role.permissions = response.data.items;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submit() {
            const url = process.env.VUE_APP_API_URL + ((this.role.id) ? '/role/update/'+ this.role.id : '/role/store');
            this.axios.post(url, this.role)
                .then(response => {
                    if (response.status === 200) {
                        this.$router.push({ name: 'RoleList' });
                    }
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                    }
                });
        }
    },
    computed: {
        nameIsValid() {
            let valid = true;
            if (!this.role.name) {
                valid = false;
            }
            if (this.validationError.name) {
                valid = false;
            }
            return valid;
        }
    }
};
</script>
<style scoped>
</style>
