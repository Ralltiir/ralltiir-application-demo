var view = document.querySelector('.rt-view.active')
var $nav = $(view).find('.nav-item')
$nav.click(function () {
  var $a = $(this).find('a');
  var url = $a.attr('data-sf-href');
  var baseUrl = view.dataset.base || '';
  view.ralltiir.partialUpdate(url, {
    // AJAX URL 可以与页面 URL 不同
    fromUrl: baseUrl + url + '?foo=bar',
    to: '.tab-content',
    replace: true
  }).then(function () {
    $nav.find('a').removeClass('active');
    $a.addClass('active');
  });
  return false;
});
