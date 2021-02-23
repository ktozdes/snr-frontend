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
                                <a v-if="canDo('Comment', 'can_view')" @click="showPost(item)"
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

                    <pagination v-if="pageCount > 1" :pageCount="pageCount" v-model="currentPage" @input="paginate" >
                </pagination>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
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
        this.getItems();
    },
    methods: {
        paginate() {
            this.getItems();
        },
        getItems() {
            this.axios.get(process.env.VUE_APP_API_URL + '/post', {
                params: {page: this.currentPage}
            })
                .then(response => {
                    this.items = response.data.items;
                    this.pageCount = response.data.pagination.page_count;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getThumbnail($fileName) {
            return process.env.VUE_APP_API_URL + "/image/proxy/" + $fileName;
        },
        showPost(item) {
            this.$store.dispatch('setRouterProp', item);
            this.$router.push({name: 'PostShow', params: {id: item.id}});
        }
    },
    computed: {
        total() {
            return this.items.length;
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
