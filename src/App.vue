<template>
    <router-view></router-view>
</template>


<script>

import {User} from "@/interfaces/User";

export default {
    name: 'App',
    data() {
        return {
            authUser: this.$store.getters.getUser,
            axiosInterceptor: null,
        }
    },
    created() {
        this.enableInterceptor();
    },
    destroyed() {
    },
    methods: {
        enableInterceptor() {
            this.axiosInterceptor = this.axios.interceptors.request.use(config => {
                const user = this.$store.getters.getUser;
                if (user.access_token) {
                    config.headers.Authorization = `Bearer ` + user.access_token;
                }
                else {
                    config.headers.Authorization = `Bearer `;
                }
                return config;
            }, error => {
                return Promise.reject(error);
            });
            this.axios.interceptors.response.use((response) => {
                    if (response.status === 200 && response.data) {
                        if (response.data?.success_message || response.data?.error_message || response.data?.warning_message) {
                            this.showFlashMessages(response.data);
                        }
                    }
                    if (response.status === 204 && response.data) {
                        if (response.data?.success_message || response.data?.error_message) {
                            this.showFlashMessages(response.data);
                        }
                    }
                    return response;
                },
                error => {
                    if (error.response.status === 422) {
                        if (error.response.data?.message) {
                            this.showFlashMessages({'error_message': [error.response.data.message]});
                        }
                    } else if (error.response.status === 401) {
                        this.$router.push({name: 'Dashboard'});
                        if (error.response.data?.message) {
                            this.showFlashMessages({'error_message': [error.response.data.message]});
                        }
                    }  else if (error.response.status === 403) {
                        if (error.response.data?.message) {
                            this.showFlashMessages({'error_message': [error.response.data.message]});
                        }
                    } else {
                        //return Promise.reject(error);
                    }
                    return Promise.reject(error)
                });
        },
        disableInterceptor() {
            this.axios.interceptors.request.eject(this.axiosInterceptor);
        },
    }
}
</script>
