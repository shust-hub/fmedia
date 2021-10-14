import '../scss/index.scss'
import 'bootstrap'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';


//Слайдеры
//Основной и превью
var bigimage = $("#carouselMain");
var thumbs = $("#carouselThumb");
//var totalslides = 10;
var syncedSecondary = true;

bigimage
  .owlCarousel({
  items: 1,
  slideSpeed: 2000,
  dots: false,
  loop: true,
  responsiveRefreshRate: 200
})
  .on("changed.owl.carousel", syncPosition);

thumbs
  .on("initialized.owl.carousel", function() {
  thumbs
    .find(".owl-item")
    .eq(0)
    .addClass("current");
})
  .owlCarousel({
  items: 3,
  dots: true,
  margin: 10,
  slideBy: 1,
  autoWidth:true,
  responsiveRefreshRate: 100
})
  .on("changed.owl.carousel", syncPosition2);

function syncPosition(el) {
  var count = el.item.count - 1;
  var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

  if (current < 0) {
    current = count;
  }
  if (current > count) {
    current = 0;
  }
  //to this
  thumbs
    .find(".owl-item")
    .removeClass("current")
    .eq(current)
    .addClass("current");
  var onscreen = thumbs.find(".owl-item.active").length - 1;
  var start = thumbs
  .find(".owl-item.active")
  .first()
  .index();
  var end = thumbs
  .find(".owl-item.active")
  .last()
  .index();

  if (current > end) {
    thumbs.data("owl.carousel").to(current, 100, true);
  }
  if (current < start) {
    thumbs.data("owl.carousel").to(current - onscreen, 100, true);
  }
}

function syncPosition2(el) {
  if (syncedSecondary) {
    var number = el.item.index;
    bigimage.data("owl.carousel").to(number, 100, true);
  }
}

thumbs.on("click", ".owl-item", function(e) {
  e.preventDefault();
  var number = $(this).index();
  bigimage.data("owl.carousel").to(number, 300, true);
});


$('.carouselMain-next-button').click(function() {
    $('.owl-carousel').trigger('next.owl.carousel');
});

$('.carouselMain-prev-button').click(function() {
    $('.owl-carousel').trigger('prev.owl.carousel');
});

//Таймер
function makeTimer() {
		var endTime = new Date("30 October 2021 23:56:00 GMT+03:00");			
			endTime = (Date.parse(endTime) / 1000);

			var now = new Date();
			now = (Date.parse(now) / 1000);

			var timeLeft = endTime - now;

			var days = Math.floor(timeLeft / 86400); 
			var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
			var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
			var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
  
			if (hours < "10") { hours = "0" + hours; }
			if (minutes < "10") { minutes = "0" + minutes; }
			if (seconds < "10") { seconds = "0" + seconds; }

      //Основной
			$("#hours").html(hours + "<span>Часы</span>");
			$("#minutes").html(minutes + "<span>Минуты</span>");
			$("#seconds").html(seconds + "<span>Секунды</span>");		

      //Мобильный
      $("#mhours").html(hours + "<span>Часы</span>");
			$("#mminutes").html(minutes + "<span>Минуты</span>");
			$("#mseconds").html(seconds + "<span>Секунды</span>");		

	}

	setInterval(function() { makeTimer(); }, 1000);


//Счетчик
  $('.btn-plus').click(function(e){
    e.preventDefault();
    var currentVal = parseInt( $('.quantity__counter').text() );
    var val2 = currentVal + 1;
    if (!isNaN(val2)) {
      $('.quantity__counter').text(val2);
    } else {
      $('.quantity__counter').text(1);
    }
});

$(".btn-minus").click(function(e) {
    e.preventDefault();
    var currentVal = parseInt( $('.quantity__counter').text() );
    if (!isNaN(currentVal) && currentVal > 1) {
        $('.quantity__counter').text(currentVal - 1);
    } else {
      $('.quantity__counter').text(1);
    }
});