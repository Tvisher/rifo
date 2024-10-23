

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