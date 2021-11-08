var numPage = $('#main section.page').length;
var pageNow = 0;
var pagePrev = 0;
var pageNext = 0;
var wheelEvent = ('onmousewheel' in window) ? 'mousewheel' :  'DOMMouseScroll';
var onAnimation = false;
$('#main section.page').each(function (i) {
  $('#page-indicator').append('<li><a href="#"><span class="hide">' + (i + 1) + '번 페이지</span></a></li>\n');
});

$('#page-indicator > li > a').on('click', function () {
  var index = $('#page-indicator > li').index($(this).parent());
  showPage(index + 1);
});

showPage(1);

window.addEventListener(wheelEvent, function (e) {
  e.preventDefault();
  if (onAnimation === true) {
    return false;
  }
  var delta = ('onmousewheel' in window) ? (e.wheelDelta / -180) : (e.detail / 3);
  if (delta > 0) {
    showPage(pageNext);
  } else if (delta < 0) {
    showPage(pagePrev);
  }
}, {'passive': false});

function showPage (index) {
  if (index === pageNow) {
    return false;
  }
  onAnimation = true;
  var scrollAmt = $('#main section.page:eq(' + (index - 1) + ')').offset().top;
  $('html, body').stop(true).animate({'scrollTop': scrollAmt + 'px'}, 500, function () {
    onAnimation = false;
  });
  $('#page-indicator > li').removeClass('active');
  $('#page-indicator > li:eq(' + (index - 1) + ')').addClass('active');
  pageNow = index;
  pagePrev = (index === 1) ? 1 : (index - 1);
  pageNext = (index === numPage) ? numPage : (index + 1);
}

var pageNumber = checkPageNow();


$(window).on('scroll', function () {
  pageNumber = checkPageNow();
});

function checkPageNow () {
  var scrollAmt = $(document).scrollTop();
  var index = 0;
  $('section.page').each(function (i) {
    var pageStart = $(this).offset().top - ($(window).height() / 2);
    var pageEnd = pageStart + $(this).outerHeight(true);

    if (scrollAmt >= pageStart && scrollAmt < pageEnd) {
      index = i + 1;
      return false;
    }
  });
  $('#page-indicator > li').removeClass('active');
  $('#page-indicator > li:eq(' + (index - 1) + ')').addClass('active');
  pageNow = index;
  pagePrev = (index === 1) ? 1 : (index - 1);
  pageNext = (index === numPage) ? numPage : (index + 1);
  return pageNow;
}