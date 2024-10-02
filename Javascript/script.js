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
if(location.href.split('/')[2] == 'index.html')
{
    console.log('ass');
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
            <p>Descripcion</p>
            <p>Creado</p>
            <p>Estado</p>
        </div>
    `;
    for(i = 0; i < list.length; i++)
    {
        tasksHTML.innerHTML += `
        <div id='task' class='task'>
            <p>${list[i].title}</p>
            <p>${list[i].desc}</p>
            <p>${list[i].timestamp}</p>
            <p>${list[i].isFinished}</p>
            <button id="btn" class="btn" onclick="finishTask('${list[i].id}')">Finalizar</button>
            <button id="btn" class="btn" onclick="editTaskRedirect('${list[i].id}')">Modificar</button>
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
    let desc = document.forms['form']['desc'].value;            //DESCRIPTION
    let timestamp = today();                                    //TIME STAMP OF WHEN IT WAS CREATED
    let isFinished = false;                                     //TASK STATUS, SET AS INCOMPLETE (FALSE)
    const item = {
        id: id,
        title: title, 
        desc: desc, 
        timestamp: timestamp, 
        isFinished: isFinished
    };
    if(title == ''){alert('El titulo no puede estar vacío.');}
    /*if(repeatCheck(title))
    {
        alert("The following title is already present on the list");
    }*/
    else
    {
        list.push(item);
        localStorage.setItem('tasks', JSON.stringify(list));
        location.href = '../HTML/index.html';
    }
}

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