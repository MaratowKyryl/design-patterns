type AnimalState = 'eating' | 'sleeping'| 'idle';

interface IAnimal {
    state: AnimalState
}

interface IState {
    Horse: IAnimal,
    Cow: IAnimal
}

interface IObserver {
    update(subject: ISubject): void
}

interface ISubject {
    state: IState;
    observers: IObserver[];
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
    simulateGame(): void; //Just for example. In real project, that will be random event
    endGame(): void;
}

class Gamer implements IObserver {
    update = (subject: ISubject) => {
        if(subject.state.Horse.state === 'eating'){
            console.log('Congratulations!!!\nHorse start eating');
        }
    }
}

class Game implements ISubject {
    state: IState = {
        Horse: {
            state: 'idle'
        },
        Cow: {
            state: 'idle',
        }
    }
    
    observers: IObserver[] = [];

    subscribe = (observer: IObserver) => {
        if(this.observers.includes(observer)){
            console.log('You not subscribed');
            return;
        }
        this.observers.push(observer);
        console.log('Success!')
    }
    unsubscribe = (observer: IObserver) => {
        if(this.observers.includes(observer)){
            const removableIndex = this.observers.findIndex(item => item === observer)
            this.observers.slice(removableIndex, 1);
        }
        console.log('You not subscribed, for unsubscribe!')
    }

    notify = () => {
        for(const observer of this.observers){
            observer.update(this);
        }
   }

   simulateGame = () => {
    const getRandomInt = (max: number) =>  {
        return Math.floor(Math.random() * max);
      }

      switch(getRandomInt(3)){
        case 0:
            this.state.Cow.state === 'sleeping';
            break;
        case 1:
            this.state.Horse.state === 'eating';
            break;
        case 2:
            this.state.Horse.state === 'sleeping';
            break;
      }

      this.notify();
   }
   endGame = () => {
       this.observers.slice(0, this.observers.length - 1);
       console.log('Chao persik!')
   }
}


const game = new Game();

const playerOne = new Gamer();

const playerTwo = new Gamer();

game.subscribe(playerOne);
game.subscribe(playerTwo);

for(let i = 0; i < 10; i++){
    game.simulateGame();
}
game.endGame();