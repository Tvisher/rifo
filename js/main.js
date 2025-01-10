
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


const mainImageSection = document.querySelector('.main-image-section');
const mainImageSvg = document.querySelector('#main-image');
const layersBackBtn = document.querySelector('.layers-back')

const mainImageLayers = [...mainImageSvg.querySelectorAll('[data-main-layer]')];
const selectActiveLayer = (ind) => {
    const prevActiveInnerLayer = document.querySelector('[data-layer].show');
    if (prevActiveInnerLayer) prevActiveInnerLayer.classList.remove('show');

    mainImageLayers.forEach(el => el.classList.remove('active'));
    let activeLayer = mainImageLayers.find(el => el.dataset.mainLayer == ind);
    activeLayer && activeLayer.classList.add('active');
    mainImageSvg.setAttribute('data-active-index', ind);

    const activeInnerLayer = document.querySelector(`[data-layer="${ind}"]`);
    if (activeInnerLayer && mainImageSection.classList.contains('selected')) {
        activeInnerLayer.classList.add('show');
        const layerIndex = activeInnerLayer.getAttribute('data-layer');
        const layerElems = activeInnerLayer.querySelectorAll('[data-inner]');

        const activeElemInLayer = layerElems[0];
        const activeElemInLayerDataId = activeElemInLayer.getAttribute('data-inner');

        activeElemInLayer.classList.add('active');
        const activeLayerElemsInImage = document.querySelectorAll(`[data-layer-elem = '${layerIndex}-${activeElemInLayerDataId}']`);
        activeLayerElemsInImage.forEach(el => el.classList.add('active'));
        setTimeout(() => {
            mainImageSvg.style.width = 'calc(100% + 1px)';
        }, 1010);
    }
}

let activeMainSlide = 0;
const mainImageSlider = new Swiper('.main-image-slider', {
    slidesPerView: 'auto',
    speed: 400,
    spaceBetween: 20,
    loop: 1,
    autoHeight: 1,
    autoplay: {
        delay: 3000,
        disableOnInteraction: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.main-image-slider__wrapper .swiper-button-next',
        prevEl: '.main-image-slider__wrapper .swiper-button-prev',
    },
    on: {
        activeIndexChange: (slider) => {
            const activeSlideIndex = slider.realIndex + 1;
            activeMainSlide = activeSlideIndex;
            cleanAllActivePath();
            cleanAllActiveListElems();
            selectActiveLayer(activeMainSlide);
        },
    },

});

mainImageLayers.forEach(el => {
    el.addEventListener('click', (e) => {
        mainImageSlider.autoplay.stop();
        const elIndex = el.dataset.mainLayer;
        mainImageSection.classList.add('selected');
        mainImageSlider.slideToLoop(elIndex - 1);
    });
});

layersBackBtn.addEventListener('click', () => {
    cleanAllActivePath();
    cleanAllActiveListElems();
    mainImageSection.classList.remove('selected');
    mainImageSlider.autoplay.start();
    const prevActiveInnerLayer = document.querySelector('[data-layer].show');
    if (prevActiveInnerLayer) prevActiveInnerLayer.classList.remove('show');
});

function cleanAllActivePath() {
    const activePathList = mainImageSection.querySelectorAll('[data-layer-elem].active');
    activePathList.forEach(el => el.classList.remove('active'));
}

function cleanAllActiveListElems() {
    const activeListElems = mainImageSection.querySelectorAll('[data-inner].active');
    activeListElems.forEach(el => el.classList.remove('active'));
}


const layerInnerItems = document.querySelectorAll('[data-inner]');
layerInnerItems.forEach(el => {
    const elParentId = el.closest('[data-layer]').getAttribute('data-layer');
    el.addEventListener('click', (e) => {
        if (e.target.closest('.inner-item__link')) return;
        cleanAllActivePath();
        cleanAllActiveListElems();
        el.classList.add('active');
        const elId = el.getAttribute('data-inner');
        const activeLayerElemsInImage = document.querySelectorAll(`[data-layer-elem = '${elParentId}-${elId}']`);
        activeLayerElemsInImage.forEach(el => el.classList.add('active'));
    });
})




const logosSlider = new Swiper('.logos-section__wrapper', {
    slidesPerView: 4,
    speed: 1000,
    spaceBetween: 50,
    loop: 1,
    autoplay: {
        delay: 2000,
    },
});