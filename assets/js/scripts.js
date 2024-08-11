/**
 * Shelly HTML Template
 * Shelly School HTML Template has been specially designed with your learning community in mind.
 * Exclusively on https://1.envato.market/tf-merkulove
 *
 * @encoding        UTF-8
 * @version         1.0.1
 * @copyright       (C) 2018 - 2021 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Envato License https://1.envato.market/KYbje
 * @contributors    Dmitry Merkulov (dmitry@merkulov.design)
 * @support         help@merkulov.design
 **/

( function ( $ ) {

    "use strict";

    $( document ).ready( function () {

        // Classes carousel
        $('.classes-carousel').slick({

            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            arrows:true,
            autoplay:true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]

        });

        // Blog carouse - blog.html
        $('.blog-carousel').slick({

            slidesToShow: 1,
            infinite:true,
            slidesToScroll: 1,
            autoplay: true,
            dots: false,
            arrows:true,
            autoplaySpeed: 2000

        });

        // Classes carousel in the sidebar - class-single.html
        $('.classes-section-sidebar').slick({

            slidesToShow: 1,
            infinite:true,
            slidesToScroll: 1,
            autoplay: true,
            dots: true,
            arrows:true,
            autoplaySpeed: 2000

        });

        /**
         * Responsive Mobile Menu
         */
        $(".menu-btn").on("click", function() {

            $(this).toggleClass("active");
            $(".responsive-menu").toggleClass("active");
            $("body").toggleClass("scroll-hide");

        });

        $(".responsive-menu ul ul").parent().addClass("menu-item-has-children");
        $(".responsive-menu ul li.menu-item-has-children > a").on("click", function() {

            $(this).parent().toggleClass("active").siblings().removeClass("active");
            $(this).next("ul").slideToggle();
            $(this).parent().siblings().find("ul").slideUp();
            return false;

        } );

        /**
         * AJAX Contact Form Script
         * Working Contact Form
         */
        if($('#contact-form').length) {

            $('#submit').on("click", function() {

                var o = new Object();
                var form = '#contact-form';
                var name = $('#contact-form .name').val();
                var email = $('#contact-form .email').val();

                if(name == '' || email == '') {

                    $('#contact-form .response').html('<div class="failed">Please fill the required fields.</div>');
                    return false;

                }

                $.ajax( {

                    url:"mail.php",
                    method:"POST",
                    data: $(form).serialize(),
                    beforeSend:function(){
                        $('#contact-form .response').html('<div class="text-info"><img src="assets/img/preloader.gif" alt="Loading..."> Loading...</div>');
                    },
                    success:function(data){
                        $('form').trigger("reset");
                        $('#contact-form .response').fadeIn().html(data);
                        setTimeout(function(){
                            $('#contact-form .response').fadeOut("slow");
                        }, 5000);
                    },
                    error:function(){
                        $('#contact-form .response').fadeIn().html(data);
                    }

                } );

            } );

        }

        /**
         * Back to top button
         */
        $( '.back-to-top' ).on( 'click', function (  ) {

            scrollTo({top: 0, behavior: 'smooth'});

        } );

        // slider
        const carousel = document.querySelector(".slider-testimoni");
        const arrowBtns = document.querySelectorAll(".testimoni i");
        const wrapper = document.querySelector(".testimoni");
    
        const firstCard = carousel.querySelector(".card");
        const firstCardWidth = firstCard.offsetWidth;

        let element = document.querySelector(".testimoni-section");
        let x = element.children[0].children[1];
        console.log(x);
        
    
        let isDragging = false,
            startX,
            startScrollLeft,
            timeoutId;
    
        const dragStart = (e) => { 
            isDragging = true;
            carousel.classList.add("dragging");
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        };
    
        const dragging = (e) => {
            if (!isDragging) return;
        
            // Calculate the new scroll position
            const newScrollLeft = startScrollLeft - (e.pageX - startX);
        
            // Check if the new scroll position exceeds 
            // the carousel boundaries
            if (newScrollLeft <= 0 || newScrollLeft >= 
                carousel.scrollWidth - carousel.offsetWidth) {
                
                // If so, prevent further dragging
                isDragging = false;
                return;
            }
        
            // Otherwise, update the scroll position of the carousel
            carousel.scrollLeft = newScrollLeft;
        };
    
        const dragStop = () => {
            isDragging = false; 
            carousel.classList.remove("dragging");
        };
    
        const autoPlay = () => {
        
            // Return if window is smaller than 800
            if (window.innerWidth < 800) return; 
            
            // Calculate the total width of all cards
            const totalCardWidth = carousel.scrollWidth;
            
            // Calculate the maximum scroll position
            const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
            
            // If the carousel is at the end, stop autoplay
            if (carousel.scrollLeft >= maxScrollLeft) return;
            
            // Autoplay the carousel after every 2500ms
            timeoutId = setTimeout(() => 
                carousel.scrollLeft += firstCardWidth, 2500);
        };
    
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        wrapper.addEventListener("mouseenter", () => 
            clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);
    
        // Add event listeners for the arrow buttons to 
        // scroll the carousel left and right
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id === "left" ? 
                    -firstCardWidth : firstCardWidth;
            });
        });

    } )

} ( jQuery ) );