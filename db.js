var db = new Dexie("toDoList");

// DB with single table "students" with primary key "id" and
// indexes on properties "name" and "city"
db.version(1).stores({
    tasks: `
        id,
        name,
        dueDate,
        assignedTo,
        isCompleted`,
},{ autoIncrement: true });

async function getCompletedTasksFromDB() {
    if (db && db.tasks) { // check if db and the tasks table are created
        return await db.tasks.filter((task) => { 
            return task.isCompleted == "true"
        }).toArray().then((data) => {
            return data
        })
    } else {
        return undefined
    }
}

async function getPendingTasksFromDB() {
    if (db && db.tasks) { // check if db and the tasks table are created
        return await db.tasks.filter((task) => { 
            return task.isCompleted == "flase"
        }).toArray().then((data) => {
            return data
        })
    } else {
        return undefined
    }
}

function addnewTask(id, taskName, dueDate, assignedTo, isCompleted) {
    db.tasks.put({ taskName, dueDate, assignedTo, isCompleted }, 2)
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

function markTaskCompleted(id) {
    db.tasks.update(id, {isCompleted: "true"})
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}