<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>account_box</md-icon>
                    </div>
                    <h4 class="title">{{ 'Social network users' | translate }}</h4>
                </md-card-header>
                <md-card-content>

                    <md-table v-model="items" table-header-color="green">
                        <md-table-row>
                            <md-table-head md-numeric>
                                <md-sort :sortingLabel="'id'" :sortBy="sortBy" @sorted="sorted">
                                    {{ 'ID' | translate }}
                                </md-sort>
                            </md-table-head>
                            <md-table-head>{{ 'Username' | translate }}</md-table-head>
                            <md-table-head>{{ 'Instagram ID' | translate }}</md-table-head>
                            <md-table-head md-numeric>
                                <md-sort :sortingLabel="'post_count'" :sortBy="sortBy" @sorted="sorted">
                                    {{ 'Post count' | translate }}
                                </md-sort></md-table-head>
                            <md-table-head md-numeric>
                                <md-sort :sortingLabel="'comment_count'" :sortBy="sortBy" @sorted="sorted">
                                    {{ 'Comment count' | translate }}
                                </md-sort>
                            </md-table-head>

                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index">
                            <md-table-cell>{{ item.id }}</md-table-cell>
                            <md-table-cell>{{ item.username }}</md-table-cell>
                            <md-table-cell>{{ item.insta_id }}</md-table-cell>
                            <md-table-cell>{{ item.posts_count }}</md-table-cell>
                            <md-table-cell>{{ item.comments_count }}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-card-content>
                <pagination v-if="pageCount > 1" :pageCount="pageCount" v-model="currentPage" @input="paginate" >
                </pagination>
            </md-card>
        </div>
    </div>
</template>
<script>
import {Pagination} from "@/components";

export default {
    components: {
        Pagination,
    },
    data() {
        return {
            items: [],
            currentPage: 1,
            pageCount: 0,
            sortBy: '',
            queryFilter: this.$store.getters.getQueryFilter.social_network_user ?? null,
        };
    },
    created() {
        if (this.queryFilter?.page) {
            this.currentPage = this.queryFilter.page;
        }
        if (this.queryFilter?.sortBy) {
            this.sortBy = this.queryFilter.sortBy;
        }
        this.getItems();
    },
    methods: {
        paginate() {
            this.updateQueryFilter();
            this.getItems();
        },
        sorted(arg) {
            this.sortBy = arg;
            this.currentPage = 1;
            this.updateQueryFilter();
            this.getItems();

        },
        updateQueryFilter() {
            this.$store.dispatch('setQueryFilter', {
                'social_network_user': {
                    'sortBy': this.sortBy,
                    'page': this.currentPage,
                }
            });
        },
        getItems() {
            this.axios.get(process.env.VUE_APP_API_URL + '/social-network-user', {
                params: {page: this.currentPage, sort_by: this.sortBy}
            })
                .then(response => {
                    this.items = response.data.items;
                    this.pageCount = response.data.pagination.page_count;
                })
                .catch(error => {
                    console.log(error);
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
