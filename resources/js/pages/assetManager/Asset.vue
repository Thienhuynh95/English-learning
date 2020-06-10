<template>
    <div>
        <AssetBreadcrumb/>
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <!-- Asset Table -->
                        <AssetTable/>
                        <!-- <file-manager v-bind:settings="settings"></file-manager> -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
    </div>
</template>

<script>
    import AssetTable from '../../components/assetManager/AssetManagerTable'

    import Vue from 'vue'
    import store from '../../store'
    import AssetBreadcrumb from '../../components/assetManager/AssetManagerBreadcrumb'
    import FileManager from 'laravel-file-manager'
    Vue.use(FileManager, {store})
    export default {
        name: 'Asset',
        components: {
            AssetBreadcrumb,
            AssetTable
        },
        beforeRouteEnter(to, from, next) {
            console.log(to.query)
            return Promise.all([
                store.dispatch('category/resetState'),
                // Ko goi truoc khi vao route neu dieu kien qua phuc tap
                store.dispatch('category/getLists', to.query),
            ]).then(() => next())
        },
    }
</script>
