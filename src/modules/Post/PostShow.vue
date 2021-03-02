<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>add_task</md-icon>
                    </div>
                    <div class="card-icon">
                        <md-icon v-if="post.process_type === 'auto'">perm_identity</md-icon>
                        <md-icon v-else>computer</md-icon>
                    </div>
                    <h4 class="title">{{ 'Post' | translate }}</h4>
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
                                    <p>{{ post.author_username }}</p>
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
                            </div>
                            <h3></h3>

                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>add_task</md-icon>
                    </div>
                    <h4 class="title">{{ 'Comments' | translate }}</h4>
                </md-card-header>
                <md-card-content>
                    <md-table v-model="items" table-header-color="green">
                        <md-table-row>
                            <md-table-head md-numeric>{{ 'ID' | translate }}</md-table-head>
                            <md-table-head>{{ 'Author' | translate }}</md-table-head>
                            <md-table-head>{{ 'Date' | translate }}</md-table-head>
                            <md-table-head>{{ 'Rating' | translate }}</md-table-head>
                            <md-table-head>{{ 'Content' | translate }}</md-table-head>
                            <md-table-head class="md-text-align-right">{{ 'Action' | translate }}</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index"
                                      :class="{'table-info': hasProcessed(item)}">
                            <md-table-cell>{{ item.id }}</md-table-cell>
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
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>

import Reaction from "@/components/Reaction";

export default {
    components: {
        Reaction
    },
    props: {},
    data() {
        return {
            post: null,
            items: [],
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
            this.axios.get(process.env.VUE_APP_API_URL + '/comment/' + this.post.id)
                .then(response => {
                    this.items = response.data.items;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        selectWords(item) {
            this.$store.dispatch('setRouterProp', item);
            this.$router.push({name: 'CommentEditor', params: {id: item.id}});
            //this.$router.push({name: 'CommentEditor'});
        },
        getThumbnail() {
            return process.env.VUE_APP_API_URL + "/image/proxy/" + this.post.thumbnail;
        },
        hasProcessed(item) {
            return item.id % 2 === 0;
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
