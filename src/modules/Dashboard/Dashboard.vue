<template>
    <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-small-size-100 md-size-100" v-if="organization">
            <md-card>
                <md-card-content>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-30 md-small-size-100" v-if="organization.logo">
                                <div class="image-container">
                                    <img :src="organization.logo.url"/>
                                </div>
                            </div>
                            <div class="md-layout-item md-size-70 md-small-size-100">
                                <div class="tim-typo" v-show="organization.name">
                                    <span class="tim-note">{{ 'Name' | translate }}</span>
                                    <p>{{ organization.name }}</p>
                                </div>
                                <div class="tim-typo" v-show="organization.email">
                                    <span class="tim-note">{{ 'Email' | translate }}</span>
                                    <p>{{ organization.email }}</p>
                                </div>
                                <div class="tim-typo" v-show="organization.phone">
                                    <span class="tim-note">{{ 'Phone' | translate }}</span>
                                    <p>{{ organization.phone }}</p>
                                </div>
                                <div class="tim-typo" v-show="organization.address">
                                    <span class="tim-note">{{ 'Address' | translate }}</span>
                                    <p>{{ organization.address }}</p>
                                </div>
                                <div class="tim-typo" v-if="organizationKeywords">
                                    <span class="tim-note">{{ 'Organization keywords' | translate }}</span>
                                    <md-chips
                                        v-model="organizationKeywords"
                                        class="md-primary"
                                        :md-placeholder="'Add organization keyword ...' | translate"
                                    ></md-chips>
                                    <md-button v-if="canDo('Keyword', 'can_edit')" class="md-sm md-round md-success"
                                               @click="saveOrganizationKeywords">
                                        {{ 'Save' | translate }}
                                    </md-button>
                                </div>
                                <div class="tim-typo" v-if="userKeywords">
                                    <span class="tim-note">{{ 'User keywords' | translate }}</span>
                                    <md-chips
                                        v-model="userKeywords"
                                        class="md-primary"
                                        :md-placeholder="'Add user keyword ...' | translate"
                                    ></md-chips>
                                    <md-button v-if="canDo('Keyword', 'can_edit')" class="md-sm md-round md-success"
                                               @click="saveUserKeywords">
                                        {{ 'Save' | translate }}
                                    </md-button>
                                </div>

                            </div>
                        </div>
                    </md-card-content>
                </md-card-content>
            </md-card>
        </div>
        <div v-if="reportData.total_posts" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
            <stats-card header-color="blue">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>collections</md-icon>
                    </div>
                    <p class="category">{{ 'Posts' | translate }}</p>
                    <h3 class="title">
                        {{ 'Total' | translate }}
                        <animated-number :value="reportData.total_posts"></animated-number>
                    </h3>

                </template>

                <template slot="footer">
                    <div class="stats">
                        <p class="text-left">
                            {{ 'Auto processed' | translate }}
                            <animated-number :value="reportData.auto_processed_posts"></animated-number>
                        </p>
                        <p>
                            {{ 'Manual processed' | translate }}
                            <animated-number :value="reportData.manual_processed_posts"></animated-number>
                        </p>
                    </div>
                </template>
            </stats-card>
        </div>
        <div v-if="reportData.total_comments" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
            <stats-card header-color="green">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>comment</md-icon>
                    </div>
                    <p class="category">{{ 'Comments' | translate }}</p>
                    <h3 class="title">
                        {{ 'Total' | translate }}
                        <animated-number :value="reportData.total_comments"></animated-number>
                    </h3>

                </template>

                <template slot="footer">
                    <div class="stats">
                        <p class="text-left">
                            {{ 'Auto processed' | translate }}
                            <animated-number :value="reportData.auto_processed_comments"></animated-number>
                        </p>
                        <p>
                            {{ 'Manual processed' | translate }}
                            <animated-number :value="reportData.manual_processed_comments"></animated-number>
                        </p>
                    </div>
                </template>
            </stats-card>
        </div>

        <div v-if="reportData.total_post_process" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50 ">
            <stats-card header-color="blue" class="post-word-stats">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>comment</md-icon>
                        <md-icon>font_download</md-icon>
                    </div>
                    <p class="category">{{ 'Post words' | translate }}</p>
                    <h3 class="title">
                        {{ 'Total' | translate }}
                        <animated-number :value="reportData.total_post_process.words_count"></animated-number>
                    </h3>

                </template>

                <template slot="footer">
                        <reaction
                            :reactions="{
                                positive:reportData.total_post_process.positive ,
                                negative:reportData.total_post_process.negative,
                                neutral:reportData.total_post_process.neutral}"></reaction>
                </template>
            </stats-card>
        </div>

        <div v-if="reportData.total_comment_process" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50 ">
            <stats-card header-color="green" class="comment-word-stats">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>comment</md-icon>
                        <md-icon>font_download</md-icon>
                    </div>
                    <p class="category">{{ 'Comment words' | translate }}</p>
                    <h3 class="title">
                        {{ 'Total' | translate }}
                        <animated-number :value="reportData.total_comment_process.words_count"></animated-number>
                    </h3>

                </template>

                <template slot="footer">
                        <reaction
                            :reactions="{
                                positive:reportData.total_comment_process.positive ,
                                negative:reportData.total_comment_process.negative,
                                neutral:reportData.total_comment_process.neutral}"></reaction>
                </template>
            </stats-card>
        </div>


        <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        >
            <chart-card
                header-animation="true"
                :chart-data="emailsSubscriptionChart.data"
                :chart-options="emailsSubscriptionChart.options"
                :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
                chart-type="Bar"
                chart-inside-header
                background-color="rose"
            >
                <md-icon slot="fixed-button">build</md-icon>
                <md-button class="md-simple md-info md-just-icon" slot="first-button">
                    <md-icon>refresh</md-icon>
                    <md-tooltip md-direction="bottom">Refresh</md-tooltip>
                </md-button>
                <md-button class="md-simple md-just-icon" slot="second-button">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="bottom">Change Date</md-tooltip>
                </md-button>

                <template slot="content">
                    <h4 class="title">Website Views</h4>
                    <p class="category">
                        Last Campaign Performance
                    </p>
                </template>

                <template slot="footer">
                    <div class="stats">
                        <md-icon>access_time</md-icon>
                        updated
                        <animated-number :value="10"></animated-number>
                        days ago
                    </div>
                </template>
            </chart-card>
        </div>
    </div>
