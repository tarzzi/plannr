           //localStorage.clear();
           $('select').on('change', function() {
            var project = $(this).val();
            console.log(project);
        });
        var tasks = [];
        var projects = [];
        var projectSelected = "";
        initStorage();
            console.log(tasks);

        /* -----  Tasks -----  */
        function addTask(){
            let taskName    = $('#input-new-task-name').val();
            let taskDesc    = $('#input-new-task-desc').val();
            let taskPrio    = $('#input-select-prio').val();
            let taskDate    = $('#input-new-task-date').val();
            let taskProject = $('#input-select-project').val();
            let task = {
                id:         generateIdentifier(),
                name:       taskName,
                prio:       taskPrio,
                desc:       taskDesc,
                date:       taskDate,
                project:    taskProject
            };
            updateStorage(task, "task", "add");
            clearInputs();
            renderTasks();
        }
        function deleteTask(task){
            updateStorage(task, "task", "delete");
            renderTasks();
        }


        /* -----  Projects -----  */
        function addProject(){
            let projectName = $('#input-new-project').val();
            let project = {
                id:     generateIdentifier(),
                name:   projectName
            };
            clearInputs();
            updateStorage(project, "project", "add");
            renderProjects();
        }
        

        /* -----  Rendering -----  */
        function renderTasks(){
            let tasksList = $('#tasks-list');
            tasksList.html('');
            tasks.forEach(task => {
                    tasksList.append(`
                        <div class="task-box id="${task.id}">
                            <div class="task-name">
                                <span>${task.name}</span>
                                <span>${task.project}</span>
                            </div>
                            <div class="task-description">
                                <span>${task.desc}</span>
                                <span>${task.prio}</span>
                                <span>${task.date}</span>
                            </div>
                            <div class="task-options">
                                <button class="btn">Done</button>
                                <button class="btn" onclick="deleteTask('${task.id}')">Delete</button>
                            </div>
                        </div>
                    `);
            });
        }

        function renderProjects(){
            $('.option-project').remove();
            for(let i = 0; i < projects.length; i++){
                $('.select-project').append(`<option class="option-project" value="${projects[i].name}">${projects[i].name}</option>`);
            }
            $('#projects-list').html('');
            $('#projects-list').append(`<button class="project-item">All projects</button>`);
            
            for(let i = 0; i < projects.length; i++){
                $('#projects-list').append(`<button class="project-item">${projects[i].name}</button>`);
            }
        }
        
        function clearInputs(){
            $('.input-clear').val(' ');
        }

        
        /* -----  Storage -----  */
        function initStorage(){
            if(localStorage.getItem('tasks') === null){
                localS('set', 'tasks', tasks);
            }
            if(localStorage.getItem('projects') === null){
                localS('set', 'projects', projects);
            }
            tasks = localS('get', 'tasks');
            projects = localS('get', 'projects');

            renderTasks();
            renderProjects();
        }

        function updateStorage(task, type, option){
            
            if(type == "task"){
                if(option === "delete"){
                    tasks.splice(tasks.indexOf(task), 1);
                }
                if(option === "add"){
                    tasks.push(task);
                }
                localS('set', 'tasks', tasks);
            }
            if(type == "project"){
                if(option === "delete"){
                    projects.splice(projects.indexOf(task), 1);
                }
                if(option === "add"){
                    projects.push(task);
                }
                localS('set', 'projects', projects);
            }
        }
        
        // helper function to update localStorage
        function localS(option, item, value){
            
            if(option === "get"){
                if(item === "tasks"){
                    return JSON.parse(localStorage.getItem('tasks'));
                }
                if(item === "projects"){
                    return JSON.parse(localStorage.getItem('projects'));
                }
            }
            if(option === "set"){
                if(item === "tasks"){
                    localStorage.setItem('tasks', JSON.stringify(value));
                }
                if(item === "projects"){
                    localStorage.setItem('projects', JSON.stringify(value));
                }
            }
        }

        /* -----  Helpers -----  */
        function generateIdentifier(){
            let identifier = Math.random().toString(36).substr(2, 9);
            return identifier;
        }
        