////////// Responsive
// Breackpoints
let breakpoints = {
	xl : 1200,
	lg : 992,
	md : 768,
	sm : 576,
	xsm: 375
};

// Media quares
let MQ = {
	wWidth : 0,
	isXL   : false,
	isLG   : false,
	isMD   : false,
	isSM   : false,
	isXSM  : false,
	updateState: function(){
		this.wWidth = $(window).width();

		for( let key in breakpoints ){
			this['is'+ key.toUpperCase()] = this.wWidth < breakpoints[key];
		}
		isMobile = this.isMD;
	}
};

MQ.updateState();

$(window).on('resize', function () {
	MQ.updateState();

	console.log(MQ);
});


////////// Common functions
// Open popup
$('.js-popup').click(function (event) {
	event.preventDefault();
	let popupID = $(this).attr('href');

	mfpPopup(popupID);
});

// mobile menu toggle
$('.js-menu').click(function () {

	$(this).toggleClass('is-active');
	$('.menu').toggleClass('opened');
});

// Phone input mask
$('input[type="tel"]').inputmask({
	mask: '+7 (999) 999-99-99',
	showMaskOnHover: false
});

// E-mail Ajax Send
$('form').submit(function (e) {
	e.preventDefault();

	let form = $(this);
	let formData = {};
	formData.data = {};

	// Serialize
	form.find('input, textarea').each(function () {
		let name = $(this).attr('name');
		let title = $(this).attr('data-name');
		let value = $(this).val();

		formData.data[name] = {
			title: title,
			// value: value
		};

		if (name === 'subject') {
			formData.subject = {
				// value: value
			};
			delete formData.data.subject;
		}
	});

	$.ajax({
		type: 'POST',
		url: 'mail/mail.php',
		dataType: 'json',
		data: formData
	}).done(function (data) {

		if (data.status === 'success') {
			if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
				form.find('.form-result').addClass('form-result--success');
			} else {
				mfpPopup('#success');
			}

			setTimeout(function () {
				if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
					form.find('.form-result').removeClass('form-result--success');
				}
				$.magnificPopup.close();
				form.trigger('reset');
			}, 3000);

		} else {
			alert('Ajax result: ' + data.status);
		}

	});
	return false;
});



// ==========================================================================
// Ready Functions
// ==========================================================================
$(document).ready(function () {

	//

});



// ==========================================================================
// Load functions
// ==========================================================================
$(window).on('load', function () {

	// 

});

// Popup
let mfpPopup = function (popupID, source) {
	$.magnificPopup.open({
		items: {
			src: popupID
		},
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		closeMarkup: '<button type="button" class="mfp-close">&times;</button>',
		mainClass: 'mfp-fade-zoom',
		// callbacks: {
		// 	open: function() {
		// 		$('.source').val(source);
		// 	}
		// }
	});
};