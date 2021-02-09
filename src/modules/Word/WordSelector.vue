<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>font_download</md-icon>
                    </div>
                    <h4 class="title">{{ 'Select words' | translate }}</h4>
                </md-card-header>
                <md-card-content v-if="comment && comment.content">
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
                                           :class="{'md-info': tempWord.positive_total === 1}"
                                           @click="setReaction(tempWord, 'positive')">
                                    <md-icon>thumb_up</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': tempWord.neutral_total === 1}"
                                           @click="setReaction(tempWord, 'neutral')">
                                    <md-icon>thumbs_up_down</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': tempWord.negative_total === 1}"
                                           @click="setReaction(tempWord, 'negative')">
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

                        <md-table-row v-for="(item, index) in words" :key="index">
                            <md-table-cell>{{ item.word }}</md-table-cell>
                            <md-table-cell>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': item.positive_total === 1}"
                                           @click="setReaction(item, 'positive')">
                                    <md-icon>thumb_up</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': item.neutral_total === 1}"
                                           @click="setReaction(item, 'neutral')">
                                    <md-icon>thumbs_up_down</md-icon>
                                </md-button>
                                <md-button class="md-just-icon md-round"
                                           :class="{'md-info': item.negative_total === 1}"
                                           @click="setReaction(item, 'negative')">
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

export default {
    data() {
        return {
            comment: this.$store.getters.getRouterProp,
            words: [],
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
    },
    methods: {
        submit() {
            if (this.words.length > 0) {
                const url = process.env.VUE_APP_API_URL + '/word/mass-store';
                this.axios.post(url, {words: this.words})
                    .then(response => {
                        this.resetAll();
                    })
                    .catch(error => {
                    });
            }

        },
        setReaction(tmpWord, reaction) {
            tmpWord.positive_total = 0;
            tmpWord.neutral_total = 0;
            tmpWord.negative_total = 0;

            if (reaction === 'positive') {
                tmpWord.positive_total = 1;
            } else if (reaction === 'neutral') {
                tmpWord.neutral_total = 1;
            } else if (reaction === 'negative') {
                tmpWord.negative_total = 1;
            }
        },
        saveTempWord() {
            if (this.tempWord.word.trim() !== '') {
                this.words.push(this.tempWord);
                this.resetTempWord();
            }
        },
        resetTempWord() {
            this.tempWord = new Word({
                word: ''
            })
        },
        resetAll() {
            this.words = [];
            this.resetTempWord();
        },
        removeWord(deletingIndex) {
            this.words.splice(deletingIndex, 1);
        },
        pushText() {
            let tempString = window.getSelection().toString().trim();
            if (tempString.length > 0 && tempString !== '') {
                this.tempWord.word = this.tempWord.word
                    ? this.tempWord.word + ' ' + tempString
                    : tempString;
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
