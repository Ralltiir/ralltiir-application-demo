require.config({
  baseUrl: /rt-debug/.test(location.search) ? 'amd_modules' : '//unpkg.cnpmjs.org',
  waitSeconds: 30
});

// apmjs auto-creates these entries when installed locally
define('ralltiir', function (require) {
    return require('ralltiir/src/index');
});
define('ralltiir-application', function (require) {
    return require('ralltiir-application/service');
});

require(['ralltiir', 'ralltiir-application', 'ralltiir-application/view/view'], function (rt, Service, View) {
    Service.setBackHtml('<i class="fa fa-arrow-left"></i>');

    rt.services.register('/ralltiir-application-demo/home', {title: 'Ralltiir Application'}, Service);
    rt.services.register('/ralltiir-application-demo-vue/todolist', {
        title: 'Vue Todo List',
        backendUrl: '/ralltiir-application-demo-vue/todolist'
    }, Service);
    rt.services.register('/ralltiir-application-demo-react/todolist', {
        title: 'React Todo List',
        backendUrl: '/ralltiir-application-demo-react/todolist'
    }, Service);
    rt.services.register('/ralltiir-application-demo/scroll-restore', {title: 'Scroll Restore'}, Service);
    rt.services.register('/ralltiir-application-demo/partial-update', {title: 'Partial Update'}, Service);
    rt.services.register('/ralltiir-application-demo/partial-update-advanced', {title: 'Partial Update'}, Service);

    rt.action.start();
});
