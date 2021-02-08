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

    /*
        changing image on main page, depends on config array
    */
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

    
    let flowersArray        = [
        './img/welcoming_window/flowers/blue.png',
        './img/welcoming_window/flowers/white.png',
        './img/welcoming_window/flowers/yellow.png'
    ],
    flowerTemplate          = document.createElement('img');
    flowersContainer        = document.querySelector('.welcoming-window-content-flowers-container'),
    maxFlowers              = window.innerWidth <= 700 ? 25 : 
                              window.innerWidth > 700 && window.innerWidth <= 1100 ? 30 : 40,
    flowersCounter          = 0,
    initialFlowerPosition   = -10; //%

    function returnRandomFlowerSrc(flowersArray) {
        let randomFlowerIndex = Math.floor(Math.random() * Math.floor(flowersArray.length));
        return flowersArray[randomFlowerIndex];
    }

    //TODO: Make moving not by % but by pixels

    /*
        throwing a flowers from flowersArray
    */
    function throwAFlower(flowerCounter, maxFlowers) {
        let flower = flowerTemplate.cloneNode();
        flower.src = returnRandomFlowerSrc(flowersArray);
        flower.style.position = "absolute";
        flower.style.zIndex = 3;
        flowersContainer.appendChild(flower);
        flower.style.top = `${(Math.floor(Math.random() * 100))}%`;
        flower.classList.add('welcoming-window-animated-flower');

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
                clearInterval(flowerThrower);
            }
        }, 40)
    },500)

    /* 1100, 970
        computing initial margins for logos, to position them properly
    */
    function computeMarginsForLogosElements() {
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
        logos[0].style.marginLeft = `${leftAndRightAutoMargins*1.30}px`
        logos[0].style.marginRight = `${leftAndRightAutoMargins*0.7}px`
        logos[1].style.marginLeft = `${leftAndRightAutoMargins*0.7}px`
        logos[1].style.marginRight = `${leftAndRightAutoMargins*1.30}px`
    }

    computeMarginsForLogosElements();

    /*
        control appearing process of quotes and logos container        
    */
    function logosAndQuotesContainerAppearance() {
        let container = document.querySelector('.welcoming-window-content-quotes-and-logos-container');
        setTimeout(()=>{
            container.classList.add('welcoming-window-content-quotes-and-logos-container-appearing')
        }, 2000)
    }

    logosAndQuotesContainerAppearance();
}