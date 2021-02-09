<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>edit</md-icon>
                        <md-icon>font_download</md-icon>
                    </div>
                    <h4 class="title">{{ 'Edit post' | translate }}</h4>
                </md-card-header>
                <md-card-content>
                    <md-card-content>
                        Salem deti
                    </md-card-content>

                    <md-card-actions md-alignment="left">
                        <md-button class="md-success" @click="submit">
                            {{ (word.id ? 'Edit' : 'Create') | translate }}
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
            word: new Word(),
            validationError: [],
        };
    },
    created() {
        if (this.$route.params?.id) {
            this.word.id = this.$route.params?.id;
        }
    },
    methods: {
        submit() {
            const url = process.env.VUE_APP_API_URL + ((this.word.id) ? '/word/update/'+ this.word.id : '/word/store');
            this.axios.post(url, this.word)
                .then(response => {
                    if (response.status === 200) {
                        this.$router.push({ name: 'WordList' });
                    }
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                    }
                });
        }
    },
};
</script>
<style scoped>
.md-green-text {
    color:#00c853!important;
}
.md-red-text {
    color:#ff3d00!important;
}
</style>
