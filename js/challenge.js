let minus = document.getElementById('minus');
 let h1Counter = document.getElementById('counter');
 let plus = document.getElementById('plus');
 let heart = document.getElementById('heart');
 let interval;

 let timer = () => {
     interval = this.setInterval(() => {
         h1Counter.innerText = parseInt(h1Counter.innerText) + 1
     }, 1000)
 };
 let decrement = () => {
     minus.onclick = () => {
         h1Counter.innerText = parseInt(h1Counter.innerText) - 1
     }
 };

 let increment = () => {
     plus.onclick = () => {
         h1Counter.innerText = parseInt(h1Counter.innerText) + 1
     }
 };

 let like = () => {
     let counter, likesNumber = 1
     heart.onclick = () => {
         if (h1Counter.innerText == counter) {
             likesNumber = likesNumber + 1
         } else {
             likesNumber = 1
         }
         let likes = document.getElementsByTagName('ul')[0]
         let li = document.createElement('li')
         li.innerText = h1Counter.innerText + ` has been liked ${likesNumber} time`
         counter = h1Counter.innerText
         likes.appendChild(li)

     }
 };

 let pause = () => {
     let btnState = "pause"
     let pause = document.getElementById('pause')
     pause.onclick = () => {
         if (btnState === "pause") {
             pause.innerText = "resume"
             minus.disabled = true
             plus.disabled = true
             heart.disabled = true
             btnState = "resume"
             clearInterval(interval)
         } else if (btnState === "resume") {
             pause.innerText = "pause"
             minus.disabled = false
             plus.disabled = false
             heart.disabled = false
             btnState = "pause"
             timer()
         }

     }
 };

 let submitForm = (e) => {
     e.preventDefault()
     let mssgInput = document.getElementById('comment-input')
     let p = document.createElement('p')
     p.innerHTML = mssgInput.value
     document.getElementById("list").appendChild(p)
     mssgInput.value = ""
 };

 let form = document.getElementById('comment-form');
 form.onsubmit = submitForm;

 timer();
 decrement();
 increment();
 like();
 pause();
