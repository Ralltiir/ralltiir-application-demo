require.config({
  baseUrl: localStorage.getItem('rt.debug') ? 'amd_modules' : '//unpkg.com'
})

// apmjs auto-creates these entries when installed locally
define('ralltiir', function (require) {
    return require('ralltiir/src/index')
})
define('ralltiir-application', function (require) {
    return require('ralltiir-application/service')
})

require(['ralltiir', 'ralltiir-application', 'ralltiir-application/view/view'], function (rt, Service, View) {
  View.backHTML = '<i class="fa fa-arrow-left"></i>'
  rt.services.register('/home', {title: 'Ralltiir Application'}, Service)
  rt.services.register('/scroll-restore', {title: 'Scroll Restore'}, Service)

  rt.action.start({
      root: '/ralltiir-application-demo'
  })
})
