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
const tasksLS = localStorage.getItem('tasks');

//FOR LOCAL STORAGE WIPE
function fullwipe()
{
    localStorage.clear();
    location.reload();
}

//REDIRECTS
function addTaskRedirect(){location.href = '../HTML/insertTask.html';}
function taskListRedirect(){location.href = '../HTML/index.html';}
function editTaskRedirect(item)
{
    location.href = '../HTML/editTask.html';
    document.getElementById('ctTitle').innerText = item.title;
    document.getElementById('ctDate').innerText = item.datelimit;
}

//GENERATE LIST ON MAIN PAGE
if(tasksLS == null)
{
    tasksHTML.innerHTML = `<p>No hay tareas añadidas en el listado. Empieza a añadir unas cuantas</p><button onclick="addTaskRedirect()">Añadir Tarea</button>`;
}
else
{
    let list = JSON.parse(tasksLS);
    console.log(list);
    tasksHTML.innerHTML += `
        <div id='taskTitles' class='taskTitles'>
            <p>Titulo</p>
            <p>Fecha Limite</p>
            <!--p>Creado</p-->
            <p>Estado</p>
        </div>
    `;
    for(i = 0; i < list.length; i++)
    {
        tasksHTML.innerHTML += `
        <div id='task' class='task'>
            <p>${list[i].title}</p>
            <p>${list[i].datelimit}</p>
            <!--p>${list[i].timestamp}</p-->
            <p>${list[i].isFinished}</p>
            <button id="btn" class="btn" onclick="finishTask('${list[i].id}')">Finalizar</button>
            <button id="btn" class="btn" onclick="editTaskRedirect('${list[i]}')">Modificar</button>
            <button id="btn" class="btn" onclick="deleteTask('${list[i].id}')"><img src="../img/CuboBasura.png" width=50 height=50></button>
            <!--p>${list[i].id}</p-->
        </div>
        `;
    }
    tasksHTML.innerHTML += '</div>';
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

    datelimit = reformatDate(datelimit);

    const item = {
        id: id,
        title: title,
        datelimit: datelimit, 
        timestamp: timestamp, 
        isFinished: isFinished
    };
    if(title == ''){alert('El titulo no puede estar vacío.');}
    /*if(repeatCheck(title))
    {
        alert("Ya se ha introducido una tarea con este título.");
    }*/
    else
    {
        list.push(item);
        localStorage.setItem('tasks', JSON.stringify(list));
        location.href = '../HTML/index.html';
    }
}

//CHANGE THE DISPLAY OF DATELIMIT
function reformatDate(dl)
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
    JSON.parse(tasksLS).forEach(element => {
        if(element.title == title)
        {
            return true;
        }
    });
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

//REFORMAT DATE FOR DISPLAY
function reformatDate(dl)
{
    let day = dl.split('-')[2];
    if(day[0] == '0'){day = day[1];}

    let month = dl.split('-')[1];
    if(month[0] == '0'){month = month[1];}

    let year = dl.split('-')[0];

    return `${day}/${month}/${year}`;
}

function editTask(id)
{
    
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