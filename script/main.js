        const btn = document.querySelector('.start');
        const reset = document.querySelector('.reset');
        const lap = document.querySelector('.lap');
        const theme = document.querySelector('.theme');
        const display = document.querySelector('.display');
        const dataList = document.querySelector('dl');
        const wrapper = document.querySelector('.wrapper');
        const header = document.querySelector('header');
        const root = document.documentElement;


        let timeCount = 0;
        let elapsedTime = 0;
        let timer = 0;
        let counter = 1;
        
        function displayTime() {
            let startTime = elapsedTime;
            let milliseconds = startTime % 100;
            startTime = Math.floor(startTime / 1000);
            let seconds = startTime % 60;
            startTime = Math.floor(startTime / 60);
            let minutes = startTime % 60;
            startTime = Math.floor(startTime / 60);
            let hours = startTime % 60;

            let displayHours = hours >= 1 ? `${hours}:` : ``;

            if (minutes <= 0) {
                displayMinutes = '';
                if (hours > 0) {
                    displayMinutes = '0' + minutes + ':';
                    root.style.setProperty('--font-size', '3.5rem');
                }
            }
            else if (minutes >= 10) {
                displayMinutes = minutes + ':';
            } 
            else {
                if (hours <= 0) {
                    displayMinutes = minutes + ':';
                }
                else {
                    displayMinutes = '0' + minutes + ':';
                }
            }

            if (seconds <= 0) {
                displaySeconds = 0;
                if (minutes > 0) {
                    displaySeconds = '0' + seconds;
                    root.style.setProperty('--font-size', '4.5rem');
                }
            }
            else if (seconds >= 10) {
                displaySeconds = seconds;
            } 
            else {
                if (minutes <= 0) {
                    displaySeconds = seconds;
                }
                else {
                    displaySeconds = '0' + seconds;
                }
            }

            let displayMilliseconds = milliseconds >= 10 ? `${milliseconds}` : milliseconds > 0 || milliseconds === 0 ? `0${milliseconds}` : `00`;

            const time = `<h3>${displayHours}</h3><h3>${displayMinutes}</h3><h3>${displaySeconds}</h3><h5>${displayMilliseconds}</h5>`;

            display.innerHTML = time;

            let historyHours = hours >= 10 ? `${hours}:` : hours > 0 ? `0${hours}:` : `00:`;
            let historyMinutes = minutes >= 10 ? `${minutes}:` : minutes > 0 ? `0${minutes}:` : `00:`;
            let historySeconds = seconds >= 10 ? `${seconds}:` : seconds > 0 ? `0${seconds}:` : `00:`;
            let historyMilliseconds = milliseconds >= 10 ? `${milliseconds}` : milliseconds > 0 ? `0${milliseconds}` : `00`;

            const historyTime = `<p>${historyHours}</p><p>${historyMinutes}</p><p>${historySeconds}<p><p>${historyMilliseconds}</p>`;
            
            return {time, historyTime};
        }

        const primaryTime = displayTime().time;
        display.innerHTML = primaryTime;

        function startStopWatch () {
            if (!timeCount) {
                timeCount = Date.now();
            }
            elapsedTime += Date.now() - timeCount;
            timeCount = Date.now();
            displayTime();
        };

        btn.addEventListener('click', () => {
            if (btn.dataset.icon === 'P') {
                timer = setInterval (startStopWatch, 10);
                btn.dataset.icon = 'u';
                reset.classList.remove('disabled');
                lap.classList.remove('disabled');
                btn.style.color = '#e60000';
            }
            else {
                clearInterval(timer);
                timer = null;
                timeCount = null;
                btn.dataset.icon = 'P';
                btn.style.color = '#267326';
                lap.classList.add('disabled');
            }
        });

        reset.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 450px)').matches) {
                wrapper.style.transform = 'translateY(0)';
            };
            
            if (window.matchMedia('(max-height:450px)').matches) {
                header.style.transitionDelay = '0.15s';
                header.style.transform = 'translateX(0)';
                theme.style.transform = 'translateX(0)';
            };

            clearInterval(timer);
            elapsedTime = null;
            timeCount = null;
            timer = null
            displayTime();
            lap.classList.add('disabled');
            reset.classList.add('disabled');
            btn.dataset.icon = 'P';
            btn.style.color = 'var(--mode-color)';
            dataList.innerHTML = '';
            counter = 1;
        });

        lap.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 450px)').matches) {
                wrapper.style.transform = 'translateY(50vh)';
            };

            if (window.matchMedia('(max-height: 450px)').matches) {
                header.style.transform = 'translateX(-50%)';
                theme.style.transform = 'translateX(calc(100% - 50vw))';
            };

            const dataTitle = document.createElement('dt');
            const dataDescription = document.createElement('dd');
            const div = document.createElement('div');
            dataList.appendChild(div);
            div.appendChild(dataTitle);
            div.appendChild(dataDescription);
            const secondaryTime = displayTime().historyTime;
            dataTitle.innerHTML = `#${counter < 10 ? '0' + counter++ : counter++} lap`;
            dataDescription.innerHTML += `${secondaryTime}`;
        });

        theme.addEventListener('click', () => {
            document.body.classList.toggle('light');
        });