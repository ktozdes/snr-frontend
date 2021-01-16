<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-card>
                <md-card-header class="md-card-header-icon md-card-header-green">
                    <div class="card-icon">
                        <md-icon>assignment</md-icon>
                    </div>
                    <h4 class="title">Simple Table</h4>
                    <md-button @click="testApi">hello</md-button>
                </md-card-header>
                <md-card-content>
                    <md-table v-model="tableData" table-header-color="green">
                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                            <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                            <md-table-cell md-label="Country">{{
                                    item.country
                                }}
                            </md-table-cell>
                            <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
                            <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selected: [],
            tableData: [
                {
                    id: 1,
                    name: "Dakota Rice",
                    salary: "$36.738",
                    country: "Niger",
                    city: "Oud-Turnhout"
                },
                {
                    id: 2,
                    name: "Minerva Hooper",
                    salary: "$23,789",
                    country: "Curaçao",
                    city: "Sinaai-Waas"
                },
                {
                    id: 3,
                    name: "Sage Rodriguez",
                    salary: "$56,142",
                    country: "Netherlands",
                    city: "Baileux"
                },
                {
                    id: 4,
                    name: "Philip Chaney",
                    salary: "$38,735",
                    country: "Korea, South",
                    city: "Overland Park"
                },
                {
                    id: 5,
                    name: "Doris Greene",
                    salary: "$63,542",
                    country: "Malawi",
                    city: "Feldkirchen in Kärnten"
                }
            ],

        };
    },
    methods: {
        testApi() {
            this.axios.get(process.env.VUE_APP_API_URL + '/test-close')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
        }
    }
};
</script>
<style scoped>
</style>
