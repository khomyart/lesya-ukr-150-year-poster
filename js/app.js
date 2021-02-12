const app = Vue.createApp({
    data() {
        return {
            connectionAddress: '192.168.0.102',
            events: [],
            currentDate: {},
            todayEvents: [],
            isLogosMarginRecalculatedNeeded: true,
            currentLogosHolderIndex: 0,
            currentQuoteIndex: 0,
            logosList: ['2-logos', '3-logos'],
            quotesList: ['quote-0', 'quote-1', 'quote-2', 'quote-3', 'quote-4', 'quote-5'],
            isMusicPlaying: false,
            audioInstance: {},
            classes: {
                defaultEventCard: 'event-card',
                eventCardWithHref: 'event-card-with-href',
            }
        }
    },
    computed: {
        currentLogosHolder: function() {
            return this.logosList[this.currentLogosHolderIndex];
        },
        currentQuote: function() {
            return this.quotesList[this.currentQuoteIndex];
        },
        quoteCounter: function() {
            return `${this.currentQuoteIndex}/${this.quotesList.length-1}`
        }
    },
    watch: {
        currentDate: function(val, oldVal) {
            if (val.day != oldVal.day) {
                this.getEventsList();
            }
        }
    },
    methods: {
        goToLink(link) {
            if ( link != null) {
                let audio = new Audio('/sfx/harp.mp3');
                audio.play();
                window.open(link);
            }
        },
        getEventsList() {
            function combineArraysByDate(arrayNeededToBeSorted) {
                let sortedByDateArray = [];
                arrayNeededToBeSorted.forEach((el, index)=>{
                      if (index == 0) {
                      sortedByDateArray.push({
                        date_begining: el.date_begining, 
                        date_end: el.date_end,
                        events: [],
                      })
                      sortedByDateArray[sortedByDateArray.length-1].events.push(el);
                    } else {
                      for (let i = 0; i <= sortedByDateArray.length; i++) {
                        //no matching by date has been found
                        if (i == sortedByDateArray.length) {
                            sortedByDateArray.push({
                                date_begining: el.date_begining, 
                                date_end: el.date_end,
                                events: [],
                            })
                            sortedByDateArray[i].events.push(el);
                            break;
                        }
                        if (el.date_begining == sortedByDateArray[i].date_begining &&
                              el.date_end == sortedByDateArray[i].date_end) {
                            sortedByDateArray[i].events.push(el)
                            break;
                        }
                      }
                    }
                });
                return sortedByDateArray;
            }

            let app = this;
            let events = [];
            $.get(`http://${this.connectionAddress}/index.php`, { sort_type: {date: "ASC"}}, function(data) {
                events = data;
                app.events = combineArraysByDate(events.all);
                app.todayEvents = combineArraysByDate(events.today);
            })
        },
        transformDataToComfortableForm(date, includeYear) {
            let listOfHumanReadableMonths = {
                "01": "січня",
                "02": "лютого",
                "03": "березня",
                "04": "квітня",
                "05": "травня",
                "06": "червня",
                "07": "липня",
                "08": "серпня",
                "09": "вересня",
                "10": "жовтня",
                "11": "листопада",
                "12": "грудня",
            }
            
            let splitedString   = date.split('-');
            let year            = splitedString[0];
            let month           = splitedString[1];
            let day             = splitedString[2];
            
            return `${parseInt(day)} ${listOfHumanReadableMonths[month]} ${includeYear ? year : ''}`;
        },
        transformTimeToComfortableForm(time) {
            let splitedString   = time.split(':');
            let hour            = splitedString[0];
            let minute          = splitedString[1];
            let second          = splitedString[2];
            
            return `${hour}:${minute}`;
        },
        playMainTheme() {
            let musicButton = document.querySelector('#musicButton');
            let app = this;
            if (!this.isMusicPlaying) {
                musicButton.innerHTML = '<img src="/img/icons/muted.png" style="width: 100%; height: auto;">';
                this.isMusicPlaying = !this.isMusicPlaying;
                this.audioInstance = new Audio('/sfx/music.mp3');
                this.audioInstance.play();
                this.audioInstance.loop = false;
                this.audioInstance.onended = function() {
                    musicButton.innerHTML = '<img style="width: 100%; height: auto;" src="./img/icons/speaker.svg" alt="">';
                    app.isMusicPlaying = false;
                }
            } else {
                if(this.audioInstance.muted) {
                    musicButton.innerHTML = '<img src="/img/icons/muted.png" style="width: 100%; height: auto;">';
                    this.audioInstance.muted = false;
                } else {
                    this.audioInstance.muted = true;
                    musicButton.innerHTML = '<img style="width: 100%; height: auto;" src="./img/icons/speaker.svg" alt="">';
                }
            }

        },
        changeQuote() {       
            let audio = new Audio('/sfx/harp.mp3');
            audio.play();
            if (this.currentQuoteIndex < this.quotesList.length - 1) {
                this.currentQuoteIndex += 1;
                if (this.isLogosMarginRecalculatedNeeded === true) {
                    this.isLogosMarginRecalculatedNeeded = false;
                    setTimeout(()=>{
                        let logos = [];
                        logos.push(document.querySelector('.logo-1'))
                        logos.push(document.querySelector('.logo-2'))
                        let amountOfLogos = 3;
                        let logosContainerWidth = logos[0].parentNode.offsetWidth;
                        //where 144.47 suggested width of third logo
                        let aproximateWidthOfThirdLogo = window.innerWidth = logosContainerWidth*0.29
                        let widthOfAllAvailableLogos = logos[0].offsetWidth + logos[1].offsetWidth + aproximateWidthOfThirdLogo;
                        let allAvailableMargin = (logosContainerWidth - widthOfAllAvailableLogos);
                        let leftAndRightAutoMargins = allAvailableMargin / (2 * amountOfLogos);
                        logos[0].style.marginLeft = `${leftAndRightAutoMargins}px`
                        logos[0].style.marginRight = `${leftAndRightAutoMargins}px`
                        logos[1].style.marginLeft = `${leftAndRightAutoMargins}px`
                        logos[1].style.marginRight = `${leftAndRightAutoMargins}px`
                    }, 200)
                }

            } else {
                this.currentQuoteIndex = 0;
                this.isLogosMarginRecalculatedNeeded = true;
                if (this.isLogosMarginRecalculatedNeeded === true) {
                    setTimeout(()=>{
                        let logos = [];
                        logos.push(document.querySelector('.logo-1'))
                        logos.push(document.querySelector('.logo-2'))
                        let amountOfLogos = 2;
                        let logosContainerWidth = logos[0].parentNode.offsetWidth;
                        let widthOfAllAvailableLogos = logos[0].offsetWidth + logos[1].offsetWidth;
                        let allAvailableMargin = (logosContainerWidth - widthOfAllAvailableLogos);
                        let leftAndRightAutoMargins = allAvailableMargin / (2 * amountOfLogos);
                        logos[0].style.marginLeft = `${leftAndRightAutoMargins*1.30}px`
                        logos[0].style.marginRight = `${leftAndRightAutoMargins*0.7}px`
                        logos[1].style.marginLeft = `${leftAndRightAutoMargins*0.7}px`
                        logos[1].style.marginRight = `${leftAndRightAutoMargins*1.30}px`
                    }, 200)
                }
            }

            if (this.currentQuoteIndex != 0) {
                this.currentLogosHolderIndex = 1;
            } else {
                this.currentLogosHolderIndex = 0;
            }
        }
    },
    beforeMount(){
        this.getEventsList();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.currentDate = {
            day: parseInt(dd),
            month: parseInt(mm)
        }

        dayLoop = setInterval(() => {
            today = new Date();
            dd = String(today.getDate()).padStart(2, '0');
            mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            this.currentDate = {
                day: parseInt(dd),
                month: parseInt(mm)
            }
        }, 60000)
    },
});

