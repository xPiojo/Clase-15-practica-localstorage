document.addEventListener("DOMContentLoaded", function () {
  // Inicializo Materialize
  M.AutoInit();

  const taskInput = document.getElementById("tarea-nueva");
  const taskList = document.getElementById("lista-tareas");
  const addTaskBtn = document.getElementById("btn-agregar-tarea");
  const inputFilter = document.getElementById("search");
  let tasksJSON = JSON.parse(localStorage.getItem("savedTasks")) || [];


  inputFilter.addEventListener("keyup", filterTasks);
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });


  loadTasks();


  // Función para cargar las tareas del archivo JSON a mi pagina
  function loadTasks() {
    taskList.innerHTML = "";
    if (tasksJSON) {
      tasksJSON.forEach((task) => createTask(task));
    }
  }


  // Función para crear los <li> con su boton y checkbox
  function createTask(taskText) {
    const newTask = document.createElement("LI");

    // Creo contenedor para la tarea y los botones
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    // Creo la tarea
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent =
      taskText.charAt(0).toUpperCase() + taskText.slice(1);

    // Crear la imagen para el boton de borrar tarea
    const deleteImage = document.createElement("img");
    deleteImage.src = "./img/eliminar.png";
    deleteImage.alt = "Eliminar";

    // Creo botón para borrar la tarea
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(deleteImage);
    deleteButton.classList.add("waves-effect", "waves-light", "btn");
    deleteButton.addEventListener("click", () => {
      deleteTask(newTask);
    });

    // Creo checkbox para la tarea
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.addEventListener("change", () => {
      newTask.classList.toggle("completada");
    });

    // Wrap the checkbox with a label to apply Materialize CSS styles
    const checkboxLabel = document.createElement("label");
    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.classList.add("checkbox-label");

    // Agrego los elementos al contenedor de la tarea
    taskContainer.appendChild(checkboxLabel);
    taskContainer.appendChild(taskTextElement);
    taskContainer.appendChild(deleteButton);

    // Agrego el contenedor de la tarea al <LI>
    newTask.appendChild(taskContainer);

    // Agrago el <LI> a la lista de tareas (<ul>)
    taskList.appendChild(newTask);
  }


  // Función para agregar la tarea a la pagina y al Local Storage
  function addTask() {
    const inputValue = taskInput.value.trim();
    if (inputValue !== "") {
      createTask(inputValue);
      tasksJSON.push(inputValue);
      localStorage.setItem("savedTasks", JSON.stringify(tasksJSON));
      taskInput.value = "";
    } else {
      alert("You cannot leave the input empty");
    }
  }


  // Función para eliminar la tarea de la pagina y del Local Storage
  function deleteTask(taskElement) {
    const taskText = taskElement.querySelector("span").textContent;
    const newTasks = tasksJSON.filter(
      (task) => task.toLowerCase() !== taskText.toLowerCase()
    );
    tasksJSON = newTasks;
    localStorage.setItem("savedTasks", JSON.stringify(tasksJSON));
    taskElement.remove();
  }


  // Función para filtrar las tareas, las que coinciden con el input se ocultan
  function filterTasks() {
    const filterText = inputFilter.value.toLowerCase();
    const taskItems = document.querySelectorAll("#lista-tareas li span");

    taskItems.forEach((taskItem) => {
      const taskText = taskItem.textContent.toLowerCase();

      if (taskText.includes(filterText)) {
        taskItem.closest("li").classList.remove("hidden");
      } else {
        taskItem.closest("li").classList.add("hidden");
      }
    });
  }
});
