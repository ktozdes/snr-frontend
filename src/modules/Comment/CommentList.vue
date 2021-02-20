<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>add_task</md-icon>
                    </div>
                    <h4 class="title">{{ 'Comments' | translate }}</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout" v-if="post.code">
                        <div class="md-layout-item md-size-50 md-small-size-100">
                            <div class="img-container text-center">
                                <img :src="getThumbnail(post.thumbnail)" :alt="'Post thumbnail' | translate "/>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-50 md-small-size-100">
                            <h3>{{ post.code }}</h3>
                            <p>{{ post.author_username }}</p>
                        </div>
                    </div>
                    <div>
                    </div>
                    <md-table v-model="items" table-header-color="green">
                        <md-table-row>
                            <md-table-head md-numeric>{{ 'ID' | translate }}</md-table-head>
                            <md-table-head>{{ 'Author' | translate }}</md-table-head>
                            <md-table-head>{{ 'Date' | translate }}</md-table-head>
                            <md-table-head>{{ 'Content' | translate }}</md-table-head>
                            <md-table-head class="md-text-align-right">{{ 'Action' | translate }}</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in items" :key="index"
                                      :class="{'table-info': hasProcessed(item)}">
                            <md-table-cell>{{ item.id }}</md-table-cell>
                            <md-table-cell>{{ item.author_username }}</md-table-cell>
                            <md-table-cell>{{ item.formatted_date }}</md-table-cell>
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

import Swal from "sweetalert2";
import {Post} from "@/interfaces/Post";

export default {
    props: {},
    data() {
        return {
            post: this.$store.getters.getRouterProp,
            items: [],
        };
    }
    ,
    created() {
        //this.post = this.$route.params?.post;

        if (!this.post && this.$route?.params?.post_id) {
            this.post = {id: this.$route.params.post_id};
            this.getComments();
        }
        else if (this.post.id === this.$route?.params?.post_id) {
            this.getComments();
        }
    }
    ,
    methods: {
        getComments() {
            this.axios.get(process.env.VUE_APP_API_URL + '/comment/' + this.post.id)
                .then(response => {
                    this.items = response.data.items;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        selectWords(item) {
            this.$store.dispatch('setRouterProp', item);
            this.$router.push({ name: 'WordSelector'});
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
</style>
