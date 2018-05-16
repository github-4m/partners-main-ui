const mock = {
  ['GET /api/user/session']: {
    errorMessage: null,
    errorCode: null,
    success: true,
    requestId: null,
    value: {
      username: 'developer@blibli.com',
      name: 'Developer',
      mode: {code: 'STORE-0001', type: 'STORE', name: 'Development Store'},
      modules: ['/dashboard', '/product'],
      options: [{
        code: 'store-information',
        name: 'Store Information',
        url: null
      }, {
        code: 'user-management',
        name: 'User Management',
        url: null
      }, {
        code: 'training-video',
        name: 'Training Video',
        url: null
      }, {
        code: 'download-docs',
        name: 'Download Docs',
        url: null
      }, {
        code: 'download-api-docs',
        name: 'Download API Docs',
        url: null
      }, {
        code: 'configuration',
        name: 'Configuration',
        url: null
      }, {
        code: 'close-temporarily',
        name: 'Close Temporarily',
        url: null
      }, {
        code: 'switch-account',
        name: 'Switch Account',
        url: null
      }],
      menus: [{
        code: 'dashboard',
        name: 'Dashboard',
        url: '/dashboard',
        isModule: true,
        subs: []
      }, {
        code: 'product',
        name: 'Product',
        isModule: false,
        url: null,
        subs: [{
          code: 'all-product',
          name: 'All Product',
          isModule: false,
          url: '/product'
        }, {
          code: 'single-product',
          name: 'Single Product',
          isModule: false,
          url: null
        }, {
          code: 'bulk-product',
          name: 'Bulk Product',
          isModule: false,
          url: null
        }]
      }]
    }
  },
  ['GET /api/notification/filter']: {
    errorMessage: null,
    errorCode: null,
    success: true,
    requestId: null,
    content: [{
      createdDate: 1526009043479,
      groupType: 'ACTIVITY',
      type: null,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.',
      alreadyRead: false
    }, {
      createdDate: 1526009043479,
      groupType: 'INFO',
      type: null,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.',
      alreadyRead: true
    }, {
      createdDate: 1526009043479,
      groupType: 'ORDER',
      type: null,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.',
      alreadyRead: true
    }, {
      createdDate: 1526009043479,
      groupType: 'PRODUCT',
      type: null,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue justo quis fermentum dictum. Fusce blandit tempus arcu at posuere. Etiam semper consectetur vehicula.',
      alreadyRead: true
    }],
    metadata: {
      page: 0,
      size: 10,
      totalItems: 5
    }
  },
  ['PUT /api/notification/read-all']: {
    errorMessage: null,
    errorCode: null,
    success: true,
    requestId: null
  }
}

export default mock
