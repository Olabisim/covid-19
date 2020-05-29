
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    
    nextBtn.addEventListener('click',function(){
        nextSlide();
    });
    prevBtn.addEventListener('click',function(){
        prevSlide();
    });

let slideNo = 0;




const nextSlide = ()=>{
    const slider = document.querySelector('.slider');
    const slides = slider.getElementsByClassName('slide');
    const currentSlide = document.querySelector('.slide.active');
    
    currentSlide.classList.remove('active');
    slideNo = (slideNo + 1) % slides.length;
    slider.style.marginLeft = '-'+slideNo+'00%';
    slides[slideNo].classList.add('active');
};


const prevSlide = ()=>{
    const slider = document.querySelector('.slider');
    const slides = slider.getElementsByClassName('slide');
    const currentSlide = document.querySelector('.slide.active');
    
    currentSlide.classList.remove('active');
    slideNo = (slideNo - 1 + slides.length) % slides.length;
    slider.style.marginLeft = '-'+slideNo+'00%';
    slides[slideNo].classList.add('active');
};


function resetTimer(){


    clearInterval(timer);
    
    timer = setInterval( autoPlay, 4000);
}


function autoPlay(){
    nextSlide();
}

let timer = setInterval( autoPlay, 4000);
