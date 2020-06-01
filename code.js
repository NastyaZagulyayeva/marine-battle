/* var locationCells = [3,4,5];
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false) {
   guess = prompt("Готов делать выстрел? (введи число 0-6):");
   if (guess < 0 || guess > 6) {
       alert("Введите коректную цыфру")
   } else {
       guesses = guesses + 1;

       if (guess == location1 || guess == location2 || guess == location3) {
           alert("Попал!");
           hits = hits + 1;

           if (hits == 3) {
               isSunk = true;
               alert("Ты потопил мой корабль");
           }
       } else {
           alert("Мимо!");
       }
   }
}
var stats = "Ты взял " + guesses + " попыток потопить корабль," + "что означает, что ваша точность стрельбы была " + (3/guesses);
alert(stats); */
// @ts-check



class SimpleDotCom {

    constructor () {
        this._locationCells = [];
        this._name;
    }

    set locationCells (loc) {
        this._locationCells = loc;
    }
    set name (value) {
        this._name = value;
    }

    checkYourself (userGuess) {
        let guess = userGuess;
        let result = "Мимо!";
        let index = this._locationCells.indexOf(guess);

        if (index >= 0) {
            this._locationCells.splice(index,1);
            if(this._locationCells.length == 0) {
                result = "Потопил!";
                alert('Ой! Вы потопили ' + this._name + ':(')
            } else {
                result = "Попал!";
            }
        }
        return result;
    }
}

class GameHelper {
    constructor() {
        this._alphabet = "abcdefg";
        this._gridLength = 7;
        this._gridSize =49;
        this._grid = [];
        this._comCount = 0;
    }

    getUserInput (promptInp) {
        let inputLine = prompt(promptInp);
        return +inputLine;
    }

    placeDotCom(comSize) {
        let alphaCells = [];
        let alphaCoords = [];
        let temp = null;
        let coords = [];
        let attempts = 0;
        let success = false;
        let location = 0;

        this._comCount++;
        let incr = 1;
        if((this._comCount % 2) == 1) {
            incr = this._gridLength;
        }
        while(!success && attempts++ < 200) {
            location = Math.round(Math.random() * this._gridSize);
            let x = 0;
            success = true;
            while (success && x < comSize) {
                if(this._grid[location] == 0) {
                    coords[x++] = location;
                    location += incr;
                    if(location >= this._gridSize) {
                        success = false;
                    }
                    if(x > 0 && (location % this._gridLength == 0)) {
                        success = false;
                    }
                } else {
                    success = false;
                }
            }
        }
        let x = 0;
        let row = 0;
        let column = 0;
        while(x < comSize) {
            this._grid[coords[x]] = 1;
            row = Math.floor(coords[x] / this._gridLength);
            column = coords[x] % this._gridLength;
            temp = this._alphabet[column];

            alphaCells.push(temp + row);
            x++;
        }
        return alphaCells;
    }
}

class SimpleDotComGame {
    constructor() {
        this._arrayList = [];
        this._numOfGuesses = 0;
        this._helper = new GameHelper();
    }

    setupGame() {
        let one = new SimpleDotCom();
        one.name = "Pets.com";
        let two = new SimpleDotCom();
        two.name = "eToys.com";
        let three = new SimpleDotCom();
        three.name = "Go2.com";
        this._arrayList.push(one);
        this._arrayList.push(two);
        this._arrayList.push(three);

        alert('Ваша цель - потопить три "сайта".');
        alert('Pets.com, eToy.com, Go2.com');
        alert('Попытайтесь потопить их за минимальное количество ходов');

        for (let dotComToTest of this._arrayList) {
            let newLocation = this._helper.placeDotCom(3);
            alert(newLocation.join(","));
            dotComToTest.locationCells = newLocation;
        }
        
    }

    startPlaying() {
        while(!(this._arrayList.length == 0)) {
            let userGuess = this._helper.getUserInput("Сделай ход");
            this.checkUserGuess(userGuess);
        }
        this.finishGame();  
    }

    checkUserGuess(userGuess) {
        this._numOfGuesses++;
        let result = "Мимо";
        for (let dotComToTest of this._arrayList) {
            result = dotComToTest.checkYourself(userGuess);
            if(result == "Попал!") {
                break;
            }
            if (result == "Потопил!") {
                dotComToTest.splice(dotComToTest, 1);
                break;
            }
        }
        alert(result);
    }

    finishGame() {
       alert('Все сайты ушли ко дну! Ваши акции теперь ничего не стоят.');
        if (this._numOfGuesses <= 18) {
            alert('Это заняло у вас всего ' + this._numOfGuesses + 'попыток.');
            alert('Вы успели выбраться до того, как ваши вложения утонули.');
        } else {
            alert('Это заняло у вас довольно много времени. ' + this._numOfGuesses + 'попыток.');
            alert('Рыбы водят хороводы вокруг ваших вложений.');
        }
    }


    static main() {
        let game = new SimpleDotComGame();
        game.setupGame();
        game.startPlaying();
    }    
}

SimpleDotComGame.main();