app.component('3-logos', {
    template: `
            <div class="logo-3">
                <img src="./img/150-years-from-birthday.png" style="width: 100%; height:auto;">
            </div>
    `,
})

app.component('2-logos', {
    template: `
    <div style="display: none">
    </div>
    `,
})

app.component('quote-0', {
    template: `
        <div class="quote-container">
            150 років 
            <br>
            від дня народження
            <br>
            Лесі Українки                      
        </div>
    `,
})

app.component('quote-1', {
    template: `
        <div class="quote-container">
            <p>
            &#8220;Так! Я буду крізь сльози сміятись,
            </p>
            <p>
                Серед лиха співати пісні,
            </p>
            <p>
                Без надії таки сподіватись, 
            </p>
            <p> 
                Буду жити! Геть думи сумні!&#8221;
            </p>                        
        </div>
    `,
})

app.component('quote-2', {
    template: `
        <div class="quote-container">
            <p>
            &#8220;Я на гору круту крем'яную
            </p>
            <p>
                Буду камінь важкий підіймать
            </p>
            <p>
                І, несучи вагу ту страшную
            </p>
            <p> 
                Буду пісню веселу співать.&#8221;
            </p>                        
        </div>
    `,
})

app.component('quote-3', {
    template: `
        <div class="quote-container">
            <p>
            &#8220;Кругом садочки, біленькі хати,
            </p>
            <p>
                І соловейка в гаю чувати.
            </p>
            <p>
                Ой, чи так красно в якій країні,
            </p>
            <p> 
                Як тут, на нашій рідній Волині.&#8221;
            </p>                        
        </div>
    `,
})

app.component('quote-4', {
    template: `
        <div class="quote-container">
            <p>
            &#8220;Ні! Я жива!
            </p>
            <p>
                Я буду вічно жити!
            </p>
            <p>
                Я в серці маю те,
            </p>
            <p> 
                що не вмирає.&#8221;
            </p>                        
        </div>
    `,
})

app.component('quote-5', {
    template: `
        <div class="quote-container">
            <p>
            &#8220;Слово - то мудрості промінь,
            </p>
            <p>
                слово - то думка людська...&#8221;
            </p>                     
        </div>
    `,
})


app.mount('#app');