 const count = 0;
 const counterNode = document.querySelector('#counter');
 const comments = document.querySelector('.comments');
 let iterId;
 const buttons = document.querySelectorAll('button');

 window.addEventListener('DOMContentLoaded', () => {
     restartButton();
     startIteration();
     document.body.addEventListener('click', handleButtons);
     document.addEventListener('submit', postComment);

 });

 function restartButton() {
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

 function addCtr(amount) {
   count= count + amount;
   counterNode.innerText = count;
 }

 function startIteration() {
   iterId = window.setInterval(addCtr, 2*1000, 1);
 }

 function stopIteration() {
   window.clearInterval(iterId);
 }

 const liked = [];
 const likes = document.querySelector('.likes');
 function handleButtons(e) {
   const id = e.target.id;
   if (id === 'minus')
     addCtr(-1);
   if (id === 'plus')
     addCtr(1);
   if (id === 'heart') {
     const num = count;
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
     addCtr(count * -1);
     startIteration();
     changeDisabledNodeArray(false, buttons);
   }
 }

 function changeDisabledNodeArray(bool, nodeArr) {
   nodeArr.forEach(node => node.disabled = bool);
 }
