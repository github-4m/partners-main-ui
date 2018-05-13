const mock = {
  ['GET /api/user/session']: {
    errorMessage: null,
    errorCode: null,
    success: true,
    value: {
      username: 'fathan.mustaqiim@gdn-commerce.com',
      name: 'Fathan Mustaqiim',
      mode: {code: 'BLT-00001', type: 'STORE', name: 'Blibli.com Testing'},
      options: [{
        code: 'store-information',
        name: 'Store Info',
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
        code: 'switch-account',
        name: 'Switch Account',
        url: '/account/reset'
      }]
    }
  }
}

export default mock
