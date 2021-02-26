<template>
    <div
        class="sidebar"
        :data-color="activeColor"
        :data-image="backgroundImage"
        :data-background-color="backgroundColor"
        :style="sidebarStyle"
    >
        <div class="logo">
            <router-link class="simple-text logo-mini" :to="{path: 'dashboard'}">
                <div class="logo-img">
                    <img :src="logoUrl"/>
                </div>
            </router-link>
            <router-link class="simple-text logo-normal" :to="{path: 'dashboard'}">
                <template>{{ organization ? organization.name : 'No organization' }}</template>
            </router-link>
            <div class="navbar-minimize">
                <md-button
                    id="minimizeSidebar"
                    class="md-round md-just-icon md-transparent"
                    @click="minimizeSidebar"
                >
                    <i class="material-icons text_align-center visible-on-sidebar-regular"
                    >more_vert</i
                    >
                    <i
                        class="material-icons design_bullet-list-67 visible-on-sidebar-mini"
                    >view_list</i
                    >
                </md-button>
            </div>
        </div>
        <div class="sidebar-wrapper" ref="sidebarScrollArea">
            <slot></slot>
            <md-list class="nav">
                <slot name="links">
                    <sidebar-item
                        v-for="(link, index) in sidebarLinks"
                        :key="link.name + index"
                        :link="link"
                    >
                        <sidebar-item
                            v-for="(subLink, index) in link.children"
                            :key="subLink.name + index"
                            :link="subLink"
                        >
                        </sidebar-item>
                    </sidebar-item>
                </slot>
            </md-list>
        </div>
    </div>
</template>
<script>
export default {
    name: "sidebar",
    props: {
        activeColor: {
            type: String,
            default: "azure",
            validator: value => {
                let acceptedValues = [
                    "",
                    "purple",
                    "azure",
                    "green",
                    "orange",
                    "danger",
                    "rose"
                ];
                return acceptedValues.indexOf(value) !== -1;
            }
        },
        backgroundImage: {
            type: String,
            default: "./img/sidebar-2.jpg"
        },
        backgroundColor: {
            type: String,
            default: "white",
            validator: value => {
                let acceptedValues = ["", "black", "white", "red"];
                return acceptedValues.indexOf(value) !== -1;
            }
        },

        sidebarLinks: {
            type: Array,
            default: () => []
        },
        autoClose: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            organization: this.$store.getters.getOrganization,
        };
    },
    provide() {
        return {
            autoClose: this.autoClose
        };
    },
    methods: {
        minimizeSidebar() {
            if (this.$sidebar) {
                this.$sidebar.toggleMinimize();
            }
        }
    },
    computed: {
        sidebarStyle() {
            return {
                backgroundImage: `url(${this.backgroundImage})`
            };
        },
        logoUrl() {

            return (this.organization?.logo)
                ? this.organization.logo.thumbnail_url
                : "/img/vue-logo.png";
        },
    },
    beforeDestroy() {
        if (this.$sidebar.showSidebar) {
            this.$sidebar.showSidebar = false;
        }
    }
};
</script>
<style>
@media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu {
        display: none;
    }
}
</style>
