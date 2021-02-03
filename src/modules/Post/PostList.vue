<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <h4 class="title">{{ 'Posts' | translate }}</h4>
                    <router-link  v-if="canDo('Words', 'can_create')" :to="{path: 'word/create/'}">
                        <div class="card-icon card-icon-right">
                            <md-icon>add</md-icon>
                        </div>
                    </router-link>
                </md-card-header>
                <md-card-content>

                    <md-table v-model="items" table-header-color="green">
                        <md-table-row>
                            <md-table-head md-numeric>{{ 'ID' | translate }}</md-table-head>
                            <md-table-head>{{ 'Word' | translate }}</md-table-head>
                            <md-table-head>{{ 'Reaction' | translate }}</md-table-head>
                            <md-table-head class="md-text-align-right">{{ 'Action' | translate }}</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index">
                            <md-table-cell>{{ item.id }}</md-table-cell>
                            <md-table-cell>{{ item.word }}</md-table-cell>
                            <md-table-cell style="width:300px;text-align: center"><reaction :reactions="{positive:item.positive ,negative:item.negative, neutral:item.neutral}"></reaction></md-table-cell>
                            <md-table-cell class="md-text-align-right">
                                <md-button v-if="canDo('Words', 'can_delete')" class="md-just-icon md-danger" @click="destroy(item.id)">
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import Reaction from "@/components/Reaction";
import Swal from "sweetalert2";

export default {
    components: {Reaction},
    data() {
        return {
            items: [],
        };
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            this.axios.get(process.env.VUE_APP_API_URL + '/word')
                .then(response => {
                    this.items = response.data.items;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        destroy(wordID) {
            Swal.fire({
                title: this.$options.filters.translate("Delete Word?"),
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
                    this.axios.delete(process.env.VUE_APP_API_URL + '/word/destroy/' + wordID)
                    .then(response => {
                        if (response.status === 200) {
                            this.getItems();
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
