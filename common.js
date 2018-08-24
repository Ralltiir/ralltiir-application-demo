/**
 * @file
 * @author
 */
if (/rt-debug/.test(location.search)) {
    localStorage.debug = 'app:*';
}
var debug = localStorage.debug;

require.config({
    baseUrl: debug ? 'amd_modules' : '//unpkg.com',
    waitSeconds: 30
});

// apmjs auto-creates these entries when installed locally
define('ralltiir', function (require) {
    return require('ralltiir/src/index');
});
define('ralltiir-application', function (require) {
    return require('ralltiir-application/service');
});
define('@searchfe/promise', function (require) {
    return require('@searchfe/promise/src/promise');
});
define('@searchfe/underscore', function (require) {
    return require('@searchfe/underscore/src/index');
});
define('@searchfe/assert', function (require) {
    return require('@searchfe/assert/index');
});

function dummyLoading(service1, service2, options) {
    var container = document.querySelector('#sfr-app');
    var loading = document.createElement('span');
    loading.innerText = 'Loading...没错，这就是 Loading，时长是 3s';

    service1.stop();
    container.innerHTML = '';
    container.appendChild(loading);

    setTimeout(function () {
        service2.renderTo(container);
    }, 3000);
}

function toLegacy(service1, service2, options) {
    var container = document.querySelector('#sfr-app');
    service1.stop();
    container.innerHTML = '';

    Promise
    .resolve(service2.beforeAttach(options.legacy.current, options.legacy.prev))
    .then(() => service2.attach(options.legacy.current, options.legacy.prev));
}

function fromLegacy(service1, service2, options) {
    var container = document.querySelector('#sfr-app');
    Promise
    .resolve(service1.beforeDetach(options.legacy.current, options.legacy.prev))
    .then(() => service1.detach(options.legacy.current, options.legacy.prev))
    .then(() => service2.renderTo(container));
}

require(['ralltiir', 'ralltiir-application', 'ralltiir-application/view/view'], function (rt, Service, View) {
    Service.setBackHtml('<i class="fa fa-arrow-left"></i>');

    rt.transitions.register({from: 'shell1', to: 'shell2', impl: dummyLoading});
    rt.transitions.register({from: 'shell2', to: 'shell1', impl: dummyLoading});
    rt.transitions.register({from: 'home', to: 'shell1', impl: fromLegacy});
    rt.transitions.register({from: 'home', to: 'shell2', impl: fromLegacy});
    rt.transitions.register({from: 'shell1', to: 'home', impl: toLegacy});
    rt.transitions.register({from: 'shell2', to: 'home', impl: toLegacy});
    rt.transitions.register({from: undefined, to: 'shell1', impl: x=>x});
    rt.transitions.register({from: undefined, to: 'shell2', impl: x=>x});

    rt.services.register('/ralltiir-application-demo/shell-1', {
        name: 'shell1',
        title: 'AppShell Page 1',
        back: '<i class="fa fa-home"></i>'
    }, rt.Service || Service);
    rt.services.register('/ralltiir-application-demo/shell-2', {
        name: 'shell2',
        title: 'AppShell Page 2',
        back: '<i class="fa fa-home"></i>'
    }, rt.Service || Service);
    rt.services.register('/ralltiir-application-demo-vue/todolist', {
        title: 'Vue Todo List',
        backendUrl: '/ralltiir-application-demo-vue/todolist'
    }, Service);
    rt.services.register('/ralltiir-application-demo/home', {
        name: 'home',
        title: 'Ralltiir Application',
    }, Service);
    rt.services.register('/ralltiir-application-demo-react/todolist', {
        title: 'React Todo List',
        backendUrl: '/ralltiir-application-demo-react/todolist'
    }, Service);
    rt.services.register(
        '/ralltiir-application-demo/postmessage-1',
        {name: 'foo', title: 'Post Message - Receiver'},
        Service
    );
    rt.services.register(
        '/ralltiir-application-demo/postmessage-2',
        {name: 'foo', title: 'Post Message - Sender'},
        Service
    );
    rt.services.register('/ralltiir-application-demo/performance', {title: 'Performance'}, Service);
    rt.services.register('/ralltiir-application-demo/scroll-restore', {
        title: 'Scroll Restore',
        actions: [
          '<i class="fa fa-twitter"></i>',
          '<i class="fa fa-share"></i>'
        ],
        loadingClass: 'rt-loading-no-highlight rt-loading-black',
        headClass: 'rt-head-transparent',
        background: '#000000'
    }, Service);
    rt.services.register('/ralltiir-application-demo/lifecycle', {title: 'Lifecycle Demo'}, Service);
    rt.services.register('/ralltiir-application-demo/partial-update', {
      title: 'Partial Update',
      baseUrl: '/ralltiir-application-demo'
    }, Service);
    rt.services.register('/ralltiir-application-demo/partial-update-advanced', {
      title: 'Partial Update',
      baseUrl: '/ralltiir-application-demo'
    }, Service);
    rt.services.register(/^\/ralltiir-application-demo\/disable-dispatch/, {
      title: 'Disable Dispatch'
    }, Service);

    rt.services.register('/ralltiir-application-demo/custom-transition-style', {
        title: 'Custom Transition Style',
        loadingClass: 'rt-loading-no-highlight rt-loading-black',
        headClass: 'rt-head-transparent',
        background: '#888888'
    }, Service);
    

    rt.services.register('/ralltiir-application-demo/error-handling', {title: 'Error Handling'}, Service);
    rt.services.register(/\/errors\//, null, Service);

    rt.action.start();
});
