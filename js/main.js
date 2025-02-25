
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
        // autoHeight: 1,
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
if (mainImageSection) {
    const mainImageSvg = document.querySelector('#main-image');
    const layersBackBtn = document.querySelector('.layers-back');
    let intervalId;
    const mainImageLayers = [...mainImageSvg.querySelectorAll('[data-main-layer]')];
    const selectActiveLayer = (ind) => {
        stopInterval();
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

            let activeIndex = 0;
            // Функция для смены активного элемента
            function setActiveElement() {
                const activeElemInLayer = layerElems[activeIndex];
                layerElems.forEach(elem => elem.classList.remove('active'));
                layerElems[activeIndex].classList.add('active');
                activeIndex = (activeIndex + 1) % layerElems.length;
                cleanAllActivePath();
                const activeElemInLayerDataId = activeElemInLayer.getAttribute('data-inner');
                const activeLayerElemsInImage = document.querySelectorAll(`[data-layer-elem = '${layerIndex}-${activeElemInLayerDataId}']`);
                activeLayerElemsInImage.forEach(el => el.classList.add('active'));
            }
            // Устанавливаем начальный активный элемент
            setActiveElement();
            // Запускаем интервал смены
            intervalId = setInterval(setActiveElement, 3000);

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
        stopInterval();
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
            stopInterval();
            cleanAllActivePath();
            cleanAllActiveListElems();
            el.classList.add('active');
            const elId = el.getAttribute('data-inner');
            const activeLayerElemsInImage = document.querySelectorAll(`[data-layer-elem = '${elParentId}-${elId}']`);
            activeLayerElemsInImage.forEach(el => el.classList.add('active'));
        });
    });

    // Функция для остановки интервала
    function stopInterval() {
        if (intervalId) {
            clearInterval(intervalId); // Останавливаем интервал
            intervalId = null; // Сбрасываем идентификатор
        }
    }
}



const logosSlider = new Swiper('.logos-section__wrapper', {
    slidesPerView: 1,
    grabCursor: 1,
    speed: 1000,
    spaceBetween: 50,
    loop: 1,
    autoplay: {
        delay: 2000,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        }
    }
});

const mobMenuBtn = document.querySelector('.mob-menu-btn');
const mobMenu = document.querySelector('.mobile-menu');
const bodyEl = document.querySelector('body');
const stickySidebar = document.querySelector('.sticky-sidebar');

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.mob-menu-btn')) {
        mobMenu.classList.add('show');
        bodyEl.classList.add('menu-open');
    }
    if (target.closest('.close-menu-btn')) {
        mobMenu.classList.remove('show');
        bodyEl.classList.remove('menu-open');
    }

    if (target.closest('.catalog-ico')) {
        stickySidebar.classList.add('show');
        bodyEl.classList.add('menu-open');
    }

    if (target.closest('.arrow-ico')) {
        stickySidebar.classList.remove('show');
        bodyEl.classList.remove('menu-open');
    }
})