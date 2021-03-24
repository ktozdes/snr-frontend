<template>
    <div class="md-layout  page-social-network-user-comments-list">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <h4 class="title">{{ 'User' | translate }}</h4>
                </md-card-header>
                <md-card-content class="mr">
                    <div class="md-layout" v-if="socialNetworkUser">
                        <div class="md-layout-item md-size-80 md-small-size-100">

                            <div class="row">
                                <div class="tim-typo">
                                    <span class="tim-note">{{ 'Author' | translate }}</span>
                                    <p>{{ socialNetworkUser.socialNetworkUser }} a</p>
                                    <!--                                    <p><a :href="'https://www.instagram.com/p/' + post.code" target="_blank">{{ post.author_username }}</a></p>-->
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
                    <md-table table-header-color="green" class="post-list-table">
                        <md-table-row>
                            <md-table-head md-numeric>{{ 'ID' | translate }}</md-table-head>
                            <md-table-head>{{ 'Post' | translate }}</md-table-head>
                            <md-table-head>{{ 'Content' | translate }}</md-table-head>
                            <md-table-head>{{ 'Date' | translate }}</md-table-head>
                            <md-table-head>{{ 'Rating' | translate }}</md-table-head>
                            <md-table-head
                                v-if="canDo('Word', 'can_create')"
                                class="md-text-align-right">{{ 'Action' | translate }}
                            </md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in comments" :key="index"
                                      :class="{'table-info': hasProcessed(item)}">
                            <md-table-cell>{{ item.id }}
                                <div class="card-icon">
                                    <md-icon v-if="item.process_type === 'manual'">perm_identity</md-icon>
                                    <md-icon v-else>computer</md-icon>
                                </div>
                            </md-table-cell>
                            <md-table-cell class="post-rrr">
                                <a v-if="canDo('Comment', 'can_view')" @click="showPost(item.post)"
                                   href="javascript:void(0)">
                                    <div class="img-container">
                                        <img :src="getPostThumbnail(item.post.thumbnail)" :alt="'Post thumbnail' | translate "/>
                                    </div>
                                    <div class="post-list-item-extra">
                                        <md-button class="md-primary">
                                            <div class="card-icon">
                                                <md-icon v-if="item.post.process_type === 'manual'"
                                                         :title="'Manual' | translate ">perm_identity
                                                </md-icon>
                                                <md-icon v-else :title="'Automatic' | translate ">computer</md-icon>
                                            </div>
                                        </md-button>
                                        <small>{{ item.post.id }}</small>
                                    </div>
                                    <div class="post-list-item-extra">
                                        <md-button class="md-primary">
                                            <div class="card-icon">
                                                <md-icon :title="'Comment' | translate ">comment</md-icon>
                                            </div>
                                        </md-button>
                                        <small>{{ item.post.comments_count }}</small>
                                    </div>
                                    <div class="post-list-item-extra">
                                        <md-button class="md-primary">
                                            <div class="card-icon">
                                                <md-icon :title="'Like' | translate ">thumb_up</md-icon>
                                            </div>
                                        </md-button>
                                        <small>{{ item.post.like_count }}</small>
                                    </div>

                                </a>
<!--                                {{ item.post.content }}-->
                            </md-table-cell>
                            <md-table-cell>{{ item.content }}</md-table-cell>
                            <md-table-cell>{{ item.formatted_date }}</md-table-cell>
                            <md-table-cell>
                                <reaction
                                    :reactions="{positive:item.positive ,negative:item.negative, neutral:item.neutral}"></reaction>
                            </md-table-cell>
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
import {Pagination} from "@/components";

export default {
    components: {
        Pagination,
        Reaction
    },
    data() {
        return {
            socialNetworkUser: null,
            comments: [],
            currentPage: 1,
            pageCount: 0,
        };
    },
    created() {
        if (!this.socialNetworkUser && this.$route?.params?.id) {
            this.socialNetworkUser = {id: this.$route.params.id};
            this.getSocialNetworkUser();
        }
    },
    methods: {
        getSocialNetworkUser() {
            const url = process.env.VUE_APP_API_URL + '/social-network-user/comments/' + this.socialNetworkUser.id;
            this.axios.get(url, this.word)
                .then(response => {
                    this.comments = response.data.items;
                    this.socialNetworkUser = response.data.user;
                    this.pageCount = response.data.pagination.page_count;
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                    }
                });
        },
        showPost(item) {
            this.$store.dispatch('setRouterProp', item);
            this.$router.push({name: 'PostShow', params: {id: item.id}});
        },
        selectWords(item) {
            this.$router.push({name: 'CommentEditor', params: {id: item.id}});
        },
        getPostThumbnail(fileName) {
            if (fileName !== null) {
                return process.env.VUE_APP_API_UPLOADS + fileName;
            }
            return this.publicURL + "img/image_placeholder.jpg";
        },
        hasProcessed(item) {
            return item.process_type === 'manual';
        }
    },
    computed: {}
};
</script>
<style scoped>
.md-green-text {
    color: #00c853 !important;
}

.md-red-text {
    color: #ff3d00 !important;
}
</style>
