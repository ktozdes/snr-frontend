<template>
    <md-toolbar
        md-elevation="0"
        class="md-transparent"
        :class="{
      'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute
    }"
    >
        <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
                <h3 class="md-title">{{ $route.name }}</h3>
            </div>
            <div class="md-toolbar-section-end">
                <md-button
                    class="md-just-icon md-round md-simple md-toolbar-toggle"
                    :class="{ toggled: $sidebar.showSidebar }"
                    @click="toggleSidebar"
                >
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </md-button>

                <div class="md-collapse">

                    <md-list>
                        <li class="md-list-item">
                            <div class="md-list-item-content">
                                <drop-down direction="down">
                                    <md-button
                                        slot="title"
                                        class="md-button md-just-icon md-simple"
                                        data-toggle="dropdown"
                                    >
                                        <i class="material-icons">person</i>
                                        <p class="hidden-lg hidden-md">Profile</p>
                                    </md-button>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <router-link :to="{path: '/user/edit/' + user.id}">
                                                <span class="sidebar-normal">{{'Edit Profile' | translate}}</span>
                                            </router-link>
                                        </li>
                                        <li><a href="javascript:void(0)" @click="logout">Logout</a></li>
                                    </ul>
                                </drop-down>
                            </div>
                        </li>
                    </md-list>
                </div>
            </div>
        </div>
    </md-toolbar>
</template>

<script>
export default {
    data() {
        return {
            user: this.$store.getters.getUser,
        };
    },
    methods: {
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        minimizeSidebar() {
            if (this.$sidebar) {
                this.$sidebar.toggleMinimize();
            }
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push({name: 'Login'});
        }
    }
};
</script>
