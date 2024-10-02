/**************************/
/* CREATED ON: 30/09/2024 */
/**************************/
/* AUTHORS:               */
/*    Victor Falcon       */
/*    Aaron Fuentes       */
/*    Xavier Barreras     */
/*    Xavier Ramirez      */
/**************************/

//HTML REFERENCES
const tasksHTML = document.getElementById('tasks');

//LOCAL STORAGE REFERENCES
const tasksLS = localStorage.getItem('tasks');      //ALL TASKS SAVED
const idLS = localStorage.getItem('id');          //ID SHARED ACROSS PAGES

//FOR LOCAL STORAGE WIPE
function fullwipe()
{
    localStorage.clear();
    location.reload();
}

//REDIRECTS
function addTaskRedirect(){location.href = '../HTML/insertTask.html';}
function taskListRedirect(){location.href = '../HTML/index.html';}
function editTaskRedirect(id)
{
    localStorage.setItem('id', id);
    location.href = '../HTML/editTask.html';
}

//GENERATE LIST ON MAIN PAGE
function loadList()
{
    if(tasksLS == null)
    {
        tasksHTML.innerHTML = `<p class="txt">No hay tareas añadidas en el listado. Empieza a añadir unas cuantas</p><button onclick="addTaskRedirect()">Añadir Tarea</button>`;
    }
    else
    {
        let list = JSON.parse(tasksLS);
        //console.log(list);
        tasksHTML.innerHTML += `
            <div id='taskTitles' class='taskTitles'>
                <p>Titulo</p>
                <p>Fecha Limite</p>
                <p>Estado</p>
            </div>
        `;
        for(i = 0; i < list.length; i++)
        {
            tasksHTML.innerHTML += `
            <div id='task' class='task'>
                <p>${list[i].title}</p>
                <p>${reformat(list[i].datelimit)}</p>
                <p>${list[i].isFinished}</p>
                <button id="fin" class="btn" onclick="finishTask('${list[i].id}')">Finalizar</button>
                <button id="mod" class="btn" onclick="editTaskRedirect('${list[i].id}')">Modificar</button>
                <button id="sup" class="btn" onclick="deleteTask('${list[i].id}')"><img src="../img/CuboBasura.png" width=50 height=50></button>
            </div>
            `;
        }
        tasksHTML.innerHTML += '</div>';
    }
}

//INSERTS ITEM INFO WHEN LOADING THE EDIT TASK
function loadEdit()
{
    JSON.parse(tasksLS).forEach(element => {
        if(element.id == idLS)
        {
            document.getElementById('ctTitle').value = element.title;
            document.getElementById('ctDate').value = element.datelimit;
        }
    });
}

//ADD TASK TO THE LIST
function addTask()
{
    let list = [];
    if(tasksLS != null){list = JSON.parse(tasksLS);}            

    let id = Math.floor(Math.random(0, 1) * 10000000000);       //RANDOMLY GENERATED ID
    let title = document.forms['form']['title'].value;          //TITLE OF THE TASK
    let datelimit = document.forms['form']['datelimit'].value;  //DATE LIMIT
    let timestamp = today();                                    //TIME STAMP OF WHEN IT WAS CREATED
    let isFinished = false;                                     //TASK STATUS, SET AS INCOMPLETE (FALSE)
    

    const item = {
        id: id,
        title: title,
        datelimit: datelimit, 
        timestamp: timestamp, 
        isFinished: isFinished
    };
    if(title == ''){alert('El titulo no puede estar vacío.');}
    else if(datelimit == ''){alert('La fecha no puede estar vacía.');}
    else
    {
        list.push(item);
        localStorage.setItem('tasks', JSON.stringify(list));
        location.href = '../HTML/index.html';
    }
}

//CHANGE THE DISPLAY OF DATELIMIT
function reformat(dl)
{
    let day = dl.split('-')[2];
    if(day[0] == '0'){day = day[1];}

    let month = dl.split('-')[1];
    if(month[0] == '0'){month = month[1];}

    let year = dl.split('-')[0];

    return `${day}/${month}/${year}`;
}

//GET TODAY'S DATE FOR DATE OF CREATION
function today()
{
    let dt = new Date()
    return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
}

//RETURNS WHETHER THE TITLE IS ALREADY PRESENT IN THE LIST OR NOT
function repeatCheck(title)
{
    if(tasksLS != null)
    {
        JSON.parse(tasksLS).forEach(element => {
            if(element.title == title)
            {
                return true;
            }
        });
    }
    return false;
}

//SETS THE VALUE ISFINISHED AS TRUE, FINISHING THEREFORE THE TASK
function finishTask(id)
{
    let list = JSON.parse(tasksLS);
    list.forEach(element => {
        if(element.id == id)
        {
            element.isFinished = true;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(list));
    location.reload();
}

//UPDATE A TASK WITH NEW INFO
function editTask()
{
    let list = [];
    JSON.parse(tasksLS).forEach(element => {
        if(element.id == idLS)
        {
            element.title = document.forms['form']['newTitle'].value;
            element.datelimit = document.forms['form']['newDate'].value;;
        }
        list.push(element)
    });
    localStorage.setItem('tasks', JSON.stringify(list));
    location.href = '../HTML/index.html';
}

//DELETE A SPECIFIC TASK
function deleteTask(id)
{
    let list = JSON.parse(tasksLS);
    let newList = [];
    list.forEach(element => {
        if(element.id != id)
        {
            newList.push(element);
        }
    });
    if(newList.length == 0){fullwipe();}
    else{localStorage.setItem('tasks', JSON.stringify(newList));}
    location.reload();
}