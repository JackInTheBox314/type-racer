function main() {
    // ideas: vs bots of different difficulty –– different error rates
    // decorate

    const example_texts = [
        "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him on the mild morning air. He held the bowl aloft and intoned: - Introibo ad altare Dei.",
        "The quick brown fox jumps over the lazy dog"
    ]
    let text = ""
    
    const input_box = document.querySelector('.input_box')

    const reset_btn = document.querySelector('#reset')
    const difficulty_selector = document.querySelector('#difficulty')

    const timer_label = document.querySelector('#timer_label')
    const timer = document.querySelector('#timer')

    const wpm_label = document.querySelector('#wpm_label')
    const wpm = document.querySelector('#wpm')

    const acc_label = document.querySelector('#acc_label')
    const acc = document.querySelector('#acc')

    const textarea = document.querySelector('.textarea')

    const playerRed = document.querySelector('.red')
    const playerGreen = document.querySelector('.green')
    const playerBlue = document.querySelector('.blue')
    const playerYellow = document.querySelector('.yellow')
    const players = document.querySelectorAll('.color')
    const [player, ...computers] = players
    console.log(player)
    console.log(computers)

    let total_words = 0
    let current_words = 0
    let current_chars = 1
    let current_errors = 0

    let intervalId = null
    function startTimer(difficulty){
        let start = Date.now();
        if (difficulty === 'easy') {
            computer_wpm = 40
        } else if (difficulty === 'medium') {
            computer_wpm = 60
        } else if (difficulty === 'hard') {
            computer_wpm = 80
        } else if (difficulty === 'impossible') {
            computer_wpm = 100
        }
        intervalId = setInterval(() => {
            let delta = Date.now() - start;
            delta = Math.round(delta/10) * 10
            console.log(delta)
            timer.textContent = (delta / 1000).toFixed(1)
            if (timer.textContent > 0 && (delta % 1000 == 0)) {
                wpm.textContent = parseFloat((((current_chars - 1) * (60 / timer.textContent)) / 5).toFixed(2))
            }
            console.log('delta: ' + delta)
            console.log('computer_wpm: ' + computer_wpm)
            if (delta % (60000 / computer_wpm) == 0) {
                for (const computer of computers){
                    if (Math.random() > 0.2 && parseInt(computer.style.width.slice(0, -1)) < 100) {
                        computer.word_count += 1
                        computer.style.width = (computer.word_count / total_words) * 100 + '%'
                        if (parseInt(computer.style.width.slice(0, -1)) >= 100) {
                            stopGame(computer)
                        }
                    }
                }
            }
        }, 10)
    }

    let current_child = ''
    let current_letter = ''


    function createText(text) {
        total_words = text.split(' ').length
        while (textarea.firstChild) {
            textarea.removeChild(textarea.firstChild);
        }
        for (const char of text){
            console.log(char)
            const span = document.createElement('span')
            span.textContent = char
            textarea.appendChild(span)
        }

        current_child = textarea.firstChild
        current_child.className = 'current'
        current_letter = current_child.textContent
    }

    function startGame() {
        input_box.value = ''
        text = example_texts[Math.floor(Math.random() * example_texts.length)]
        createText(text)
        reset_btn.addEventListener('click', resetGame)
        input_box.addEventListener('input', handleInput)
        current_words = 0
        current_chars = 1
        current_errors = 0
        handleInput.didrun = false;
        timer.textContent = '0';
        wpm.textContent = '';
        acc.textContent = '';
        for (const player of players) {
            player.style.width = "0%"
            player.parentElement.style.borderColor = "#aaa"
            player.word_count = 0
        }
    }

    function stopGame(winner) {
        input_box.removeEventListener('input', handleInput)
        for (const player of players) {
            if (player == winner) {
                player.parentElement.style.borderColor = "white"
            } else {
                player.parentElement.style.borderColor = "#555"
            }
        }
        clearInterval(intervalId)
    }

    function resetGame() {
        console.log('reset')
        stopGame()
        startGame()
    }

    startGame()

    function handleInput(evt) {
        console.log(evt)
        if (evt.data){
            // if not backspace
            if (!handleInput.didrun){ 
                // if is first time
                let difficulty = difficulty_selector.value
                startTimer(difficulty);
                handleInput.didrun = true;
            }
            if (evt.data === current_letter && !current_child.classList.contains('error')) {
                // if input is same as letter and not currently error
                if (evt.data === ' ') {
                    // if input is space
                    current_words += 1
                    input_box.value = ''
                    console.log(total_words)
                    playerRed.style.width = (current_words / total_words) * 100 + "%"
                }
                current_child.className = 'past'
                if (current_child.nextSibling) {
                    // if there are still words left
                    current_child = current_child.nextSibling
                    current_child.className = 'current'
                    current_letter = current_child.textContent
                    current_chars += 1
                    console.log(current_chars)
                    console.log(current_errors)
                    console.log(((current_chars - current_errors) / current_chars) * 100)
                    acc.textContent = Math.round(((current_chars - current_errors) / current_chars) * 100 * 10) / 10
                } else {
                    // if no words left aka finished
                    clearInterval(intervalId)
                    current_words += 1
                    playerRed.style.width = (current_words / total_words) * 100 + "%"
                    input_box.value = ''
                    console.log('You Win')
                    stopGame(player)
                }
            } else if (!current_child.classList.contains('error')){
                // if input does not match letter but letter is not error
                current_child.classList.add('error')
                current_errors += 1
                acc.textContent = Math.round(((current_chars - current_errors) / current_chars) * 100 * 10) / 10
            } else {
                // if input oes not match letter and letter is already error
                input_box.value = input_box.value.slice(0, -1)
            }
        } else if (evt.data === null && current_child.classList.contains('error')) {
            // if input is backspace and letter is currently error
            current_child.removeAttribute('class')
            current_child.className = 'current'
            current_letter = current_child.textContent
        } else if (evt.data === null){
            // if input is backspace and letter is not error (cancels out backspace)
            input_box.value += current_child.previousSibling.textContent;
        }
    }
}
  
main()