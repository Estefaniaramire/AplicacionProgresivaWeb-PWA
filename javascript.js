document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("tasks");

    // Función para cargar las tareas guardadas desde LocalStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            const tasksArray = JSON.parse(savedTasks); // Convertir de string a array
            tasksArray.forEach(function (task) {
                addTaskToDOM(task.title, task.content); // Añadir cada tarea al DOM
            });
        }
    }

    // Función para añadir una tarea al DOM (Lista de tareas)
    function addTaskToDOM(title, content) {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            <strong>${title}</strong>
            <p>${content}</p>
        `;
        taskList.appendChild(newTask);
    }

    // Función para guardar una nueva tarea en LocalStorage
    function saveTaskToLocalStorage(title, content) {
        const savedTasks = localStorage.getItem("tasks");
        let tasksArray = [];
        
        // Si ya hay tareas guardadas, obtenerlas
        if (savedTasks) {
            tasksArray = JSON.parse(savedTasks);
        }

        // Añadir la nueva tarea al array
        tasksArray.push({ title, content });

        // Guardar de nuevo el array completo en LocalStorage
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }

    // Escuchar el evento de envío del formulario
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir que el formulario se envíe y recargue la página

        // Obtener los valores de los campos
        const taskTitle = document.getElementById("taskTitle").value;
        const taskContent = document.getElementById("taskContent").value;

        // Verificar que los campos no estén vacíos
        if (taskTitle === "" || taskContent === "") {
            alert("Por favor completa ambos campos");
            return;
        }

        // Añadir la nueva tarea al DOM y guardarla en LocalStorage
        addTaskToDOM(taskTitle, taskContent);
        saveTaskToLocalStorage(taskTitle, taskContent);

        // Limpiar los campos del formulario
        taskForm.reset();
    });

    // Cargar las tareas cuando la página se carga por primera vez
    loadTasks();
});
