
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

const mainImageSvg = document.querySelector('#main-image');
const mainImageLayers = [...mainImageSvg.querySelectorAll('[data-main-layer]')];
const selectActiveLayer = (ind) => {
    mainImageLayers.forEach(el => el.classList.remove('active'));
    let activeLayer = mainImageLayers.find(el => el.dataset.mainLayer == ind);
    activeLayer && activeLayer.classList.add('active');
    mainImageSvg.setAttribute('data-active-index', ind);
}

let activeMainSlide = 0;
const mainImageSlider = new Swiper('.main-image-slider', {
    slidesPerView: 'auto',
    speed: 400,
    spaceBetween: 20,
    loop: 1,
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        activeIndexChange: (slider) => {
            const activeSlideIndex = slider.realIndex + 1
            activeMainSlide = activeSlideIndex;
            console.log(activeSlideIndex);
            selectActiveLayer(activeSlideIndex);
        },
    },

});

mainImageLayers.forEach(el => {
    el.addEventListener('click', (e) => {
        const elIndex = el.dataset.mainLayer;
        selectActiveLayer(elIndex);
        mainImageSlider.slideTo(elIndex - 1);
        mainImageSvg.classList.add('selected')
    });
})
