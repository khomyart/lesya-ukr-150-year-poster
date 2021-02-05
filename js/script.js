window.onload = () => {
    document.body.style.display = 'block';
    const   welcomingWindow = document.getElementsByClassName('welcoming-window')[0];
    const   config = {
                imageChangingTime: 10000, //ms
                images: [
                    '/img/welcoming_page/02.jpg',
                    '/img/welcoming_page/03.jpg',
                    '/img/welcoming_page/04.jpg',
                    '/img/welcoming_page/05.jpg',
                    '/img/welcoming_page/08.jpg',
                    '/img/welcoming_page/09.jpg',
                    '/img/welcoming_page/10.jpg',
                    '/img/welcoming_page/11.jpg',
                    '/img/welcoming_page/14.jpg',
                    '/img/welcoming_page/15.jpg',
                    '/img/welcoming_page/16.jpg',
                    '/img/welcoming_page/17.jpg',
                    '/img/welcoming_page/18.jpg',
                    '/img/welcoming_page/19.jpg',
                    '/img/welcoming_page/20.jpg',
                    '/img/welcoming_page/21.jpg',
                    '/img/welcoming_page/22.jpg',
                ],
                imageFaderStep: 0.01
            }

    let i = 1;

    //changing image on main page
    setInterval(()=>{
        if (i >= config.images.length) i = 0;
        let previousImage = document.getElementsByClassName('welcoming-window-image')[0];
        let newImage = welcomingWindow.appendChild(document.createElement('img'));
        setTimeout(()=>{
            newImage.setAttribute('src', config.images[i]);
            newImage.className = 'welcoming-window-image';
            i = i + 1;
            newImage.style.zIndex = -2;
        },10)

        currentOpacity = 1;
        imageFader = setInterval(()=>{
            currentOpacity = currentOpacity - config.imageFaderStep;
            previousImage.style.opacity = currentOpacity;
            
            if (currentOpacity <= config.imageFaderStep) {
                previousImage.remove();
                newImage.style.zIndex = -1;
                clearInterval(imageFader);
            }
        }, 20)

    }, config.imageChangingTime);

    //throwing a flowers from flowersArray
    let flowersArray        = [
        './img/welcoming_window/flowers/blue.png',
        './img/welcoming_window/flowers/white.png',
        './img/welcoming_window/flowers/yellow.png'
    ],
    flowerTemplate          = document.createElement('img');
    flowersContainer        = document.querySelector('.welcoming-window-content-flowers-container'),
    maxFlowers              = 20,
    flowersCounter          = 0,
    initialFlowerPosition   = -10; //%

    function returnRandomFlowerSrc(flowersArray) {
        let randomFlowerIndex = Math.floor(Math.random() * Math.floor(flowersArray.length));
        return flowersArray[randomFlowerIndex];
    }
//TODO: Make moving not by % but by pixels
    function throwAFlower(flowerCounter, maxFlowers) {
        // let currentFlowerPosition;
        // let flowerMovingStepValue = 0.5;
        
        // let flower = flowerTemplate.cloneNode();
        // flower.src = returnRandomFlowerSrc(flowersArray);
        // flower.style.position = "absolute";
        // flower.style.zIndex = 3;
        // flowersContainer.appendChild(flower);
    
        // currentFlowerPosition = initialFlowerPosition;
        // flower.style.left = `${initialFlowerPosition}%`;
        // flower.style.top = `${(Math.floor(Math.random() * 100))}%`;
    
        // let flowerThrowingInterval = setInterval(()=>{
        //     currentFlowerPosition += flowerMovingStepValue;
        //     flower.style.left = `${currentFlowerPosition}%`
    
        //     if (currentFlowerPosition > 100) {
        //     // if (currentFlowerPosition > (Math.floor(Math.random() * 100) + 100)) {
        //         clearInterval(flowerThrowingInterval);
        //         flower.remove();
        //     }
        // }, 30);
        let flower = flowerTemplate.cloneNode();
        flower.src = returnRandomFlowerSrc(flowersArray);
        flower.style.position = "absolute";
        flower.style.zIndex = 3;
        flowersContainer.appendChild(flower);
        flower.style.top = `${(Math.floor(Math.random() * 100))}%`;
        flower.classList.add('welcoming-window-animated-flower');

        // setTimeout(()=>{
        //     flower.style.marginLeft = `${100}%`;
        // },50)

        setTimeout(()=>{
            flower.style.marginLeft = `${(Math.floor(Math.random() * 150/maxFlowers) + (150 - (150/maxFlowers*(flowerCounter+1))))}%`;
        },20)
    }

    setTimeout(()=>{
        let flowerThrower = setInterval(function() {
            throwAFlower(flowersCounter, maxFlowers);
            flowersCounter += 1;
            if (flowersCounter > maxFlowers) {
                let flowersList = document.querySelectorAll('.welcoming-window-animated-flower');
                // flowersList.forEach(flower => {
                //     flower.style.transitionDuration = `20s`;
                // });
                
                clearInterval(flowerThrower);
            }
        }, 40)
    },500)

    let coputedStylesOfLogos = [];
    let logos = [];
    logos.push(document.querySelector('.logo-1'))
    logos.push(document.querySelector('.logo-2'))
    coputedStylesOfLogos.push(getComputedStyle(logos[0]))
    coputedStylesOfLogos.push(getComputedStyle(logos[1]))

    let amountOfLogos = 2;
    let logosContainerWidth = logos[0].parentNode.offsetWidth;
    let widthOfAllAvailableLogos = logos[0].offsetWidth + logos[1].offsetWidth;

    let allAvailableMargin = (logosContainerWidth - widthOfAllAvailableLogos);
    let leftAndRightAutoMargins = allAvailableMargin / (2 * amountOfLogos);
    console.log(leftAndRightAutoMargins)
    logos[0].style.marginLeft = `${leftAndRightAutoMargins*1.30}px`
    logos[0].style.marginRight = `${leftAndRightAutoMargins*0.7}px`
    logos[1].style.marginLeft = `${leftAndRightAutoMargins*0.7}px`
    logos[1].style.marginRight = `${leftAndRightAutoMargins*1.30}px`

    // setTimeout(()=>{
    //     let amountOfLogos = 2;
    //     let logosContainerWidth = logos[0].parentNode.offsetWidth;
    //     let widthOfAllAvailableLogos = logos[0].offsetWidth + logos[1].offsetWidth;

    //     let allAvailableMargin = (logosContainerWidth - widthOfAllAvailableLogos);
    //     let leftAndRightAutoMargins = allAvailableMargin / (2 * amountOfLogos);
    //     console.log(leftAndRightAutoMargins)
    //     // logos[0].style.marginLeft = `${20}px`
    //     // logos[0].style.marginRight = `${20}px`
    //     // logos[1].style.marginLeft = `${20}px`
    //     // logos[1].style.marginRight = `${20}px`
    // },1000)

}