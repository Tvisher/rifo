
$(document).ready(function () {
    $('.has-submenu > a').click(function (e) {
        e.preventDefault();
        var $submenu = $(this).next('.submenu');

        // Закрыть все открытые подменю, если кликнули на другой пункт меню
        $('.submenu').not($submenu).slideUp();
        $('.has-submenu').not($(this).parent()).removeClass('active');

        // Переключить текущее подменю
        $(this).parent().toggleClass('active');
        $submenu.slideToggle();
    });


});


const cardsSliders = document.querySelectorAll('.cards-section__wrapper');
cardsSliders.forEach(wrapper => {
    const sliderElement = wrapper.querySelector('.cards-section__slider');
    const prevSlideBtn = wrapper.querySelector('.swiper-button-prev');
    const nextSlideBtn = wrapper.querySelector('.swiper-button-next');
    const cardsSlider = new Swiper(sliderElement, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
            nextEl: nextSlideBtn,
            prevEl: prevSlideBtn,
        },
        breakpoints: {
            768: {
                spaceBetween: 20
            },
            992: {
                spaceBetween: 40
            }
        }
    });
})




const articleSlider = new Swiper('.article-page__slider', {
    slidesPerView: 1,
    speed: 900,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    }, navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})