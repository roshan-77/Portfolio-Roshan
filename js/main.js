(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	/*---- Skill ----*/
	$('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

})(jQuery);

const gitProject = $('.github-projects')

$.ajax({url : "https://api.github.com/users/roshan-77/repos",
	method: "GET"
}).then((result)=>{console.log(result)

	for(var i=0; i<=result.length; i++){
		if(result[i].stargazers_count !== 0){
			let article = `<div class="col-md-4">
          <div class="work-box" >
            <div class= "work-box-m" data-bs-toggle="modal" data-bs-target="#portfolio-modal-1" >
              <div class="work-img">
                <img src="https://raw.githubusercontent.com/roshan-77/${result[i].name}/${result[i].default_branch}/Thumbnail/thumbnail.png" alt="Thumbnail" class="img-fluid">
              </div>
              <div class="work-content">
                <div class="row">
                  <div class="col-sm-12">
                    <h2 class="w-title">${result[i].name}</h2>
                  </div>
                  <div class="w-portfolio-links">
                    ${result[i].has_pages === true ? `<a href="https://roshan-77.github.io/${result[i].name}/" target="_blank"><button class="button">Website</button></a>` : '<div></div>'}
                    <a href="https://github.com/roshan-77/${result[i].name}" target="_blank"><button class="button">Source Code</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
			gitProject.append(article)
		}

	}
})

// Email Js
function sendMail(params){
	var tempParams= {
	  from_name:document.getElementById('fromName').value,
	  from_email: document.getElementById('fromEmail').value,
	  subject: document.getElementById('subject').value,
	  message:document.getElementById('msg').value,
	}
	if(tempParams.from_name !="" && tempParams.from_email !="" && tempParams.subject !="" && tempParams.subject !=""){
		emailjs.send('service_2hs31fo', 'template_6cvxcsf', tempParams)
		.then(function(res){
		console.log("success", res.status)
		}).then(()=>alert("Email Sent!!"))
		.then(()=>{
		document.getElementById('fromName').value = ''
		document.getElementById('fromEmail').value = ''
		document.getElementById('subject').value =''
		document.getElementById('msg').value =''
		})
	}else{
		
	}
  }
