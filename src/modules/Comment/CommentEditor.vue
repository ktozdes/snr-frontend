<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <div class="card-icon">
                        <md-icon v-if="comment.process_type === 'manual'">perm_identity</md-icon>
                        <md-icon v-else>computer</md-icon>
                    </div>
                    <h4 class="title">{{ 'Comment words' | translate }}</h4>
                </md-card-header>
                <md-card-content v-if="comment && comment.content">
                    <div class="tim-typo">
                        <span class="tim-note">{{ 'Rating' | translate }}</span>
                        <p>
                            <reaction v-if="comment"
                                      :reactions="{positive:comment.positive ,negative:comment.negative, neutral:comment.neutral}"></reaction>
                        </p>
                    </div>
                    <md-table table-header-color="green">
                        <md-table-row>
                            <md-table-cell>
                                <md-field>
                                    <label class="md-red-text">{{ 'Selected word' | translate }}:</label>
                                    <md-input type="text" v-model="tempWord.word"></md-input>
                                </md-field>
                            </md-table-cell>
                            <md-table-cell class="text-center">
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': tempWord.type === 1}"
                                           @click="setReaction('positive')">
                                    <md-icon>thumb_up</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': tempWord.type === 0}"
                                           @click="setReaction('neutral')">
                                    <md-icon>thumbs_up_down</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': tempWord.type === -1}"
                                           @click="setReaction('negative')">
                                    <md-icon>thumb_down</md-icon>
                                </md-button>
                            </md-table-cell>
                            <md-table-cell class="md-text-align-right">
                                <md-button class="md-just-icon md-simple md-primary" @click="saveTempWord()">
                                    <md-icon>check</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-simple md-danger" @click="resetTempWord()">
                                    <md-icon>close</md-icon>
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>


                    <p ref="target">{{ comment.content }}</p>

                    <md-table table-header-color="green">
                        <md-table-row>
                            <md-table-head>{{ 'Word' | translate }}</md-table-head>
                            <md-table-head>{{ 'Reaction' | translate }}</md-table-head>
                            <md-table-head>{{ 'Action' | translate }}</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in comment.words" :key="index">
                            <md-table-cell>{{ item.word }}</md-table-cell>
                            <md-table-cell>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': item.type === 1}"
                                           @click="setItemReaction(item, 'positive')">
                                    <md-icon>thumb_up</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': item.type === 0}"
                                           @click="setItemReaction(item, 'neutral')">
                                    <md-icon>thumbs_up_down</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': item.type === -1}"
                                           @click="setItemReaction(item, 'negative')">
                                    <md-icon>thumb_down</md-icon>
                                </md-button>
                            </md-table-cell>
                            <md-table-cell style="width:300px;text-align: center">
                                <md-button class="md-just-icon md-danger" @click="removeWord(index)">
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>

                    <md-card-actions md-alignment="left">
                        <md-button class="md-success" @click="submit">
                            {{ 'Submit' | translate }}
                        </md-button>
                    </md-card-actions>
                </md-card-content>
                <md-card-content v-else>
                    <h3>{{ 'No comment selected' | translate }}</h3>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import {Word} from '@/interfaces/Word';
import Reaction from "@/components/Reaction";

export default {
    components: {
        Reaction
    },
    data() {
        return {
            comment: this.$store.getters.getRouterProp,
            tempWord: new Word({
                word: ''
            }),
            validationError: [],
        };
    },
    mounted() {
        document.addEventListener('mouseup', event => {
            if (event.target === this.$refs.target || event.target.contains(this.$refs.target)) {
                this.pushText();
            }
        });
        if (!this.comment && this.$route?.params?.id) {
            this.comment = {id: this.$route.params.id};
        }
        if (!this.comment.code) {
            this.getComment();
        }
    },
    methods: {
        getComment() {
            this.axios.get(process.env.VUE_APP_API_URL + '/comment/show/' + this.comment.id)
                .then(response => {
                    console.log(response.data);
                    if (response.data?.comment) {
                        this.comment = response.data.comment;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submit() {
            if (this.comment.words.length > 0) {
                console.log(this.comment, this.comment.words);
                const url = process.env.VUE_APP_API_URL + '/word/mass-store/' + this.comment.id;
                this.axios.post(url, {words: this.comment.words})
                    .then(response => {
                        this.resetAll();
                    })
                    .catch(error => {
                    });
            }

        },
        setReaction(reaction) {
            if (reaction === 'positive') {
                this.tempWord.type = 1;
            } else if (reaction === 'neutral') {
                this.tempWord.type = 0;
            } else if (reaction === 'negative') {
                this.tempWord.type = -1;
            }
        },
        setItemReaction(item, reaction) {
            if (reaction === 'positive') {
                item.type = 1;
            } else if (reaction === 'neutral') {
                item.type = 0;
            } else if (reaction === 'negative') {
                item.type = -1;
            }
        },
        saveTempWord() {
            if (this.tempWord.word.trim() !== '') {
                this.comment.words.push(this.tempWord);
                this.resetTempWord();
            }
        },
        resetTempWord() {
            this.tempWord = new Word({
                word: ''
            })
        },
        resetAll() {
            this.resetTempWord();
        },
        removeWord(deletingIndex) {
            this.comment.words.splice(deletingIndex, 1);
        },
        pushText() {
            let tempString = window.getSelection().toString().trim();
            if (tempString.length > 0 && tempString !== '') {
                this.tempWord.word = tempString;
                this.tempWord.index = window.getSelection().baseOffset;

            }
        },
    },
    computed: {}
};
</script>
<style scoped>
.reaction-button {
    height: 50px;
}
</style>