</template>

<script>
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import {
    StatsCard,
    ChartCard,
    AnimatedNumber,
} from "@/components";
import {Organization} from "@/interfaces/Organization";
import Reaction from "@/components/Reaction";

export default {
    components: {
        Reaction,
        StatsCard,
        ChartCard,
        AnimatedNumber,
    },
    data() {
        return {
            organization: this.$store.getters.getOrganization,
            user: this.$store.getters.getUser,
            userKeywords: [],
            organizationKeywords: [],
            reportData: [],


            emailsSubscriptionChart: {
                data: {
                    labels: [
                        "Ja",
                        "Fe",
                        "Ma",
                        "Ap",
                        "Mai",
                        "Ju",
                        "Jul",
                        "Au",
                        "Se",
                        "Oc",
                        "No",
                        "De"
                    ],
                    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
                },
                options: {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                }
                            }
                        }
                    ]
                ]
            }
        };
    },
    created() {
        this.setKeywords();
        this.getReportData();

    },
    methods: {
        setKeywords() {
            this.userKeywords = this.user.keywords.map((keyword) => keyword.name);
            this.organizationKeywords = this.organization.keywords.map((keyword) => keyword.name);
        },
        getReportData() {
            const url = process.env.VUE_APP_API_URL + '/report/total';
            this.axios.get(url)
                .then(response => {
                    if (response.status === 200) {
                        this.reportData = response.data.report;
                        console.log(this.reportData, this.reportData.manual_processed_posts);
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                    }
                });
        },
        handleResponse(response) {
            this.user.keywords = response.data.user_keywords;
            this.organization.keywords = response.data.organization_keywords;
            this.$store.dispatch('login', this.user);
            this.$store.dispatch('setOrganization', this.organization);
            this.setKeywords();
        },
        saveUserKeywords() {
            const url = process.env.VUE_APP_API_URL + '/keyword/user-sync/' + this.user.id;
            this.axios.post(url, {keywords: this.userKeywords})
                .then(response => {
                    if (response.status === 200) {
                        this.handleResponse(response);
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                    }
                });
        },
        saveOrganizationKeywords() {
            const url = process.env.VUE_APP_API_URL + '/keyword/organization-sync/' + this.organization.id;
            this.axios.post(url, {keywords: this.organizationKeywords})
                .then(response => {
                    if (response.status === 200) {
                        this.handleResponse(response);
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    if (error.response.status === 422) {
                        this.validationError = error.response.data.errors;
                    }
                });
        }
    },
};
</script>
