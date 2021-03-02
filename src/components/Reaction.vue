<template>
    <div class="reaction-container">
        <md-button v-if="positive < 1 && negative < 1 && neutral < 1" class="warning positive" :style="'width:99%'">
            {{ 'No rating' | translate }}
            <md-tooltip md-direction="top">0 %</md-tooltip>
        </md-button>
        <md-button v-show="positive > 1" class="md-success positive" :style="'width:' + positive +'%'">
            {{ reactions['positive'] }}
            <md-tooltip md-direction="top">{{ positive }} %</md-tooltip>
        </md-button>
        <md-button v-show="neutral > 1" class="md-default neutral" :style="'width:' + neutral +'%'">
            {{ reactions['neutral'] }}
            <md-tooltip md-direction="top">{{ neutral }} %</md-tooltip>
        </md-button>
        <md-button v-show="negative > 1" class="md-danger negative" :style="'width:' + negative +'%'">
            {{ reactions['negative'] }}
            <md-tooltip md-direction="top">{{ negative }} %</md-tooltip>
        </md-button>
    </div>
</template>
<script>

export default {
    props: ['reactions'],
    data() {
        return {
        };
    },
    created() {
        this.total;
    },
    methods: {
        createSlider() {

        }
    },
    computed: {
        total() {
            let total = 0;
            if (this.reactions) {

                Object.keys(this.reactions).forEach((key) => {
                    total += this.reactions[key];
                });
            }
            return total;
        },
        positive() {
            let positive = 0;
            if (this.reactions['positive']) {
                positive = Math.round((this.reactions['positive'] * 100) / this.total);
            }
            return positive;
        },
        negative() {
            let positive = 0;
            if (this.reactions['negative']) {
                positive = Math.round((this.reactions['negative'] * 100) / this.total);
            }
            return positive;
        },
        neutral() {
            let positive = 0;
            if (this.reactions['neutral']) {
                positive = Math.round((this.reactions['neutral'] * 100) / this.total);
            }
            return positive;
        }
    },
};
</script>
<style>
.reaction-container {
}
.reaction-container div {
    display: inline-block;
    height: 20px;
}
.reaction-container .md-button {
    margin: 0!important;
    min-width: auto!important;
    border-radius: 0!important;;
}
.reaction-container .md-button .md-ripple {
    margin: 0!important;
    padding: 0!important;;
}
.positive {

}
.neutral {

}
.negative {

}
</style>
