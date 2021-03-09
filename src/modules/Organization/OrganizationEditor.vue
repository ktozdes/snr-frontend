<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>{{ organization.id ? 'edit' : 'add' }}</md-icon>
                        <md-icon>business</md-icon>
                    </div>
                    <h4 class="title">{{
                            (organization.id ? 'Edit organization' : 'Create organization') | translate
                        }}</h4>
                </md-card-header>
                <md-card-content>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-30 md-small-size-100">
                                <h4 class="card-title">{{ 'Logo' | translate}}</h4>
                                <div class="file-input">
                                    <div v-if="!imageRegular">
                                        <div class="image-container">
                                            <img :src="defaultImage" title=""/>
                                        </div>
                                    </div>
                                    <div class="image-container" v-else>
                                        <img :src="imageRegular"/>
                                    </div>
                                    <div class="button-container">
<!--                                        <md-button-->
<!--                                            class="md-danger md-round"-->
<!--                                            @click="removeImage"-->
<!--                                            v-if="imageRegular"-->
<!--                                        ><i class="fa fa-times"></i>Remove-->
<!--                                        </md-button-->
<!--                                        >-->
                                        <md-button class="md-success md-round md-fileinput">
                                            <template v-if="!imageRegular">Select image</template>
                                            <template v-else>Change</template>
                                            <input type="file" @change="onFileChange"/>
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                            <div class="md-layout-item md-size-70 md-small-size-100">
                                <md-field :class="{'md-invalid' : !nameIsValid}">
                                    <label>{{ 'Name' | translate }}</label>
                                    <md-input v-model="organization.name" type="text" required></md-input>
                                    <span class="md-error" v-if="!organization.name">{{
                                            'This field is required.' | translate
                                        }}</span>
                                    <span v-for="(error, key) in validationError.name"
                                          :key="key"
                                          class="md-error">{{ error }}</span>
                                </md-field>
                                <md-field :class="{'md-invalid' : validationError.email}">
                                    <label>{{ 'Email' | translate }}</label>
                                    <md-input v-model="organization.email" type="email"></md-input>
                                    <span v-for="(error, key) in validationError.email"
                                          :key="key"
                                          class="md-error">{{ error }}</span>
                                </md-field>
                                <md-field :class="{'md-invalid' : validationError.phone}">
                                    <label>{{ 'Phone' | translate }}</label>
                                    <md-input v-model="organization.phone" type="text"></md-input>
                                    <span v-for="(error, key) in validationError.phone"
                                          :key="key"
                                          class="md-error">{{ error }}</span>
                                </md-field>
                                <md-field :class="{'md-invalid' : validationError.address}">
                                    <label>{{ 'Address' | translate }}</label>
                                    <md-input v-model="organization.address" type="text"></md-input>
                                    <span v-for="(error, key) in validationError.address"
                                          :key="key"
                                          class="md-error">{{ error }}</span>
                                </md-field>

                                <div>
                                    <h4 class="card-title">{{ 'Keywords' | translate }}</h4>
                                    <md-chips
                                        v-model="keywords"
                                        class="md-primary"
                                        md-placeholder="Add keyword ..."
                                    ></md-chips>
                                </div>
                            </div>
                        </div>


                    </md-card-content>


                    <md-card-actions md-alignment="left">
                        <md-button class="md-success" @click="submit">
                            {{ (organization.id ? 'Edit' : 'Create') | translate }}
                        </md-button>
                    </md-card-actions>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
import {Organization} from "@/interfaces/Organization";

export default {
    data() {
        return {
            organization: new Organization(),
            keywords: [],
            imageRegular: "",
            validationError: [],
        };
    },
    created() {
        if (this.$route.params?.id) {
            this.organization.id = this.$route.params?.id;
            this.getOrganization();
        }
    },
    methods: {
        getOrganization() {
            this.axios.get(process.env.VUE_APP_API_URL + '/organization/edit/' + this.organization.id)
                .then(response => {
                    this.organization = new Organization(response.data.organization);
                    this.setKeywords();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        setKeywords() {
            if (this.organization.keywords) {
                this.keywords = this.organization.keywords.map((keyword) => keyword.name);
            }
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file, type) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = e => {
                vm.imageRegular = e.target.result;
                this.organization.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (type) {
            this.imageRegular = "";
            this.organization.image = "";
        },
        submit() {
            const url = process.env.VUE_APP_API_URL + ((this.organization.id) ? '/organization/update/' + this.organization.id : '/organization/store');
            this.organization.keywords = this.keywords;
            delete this.organization.logo;
            this.axios.post(url, this.organization)
                .then(response => {
                    if (response.status === 200) {
                        let organizationID = this.$store.getters.getOrganization.id;
                        if (organizationID === this.organization.id) {
                            this.$store.dispatch('setOrganization', response.data.organization);
                        }
                        this.$router.push({name: 'OrganizationList'});
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
    computed: {
        nameIsValid() {
            let valid = true;
            if (!this.organization.name) {
                valid = false;
            }
            if (this.validationError.name) {
                valid = false;
            }
            return valid;
        },
        defaultImage() {
            return (this.organization?.logo)
                ? this.organization.logo.thumbnail_url
                : this.publicURL + "img/image_placeholder.jpg";
        }
    }
};
</script>
<style scoped>
</style>
