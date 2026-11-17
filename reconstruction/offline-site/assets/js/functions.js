// ========== TABLE OF CONTENTS =========== //
//
// 1. Page Loader 
// 2. Text fitting for headlines
// 3. Parallax
// 4. Calendar
// 5. Navbar
// 6. Sidenav
// 7. Sidebar Newsfeed-1
// 8. Sidebar Newsfeed-2
// 9. Sidebar Newsfeed-3
// 10. Sidebar Newsfeed-4
// 11. Sidebar Newsfeed-5
// 12. Sidebar Newsfeed-6
// 12.bis Sidebar Newsfeed-7
// 13. News Ticker
// 14. To Top Button
// 15. Owl Carousel - News Slider & Schedule Slider
// 16. Owl Carousel - Big Gallery Slider-1	
// 17. Owl Carousel - Big Gallery Slider-2
// 18. Owl Carousel - Big Gallery Slider-3
// 19. Owl Carousel - Small Gallery Slider
// 20. Clock
// 21. Subscribe Form
// 22. Exchange Rates
// 23. Currency Converter
// 24. Sidebar Weather
// 25. Fitvids
// 26. Sidebar Scroll
// 27. Anchor Scroll
// 28. CKeditor ReadMore
// ======================================= //

(function($) {
    "use strict";
	
	/* 1. Page Loader */	
	$(".loader-item").delay(700).fadeOut();
	$("#pageloader").delay(1200).fadeOut("slow");

	/* 2. Text fitting for headlines */	
	$('.extra-large-caption').fitText(1.5, { minFontSize: '26px', maxFontSize: '80px' });
	$('.large-caption').fitText(1.5, { minFontSize: '26px', maxFontSize: '60px' });
	$('.medium-caption').fitText(2, { minFontSize: '20px', maxFontSize: '30px' });
	$('.small-caption').fitText(2.4, { minFontSize: '20px', maxFontSize: '26px' });
	$('.extra-small-caption').fitText(2.4, { minFontSize: '16px', maxFontSize: '22px' });
	$('.error-msg').fitText(2, { minFontSize: '36px', maxFontSize: '90px' });
	
	/* 3. Parallax */
	function parallaxInit() {
		$('.img-overlay1', '#parallax-section').parallax("100%", 0.8);
	}
	parallaxInit();

	/* 4. Calendar */
	//$('#calendar').datepicker();

	/* 5. Navbar */
	// headroom
	$("#fixed-navbar").headroom({
		tolerance : 5,
		offset: $('#main-section').offset().top,
		classes: {
			pinned: "headroom-pinned",
			unpinned: "headroom-unpinned"
		}
	});
	
	// affix
	$('#fixed-navbar').affix({
		offset: {
			top: $('#fixed-navbar').offset().top
		}
	});
	
	/* 6. Sidenav */
	$('[data-sidenav]').sidenav();
	$('.navbar-toggle').attr( 'id', $('#sidenav-toggle').attr('id') );
	
	// headroom
	$("#mobile-nav").headroom({
		offset: $('#main-section').offset().top,
		classes: {
			pinned: "headroom-pinned",
			unpinned: "headroom-unpinned"
		}
	});
	// Affix
	$('#mobile-nav').affix({
		offset: {
        top: $('.top-menu').height()
      }
	});

	/* 7. Sidebar Newsfeed-1 */
	$('.newsfeed-1').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 5000,
		height: 'auto',
		visible: 3,
		mousePause: 1,
	});

	/* 8. Sidebar Newsfeed-2 */
	$('.newsfeed-2').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 5000,
		height: 'auto',
		visible: 4,
		mousePause: 1,
	});

	/* 9. Sidebar Newsfeed-3 */
	$('.newsfeed-3').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 5000,
		height: 'auto',
		visible: 5,
		mousePause: 1,
	});

	/* 10. Sidebar Newsfeed-4 */
	$('.newsfeed-4').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 3000,
		height: 'auto',
		visible: 6,
		mousePause: 1,
	});

	/* 11. Sidebar Newsfeed-5 */
	$('.newsfeed-5').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 3000,
		height: 'auto',
		visible: 7,
		mousePause: 1,
	});

	/* 12. Sidebar Newsfeed-6 */
	$('.newsfeed-6').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 3000,
		height: 'auto',
		visible: 8,
		mousePause: 1,
	});

	/* 12.bis. Sidebar Newsfeed-7 */
	$('.newsfeed-7').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 3000,
		height: 'auto',
		visible: 9,
		mousePause: 1,
	});

	/* 13. News Ticker */
	$('.newsticker').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 4000,
		height: 'auto',
		visible: 1,
		mousePause: 1,
		controls: {
			up: '.up',
			down: '.down'
		}
	});

	/* 14. To Top Button */
	$().UItoTop({
		easingType: 'easeOutQuart'
	});

	/* 15. Owl Carousel - News Slider & Schedule Slider */
	$("#news-slider,#sidebar-schedule-slider").owlCarousel({
		autoPlay: 10000,
		stopOnHover: true,
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		paginationSpeed: 1000,
		goToFirstSpeed: 2000,
		singleItem: true,
		autoHeight: true,
		transitionStyle: "fade"
	});

	/* 16. Owl Carousel - Big Gallery Slider-1 */
	$("#big-gallery-slider-1").owlCarousel({
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		items: 3 // 3 visible items
	});

	/* 17. Owl Carousel - Big Gallery Slider-2 */
	$("#big-gallery-slider-2").owlCarousel({
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		items: 4 // 4 visible items
	});

	/* 18. Owl Carousel - Big Gallery Slider-3 */
	$("#big-gallery-slider-3").owlCarousel({
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		items: 5 // 5 visible items
	});

	/* 19. Owl Carousel - Small Gallery Slider */
	$("#small-gallery-slider").owlCarousel({
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		items: 4, // 4 items above 1400px browser width
		itemsDesktop: [1400, 3], // 3 items between 1400px and 901px
		itemsDesktopSmall: [900, 2], // 2 items betweem 900px and 601px
		itemsTablet: [600, 1], // 1 items between 600 and 0
		itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	});
	
	/* 20. Clock */
	function getDate() {
		var lang = $('html')[0].lang;
		var date = new Date();
		var weekday = date.getDay();
		var month = date.getMonth();
		var day = date.getDate();
		var year = date.getFullYear();
		var hour = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		if (hour < 10) hour = "0" + hour;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		var monthNames = new Array();
		monthNames['ro'] = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
		monthNames['en'] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var weekdayNames = new Array();
		weekdayNames['ro'] = ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
		weekdayNames['en'] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var ampm = " PM ";
		if (hour < 12) ampm = " AM ";
		if (hour > 12) hour -= 12;
		var fullDate  = "";
		var shortDate = "";
		if (lang == "ro") {
			fullDate  = weekdayNames[lang][weekday] + ", " + day + " " + monthNames[lang][month] + ", " + year;
			shortDate = day + " " + monthNames[lang][month] + ", " + year;
		} else {
			fullDate  = weekdayNames[lang][weekday] + ", " + monthNames[lang][month] + " " + day + ", " + year;
			shortDate = monthNames[lang][month] + " " + day + ", " + year;
		}
		var showTime = hour + ":" + minutes + ":" + seconds + ampm;
		document.getElementById('date').innerHTML  = fullDate;
		document.getElementById('time').innerHTML  = showTime;
		if (document.getElementById('sdate') != null) {
			document.getElementById('sdate').innerHTML = '<i class="fa fa-calendar"></i>' + shortDate;
		}
		requestAnimationFrame(getDate);
	}
	getDate();

	/* 21. Subscribe Form */
	$('#subscribeForm').ketchup().submit(function() {
		if ($(this).ketchup('isValid')) {
			var action = $(this).attr('action');
			$.ajax({
				url: action,
				type: 'POST',
				data: {
					email: $('#address').val()
				},
				success: function(data) {
					$('#result').html(data);
				},
				error: function() {
					$('#result').html('Sorry, an error occurred.');
				}
			});
		}
		return false;
	});

	/* 22. Exchange Rates */
	/*$.getJSON("https://api.fixer.io/latest?base=EUR", function(data) {
		var cDate = data.date;
		$('#cdate').append(' ' + cDate);
		$('#euro').append(" " + data.rates.EUR);
		$('#pound').append(" " + data.rates.GBP);
		$('#yen').append(" " + data.rates.JPY);
		$('#franc').append(" " + data.rates.CHF);
		$('#cdollar').append(" " + data.rates.CAD);
		$('#adollar').append(" " + data.rates.AUD);
		$('#ron').append(" " + data.rates.RON);
		$('#rub').append(" " + data.rates.RUB);
	});*/

	/* 23. Currency Converter */
	/*$.get('https://api.fixer.io/latest?base=ZAR', function(data) {
		var countryObject = data.rates;
		for (var key in countryObject) {
			if (countryObject.hasOwnProperty(key)) {
				$('select').append('<option val="' + key + '">' + key + '</option>');
			}
		}
		$('.convertFrom').change(function() {
			var thisValue = $('.convertFrom .selectpicker').val();
			$.get('https://api.fixer.io/latest?base=' + thisValue, function(newData) {
				countryObject = newData.rates;
			});
		});
		$('form').on('submit', function(e) {
			e.preventDefault();
			var convertingTo = $('.convertTo .selectpicker').val(),
				toRate = countryObject[convertingTo],
				amount = $('.currencyValue').val();
			var calculation = amount * toRate;
			if (calculation === 0) {
				$('.output').html('Please enter a valid amount.');
			} else {
				$('.output').html(parseFloat(calculation).toFixed(3));
			}
		});
	});*/

	/* 24. Sidebar Weather */
	/*
	var currWeather = {};
	$(document).ready(function() {
		currWeather = getLocationAndWeather('imperial');
		$('.btn').click(switchScale);
	});

	function switchScale() {
		if ($('.btn>.switch').text() === 'C') {
			$('.btn>.switch').text('F');
			$('.btn').blur();
			getLocationAndWeather('imperial');
		} else {
			$('.btn>.switch').text('C');
			$('.btn').blur();
			getLocationAndWeather('metric');
		}
	}

	function getLocationAndWeather(scale) {
		return getWeather({
			lat: 44.45039209999999,
			long: 26.0994005
		}, scale);
	}

	function getWeather(location, scale) {
		$.getJSON('https://api.openweathermap.org/data/2.5/weather', {
			APPID: '37fdd569a93abf561428e56b402a308b',
			lat: location.lat,
			lon: location.long,
			units: scale
		}, function(results) {
			var wthr = {
				city: results.name,
				wind_speed: (parseFloat(results.wind.speed) * 2.2369362920544).toFixed(1),
				type: results.weather[0].main,
				humidity: results.main.humidity,
				temp: results.main.temp
			};
			setWeather(wthr, scale);
			return wthr;
		});
	}

	function setWeather(weather, scale) {
		$('.weather-city-text', '#weather').text(weather.city);
		$('#type').text(weather.type);
		$('#humidity').text('Humidity: ' + weather.humidity + '%');
		var spdUnit = 'm/s';
		if (scale === 'imperial') spdUnit = 'mph';
		$('#wind').text('Wind: ' + weather.wind_speed + spdUnit);
		$('.temperature', '#weather').text(weather.temp);
		setWeatherType(weather.type);
	}

	function setWeatherType(wType) {
		var icons = {
			Clear: ['wi-day-sunny', '#CFD8DC'],
			Rain: ['wi-rain', '#CFD8DC'],
			Clouds: ['wi-cloudy', '#CFD8DC'],
			Mist: ['wi-fog', '#CFD8DC'],
			Thunderstorm: ['wi-thunderstorm', '#CFD8DC'],
			Snow: ['wi-snow', '#CFD8DC']
		};
		var $iconElem = $('.weather-icon', '#weather');
		//Change the icon
		$iconElem.removeClass('wi-day-sunny wi-rain wi-cloudy wi-fog wi-thunderstorm wi-snow')
		        .addClass(icons[wType][0])
		        .css({
			           'color': icons[wType][1]
		           });
	}
	*/

	/* 25. FitVids plugin for readjusting video sizes */
	$(".video-container").fitVids();

	/* 26. Sidebar Scroll */
	$(".sidebar-scroll").mCustomScrollbar({
		setWidth: false,
		setHeight: 876,
		setTop: 0,
		setLeft: 0,
		axis: "y",
		scrollbarPosition: "outside",
		scrollInertia: 950,
		autoDraggerLength: true,
		autoHideScrollbar: false,
		autoExpandScrollbar: false,
		alwaysShowScrollbar: 0,
		snapAmount: null,
		snapOffset: 0,
		mouseWheel: {
			enable: true,
			scrollAmount: 200,
			axis: "y",
			preventDefault: false,
			deltaFactor: "auto",
			normalizeDelta: true,
			invert: false,
			disableOver: ["select", "option", "keygen", "datalist", "textarea"]
		},
		scrollButtons: {
			enable: false,
			scrollType: "stepless",
			scrollAmount: "auto"
		},
		keyboard: {
			enable: true,
			scrollType: "stepless",
			scrollAmount: "auto"
		},
		contentTouchScroll: 25,
		advanced: {
			autoExpandHorizontalScroll: false,
			autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
			updateOnContentResize: true,
			updateOnImageLoad: true,
			updateOnSelectorChange: false,
			releaseDraggableSelectors: false
		},
		theme: "light",
		callbacks: {
			onInit: false,
			onScrollStart: false,
			onScroll: false,
			onTotalScroll: false,
			onTotalScrollBack: false,
			whileScrolling: false,
			onTotalScrollOffset: 0,
			onTotalScrollBackOffset: 0,
			alwaysTriggerOffsets: true,
			onOverflowY: false,

			onOverflowX: false,
			onOverflowYNone: false,
			onOverflowXNone: false
		},
		live: false,
		liveSelector: null
	});

	/* 27. Anchor Scroll */
	/*
	$("a").click(function(event) {
		var link = $(this).attr("href");
		if (link.indexOf("#") != -1) {
			event.preventDefault();
		}
	});
	*/

	// ========== Google Map ========== //
	/*
	$(function() {

	    // Setup map
	    function initialize() {

	        if (typeof $('#map-canvas')[0] !== 'undefined') {
	            // Options
	            var myLatlng = new google.maps.LatLng(44.45039201, 26.0994005);
	            var mapOptions = {
	                zoom: 15,
	                center: myLatlng
	            };

	            var map = new google.maps.Map($('#map-canvas')[0], mapOptions);
	            var contentString = 'DoingBusiness.ro';

	            var infowindow = new google.maps.InfoWindow({
	                content: contentString
	            });

	            var marker = new google.maps.Marker({
	                position: myLatlng,
	                map: map,
	                title: 'DoingBusiness.ro'
	            });

	            google.maps.event.addListener(marker, 'click', function() {
	                infowindow.open(map, marker);
	            });
	        }
	    };
	    
	    if (typeof $('#map-canvas')[0] !== 'undefined') {
	       // Initialize map on window load
	       google.maps.event.addDomListener(window, 'load', initialize);
	    }

	});
	*/

	$(function(){
		
		if ($("#topPos").length) {
			
			var topPosition = $("#topPos").offset().top;
	
			$(window).scroll(function() {		
				var s = $(document).scrollTop();
				if(s >= topPosition) {
					$("#stickyNav").css('position','fixed');
					$("#stickyNav").css('top','80px');
	  			} else {
					$("#stickyNav").css('position','relative');
					$("#stickyNav").css('top','0');
				}
			});
		}
	});

	/* Mike toHash */
	$('a[href^="#"]').on('click',function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		if (target && target != '#quick' && target != '#advanced') {
			$('html, body').stop().animate({
				'scrollTop': $(target).offset().top-16
			}, 1200, 'swing', function () {
				window.location.hash = target;
			});
		}
	});

	$('#stickyNav a').on('click', function() {
		$(this).parent().each(function() {
  			$('li').removeClass('active');
		});
		$(this).parent().addClass('active');
	});

	/* MCR MENU */
	$(document).ready(function() {
	    $('h3[id^="mcrmenu_"]').on("click", function(e) {
	        e.preventDefault();
	        var mcrmenu = this.id.split("_").pop();
	        var clsmenu = function(){ $('.mcrsm').stop(true, true).slideUp(); }
	        var opnmenu = function(){ $('.mcrsubmenu-'+mcrmenu).stop(true, true).slideDown(); }
	        // inchidem toate meniurile
	        window.setTimeout(clsmenu, 100);
	        // deschidem meniul curent
	        window.setTimeout(opnmenu, 300);
	        
	        return false;
	    });
	});
	/* MCR MENU */

	/* SEARCH */
	$(document).ready(function() {
	    $('#search').on("click submit", function(e) {
	        e.preventDefault();
	        var search = $(this).find('input').val();
	        var link = $(this).find('a').prop('href');
	        link = link.substring(0, link.lastIndexOf("/") + 1);
	        if (search.length > 1) {
	        	link = link + encodeURIComponent(search.replace(/[^\w\s]/gi, '')).replace(/%20/g, "+");
	        	$(this).find('a').prop('href', link);
	        	window.location.href = link;
	        }
	        return false;
	    });
	});
	/* SEARCH */

	/* CAEN / COUNTY */
	$(".entry-block.caen,.entry-block.county").click(function() {
        window.location = $(this).find("a").attr("href"); 
        return false;
    });
    /* CAEN / COUNTY */

    /* CHARTS */
	$(document).ready(function() {
	    $('#caChart, #ppChart, #naChart').css({'width':"100%"}).css({'height':"100%"});
	});
	/* CHARTS */

	/* 28. CKeditor ReadMore */
	$(function(){
		var $ckeditorReadmore = $('.ckeditor-readmore');

  		if ($ckeditorReadmore.length > 0) {
			var $ckeditorReadmoreParent = $ckeditorReadmore.wrap('<div class="ckeditor-readmore-wrapper"></div>').parent();

	  		$ckeditorReadmoreParent.append('<div class="text-center"><button class="ckeditor-readmore-toggler">|READMORE|</button></div>');
	  		//$ckeditorReadmoreParent.append('<a class="ckeditor-readmore-toggler" href="#">'+more_text+'</a>');

			$('.ckeditor-readmore-toggler').on('click', function (event) { // $('.ckeditor-readmore-toggler').once().on('click', function (event) 
	  			event.preventDefault();
	  			$('.ckeditor-readmore').show();
	  			$(this).hide();
			});
		}
	});
	/* 28. CKeditor ReadMore */

})(jQuery);
;