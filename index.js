//#region Convert RxJs Subjects to Observables
// const click$ = Rx.Observable.create(
//   function subscribe(observer) {
//     const listener = function (ev){
//       observer.next(ev);
//     };
    
//     document.addEventListener('click', listener);
    
//     return function unsubscribe() {
//       document.removeEventListener('click', listener)
//     };
//   }
// )

// const subscription = click$.subscribe(function (ev) {
//   console.log(ev.clientX) || displayInPreview(ev.clientX);
// });

// setTimeout(function () {
//   subscription.unsubscribe();
// }, 4000);



// // display in plunker preview
// function displayInPreview(string) {
//   var newDiv = document.createElement("div"); 
//   var newContent = document.createTextNode(string); 
//   newDiv.appendChild(newContent);
//   document.body.appendChild(newDiv)
// }

//#endregion

//#region Replace Observable.create with Observable creation helpers

// const click$ = Rx.Observable
//   .fromEvent(document, 'click');

// const subscription = click$.subscribe(function (ev) {
//   console.log(ev.clientX) || displayInPreview(ev.clientX);
// });

// setTimeout(function () {
//   subscription.unsubscribe();
// }, 4000);



// // display in plunker preview
// function displayInPreview(string) {
//   var newDiv = document.createElement("div"); 
//   var newContent = document.createTextNode(string); 
//   newDiv.appendChild(newContent);
//   document.body.appendChild(newDiv)
}
//#endregion

//#region Use takeUntil instead of manually unsubscribing from Observables
// const click$ = Rx.Observable
//   .fromEvent(document, 'click');

// const four$ = Rx.Observable.interval(4000).take(1);

// /*
// click$          --c------c---c-c-----c---c---c-
// four$           -----------------0|
// clickUntilFour$ --c------c---c-c-|
// */

// const clickUntilFour$ = click$.takeUntil(four$);

// clickUntilFour$.subscribe(function (ev) {
//   console.log(ev.clientX) || displayInPreview(ev.clientX);
// });
//#endregion

//#region Convert an underlying source of data into an Observable

// // 1. Identify
// // 2. Convert to Observables
// // 3. Compose

// const click$ = Rx.Observable
//   .fromEvent(document, 'click');

// const res$ = Rx.Observable.from(
//   fetch('https://jsonplaceholder.typicode.com/users/0')
//   .then(res => res.json())
// );

// const count$ = Rx.Observable.merge(click$, res$)
//   .map(() => 1)
//   .scan((acc, x) => acc + x, 0);

// count$.subscribe(function (x) {
//   console.log(x) || displayInPreview(x);
// });
//#endregion

//#region Use the map operator instead of firing events on a Subject
// // const x$ = new Rx.Subject();

// const click$ = Rx.Observable
//   .fromEvent(document, 'click');

// const x$ = click$.map(ev => ev.clientX);

// // click$.subscribe({
// //   next: function (ev) {
// //     x$.next(ev.clientX);
// //   }
// // });

// x$.subscribe({
//   next: function next(x) {
//     console.log(x) || displayInPreview(x);
//   }
// });



// // display in plunker preview
// function displayInPreview(string) {
//   var newDiv = document.createElement("div"); 
//   var newContent = document.createTextNode(string); 
//   newDiv.appendChild(newContent);
//   document.body.appendChild(newDiv)
// }
//#endregion

//#region Use flattening operators instead of nested subscriptions
// const userData$ = Rx.Observable.ajax({
//     url: 'https://jsonplaceholder.typicode.com/users/1',
//     method: 'GET',
//   });
    
//   const click$ = Rx.Observable
//     .fromEvent(document, 'click');
  
//   const resWhenClick$ = click$
//     .mergeMap(ev => userData$);
  
//   resWhenClick$.subscribe({
//     next: function (data) {
//       console.log(data.response) || displayInPreview(data.response.name); 
//     }
//   });
  
  
  
//   // display in plunker preview
//   function displayInPreview(string) {
//     var newDiv = document.createElement("div"); 
//     var newContent = document.createTextNode(string); 
//     newDiv.appendChild(newContent);
//     document.body.appendChild(newDiv)
//   }
//#endregion

//#region Use switchMap to avoid leaks when flattening

// const click$ = Rx.Observable
//   .fromEvent(document, 'click');

// const tickWhenClick$ = click$
//   .switchMap(ev => Rx.Observable.interval(500));

// tickWhenClick$.subscribe(function (x) {
//   console.log(x)|| displayInPreview(x); 
// });



