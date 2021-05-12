$(document).ready(function () {

	var $wrapper = $('.tab-wrapper'),
		$allTabs = $wrapper.find('.tab-content > div'),
		$tabMenu = $wrapper.find('.tab-menu li'),
		$line = $('<div class="line"></div>').appendTo($tabMenu);

	$allTabs.not(':first-of-type').hide();
	$tabMenu.filter(':first-of-type').find(':first').width('100%')

	$tabMenu.each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});

	$allTabs.each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});

	$tabMenu.on('click', function () {

		var dataTab = $(this).data('tab'),
			$getWrapper = $(this).closest($wrapper);

		$getWrapper.find($tabMenu).removeClass('active');
		$(this).addClass('active');

		$getWrapper.find('.line').width(0);
		$(this).find($line).animate({ 'width': '100%' }, 'fast');
		$getWrapper.find($allTabs).hide();
		$getWrapper.find($allTabs).filter('[data-tab=' + dataTab + ']').show();
	});

	$("#flip").click(function () {
		$("#panel").slideToggle("hide");
	});


});//end ready


function myFunction(x) {
	x.classList.toggle("change");
}


new Swiper('.swiper-one', {
	spaceBetween: 80,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	loop: true,
	speed: 800,
	autoplay: {
		delay: 2000,
		stopOnLastSlide: false,
		disablenOnInteraction: false,
	},

});



new Swiper('.swiper-two', {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	loop: true,
	speed: 800,
	autoplay: {
		delay: 2000,
		stopOnLastSlide: false,
		disablenOnInteraction: false,
	},

	breakpoints: {
		1440: {
			spaceBetween: 40,
			slidesPerView: 2,
		},
		1336: {
			spaceBetween: 40,
			slidesPerView: 2,
		},
		1200: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		1024: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		500: {
			spaceBetween: 20,
			slidesPerView: 1,
		},

		320: {
			spaceBetween: 10,

			slidesPerView: 1,
		}

	}
});
