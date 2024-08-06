function main() {
    // ideas: vs bots of different difficulty –– different error rates
    // decorate

    const example_texts = [
        "It was a feature peculiar to the colonial wars of North America, that the toils and dangers of the wilderness were to be encountered before the adverse hosts could meet. A wide and apparently an impervious boundary of forests severed the possessions of the hostile provinces of France and England. The hardy colonist, and the trained European who fought at his side, frequently expended months in struggling against the rapids of the streams, or in effecting the rugged passes of the mountains, in quest of an opportunity to exhibit their courage in a more martial conflict. But, emulating the patience and self-denial of the practiced native warriors, they learned to overcome every difficulty; and it would seem that, in time, there was no recess of the woods so dark, nor any secret place so lovely, that it might claim exemption from the inroads of those who had pledged their blood to satiate their vengeance, or to uphold the cold and selfish policy of the distant monarchs of Europe",
        "There was no hope for him this time: it was the third stroke. Night after night I had passed the house (it was vacation time) and studied the lighted square of window: and night after night I had found it lighted in the same way, faintly and evenly. If he was dead, I thought, I would see the reflection of candles on the darkened blind for I knew that two candles must be set at the head of a corpse. He had often said to me: \"I am not long for this world,\" and I had thought his words idle. Now I knew they were true. Every night as I gazed up at the window I said softly to myself the word paralysis. It had always sounded strangely in my ears, like the word gnomon in the Euclid and the word simony in the Catechism. But now it sounded to me like the name of some maleficent and sinful being. It filled me with fear, and yet I longed to be nearer to it and to look upon its deadly work.",
        "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him on the mild morning air. He held the bowl aloft and intoned: - Introibo ad altare Dei."
    ]
    const text = example_texts[Math.floor(Math.random() * example_texts.length)]

    const example_text = "The quick brown fox jumps over the lazy dog"
    
    const input_box = document.querySelector('.input_box')

    const reset_btn = document.querySelector('#reset')

    const timer_label = document.querySelector('#timer_label')
    const timer = document.querySelector('#timer')

    const wpm_label = document.querySelector('#wpm_label')
    const wpm = document.querySelector('#wpm')

    const acc_label = document.querySelector('#acc_label')
    const acc = document.querySelector('#acc')

    const textarea = document.querySelector('.textarea')

    const total_words = text.split(' ').length
    let current_words = 0
    let current_chars = 1
    let current_errors = 0

    let intervalId = null
    function startTimer(){
        let start = Date.now();
        intervalId = setInterval(() => {
            let delta = Date.now() - start;
            timer.textContent = (delta / 1000).toFixed(1)
            console.log((((current_chars - 1)/60) / 5).toFixed(1))
            if (timer.textContent % 1 == 0) {
                wpm.textContent = parseFloat((((current_chars - 1) * (60 / timer.textContent)) / 5).toFixed(2))
            }
        }, 100)
    }

    let current_child = ''
    let current_letter = ''


    function createText(text) {
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
        createText(example_text)
        reset_btn.addEventListener('click', resetGame)
        input_box.addEventListener('input', handleInput)
        current_words = 0
        current_chars = 1
        current_errors = 0
        handleInput.didrun = false;
        timer.textContent = '0';
        wpm.textContent = '';
        acc.textContent = '';

    }

    function stopGame() {
        input_box.removeEventListener('input', handleInput)
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
            if (evt.data === current_letter && !current_child.classList.contains('error')) {
                if (!handleInput.didrun){ 
                    startTimer();
                    handleInput.didrun = true;
                }
                if (evt.data === ' ') {
                    current_words += 1
                    input_box.value = ''
                }
                current_child.className = 'past'
                if (current_child.nextSibling) {
                    current_child = current_child.nextSibling
                    current_child.className = 'current'
                    current_letter = current_child.textContent
                    current_chars += 1
                    console.log(current_chars)
                    console.log(current_errors)
                    console.log(((current_chars - current_errors) / current_chars) * 100)
                    acc.textContent = Math.round(((current_chars - current_errors) / current_chars) * 100 * 10) / 10
                } else {
                    clearInterval(intervalId)
                    current_words += 1
                    input_box.value = ''
                    console.log('You Win')
                    stopGame()
                }
            } else if (!current_child.classList.contains('error')){
                current_child.classList.add('error')
                current_errors += 1
                acc.textContent = Math.round(((current_chars - current_errors) / current_chars) * 100 * 10) / 10
            } else {
                console.log('test2')
                input_box.value = input_box.value.slice(0, -1)
            }
        } else if (evt.data === null && current_child.classList.contains('error')) {
            current_child.removeAttribute('class')
            current_child.className = 'current'
            current_letter = current_child.textContent
        } else {
            input_box.value += current_child.previousSibling.textContent;
        }
    }
}
  
main()