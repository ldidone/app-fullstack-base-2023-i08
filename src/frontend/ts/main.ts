
function SayHello(){
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    let new_value = "Hello world!!!" + "\n" + current_value.value;
    document.getElementById("textarea_1").innerHTML = new_value;
}

var fun:any = SayHello;
var numer:number = 21;
var nombre:string = "Lucas";

class Main {
    public nombre: string;
    private numero: number;

    constructor(nombre:string, numero:number) {
        this.nombre = nombre;
        this.numero = numero;
    }
    mostrar():string {
        return this.nombre + " " + this.numero;
    }
}

var miObjeto:Main = new Main("Lucas", 21);

// miObjeto.numero = 21;
// alert(miObjeto.mostrar())
console.log(miObjeto.mostrar())

window.addEventListener("load", ()=> {
    fun();
    SayHello();
});