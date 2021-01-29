<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>{{ word.id ? 'edit' : 'add' }}</md-icon>
                        <md-icon>font_download</md-icon>
                    </div>
                    <h4 class="title">{{ (word.id ? 'Edit word' : 'Create word') | translate}}</h4>
                </md-card-header>
                <md-card-content>
                    <md-card-content>
                        <md-field>
                            <label>{{ 'Word' | translate }}</label>
                            <md-input v-model="word.name" type="text"></md-input>
                            <md-button class="md-success" @click="word.reaction = 'positive'">{{ 'Positive' | translate }}</md-button>
                            <md-button class="md-default" @click="word.reaction = 'neutral'">{{ 'Neutral' | translate }}</md-button>
                            <md-button class="md-danger" @click="word.reaction = 'negative'">{{ 'Negative' | translate }}</md-button>
                        </md-field>
                    </md-card-content>

                    <md-card-actions md-alignment="left">
                        <md-button class="md-success" @click="submitWord">{{ (word.id ? 'Edit' : 'Create') | translate}}</md-button>
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
            word: new Word(),
        };
    },
    created() {
        if (this.$route.params?.id) {
            this.word.id = this.$route.params?.id;
        }
        console.log('rrr', this.word);
    },
    methods: {
        submitWord() {
            console.log(this.word);
        }
    }
};
</script>
<style scoped>
</style>
