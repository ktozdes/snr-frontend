<template>
    <div class="md-layout text-center">
        <div
            class="md-layout-item md-size-33 md-medium-size-80 md-small-size-70 md-xsmall-size-100"
        >
            <div class="md-layout">
                <div class="md-layout-item md-size-80 mx-auto text-center">
                    <h2 class="title">{{ '404 error. Page not found' | translate }}</h2>
                    <router-link v-if="!authUser.access_token" :to="{path:'/login'}" class="md-link primary">{{ 'Login' |translate }}</router-link>
                    <router-link v-else :to="{path:'/dashboard'}" class="md-link primary">{{ 'Dashboard' |translate }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            authUser: this.$store.getters.getUser,
        }
    },
    created() {
    },
};
</script>

<style>
.notfound-page a{
    color:white!important;
}
</style>
