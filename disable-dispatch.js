var state = document.querySelector('.current-state');
var rt;
var view = document.querySelector('.disable-dispatch');

require(['ralltiir'], function (r) {
  rt = r;
});

function updateState(info) {
  state.textContent = location.href + '\n' + info;
}

function pushHandler(url, subRouter) {
  return function () {
    console.log('push to ' + url);
    rt.action.redirect(url, null, subRouter ? {
      superMagicRouter: true
    } : {
      silent: true,
      disableServiceDispatch: true
    });
    updateState('pushed state');
  }
}

function onPopState() {
  console.log('DisableDispatch: POPSTATE TRIGGERED!');
  updateState('on popstate');
}

view.addEventListener('rt.attached', function () {
  window.addEventListener('popstate', onPopState);
  updateState('on attach');
});

view.addEventListener('rt.detached', function () {
  window.removeEventListener('popstate', onPopState);
});

var doms = document.querySelectorAll('[data-pushstate]');
for (var i = 0; i < doms.length; i++) {
  var dom = doms[i];
  dom.addEventListener('click', pushHandler(dom.dataset.pushstate, !!dom.dataset.subrouter));
}
