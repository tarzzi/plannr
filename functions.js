//localStorage.clear();
var tasks = []
var projects = []
var projectSelected = ''
initStorage()

function dropdown(event) {
    (event == 'p') ? $('#dropdown-project-content').toggle() : $('#dropdown-task-content').toggle()
}

/* -----  Tasks -----  */
function addTask() {
    let taskName = $('#input-new-task-name').val()
    let taskDesc = $('#input-new-task-desc').val()
    let taskPrio = $('#input-select-prio').val()
    let taskDate = $('#input-new-task-date').val()
    let taskProject = $('#input-select-project').val()
    let task = {
        id: generateIdentifier(),
        name: taskName,
        prio: taskPrio,
        desc: taskDesc,
        date: taskDate,
        project: taskProject,
        done: false,
    }
    updateStorage(task, 'task', 'add')
    clearInputs()
    renderTasks()
}
function deleteTask(task_id) {
    console.log(tasks)
    updateStorage(task_id, 'task', 'delete')
    console.log(tasks)
    renderTasks()
}

/* -----  Projects -----  */
function addProject() {
    let projectName = $('#input-new-project').val()
    let project = {
        id: generateIdentifier(),
        name: projectName,
    }
    clearInputs()
    updateStorage(project, 'project', 'add')
    renderProjects()
}
function deleteProject(project) {
    updateStorage(project, 'project', 'delete')
    renderProjects()
}

/* -----  Rendering -----  */

function renderTasks(project) {
    let tasksList = $('#tasks-list')
    tasksList.html('')
    tasks.forEach((task) => {
        if (task.project == project || project == null) {
            let prio_color = getPrioColor(task.prio)
            tasksList.append(`
            <div class="task-box grid-box" id="${task.id}">
                    <div class="task-name">
                        <span>Task: ${task.name}</span><br>
                        <span>Project: ${task.project}</span>
                    </div>
                    <div class="task-description">
                        <span>Description: ${task.desc}</span><br>
                        <span class="${prio_color}">Priority: ${task.prio}</span><br>
                        <span>${task.date}</span>
                    </div>
                    <div class="task-options">
                        <button class="btn" onclick="completeTask('${task.id})">Done</button>
                        <button class="btn" onclick="deleteTask('${task.id}')">Delete</button>
                    </div>
                </div>
            `)
        }
    })
}

function completeTask(taskid){
    return;
}

function renderProjects() {
    $('.option-project').remove()
    for (let i = 0; i < projects.length; i++) {
        $('.select-project').append(
            `<option class="option-project" value="${projects[i].name}">${projects[i].name}</option>`
        )
    }

    $('#projects-list').html('')
    $('#projects-list').append(
        `<button class="project-item" onclick="renderTasks()">All projects</button>`
    )
    for (let i = 0; i < projects.length; i++) {
        $('#projects-list').append(
            `<button class="project-item" onclick="renderTasks('${projects[i].name}')">${projects[i].name}</button>`
        )
    }
}

function clearInputs() {
    $('.input-clear').val(' ')
}

/* -----  Storage -----  */
function initStorage() {
    console.log(tasks)
    tasks = localS('get', 'tasks', tasks) === null ? [] : localS('get', 'tasks')
    console.log(tasks)
    projects =
        localS('get', 'projects', projects) === null
            ? []
            : localS('get', 'projects')
    renderTasks()
    renderProjects()
}

function updateStorage(data, type_name, option) {
    //task id task delete
    let data_array = type_name === 'task' ? tasks : projects
    //data array = tasks
    let array_of = type_name === 'task' ? 'tasks' : 'projects'
    //array_of = "tasks"
    let index = data_array.findIndex((x) => {
        return x.id === data
    })
    option === 'add' ? data_array.push(data) : data_array.splice(index, 1)
    option = option === 'add' ? 'set' : option === 'delete' ? 'set' : 'get'
    localS(option, array_of, data_array)
}

// helper function to update localStorage
function localS(option, item, data) {
    if (option === 'set') {
        localStorage.setItem(item, JSON.stringify(data))
    } else {
        return item === 'tasks'
            ? JSON.parse(localStorage.getItem(item))
            : JSON.parse(localStorage.getItem(item))
    }
}

/* -----  Helpers -----  */
function generateIdentifier() {
    let identifier = Math.random().toString(36).substr(2, 9)
    return identifier
}

function getPrioColor(prio) {
    return prio === 'None'
        ? 'prio-none'
        : prio === 'Low'
        ? 'prio-low'
        : prio === 'Mid'
        ? 'prio-mid'
        : prio === 'High'
        ? 'prio-high'
        : 'prio-none'
}
