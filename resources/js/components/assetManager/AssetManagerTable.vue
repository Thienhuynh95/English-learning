<template>
    <div>
        <div class="box-body">
            {{ test }}
            <file-manager v-bind:settings="settings"></file-manager>
        </div>
    </div>
</template>

<script>
    // import Vue from 'vue'
    import store from '../../store'
    import {mapGetters, mapActions} from 'vuex'
    const settings = {
        // axios headers
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${window.localStorage.getItem('user-token')}`,
        },
        baseUrl: 'http://test.loc/file-manager/',   // overwrite base url Axios
        windowsConfig: 2,                           // overwrite config
        lang: 'en',                                 // set language
        translation: {                              // add new translation
        },
    }
    export default {
        name: 'AssetTable',
        components: {
        },

        data() {
            return {
                page: parseInt(this.$router.currentRoute.query.page) || 1,
            }
        },
        created() {
            let queries = this.getUrlSetQuery()

            if (_.keys(queries).length === 0) {
                queries = {...this.defaultQueries}
            }

            this.handleReplaceUrl(queries)
            // this.getLists({
            //     withs: [{
            //         relation_name: 'allChildren',
            //     }],
            //     conditions: [{
            //         type: 'wherenull',
            //         column: 'parent_id'
            //     }]
            // })
        },

        computed: {
            ...mapGetters('category', {
                list: 'list',
                paginator: 'paginator',
                defaultQueries: 'getQueryParams',
            }),
        },

        watch: {
            '$route.query.page'(val) {
                this.page = +val
            },
        },

        methods: {
            ...mapActions('category', [
                'getLists',
                'resetState',
                'deleteItem',
            ]),

            handleDelete(contractId) {
                this.$confirm('削除しますか？', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'キャンセル',
                    type: 'warning',
                }).then(() => {
                    // do action call api
                    return this.deleteItem(category)
                }).then(() => {
                    // alert message
                    this.$message.success('削除しました')

                    // reload
                    this.handlePage(1)
                }).catch((err) => {
                    console.log(err)
                })
            },

            handlePage(pageNumb) {
                const queries = {...this.getUrlSetQuery()}

                queries.page = pageNumb.toString()

                this.handleReplaceUrl(queries)

                this.getLists(queries)
            },

            getUrlSetQuery() {
                return this.$router.currentRoute.query
            },

            handleReplaceUrl(query) {
                if (!_.isEqual(this.$route.query, query)) {
                    this.$router.replace({query: query})
                }
            },
        },
    }
</script>