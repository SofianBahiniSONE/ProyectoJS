const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


        //Clase Field para hacer el tablero y las funciones
class Field {
    constructor(field){
        this._field = field;
        this._horizontalLocation = 0;
        this._verticalLocation = 0;
    }
    get field(){
        return this._field;
    }
    get horizontalLocation(){
        return this._horizontalLocation;
    }
    get verticalLocation(){
        return this._verticalLocation;
    }

    set horizontalLocation(horizontal){
        this._horizontalLocation = horizontal;
    }
    set verticalLocation(vertical){
        this._verticalLocation = vertical;
    }
    
    static generateField(height, width, percentage){
        const newArray = [];

        for(let x=0; x< height; x++){
            let rowArray = [];
            for(let y=0; y<width; y++)
            {
                
                rowArray.push(fieldCharacter);
            }
            newArray.push(rowArray);
        }

        do{
        newArray[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hat;
        } while (newArray[0][0] === hat)

       
        let noHoles = Math.floor((height*width)*(percentage/100));
        for (let n=0; n < noHoles ; n++){
            newArray[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hole;
        }
        return newArray;
    }

    print(){
      for (let i=0; i< this.field.length ; i++)
        console.log(this.field[i].join(''));
      }

    

    score() {
        if (this.horizontalLocation <0 || this.verticalLocation<0)
        {           
            console.log('HAS PERDIDO');
            return false; 
        }

        const currValue= this.field[this.verticalLocation][this.horizontalLocation];
        if (currValue === hat)
        {
            console.log('FELICIDADES Has encontrado el sombrero');
            return true;
        }
        else if (currValue=== hole || currValue === undefined) {
            console.log('HAS PERDIDO');
            return false;
        }else {
            this.field[this.verticalLocation][this.horizontalLocation]= pathCharacter;
            return undefined
        }
    }

    //Metodo para decidir hacia donde ir
    location(){
        let input = prompt('Hacia donde quieres ir: Arriba = a | Abajo = b | Izquierda = i | Derecha = d  ');
        
        if (input === 'a')
        {
            this.verticalLocation--;
        }else if (input === 'b')
        {
            this.verticalLocation++; 
        }else if (input === 'i')
        {
            this.horizontalLocation--; 
        }else if (input === 'd')
        {
            this.horizontalLocation++; 
        }


    }
  }

  
  function play(){
  /*  const myField = new Field([
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░'],
      ]);
    */
   const myArray = Field.generateField(12,10,20);
   const myField = new Field(myArray)  
      while ( myField.score() === undefined){
        myField.print();
        myField.location();
    
    }

}

play();