// import components
import Asset from '../../pages/assetManager/Asset'

export default [
    {
        path: 'asset',
        name: 'Asset',
        component: Asset,
        meta: {
            requiredAuth: true,
            title: 'Asset Management',
            permission: ['SUPER_ADMIN', 'ADMIN'],
            breadcrumb: [
                {name: 'Asset Management', nameRoute: 'Asset', active: 1},
            ],
        },
    },
]
