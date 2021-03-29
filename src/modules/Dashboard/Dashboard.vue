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

        <div v-if="reportData.total_post_process"
             class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50 ">
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

        <div class="md-layout-item md-size-100">
            <global-sales-card header-color="green">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>language</md-icon>
                    </div>
                    <h4 class="title">{{ 'Popular posts by likes' | translate }}</h4>
                </template>

                <template slot="content">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-100">
                            <md-table>
                                <md-table-row>
                                    <md-table-head>{{ 'Post' | translate }}</md-table-head>
                                    <md-table-head>{{ 'Likes' | translate }}</md-table-head>
                                    <md-table-head>{{ 'Rating' | translate }}</md-table-head>
                                    <md-table-head>{{ 'Date' | translate }}</md-table-head>
                                    <md-table-head>{{ 'Updated date' | translate }}</md-table-head>
                                </md-table-row>

                                <md-table-row v-for="(item, index) in postsByLikes" :key="index">
                                    <md-table-cell class="thumbnail-table-row">
                                        <div class="img-container">
                                            <img :src="getThumbnail(item.thumbnail)"
                                                 :alt="'Post thumbnail' | translate "/>
                                        </div>
                                        <p><small>{{ item.id }}</small></p>
                                    </md-table-cell>
                                    <md-table-cell>
                                            <md-button class="md-primary  md-icon-button">
                                                <div class="card-icon">
                                                    <md-icon :title="'Like' | translate ">thumb_up</md-icon>
                                                </div>
                                            </md-button>
                                            <small>{{ item.like_count }}</small>
                                    </md-table-cell>
                                    <md-table-cell>
                                        <reaction
                                            :reactions="{positive:item.positive ,negative:item.negative, neutral:item.neutral}"></reaction>
                                    </md-table-cell>
                                    <md-table-cell>
                                        {{ item.formatted_date }}
                                    </md-table-cell>
                                    <md-table-cell>{{ item.formatted_updated_date }}</md-table-cell>
                                </md-table-row>
                            </md-table>
                        </div>
                    </div>
                </template>
            </global-sales-card>
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
import {
    StatsCard,
    ChartCard,
    AnimatedNumber,
    GlobalSalesCard
} from "@/components";
import Reaction from "@/components/Reaction";

export default {
    components: {
        Reaction,
        StatsCard,
        ChartCard,
        AnimatedNumber,
        GlobalSalesCard
    },
    data() {
        return {
            organization: this.$store.getters.getOrganization,
            user: this.$store.getters.getUser,
            userKeywords: [],
            organizationKeywords: [],
            reportData: [],
            postsByLikes: [],


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
        this.getPostsByLikes();

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
        getPostsByLikes() {
            this.axios.get(process.env.VUE_APP_API_URL + '/post', {
                params: {
                    page: 1,
                    sort_by: 'like_count_desc',
                    per_page: 5
                }
            })
                .then(response => {
                    console.log('www', response.data.items);
                    this.postsByLikes = response.data.items;
                })
                .catch(error => {
                    console.log(error);
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