// // display in plunker preview
// function displayInPreview(string) {
//   var newDiv = document.createElement("div"); 
//   var newContent = document.createTextNode(string); 
//   newDiv.appendChild(newContent);
//   document.body.appendChild(newDiv)
// }
//#endregion

//#region Replace zip with combineLatest when combining sources of data
// const length$ = Rx.Observable.of(5);
// const width$ = Rx.Observable.of(7);
// const height$ = Rx.Observable.of(2.8, 2.5);

// const volume$ = Rx.Observable
//   .combineLatest(length$, width$, height$,
//     (length, width, height) => length * width * height
//   );

// volume$.subscribe(function (volume) {
//   console.log(volume) || displayInPreview(volume); 
// });



// // display in plunker preview
// function displayInPreview(string) {
//   var newDiv = document.createElement("div"); 
//   var newContent = document.createTextNode(string); 
//   newDiv.appendChild(newContent);
//   document.body.appendChild(newDiv)
// }
//#endregion

//#region Move important side effects from do()/tap() to subscribe()
// function updateDot(x, y) {
//     dotElem.style.left = `${x}px`;
//     dotElem.style.top = `${y}px`;
//   }
  
//   const click$ = Rx.Observable.fromEvent(document, 'click');
  
//   click$.subscribe(ev => updateDot(ev.clientX, ev.clientY));
  
//   const res$ = click$
//     .switchMap(ev => Rx.Observable.ajax({
//       url: 'https://jsonplaceholder.typicode.com/users/1',
//       method: 'GET',
//     }));
  
//   res$.subscribe(function (data) {
//     console.log(data.response) || displayInPreview(data.response);
//   });
  
//#endregion

//#region Implement pause and resume feature correctly through RxJS
// const resume$ = new Rx.Subject();

// const res$ = resume$
//   .switchMap(resume =>
//     resume ?
//       Rx.Observable.interval(2000) :
//       Rx.Observable.empty()
//   )
//   .do(x => console.log('request it! ' + x) || displayInPreview('request it! ' + x))
//   .switchMap(ev => Rx.Observable.ajax({
//     url: 'https://jsonplaceholder.typicode.com/users/1',
//     method: 'GET',
//   }));

// res$.subscribe(function (data) {
//   console.log(data.response)|| displayInPreview(data.response.company.bs);
// });

// resume$.next(false);
// setTimeout(() => resume$.next(true), 500);
// setTimeout(() => resume$.next(false), 5000);

//#endregion

//#region Know when to extend the Observable class
// class LogSubscriber extends Rx.Subscriber {
//     next(value) {
//       console.log('next ' + value) || displayInPreview('next ' + value);
//       this._next(value);
//     }
    
//     error(e) {
//       console.log('error ' + e) || displayInPreview('error ' + e);
//       this._error(e);
//     }
    
//     complete() {
//       console.log('complete') || displayInPreview('complete');
//       this._complete();
//     }
//   }
  
//   class LogOperator {
//     constructor(childOperator) {
//       this.childOperator = childOperator;
//     }
  
//     call(subscriber, source) {
//       return this.childOperator.call(
//         new LogSubscriber(subscriber), source
//       );
//     }
//   }
  
//   class LogObservable extends Rx.Observable {
//     lift(operator) {
//       const observable = new LogObservable();
//       observable.source = this;
//       observable.operator = new LogOperator(operator);
//       return observable;
//     }
//   }
  
//   // --1--2--3|
//   // const observable = Rx.Observable.interval(100)
//   //   .map(x => x+1)
//   //   .take(3);
  
//   const observable = new LogObservable((observer) => {
//     setTimeout(() => {observer.next(1)}, 100);
//     setTimeout(() => {observer.next(2)}, 200);
//     setTimeout(() => {observer.next(3)}, 300);
//     setTimeout(() => {observer.complete()}, 400);
//   });
  
//   observable
//     .map(x => 10 * x) // LogObservable
//     .filter(x => x > 15) // LogObservable
//     .count() // LogObservable
//     .subscribe(x => { alert(x); });
//#endregion

//#region Make Observables hot only where necessary

// const clock$ = Rx.Observable.interval(500).share().take(6);

// const randomNum$ = clock$
//   .map(i => Math.random() * 100).share();

// const smallNum$ = randomNum$
//   .filter(x => x <= 50)
//   .toArray();

// const largeNum$ = randomNum$
//   .filter(x => x > 50)
//   .toArray();

//   randomNum$.subscribe(x => console.log('random: ' + x) || displayInPreview('random: ' + x));
//   smallNum$.subscribe(x => console.log('small:', x) || displayInPreview('small:' + x));
//   largeNum$.subscribe(x => console.log('large:', x) || displayInPreview('large:' + x));
  


//#endregion




