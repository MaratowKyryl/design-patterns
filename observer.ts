 interface Subject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(): void;
}

class HumanSubject implements Subject {
    public state: number = 0;
    private observers: Observer[] = [];

    public subscribe(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Already have');
        }

        console.log('Success.');
        this.observers.push(observer);
    }

    public unsubscribe(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Fail.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Successful.');
    }

    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    // Just for testing, in real app, that have another view
    public someBusinessLogic(): void {
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`State: ${this.state}`);
        this.notify();
    }
}

interface Observer {
    update(subject: Subject): void;
}

class Man implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof HumanSubject && subject.state < 3) {
            console.log('Man reacted.');
        }
    }
}

class Woman implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof HumanSubject && (subject.state === 0 || subject.state >= 2)) {
            console.log('Woman reacted.');
        }
    }
}
const subject = new HumanSubject();

const observer1 = new Man();
subject.subscribe(observer1);

const observer2 = new Woman();
subject.subscribe(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.unsubscribe(observer2);

subject.someBusinessLogic();