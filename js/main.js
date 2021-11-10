'use strict';

$(document).on('click', 'a[href="#"]', function (e) {
  e.preventDefault();
});

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// header
var header = document.getElementById('header');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 200) {
    header.classList.add('minimize');
  } else {
    header.classList.remove('minimize');
  }
});

// 모바일 네비게이션
var gnb = document.getElementById('gnb');
var menuBtn = header.querySelector('.menu-btn');

menuBtn.addEventListener('click', function () {
  gnb.classList.toggle('open');
});

// gnb 영역
var sections = document.querySelectorAll('#main section'); 
gnb.addEventListener('click', function (e) {
  var menu = e.target.dataset.menu || e.target.parentElement.dataset.menu;
  var type = 0;
  if (menu === undefined) {
    return false;
  }
  sections.forEach(function (section) {
    type = section.dataset.type;
    if (menu === type) {
      section.scrollIntoView({behavior: 'smooth'});
    }
  });
});

// portfolio view btn
$('.main-home .btn').on('click', function () {
  if (onAnimation === true) {
    return false;
  }
  var offset = $('.main-contact').offset().top;
  $('html, body').stop(true).animate({'scrollTop': offset + 'px'}, 500);
});

// section page
var numPage = $('#main .page').length;
var pageNow = 0;
var pagePrev = 0;
var pageNext = 0;
var wheelEvent = ('onmousewheel' in window) ? 'mousewheel' :  'DOMMouseScroll';
var onAnimation = false;
$('#main .page').each(function (i) {
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
  var scrollAmt = $('#main .page:eq(' + (index - 1) + ')').offset().top;
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
  $('#main .page').each(function (i) {
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

// 올해년도 구하기
var thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();