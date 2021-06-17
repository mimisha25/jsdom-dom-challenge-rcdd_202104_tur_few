let counter = 0;
 const counterNode = document.querySelector('#counter');
 const comments = document.querySelector('.comments');
 let iterId;
 const buttons = document.querySelectorAll('button');

 window.addEventListener('DOMContentLoaded', () => {
     addRestartBtn();
     startIteration();
     document.body.addEventListener('click', handleButtons);
     document.addEventListener('submit', postComment);

 });

 function addRestartBtn() {
   const restart = document.createElement('button');
   restart.id = 'restart';
   restart.innerText = 'restart';
   document.querySelector('#pause').insertAdjacentElement("afterend", restart);
 }

 function postComment(e) {
   e.preventDefault();
   const data = new FormData(e.target);
   const comment = data.get('comment');
   const p = document.createElement('p');
   p.innerText = comment;
   comments.append(p);
 }

 function counterAdd (amount) {
   counter = counter + amount;
   counterNode.innerText = counter;
 }

 function startIteration() {
   iterId = window.setInterval(counterAdd, 2*1000, 1);
 }

 function stopIteration() {
   window.clearInterval(iterId);
 }

 const liked = [];
 const likes = document.querySelector('.likes');
 function handleButtons(e) {
   const id = e.target.id;
   if (id === 'minus')
     counterAdd(-1);
   if (id === 'plus')
     counterAdd(1);

   if (id === 'heart') {
     const num = counter;
     liked.push(num);

     let li = document.querySelector(`#n${num}`);
     if (!li) {
       li = document.createElement('li');
       li.id = `n${num}`;
     }
     li.innerText = `${num} has been liked ${liked.filter(x => x == num).length} times`;
     likes.append(li);
   }

   if (id === 'pause') {
     stopIteration(iterId);

     changeDisabledNodeArray(true, buttons);
     e.target.disabled = false;
     e.target.id = 'resume';
     e.target.value = 'resume';
     e.target.innerText = 'resume';

   }

   if (id === 'resume') {
     iterId = startIteration();
     changeDisabledNodeArray(false, buttons);
     e.target.id = 'pause';
     e.target.value = 'pause';
     e.target.innerText = 'pause';
   }

   if (id === 'restart') {
     counterAdd(counter * -1);
     startIteration();
     changeDisabledNodeArray(false, buttons);
   }
 }

 function changeDisabledNodeArray(bool, nodeArr) {
   nodeArr.forEach(node => node.disabled = bool);
 }
