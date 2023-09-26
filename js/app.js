const inputTarea = document.getElementById("tarea-nueva");
const botonAgregar = document.getElementById("btn-agregar-tarea");
const listaTareas = document.getElementById("lista-tareas");
let tareasJSON = JSON.parse(localStorage.getItem("tareas"));
if (tareasJSON === null) {
  tareasJSON = [];
}


loadTasks();

botonAgregar.addEventListener("click", ()=>{
  addTask();
  inputTarea.textContent = "";
});
inputTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});


function loadTasks() {
  listaTareas.innerHTML = "";
  let tareasAlmacenadas = JSON.parse(localStorage.getItem("tareas"));

}



function addTask() {
  if (inputTarea.value === "") {
    alert("el capmpo para agregar tarea no puede quedar vacio");
  } else {
    const newDiv = document.createElement("div");
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    const btnDeleteTask = document.createElement("button")
    const imagenEliminar = document.createElement("img")
    imagenEliminar.setAttribute("src", "./img/eliminar.png")
    newLi.textContent = inputTarea.value;
    checkbox.setAttribute("type", "checkbox");
    btnDeleteTask.setAttribute("type", "button");
    btnDeleteTask.addEventListener("click", () => {
      newDiv.remove()
    });
    checkbox.addEventListener("change", ()=>{
      if (checkbox.checked) {
        newLi.classList.add("completada");
      } else {
        newLi.classList.remove("completada");
      }
    });
    listaTareas.append(newDiv);
    newDiv.append(newLi, checkbox, btnDeleteTask);
    btnDeleteTask.innerHTML = `<img src="./img/eliminar.png" alt="">`;
    inputTarea.value = "";
    // Enviar datos al almacenamineto local

    tareasJSON.push({
      tarea: inputTarea.value,
      estado: checkbox.checked,
  });
  for (let i = 0; i < tareasJSON.length; i++) {
    console.log(tareasJSON[i].estado);
  }
    
  }
}

function refreshStorage(){
  
}
