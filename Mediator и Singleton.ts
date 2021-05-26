interface User{
    name: string;
    id: number;
}

interface Msg {
    id: User['id'],
    msg: string
}

class Users {

    constructor(){
        this.addUser,
        this.removeUser,
        this.sendMsg,
        this.findUser
    }

    private users: Array<User> = [];
    addUser = (name: User['name'], id: User['id']) => {
        this.users.push({ name, id });
        console.log(`${name} - enter chat`);
    }
    sendMsg = (id: User['id'], msg: Msg['msg'], chat: Array<Msg>) => {
        chat.push({id, msg});
    }

    removeUser = (id: User['id']) => {
        const user = this.users.find(user => user.id === id)
        if(user){
            this.users.splice(this.users.indexOf(user));
            console.log(`${user.name} - left`);
        }
    }

    findUser = (id: User['id']) => {
        return this.users.find((user) => user.id === id);
    }

}

class Bot {

    constructor(){
        this.checkMsg,
        this.powerOn,
        this.power
    }

    power = false;

    powerOn = () => {
        this.power = true;
        console.log('Bot activated');
    }

    checkMsg = (msg: Msg['msg']) => {
        if(msg === 'cat'){
            return true;
        }
        return false;
    }
}

class Chat {
    private messages = [];
    private users = new Users();
    private bot = new Bot();

    showMsgInConsole = (id: User['id'], msg: Msg['msg']) => {
        const author = this.users.findUser(id);
        if(author){
            console.log(`${author.name} - ${msg}`);
        }
    }
    
    validateAndSendMsg = (id: User['id'], msg: User['name']) => {
        this.users.sendMsg(id, msg, this.messages); // If we want to first check msg, and if have some problems, dont show msg, need to pass this 
        this.showMsgInConsole(id, msg); // two lines down, to end of the function
        if(msg === 'addBot'){
            this.bot.powerOn();
        }
        if(this.bot.power){
            const haveProblem = this.bot.checkMsg(msg);
            if(haveProblem){
                this.showMsgInConsole(3, 'use bad words, and need to leave')
                this.users.removeUser(id);
            }
        }
    }

    start = () => {
        this.users.addUser('Iliya', 1);
        this.users.addUser('Valeriy', 2);
        this.users.addUser('Victoria', 3);

        this.validateAndSendMsg(3, 'Hi');
        this.validateAndSendMsg(1, 'addBot');
        this.validateAndSendMsg(3, 'cat');
        this.validateAndSendMsg(2, 'Chao');
    }
}

const chat = new Chat();

chat.start();