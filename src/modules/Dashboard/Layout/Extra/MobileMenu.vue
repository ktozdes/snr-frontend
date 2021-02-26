<template>
    <ul class="nav nav-mobile-menu">
        <a
            class="toggle-link"
            data-toggle="collapse"
            :aria-expanded="!isClosed"
            @click.stop="toggleMenu"
            @click.capture="clicked"
        >
        <span>
          Profile
          <b class="caret"></b>
        </span>
        </a>
        <collapse-transition>
            <div v-show="!isClosed">
                <ul class="nav">
                    <slot>
                        <li>
                            <router-link :to="{path: '/user/edit/' + user.id}">
                                <span class="sidebar-normal">{{ 'Edit Profile' | translate }}</span>
                            </router-link>
                        </li>
                        <li><a href="javascript:void(0)" @click="logout">Logout</a></li>
                    </slot>
                </ul>
            </div>
        </collapse-transition>
    </ul>
</template>
<script>import {CollapseTransition} from "vue2-transitions";

export default {
    components: {
        CollapseTransition
    },
    data() {
        return {
            isClosed: true,
            user: this.$store.getters.getUser,
        };
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
    }
};
</script>
