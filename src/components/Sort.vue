<template>
    <div class="sort-container" @click="sortClicked">
        <slot></slot>
        <span class="sort-icon-container"
              :class="{
                'is_active': sortBy.indexOf(sortingLabel) >= 0,
                'md-sorted-desc': sortOption === 'desc',
                }">
            <md-icon>arrow_upward</md-icon>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        sortingLabel: {
            type: String,
            default: "random",
        },
        sortBy: {
            type: String,
            default: "default",
        }
    },
    data() {
        return {
            sortOption: 'desc'
        };
    },
    created() {
    },
    methods: {
        sortClicked() {
            this.sortOption = this.sortOption === 'desc' ? 'asc' : 'desc';
            this.$emit("sorted", this.sortingLabel + '_' + this.sortOption);
        }
    },
}
</script>

<style scoped>

</style>