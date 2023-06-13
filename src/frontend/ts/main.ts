var M;

<<<<<<< HEAD
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
=======
class Main implements EventListenerObject,HttpResponse {
    users: Array<Usuario> = new Array();
    framework: Framework = new Framework();
   
    constructor() {
        var usr1 = new Usuario("mramos", "Matias");
        var usr2 = new Usuario("jlopez", "Juan");


        this.users.push(usr1);
        this.users.push(usr2);

        var obj = { "nombre": "Matias", "edad": 35, "masculino": true };
        //alert(JSON.stringify(obj));

    }
    manejarRespueta(respueta: string) {
        var lista: Array<Device> = JSON.parse(respueta);

        
        var ulDisp = document.getElementById("listaDisp");
        for (var disp of lista) {
            var item: string = `<li class="collection-item avatar">`;
                    if(disp.type==1){
                      item+=  '<img src="static/images/lightbulb.png" alt = "" class="circle" >'
                    } else {
                        item+=  '<img src="static/images/window.png" alt = "" class="circle" >'
                    }
                          
                        item+=`<span class="titulo">${disp.name}</span>
                          <p>
                          ${disp.description}
                          </p>
                          <a href="#!" class="secondary-content">
                          <div class="switch">
                          <label>
                            Off
                            `;
                            if (disp.state) {
                                item +=`<input type="checkbox" checked id="ck_${disp.id}">`;
                            } else {
                                item +=`<input type="checkbox" id="ck_${disp.id}" >`;
                            }
                            item += `
                            <span class="lever"></span>
                            On
                          </label>
                        </div>
                          </a>
                        </li>`;
            
            ulDisp.innerHTML += item;
        }
        
        for (var disp of lista) {
            var checkPrender = document.getElementById("ck_" + disp.id);
            checkPrender.addEventListener("click", this);

            

        }
        
    }
    obtenerDispositivo() {
        this.framework.ejecutarBackEnd("GET", "http://localhost:8000/devices",this);
    }

    handleEvent(event) {
        var elemento =<HTMLInputElement> event.target;
        console.log(elemento)
        if (event.target.id == "btnListar") {
            this.obtenerDispositivo();
            for (var user of this.users) {

                //TODO cambiar ESTO por mostrar estos datos separados por "-" 
                //en un parrafo "etiqueta de tipo <p>"
              
            }
        } else if (event.target.id == "btnLogin") {

            var iUser = <HTMLInputElement>document.getElementById("iUser");
            var iPass = <HTMLInputElement>document.getElementById("iPass");
            var username: string = iUser.value;
            var password: string = iPass.value;

            if (username.length > 3 && password.length>3) {
                
                //iriamos al servidor a consultar si el usuario y la cotraseña son correctas
                var parrafo = document.getElementById("parrafo");
                parrafo.innerHTML = "Espere...";
            } else {
                alert("el nombre de usuario es invalido");
            }

        } else if (elemento.id.startsWith("ck_")) {
            //Ir al backend y aviasrle que el elemento cambio de estado
            //TODO armar un objeto json con la clave id y status y llamar al metodo ejecutarBackend
           
            alert("El elemento " + elemento.id + " cambia de estado a =" + elemento.checked);
          
        }else {
            //TODO cambiar esto, recuperadon de un input de tipo text
            //el nombre  de usuario y el nombre de la persona
            // validando que no sean vacios
            console.log("yendo al back");
            this.framework.ejecutarBackEnd("POST", "http://localhost:8000/device", this, {});
           
        }
    }
}


window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,{});
    var elemsC = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elemsC, {autoClose:true});

    var main: Main = new Main();
    var btnListar: HTMLElement = document.getElementById("btnListar");
    btnListar.addEventListener("click", main);




    var btnAgregar: HTMLElement = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);

    var btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", main);

});
>>>>>>> c62e17027cce12669abd851ea31a5e9b120a3a4b
