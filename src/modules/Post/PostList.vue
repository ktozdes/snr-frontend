<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <h4 class="title">{{ 'Posts' | translate }}</h4>
                </md-card-header>
                <md-card-content>

                    <md-table v-model="items" table-header-color="green">
                        <md-table-row>
                            <md-table-head md-numeric>{{ 'ID' | translate }}</md-table-head>
                            <md-table-head>{{ 'Code' | translate }}</md-table-head>
                            <md-table-head>{{ 'Thumbnail' | translate }}</md-table-head>
                            <md-table-head>{{ 'User name' | translate }}</md-table-head>
                            <md-table-head>{{ 'Date' | translate }}</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index">
                            <md-table-cell>{{ item.id }}</md-table-cell>
                            <md-table-cell>
                                <a v-if="canDo('Comments', 'can_view')" @click="gotoComments(item)"
                                             class="md-link primary" href="javascript:void(0)">{{ item.code }}
                                </a>
                                <span v-else>
                                    {{ item.code }}
                                </span>

                            </md-table-cell>
                            <md-table-cell>
                                <div class="img-container">
                                    <img :src="getThumbnail(item.thumbnail)" :alt="'Post thumbnail' | translate "/>
                                </div>
                            </md-table-cell>
                            <md-table-cell>{{ item.author_username }}</md-table-cell>
                            <md-table-cell>{{ item.formatted_date }}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
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
            this.axios.get(process.env.VUE_APP_API_URL + '/post')
                .then(response => {
                    this.items = response.data.items;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getThumbnail($fileName) {
            return "http://localhost:5050/api/images/" + $fileName;
        },
        gotoComments( item ) {
            this.$store.dispatch('setRouterProp',item);
            this.$router.push({ name: 'CommentList', params: { post_id: item.id } });
        }
    }
};
</script>
<style scoped>
.img-container img {
    max-height: 150px;
    width: auto;
}
</style>
