<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <h4 class="title">{{ 'Words' | translate }}</h4>
                    <router-link :to="{path: 'word/create/'}">
                        <div class="card-icon card-icon-right">
                            <md-icon>add</md-icon>
                        </div>
                    </router-link>
                </md-card-header>
                <md-card-content>
                    <md-table v-model="tableData" table-header-color="green">
                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                            <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                            <md-table-cell md-label="Word">{{ item.word }}</md-table-cell>
                            <md-table-cell md-label="Reaction" style="width:300px;text-align: center">
                                <reaction :reactions="item.reaction"></reaction>
                            </md-table-cell>
                            <md-table-cell md-label="Action" style="width:200px;text-align: right">
                                <md-button :to="{path: 'word/edit/' + 2}" class="md-just-icon md-success">
                                    <md-icon>edit</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-danger" >
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

export default {
    components: {Reaction},
    data() {
        return {
            selected: [],
            tableData: [
                {
                    id: 1,
                    word: "Hello",
                    reaction: {
                        positive: 1,
                        negative: 3,
                        neutral: 2
                    },
                    action: "Niger",
                },
                {
                    id: 2,
                    word: "Bye",
                    reaction: {
                        positive: 60,
                        negative: 10,
                        neutral: 30
                    },
                    action: "Niger",
                },
                {
                    id: 3,
                    word: "Best",
                    reaction: {
                        positive: 100,
                        negative: 0,
                        neutral: 0
                    },
                    action: "Niger",
                },
                {
                    id: 4,
                    word: "Fuck",
                    reaction: {
                        positive: 0,
                        negative: 90,
                        neutral: 10
                    },
                    action: "Niger",
                },
            ],

        };
    },
    methods: {
        testApi() {
            this.axios.get(process.env.VUE_APP_API_URL + '/test-close')
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
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
