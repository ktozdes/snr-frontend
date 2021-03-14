<template>
    <div class="md-layout page-post-list">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <h4 class="title">{{ 'Posts' | translate }}</h4>
                </md-card-header>
                <md-card-content>

                    <md-table table-header-color="green" class="post-list-table">
                        <md-table-toolbar>
                            <div class="md-layout">
                                <div class="md-layout-item md-size-50 md-small-size-100">
                                    <md-field class="ssss">
                                        <label for="keywords">{{ 'Keyword' | translate }}</label>

                                        <v-select v-model="keywords"
                                                  :reduce="tt => tt.code"
                                                  :options="keywordOptions" multiple></v-select>
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-size-50 md-small-size-100">
                                    <md-field class="justify-content--flex-end">
                                        <md-button @click="filterByKeyWord">{{ 'Filter' | translate }}</md-button>
                                    </md-field>
                                </div>
                            </div>
                        </md-table-toolbar>
                        <md-table-row>
                            <md-table-head>
                                <md-sort :sortingLabel="'id'" :sortBy="sortBy" @sorted="sorted">
                                    {{ 'Post' | translate }}
                                </md-sort>
                            </md-table-head>
                            <md-table-head>
                                {{ 'Rating' | translate }}
                            </md-table-head>
                            <md-table-head>
                                {{ 'User name' | translate }}
                            </md-table-head>
                            <md-table-head>
                                <md-sort :sortingLabel="'created_date'" :sortBy="sortBy" @sorted="sorted">
                                    {{ 'Created date' | translate }}
                                </md-sort>
                            </md-table-head>
                            <md-table-head>
                                <md-sort :sortingLabel="'updated_date'" :sortBy="sortBy" @sorted="sorted">
                                    {{ 'Updated date' | translate }}
                                </md-sort>
                            </md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index">
                            <md-table-cell class="post-rrr">
                                <a v-if="canDo('Comment', 'can_view')" @click="showPost(item)"
                                   href="javascript:void(0)">
                                    <div class="img-container">
                                        <img :src="getThumbnail(item.thumbnail)" :alt="'Post thumbnail' | translate "/>
                                    </div>
                                    <div class="post-list-item-extra">
                                        <md-button class="md-primary">
                                            <div class="card-icon">
                                                <md-icon v-if="item.process_type === 'manual'"
                                                         :title="'Manual' | translate ">perm_identity
                                                </md-icon>
                                                <md-icon v-else :title="'Automatic' | translate ">computer</md-icon>
                                            </div>
                                        </md-button>
                                        <small>{{ item.id }}</small>
                                    </div>
                                    <div class="post-list-item-extra">
                                        <md-button class="md-primary">
                                            <div class="card-icon">
                                                <md-icon :title="'Comment' | translate ">comment</md-icon>
                                            </div>
                                        </md-button>
                                        <small>{{ item.comments_count }}</small>
                                    </div>
                                    <div class="post-list-item-extra">
                                        <md-button class="md-primary">
                                            <div class="card-icon">
                                                <md-icon :title="'Like' | translate ">thumb_up</md-icon>
                                            </div>
                                        </md-button>
                                        <small>{{ item.like_count }}</small>
                                    </div>

                                </a>
                            </md-table-cell>
                            <md-table-cell>
                                <reaction
                                    :reactions="{positive:item.positive ,negative:item.negative, neutral:item.neutral}"></reaction>
                            </md-table-cell>
                            <md-table-cell>{{ item.author_username }}</md-table-cell>
                            <md-table-cell>{{ item.formatted_date }}</md-table-cell>
                            <md-table-cell>{{ item.formatted_updated_date }}</md-table-cell>
                        </md-table-row>
                    </md-table>

                    <pagination v-if="pageCount > 1" :pageCount="pageCount" v-model="currentPage" @input="paginate">
                    </pagination>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import {Pagination} from "@/components";
import Reaction from "@/components/Reaction";

export default {
    components: {
        Pagination,
        Reaction
    },
    data() {
        return {
            items: [],
            currentPage: 1,
            pageCount: 0,
            sortBy: 'id_desc',
            organizationKeywords: this.$store.getters.getOrganization?.keywords ?? [],
            userKeywords: this.$store.getters.getUser?.keywords ?? [],
            keywords: []
        };
    },
    created() {
        this.getItems();
    },
    methods: {
        paginate() {
            this.getItems();
        },
        filterByKeyWord() {
            this.currentPage = 1;
            this.getItems();
        },
        getItems() {
            this.items = [];
            this.axios.get(process.env.VUE_APP_API_URL + '/post', {
                params: {page: this.currentPage, keywords: this.keywords, sort_by: this.sortBy}
            })
                .then(response => {
                    this.items = response.data.items;
                    this.pageCount = response.data.pagination.page_count;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getThumbnail(fileName) {
            if (fileName !== null) {
                return process.env.VUE_APP_API_UPLOADS + fileName;
            }
            return this.publicURL + "img/image_placeholder.jpg";
        },
        showPost(item) {
            this.$store.dispatch('setRouterProp', item);
            this.$router.push({name: 'PostShow', params: {id: item.id}});
        },
        sorted(arg) {
            this.sortBy = arg;
            this.currentPage = 1;
            this.getItems();

        }
    },
    computed: {
        total() {
            return this.items.length;
        },
        keywordOptions() {
            if (this.userKeywords) {
                return this.userKeywords.map(item => {
                    return {
                        code: item.name,
                        label: item.name
                    }
                })
            }
            return this.organizationKeywords.map(item => {
                return {
                    code: item.name,
                    label: item.name
                }
            })
        },
    }
};
</script>
<style scoped>
.img-container img {
    max-height: 150px;
    width: auto;
}
</style>
