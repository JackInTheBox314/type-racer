function main() {
    // TODO: add code here
    // to generate random number between 1 - 6:
    // Math.floor(Math.random() * 6) + 1
  

    const example_texts = [
        "It was a feature peculiar to the colonial wars of North America, that the toils and dangers of the wilderness were to be encountered before the adverse hosts could meet. A wide and apparently an impervious boundary of forests severed the possessions of the hostile provinces of France and England. The hardy colonist, and the trained European who fought at his side, frequently expended months in struggling against the rapids of the streams, or in effecting the rugged passes of the mountains, in quest of an opportunity to exhibit their courage in a more martial conflict. But, emulating the patience and self-denial of the practiced native warriors, they learned to overcome every difficulty; and it would seem that, in time, there was no recess of the woods so dark, nor any secret place so lovely, that it might claim exemption from the inroads of those who had pledged their blood to satiate their vengeance, or to uphold the cold and selfish policy of the distant monarchs of Europe",
        "There was no hope for him this time: it was the third stroke. Night after night I had passed the house (it was vacation time) and studied the lighted square of window: and night after night I had found it lighted in the same way, faintly and evenly. If he was dead, I thought, I would see the reflection of candles on the darkened blind for I knew that two candles must be set at the head of a corpse. He had often said to me: \"I am not long for this world,\" and I had thought his words idle. Now I knew they were true. Every night as I gazed up at the window I said softly to myself the word paralysis. It had always sounded strangely in my ears, like the word gnomon in the Euclid and the word simony in the Catechism. But now it sounded to me like the name of some maleficent and sinful being. It filled me with fear, and yet I longed to be nearer to it and to look upon its deadly work.",
        "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him on the mild morning air. He held the bowl aloft and intoned: - Introibo ad altare Dei."
    ] 
    const text = example_texts[Math.floor(Math.random() * example_texts.length)]

    const example_text = "The quick brown fox jumps over the lazy dog"
    
    const timer = document.createElement('div')
    const wpm = document.createElement('div')

    const total_words = text.split(' ').length
    let current_words = 0

    let intervalId = null
    function startTimer(){
        let start = Date.now();
        intervalId = setInterval(() => {
            let delta = Date.now() - start;
            timer.textContent = Math.floor(delta / 1000)
            console.log(current_words)
            console.log((parseInt(timer.textContent)/60))
            wpm.textContent = current_words / (parseInt(timer.textContent)/60)
        }, 100)
    }


    const textarea = document.createElement('div')
    document.body.appendChild(textarea)

    for (const char of example_text){
        console.log(char)
        const span = document.createElement('span')
        span.textContent = char
        textarea.appendChild(span)
    }

    let current_child = textarea.firstChild
    current_child.className = 'current'
    let current_letter = current_child.textContent

    window.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(evt) {
        // console.log(evt)
        if (evt.key.length === 1 && /^[a-zA-Z ,.?!"':;/-]+$/.test(evt.key)){
            if (evt.key === current_letter) {
                if (!handleKeyDown.didrun){ 
                    startTimer();
                    handleKeyDown.didrun = true;
                }
                if (evt.key === ' ') {
                    current_words += 1
                }
                current_child.className = 'past'
                if (current_child.nextSibling) {
                    current_child = current_child.nextSibling
                    current_child.className = 'current'
                    current_letter = current_child.textContent
                } else {
                    clearInterval(intervalId)
                    current_words += 1
                    console.log('You Win')
                    window.removeEventListener('keydown', handleKeyDown)
                    window.removeEventListener
                }
            } else {
                current_child.classList.add('error')
            }
        } else if (evt.key === 'Backspace' && current_child.classList.contains('error')) {
            current_child.removeAttribute('class')
            current_child.className = 'current'
            current_letter = current_child.textContent
        }
    }
    document.body.appendChild(timer)
    document.body.appendChild(wpm)
}
  
main()
  