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
        this.$store.subscribe((mutation) => {
            if (mutation.type === 'login' || mutation.type === 'logout') {
                this.enableInterceptor();
            }
        });
        this.enableInterceptor();
    },
    destroyed() {
    },
    methods: {
        enableInterceptor() {
            const user = this.$store.getters.getUser;
            console.log('enableInterceptor', this.axiosInterceptor, user.access_token);
            if (user.access_token) {
                this.axiosInterceptor = this.axios.interceptors.request.use(config => {
                    config.headers.Authorization = `Bearer ` + user.access_token;
                    console.log('request', config, user);
                    return config;
                }, error => {
                    return Promise.reject(error);
                });
                this.axios.interceptors.response.use(response => {
                    return response;
                }, error => {
                    return Promise.reject(error);

                });
            }
            else if (this.axiosInterceptor !== null) {
                console.log('salom');
                this.axios.interceptors.request.eject(this.axiosInterceptor);
                this.axiosInterceptor = this.axios.interceptors.request.use(config => {
                    config.headers.Authorization = `Bearer `;
                    console.log('request', config, user);
                    return config;
                }, error => {
                    return Promise.reject(error);
                });
                this.axios.interceptors.response.use(response => {
                    return response;
                }, error => {
                    return Promise.reject(error);

                });
            }

        },
        disableInterceptor() {
            this.axios.interceptors.request.eject(this.axiosInterceptor);
        },
    }
}
</script>
