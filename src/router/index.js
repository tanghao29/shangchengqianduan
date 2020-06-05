import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// import tableRouter from './modules/table'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '桌面', icon: 'desktop', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '统计', icon: 'statistics', affix: true, noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    alwaysShow: true,
    name: 'Guide',
    meta: {
      title: '用户',
      icon: 'user'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '运营',
      icon: 'shopping',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name: 'order',
    meta: {
      title: '订单',
      icon: 'manage-order'
    },
    children: [
      {
        path: 'orderList',
        component: () => import('@/views/components-demo/orderList'),
        name: 'orderList',
        meta: { title: '订单列表' }
      },
      {
        path: 'json-editor',
        component: () => import('@/views/components-demo/json-editor'),
        name: 'JsonEditorDemo',
        meta: { title: 'JSON Editor' }
      },
      {
        path: 'split-pane',
        component: () => import('@/views/components-demo/split-pane'),
        name: 'SplitpaneDemo',
        meta: { title: 'SplitPane' }
      },
      {
        path: 'avatar-upload',
        component: () => import('@/views/components-demo/avatar-upload'),
        name: 'AvatarUploadDemo',
        meta: { title: 'Upload' }
      },
      {
        path: 'dropzone',
        component: () => import('@/views/components-demo/dropzone'),
        name: 'DropzoneDemo',
        meta: { title: 'Dropzone' }
      },
      {
        path: 'sticky',
        component: () => import('@/views/components-demo/sticky'),
        name: 'StickyDemo',
        meta: { title: 'Sticky' }
      },
      {
        path: 'count-to',
        component: () => import('@/views/components-demo/count-to'),
        name: 'CountToDemo',
        meta: { title: 'Count To' }
      },
      {
        path: 'mixin',
        component: () => import('@/views/components-demo/mixin'),
        name: 'ComponentMixinDemo',
        meta: { title: 'Component Mixin' }
      },
      {
        path: 'back-to-top',
        component: () => import('@/views/components-demo/back-to-top'),
        name: 'BackToTopDemo',
        meta: { title: 'Back To Top' }
      },
      {
        path: 'drag-dialog',
        component: () => import('@/views/components-demo/drag-dialog'),
        name: 'DragDialogDemo',
        meta: { title: 'Drag Dialog' }
      },
      {
        path: 'drag-select',
        component: () => import('@/views/components-demo/drag-select'),
        name: 'DragSelectDemo',
        meta: { title: 'Drag Select' }
      },
      {
        path: 'dnd-list',
        component: () => import('@/views/components-demo/dnd-list'),
        name: 'DndListDemo',
        meta: { title: 'Dnd List' }
      },
      {
        path: 'drag-kanban',
        component: () => import('@/views/components-demo/drag-kanban'),
        name: 'DragKanbanDemo',
        meta: { title: 'Drag Kanban' }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/

  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    alwaysShow: true,
    name: 'Table',
    meta: {
      title: '商品',
      icon: 'commodity'
    },
    children: [
      {
        path: 'dynamic-table',
        component: () => import('@/views/table/dynamic-table/index'),
        name: 'DynamicTable',
        meta: { title: 'Dynamic Table' }
      },
      {
        path: 'drag-table',
        component: () => import('@/views/table/drag-table'),
        name: 'DragTable',
        meta: { title: 'Drag Table' }
      },
      {
        path: 'inline-edit-table',
        component: () => import('@/views/table/inline-edit-table'),
        name: 'InlineEditTable',
        meta: { title: 'Inline Edit' }
      },
      {
        path: 'complex-table',
        component: () => import('@/views/table/complex-table'),
        name: 'ComplexTable',
        meta: { title: 'Complex Table' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: '库存',
      icon: 'inventory'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu 1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu 1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu 1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu 1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu 1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu 1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'Menu 2' }
      }
    ]
  }
  // // 404 page must be placed at the end !!!
  // ,{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
