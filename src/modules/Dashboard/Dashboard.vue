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
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <stats-card header-color="blue">
                <template slot="header">
                    <div class="card-icon">
                        <i class="fab fa-twitter"></i>
                    </div>
                    <p class="category">Folowers</p>
                    <h3 class="title">
                        +
                        <animated-number :value="245"></animated-number>
                    </h3>
                </template>

                <template slot="footer">
                    <div class="stats">
                        <md-icon>update</md-icon>
                        Just Updated
                    </div>
                </template>
            </stats-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <stats-card header-color="rose">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>equalizer</md-icon>
                    </div>
                    <p class="category">Website Visits</p>
                    <h3 class="title">
                        <animated-number :value="75"></animated-number>
                        .
                        <animated-number
                            :value="521"
                        ></animated-number>
                    </h3>
                </template>

                <template slot="footer">
                    <div class="stats">
                        <md-icon>local_offer</md-icon>
                        Tracked from Google Analytics
                    </div>
                </template>
            </stats-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <stats-card header-color="green">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>store</md-icon>
                    </div>
                    <p class="category">Revenue</p>
                    <h3 class="title">
                        $
                        <animated-number :value="34"></animated-number>
                        ,
                        <animated-number
                            :value="245"
                        ></animated-number>
                    </h3>
                </template>

                <template slot="footer">
                    <div class="stats">
                        <md-icon>date_range</md-icon>
                        Last
                        <animated-number :value="24"></animated-number>
                        Hours
                    </div>
                </template>
            </stats-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <stats-card header-color="warning">
                <template slot="header">
                    <div class="card-icon">
                        <md-icon>weekend</md-icon>
                    </div>
                    <p class="category">Bookings</p>
                    <h3 class="title">
                        <animated-number :value="184"></animated-number>
                    </h3>
                </template>

                <template slot="footer">
                    <div class="stats">
                        <md-icon class="text-danger">warning</md-icon>
                        <a href="#pablo">Get More Space...</a>
                    </div>
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

export default {
    components: {
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
            product1: "./img/card-2.jpg",
            product2: "./img/card-3.jpg",
            product3: "./img/card-1.jpg",
            seq2: 0,


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

    },
    methods: {
        setKeywords() {
            this.userKeywords = this.user.keywords.map((keyword) => keyword.name);
            this.organizationKeywords = this.organization.keywords.map((keyword) => keyword.name);
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
