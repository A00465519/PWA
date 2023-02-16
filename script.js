async function registerServiceWorker() {
    // Register service worker
    if ('serviceWorker' in navigator) { // checking if the browser supports service workers
        window.addEventListener('load', function () { // when app loads, fire callback
            navigator.serviceWorker.register('/sw.js').then(function () { // register sw
                console.log('ServiceWorker registration successful');  // registration was successful
            }, function (err) {
                console.log('ServiceWorker registration failed', err); // registration failed
            });
        });
    }
}
async function main() {
    console.log("begin")
    const form = document.querySelector('form');
    const taskNameInput = document.querySelector("[name='taskName']");
    const dueDateInput = document.querySelector("[name='dueDate']");
    const assignedToInput = document.querySelector("[name='assignedTo']");

    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');
    
    // const pendingTasksList = [];
    // const completedTasksList = [];

    const dbPendingTasks = await getPendingTasksFromDB()
    const dbCompletedTasks = await getCompletedTasksFromDB()

    if (dbPendingTasks) {
        dbPendingTasks.forEach(dbPendingTask => {
            addTaskElement(dbPendingTask);
            pendingTasksList.push(dbPendingTask)
        });
    }
    if (dbCompletedTasks) {
        dbCompletedTasks.forEach(dbCompletedTask => {
            addTaskElement(dbCompletedTask);
            completedTasksList.push(dbPendingTask)
        });
    }

    function addTaskElement(task) {

        let taskType = ''
        let checkboxChecked = false

        if(task.isCompleted == "true") {
            taskType = "Completed"
        } else {
            taskType = "Pending"
        }

        const div = document.createElement('div')
        div.classList.add("taskClass")
        div.id = task.id

        const h1TaskName = document.createElement('h1')
        h1TaskName.classList.add("taskNameClass")
        h1TaskName.innerHTML = task.name
        
        const pDueDate = document.createElement('p')
        pDueDate.classList.add("taskDueDateClass")
        pDueDate.classList.add("inlineBlock")
        pDueDate.innerHTML = task.dueDate
        
        const pAssignedTo = document.createElement('p')
        pAssignedTo.classList.add("taskAssignedToClass")
        pAssignedTo.classList.add("inlineBlock")
        pAssignedTo.innerHTML = task.assignedTo
         
        const checkBoxIsCompleted = document.createElement('input')
        checkBoxIsCompleted.classList.add(taskType)
        checkBoxIsCompleted.classList.add("inlineBlock")
        checkBoxIsCompleted.type = "checkbox";
        // checkBoxIsCompleted.name = task.id + "name";
        checkBoxIsCompleted.checked = checkboxChecked;
        checkBoxIsCompleted.id = "id";

        div.appendChild(h1TaskName)
        div.appendChild(pDueDate)
        div.appendChild(pAssignedTo)
        div.appendChild(checkBoxIsCompleted)

        if (taskType == "Completed") {
            completedTasksList.appendChild(div)
            addnewTask(task.id, task.name, task.dueDate, task.assignedTo, "true")
        } else {
            pendingTasksList.appendChild(div)
            addnewTask(task.id, task.name, task.dueDate, task.assignedTo, "false")
        }

        // localStorage.setItem("completedTasks", JSON.stringify(completedTasksList));
        // localStorage.setItem("pendingTasks", JSON.stringify(pendingTasksList));

        taskNameInput.value = ''
        dueDateInput.value = '' 
        assignedToInput.value = ''
    }
    // Events
    form.onsubmit = (event) => {
        event.preventDefault();
        addTaskElement({name: taskNameInput.value, dueDate: dueDateInput.value, assignedTo: assignedToInput.value});
    }
}

registerServiceWorker()
main()