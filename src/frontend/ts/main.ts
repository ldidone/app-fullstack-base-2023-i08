var M;

class Main implements EventListenerObject,HttpResponse {
    framework: Framework = new Framework();
   
    constructor() {
    }
    manejarRespueta(respueta: string) {
        var lista: Array<Device> = JSON.parse(respueta);

        
        var ulDisp = document.getElementById("listaDisp");
        for (var disp of lista) {
            var item: string = `<li class="collection-item avatar" id="li_${disp.id}">`;
                    if(disp.type==0){
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

                        <a class="waves-effect waves-light btn" id="del_${disp.id}"><i class="material-icons right">delete</i>Delete</a>
                                           
                        </li>`;
            
            ulDisp.innerHTML += item;
        }
        
        for (var disp of lista) {
            var checkPrender = document.getElementById("ck_" + disp.id);
            checkPrender.addEventListener("click", this);

            var buttonDelete = document.getElementById("del_" + disp.id);
            buttonDelete.addEventListener("click", this);
        }
        
    }
    obtenerDispositivo() {
        var listDevices = document.getElementById('listaDisp');
        listDevices.innerHTML = '';
        this.framework.ejecutarBackEnd("GET", "http://localhost:8000/devices", this);
    }

    updateStatus(id, status) {
        var item = { "id": id, "status": status }
        this.framework.ejecutarBackEnd("POST", "http://localhost:8000/updateStatus", this, item)
    }

    deleteDevice(id) {
        var item = { "id": id }
        this.framework.ejecutarBackEnd("POST", "http://localhost:8000/deleteDevice", this, item)
    }

    addDevice(deviceName, deviceDescription, deviceStatus, deviceType) {
        var device = { 
            "name": deviceName,
            "description": deviceDescription,
            "state": deviceStatus,
            "type": deviceType
        }
        this.framework.ejecutarBackEnd("POST", "http://localhost:8000/addDevice", this, device)
    }

    handleEvent(event) {
        var elemento =<HTMLInputElement> event.target;
        console.log(elemento)
        if (event.target.id == "btnListar") {   
            this.obtenerDispositivo(); 
        } else if (elemento.id.startsWith("ck_")) {         
            this.updateStatus(elemento.id.replace('ck_', ''), elemento.checked)
        } else if (elemento.id.startsWith("del_")){
            var listDevices = document.getElementById('listaDisp');
            var device = document.getElementById(elemento.id.replace('del_', 'li_'));
            listDevices.removeChild(device);
            this.deleteDevice(elemento.id.replace('del_', ''))
        } else if (event.target.id == "btnAgregar") {
            //TODO cambiar esto, recuperadon de un input de tipo text
            //el nombre  de usuario y el nombre de la persona
            // validando que no sean vacios
            // console.log("yendo al back");
            // this.framework.ejecutarBackEnd("POST", "http://localhost:8000/device", this, {});
           //alert("Agregar dispositivo")
            var deviceName = (<HTMLInputElement>document.getElementById("deviceName")).value;
            var deviceDescription = (<HTMLInputElement>document.getElementById("deviceDescription")).value;  
            var deviceStatus = (<HTMLInputElement>document.getElementById("deviceStatus")).checked;
            var deviceStatusNum = Number(deviceStatus);
            var deviceType = (<HTMLInputElement>document.getElementById("deviceType")).value;

            if ((deviceName != null) && (deviceName != "") && 
                (deviceDescription != null) && (deviceDescription != "")) {
                this.addDevice(deviceName, deviceDescription, deviceStatusNum, deviceType);
                alert("¡Dispositivo agregado exitósamente!")
                this.obtenerDispositivo(); 
            } else {
                alert("Debe completar el nombre y la descripción del dispositivo")
            }           
        }
    }
}


window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,{});

    var elemsM = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsM, {});

    var main: Main = new Main();
    var btnListar: HTMLElement = document.getElementById("btnListar");
    btnListar.addEventListener("click", main);

    var btnAgregar: HTMLElement = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);

    var btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", main);
});
