<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>add_task</md-icon>
                    </div>
                    <h4 class="title">{{ 'Roles' | translate }}</h4>
                    <router-link v-if="canDo('User Role', 'can_create')" :to="{path: 'role/create/'}">
                        <div class="card-icon card-icon-right">
                            <md-icon>add</md-icon>
                        </div>
                    </router-link>
                </md-card-header>
                <md-card-content>
                    <md-table v-model="items" table-header-color="green">
                        <md-table-row>
                            <md-table-head md-numeric>{{ 'ID' | translate }}</md-table-head>
                            <md-table-head>{{ 'Name' | translate }}</md-table-head>
                            <md-table-head
                                v-if="canDo('User Role', 'can_edit') || canDo('User Role', 'can_delete')"
                                class="md-text-align-right">{{ 'Action' | translate }}
                            </md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index">
                            <md-table-cell>{{ item.id }}</md-table-cell>
                            <md-table-cell>{{ item.name }}</md-table-cell>
                            <md-table-cell class="md-text-align-right">
                                <md-button v-if="canDo('User Role', 'can_edit')" :to="{path: 'role/edit/' + item.id}"
                                           class="md-just-icon md-success">
                                    <md-icon>edit</md-icon>
                                </md-button>
                                <md-button v-if="canDo('User Role', 'can_delete')" class="md-just-icon md-danger"
                                           @click="destroyRole(item.id)">
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-card-content>
                <pagination v-if="pageCount > 1" :pageCount="pageCount" v-model="currentPage" @input="paginate">
                </pagination>
            </md-card>
        </div>
    </div>
</template>
<script>

import Swal from "sweetalert2";
import {Pagination} from "@/components";

export default {
    components: {
        Pagination
    },
    data() {
        return {
            items: [],
            currentPage: 1,
            pageCount: 0,
        };
    },
    created() {
        this.getRoles();
    },
    methods: {
        paginate() {
            this.getRoles();
        },
        getRoles() {
            this.axios.get(process.env.VUE_APP_API_URL + '/role', {
                params: {page: this.currentPage}
            })
                .then(response => {
                    this.items = response.data.items.data;
                    this.pageCount = response.data.items.last_page;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        destroyRole(roleID) {
            Swal.fire({
                title: this.$options.filters.translate("Delete Role?"),
                text: this.$options.filters.translate("Do you really want to delete?"),
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "md-button md-success",
                cancelButtonClass: "md-button md-danger",
                confirmButtonText: this.$options.filters.translate("Yes"),
                cancelButtonText: this.$options.filters.translate("No"),
                buttonsStyling: false
            }).then(result => {
                if (result.value) {
                    this.axios.delete(process.env.VUE_APP_API_URL + '/role/destroy/' + roleID)
                        .then(response => {
                            if (response.status === 200) {
                                this.getRoles();
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
        }
    }
};
</script>
<style scoped>
.md-button {
    margin-left: 5px;
}
</style>
