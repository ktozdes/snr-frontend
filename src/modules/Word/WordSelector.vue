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
                <md-card-content>
                    <md-card-content>
                        <p ref="target">Участие в онлайновой конференции бесплатное. Всем желающим участвовать нужно предварительно
                            зарегистрироваться на сайте, трансляция докладов будет вестись из личных кабинетов. Если уже
                            оплатили PGConf.Russia 2021, то регистрироваться повторно не нужно. Регистрация
                            действительна для обоих событий — PGConf.Online и ближайшего PGConf.Russia. Также можно
                            отказаться от участия в PGConf.Russia и вернуть свои деньги. Для этого надо написать на
                            info@pgconf.ru.</p>
                    </md-card-content>

                    <md-table table-header-color="green">
                        <md-table-row>
                            <md-table-head>{{ 'Word' | translate }}</md-table-head>
                            <md-table-head>{{ 'Reaction' | translate }}</md-table-head>
                            <md-table-head>{{ 'Action' | translate }}</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="(item, index) in words" :key="index">
                            <md-table-cell>{{ item.word }}</md-table-cell>
                            <md-table-cell>
                                <div class="md-group">
                                    <md-button class="md-button reaction-button md-theme-default" :class="{'md-info': item.positive_total === 1}" @click="setReaction(index, 'positive')">{{ 'Positive' | translate }}</md-button>
                                    <md-button class="md-button reaction-button md-theme-default" :class="{'md-info': item.neutral_total === 1}" @click="setReaction(index, 'neutral')">{{ 'Neutral' | translate }}</md-button>
                                    <md-button class="md-button reaction-button md-theme-default" :class="{'md-info': item.negative_total === 1}" @click="setReaction(index, 'negative')">{{ 'Negative' | translate }}</md-button>
                                </div>
                            </md-table-cell>
                            <md-table-cell style="width:300px;text-align: center">
                                <md-button class="md-just-icon md-danger" @click="removeWord(index)"><md-icon>delete</md-icon>
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
            </md-card>
        </div>
    </div>
</template>
<script>
import {Word} from '@/interfaces/Word';

export default {
    data() {
        return {
            words: [],
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
            console.log(this.words);
        },
        setReaction(index, reaction) {
            this.words[index].positive_total = 0;
            this.words[index].neutral_total = 0;
            this.words[index].negative_total = 0;

            if (reaction === 'positive') {
                this.words[index].positive_total = 1;
            }
            else if (reaction === 'neutral') {
                this.words[index].neutral_total = 1;
            }
            else if (reaction === 'negative') {
                this.words[index].negative_total = 1;
            }
        },
        removeWord(deletingIndex) {
            this.words.splice(deletingIndex, 1);
        },
        pushText() {
            if (window.getSelection().toString().length > 0) {
                let tmpWord = new Word({
                    word: window.getSelection().toString()
                })
                this.words.push(tmpWord);
            }
            console.log(this.words);
        }
    },
    computed: {
        // filteredWord() {
        //     return this.words;
        // }
    }
};
</script>
<style scoped>
.reaction-button{
    height: 50px;
}
</style>
