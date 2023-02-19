var db = new Dexie("toDoList");

db.version(1).stores({
    tasks: '++id, taskName, dueDate, assignedTo, isCompleted',
});

// async function getCompletedTasksFromDB() {
async function getCompletedTasksFromDB() {
    if (db && db.tasks) { // check if db and the tasks table are created    
        return await db.tasks.filter((task) => { 
            return task.isCompleted == "true"
        }).toArray()
    } else {
        return undefined
    }
}

// async function getPendingTasksFromDB() {
async function getPendingTasksFromDB() {
    if (db && db.tasks) { // check if db and the tasks table are created
        return await db.tasks.filter((task) => { 
            return task.isCompleted == "false"
        }).toArray()
    } else {
        return undefined
    }
}

function addnewTask(taskName, dueDate, assignedTo, isCompleted) {
    isCompleted = "false"
    db.tasks.put({ taskName, dueDate, assignedTo, isCompleted })
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

async function markTaskCompleted(id) {
    return await db.tasks.update(id, {isCompleted: "true"})
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

async function markTaskPending(id) {
    return await db.tasks.update(id, {isCompleted: "false"})
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

