<template>
    <div class="user">
        <div class="photo">
            <img :src="avatar" alt="avatar"/>
        </div>
        <div class="user-info">
            <a  data-toggle="collapse" >
                <span>
                  {{ user.name }}
                </span>
            </a>
        </div>
    </div>
</template>
<script>

export default {
    components: {
    },

    data() {
        return {
            isClosed: true,
            user: this.$store.getters.getUser,
        };
    },
    created() {
        this.$store.subscribe( (mutation, state) => {
            if (mutation.type === 'login') {
                this.user = mutation.payload;
            }
        });
    },
    methods: {
        clicked: function (e) {
            e.preventDefault();
        },
        toggleMenu: function () {
            this.isClosed = !this.isClosed;
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push({name: 'Login'});
        }
    },
    computed: {
        avatar() {
            return (this.user?.logo)
                ? this.user.logo.thumbnail_url
                : "/img/faces/avatar.jpg";
        }
    }
};
</script>
<style>
.collapsed {
    transition: opacity 1s;
}
</style>
