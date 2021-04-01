import {interval, Observable, Subject} from "rxjs"
import { map, takeUntil } from "rxjs/operators";

function createUnsubscribeButton(action: Function) {
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.innerHTML = "Stop!";
    button.onclick = () => {
        console.log("Stop started");
        action();
    }
}

function createSubscribeButton(action: Function) {
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.innerHTML = "Start!";
    button.onclick = () => {
        console.log("Started!")
        action();
    }
}

function stopEmitWithDelay(observable$: Subject<any>) {
    setTimeout(() => {
      observable$.next("stopped");
      observable$.complete();
    }, 3000);
}

function subscribeToSubject(): Subject<any> {
    const subject$ = new Subject(); 
    subject$.subscribe(x => console.log(`control subject, ${x}`));
    subject$.next(1);
    return subject$;
}



function execIntervalUntil(observable$: Observable<any>) {
    interval(500).pipe(
      takeUntil(observable$),
      map(x => x*x),
      map(x => x/Math.round(Math.random() * 100))
    ).subscribe(x => console.log(`control subject, ${x}`));
}

const subject$ = subscribeToSubject();
createSubscribeButton ( () => execIntervalUntil(subject$));
createUnsubscribeButton( () =>  stopEmitWithDelay(subject$));