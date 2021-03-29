<template>
    <div class="md-layout page-post-show">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon v-if="post.process_type === 'manual'">perm_identity</md-icon>
                        <md-icon v-else>computer</md-icon>
                    </div>
                    <router-link v-if="canDo('Post', 'can_edit')" :to="{path: '/post/edit/' + post.id}">
                        <div class="card-icon">
                            <md-icon>edit</md-icon>
                        </div>
                    </router-link>
                    <h4 class="title">{{ 'Post' | translate }}</h4>
                    <div v-if="canDo('Word', 'can_create')" @click="setManualReaction"
                         class="card-icon card-icon-right">
                        <md-icon>ballot</md-icon>
                    </div>
                </md-card-header>
                <md-card-content class="mr">
                    <div class="md-layout" v-if="post.code">
                        <div class="md-layout-item md-size-20 md-small-size-100">
                            <div class="img-container text-center">
                                <img :src="getThumbnail(post.thumbnail)" :alt="'Post thumbnail' | translate "/>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-80 md-small-size-100">

                            <div class="row">
                                <div class="tim-typo">
                                    <span class="tim-note">{{ 'Author' | translate }}</span>
                                    <p><a :href="'https://www.instagram.com/p/' + post.code"
                                          target="_blank">{{ post.author_username }}</a></p>
                                </div>
                                <div class="tim-typo">
                                    <span class="tim-note">{{ 'Rating' | translate }}</span>
                                    <p>
                                        <reaction
                                            :reactions="{positive:post.positive ,negative:post.negative, neutral:post.neutral}"></reaction>
                                    </p>
                                </div>
                                <div class="tim-typo">
                                    <span class="tim-note">{{ 'Content' | translate }}</span>
                                    <p class="overflow-wrap--anywhere">{{ post.content }}</p>
                                </div>
                                <div class="tim-typo">
                                    <span class="tim-note">{{ 'Additional' | translate }}</span>
                                    <p>
                                        <strong>{{ 'Likes' | translate }}</strong>
                                        {{ post.like_count }}
                                    </p>
                                    <p>
                                        <strong>{{ 'Created date' | translate }}</strong>
                                        {{ post.formatted_date }}
                                    </p>
                                    <p>
                                        <strong>{{ 'Updated date' | translate }}</strong>
                                        {{ post.formatted_updated_date }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>comment</md-icon>
                    </div>
                    <h4 class="title">{{ 'Comments' | translate }}</h4>
                </md-card-header>
                <md-card-content>
                    <pagination v-if="pageCount > 1" :pageCount="pageCount" v-model="currentPage" @input="paginate">
                    </pagination>
                    <md-table  class="post-list-table" table-header-color="green">
                        <md-table-row>
                            <md-table-head md-numeric>{{ 'ID' | translate }}</md-table-head>
                            <md-table-head md-numeric>
                                <md-sort :sortingLabel="'like_count'" :sortBy="sortBy" @sorted="sorted">
                                    {{ 'Likes' | translate }}
                                </md-sort>
                            </md-table-head>
                            <md-table-head>{{ 'Author' | translate }}</md-table-head>
                            <md-table-head>{{ 'Date' | translate }}</md-table-head>
                            <md-table-head>{{ 'Rating' | translate }}</md-table-head>
                            <md-table-head>{{ 'Content' | translate }}</md-table-head>
                            <md-table-head
                                v-if="canDo('Word', 'can_create')"
                                class="md-text-align-right">{{ 'Action' | translate }}
                            </md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index"
                                      :class="{'table-info': hasProcessed(item)}">
                            <md-table-cell>
                                <div class="post-list-item-extra">
                                    <md-button class="md-primary md-icon-button">
                                        <div class="card-icon">
                                            <md-icon v-if="item.process_type === 'manual'"
                                                     :title="'Manual' | translate ">perm_identity
                                            </md-icon>
                                            <md-icon v-else :title="'Automatic' | translate ">computer</md-icon>
                                        </div>
                                    </md-button>
                                    <small>{{ item.id }}</small>
                                </div>
                            </md-table-cell>
                            <md-table-cell>
                                <div class="comment-list-item-extra">
                                    <md-button class="md-primary md-icon-button">
                                        <div class="card-icon">
                                            <md-icon :title="'Like' | translate ">thumb_up</md-icon>
                                        </div>
                                    </md-button>
                                    <small>{{ item.like_count }}</small>
                                </div>
                            </md-table-cell>
                            <md-table-cell>{{ item.author_username }}</md-table-cell>
                            <md-table-cell>{{ item.formatted_date }}</md-table-cell>
                            <md-table-cell>
                                <reaction
                                    :reactions="{positive:item.positive ,negative:item.negative, neutral:item.neutral}"></reaction>
                            </md-table-cell>
                            <md-table-cell>{{ item.content }}</md-table-cell>
                            <md-table-cell class="md-text-align-right">
                                <md-button v-if="canDo('Word', 'can_create')" @click="selectWords(item)"
                                           class="md-just-icon md-success">
                                    <md-icon>edit</md-icon>
                                </md-button>
                            </md-table-cell>
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

import Reaction from "@/components/Reaction";
import Swal from "sweetalert2";
import {Pagination} from "@/components";

export default {
    components: {
        Pagination,
        Reaction
    },
    props: {},
    data() {
        return {
            post: null,
            items: [],
            currentPage: 1,
            pageCount: 0,
            sortBy: 'id'
        };
    }
    ,
    created() {
        if (!this.post && this.$route?.params?.id) {
            this.post = {id: this.$route.params.id};
        }
        if (!this.post.code) {
            this.getPost();
        }
        this.getComments();
    }
    ,
    methods: {
        paginate() {
            this.getComments();
        },
        sorted(arg) {
            this.sortBy = arg;
            this.currentPage = 1;
            this.getComments();
        },
        getPost() {
            this.axios.get(process.env.VUE_APP_API_URL + '/post/show/' + this.post.id)
                .then(response => {
                    if (response.data?.post) {
                        this.post = response.data.post;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getComments() {
            this.items = [];
            this.axios.get(process.env.VUE_APP_API_URL + '/comment/' + this.post.id, {
                params: {
                    page: this.currentPage,
                    keywords: this.keywords,
                    sort_by: this.sortBy,
                }
            })

                .then(response => {
                    this.items = response.data.items;
                    this.pageCount = response.data.pagination.page_count;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        setManualReaction() {
            Swal.fire({
                title: this.$options.filters.translate("Assign custom rating"),
                html: `<div class="md-field md-theme-default">
                    <input type="text" id="custom-positive" class="md-input" placeholder="positive" ref="input1">
                    <input type="text" id="custom-neutral" class="md-input" placeholder="neutral" ref="input2">
                    <input type="text" id="custom-negative" class="md-input" placeholder="negative" ref="input3">
                    </div>`,
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "md-button md-success",
                cancelButtonClass: "md-button md-danger",
                confirmButtonText: this.$options.filters.translate("Save"),
                cancelButtonText: this.$options.filters.translate("Cancel"),
                buttonsStyling: false
            }).then(result => {
                if (result.value) {
                    const positive = document.querySelector("input[id=custom-positive]").value;
                    const neutral = document.querySelector("input[id=custom-neutral]").value;
                    const negative = document.querySelector("input[id=custom-negative]").value;

                    if (positive > 0 || neutral > 0 || negative > 0) {
                        this.axios.post(process.env.VUE_APP_API_URL + '/post/update-stats/' + this.post.id, {
                            positive,
                            neutral,
                            negative
                        })
                            .then(response => {
                                if (response.status === 200) {
                                    this.$router.push({name: 'PostList'});
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                }
            });
        },
        selectWords(item) {
            this.$store.dispatch('setRouterProp', item);
            this.$router.push({name: 'CommentEditor', params: {id: item.id}});
            //this.$router.push({name: 'CommentEditor'});
        },
        hasProcessed(item) {
            return item.process_type === 'manual';
        }
    }
}
;
</script>
<style scoped>
.overflow-wrap--anywhere {
    overflow-wrap: anywhere;
}
</style>
