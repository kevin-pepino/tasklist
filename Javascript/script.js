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

function fullStorageWipe()
{
    if(confirm('Desea eliminar todas las tareas?'))
    {
        localStorage.clear();
        location.reload();
    }
}

//REDIRECTS
function addTaskRedirect(){location.href = '../HTML/insertTask.html';}
function taskListRedirect(){location.href = '../HTML/index.html';}
function editTaskRedirect(id)
{
    localStorage.setItem('id', id);
    location.href = '../HTML/editTask.html';
}
function addSubRedirect(id)
{
    localStorage.setItem('id', id);
    location.href = '../HTML/insertSubTask.html';
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
        console.log(list);
        tasksHTML.innerHTML += `
            <div id='taskTitles' class='taskTitles'>                
                <button id="addTask" class="addTask" onclick="addTaskRedirect()"></button>
                <p>Titulo</p>
                <p>Fecha Limite</p>
                <p>Estado</p>
                <div></div>
                <button id="fullwipe" class="fullwipe" onclick="fullStorageWipe()"></button>
            </div>
        `;
        for(i = 0; i < list.length; i++)
        {
            let finid = '';
            let taskid = '';
            let status = '';
            if(list[i].isFinished)
            {
                finid = "fintrue"; 
                taskid = 'tasktrue'
                status = 'Finalizado'
            }
            else
            {
                finid = "finfalse"; 
                taskid = 'taskfalse'
                status = 'Incompleto'
            }
            tasksHTML.innerHTML += `
            <div id='${taskid}' class='${taskid}'>
                <p>${list[i].title}</p>
                <p>${reformat(list[i].datelimit)}</p>
                <p>${status}</p>
                <button id="nwt" class="btn" onclick="addSubRedirect('${list[i].id}')"></button>
                <button id="${finid}" class="btn" onclick="finishTask('${list[i].id}')"></button>
                <button id="mod" class="btn" onclick="editTaskRedirect('${list[i].id}')"></button>
                <button id="sup" class="btn" onclick="deleteTask('${list[i].id}')"></button>
                <div id='scroll' class='scroll'>
                    <button id='btnup' class='btnup' onclick='moveUp(${list[i].id})'></button>
                    <button id='btndown'class='btndown' onclick='moveDown(${list[i].id})'></button>
                </div>
            </div>
            `;
            if(list[i].sublist.length > 0)
            {
                for(j = 0; j < list[i].sublist.length; j++)
                {
                    tasksHTML.innerHTML += `
                    <div id='${taskid}' class='${taskid}'>
                        <p>${list[i].sublist[j].subTitle}</p>
                        <p>${reformat(list[i].sublist[i].subDate)}</p>
                        <p>${status}</p>
                        <button id="${finid}" class="btn" onclick="finishSubTask('${list[i].sublist[j].subId}')"></button>
                        <button id="mod" class="btn" onclick="editSubTaskRedirect('${list[i].sublist[j].subId}')"></button>
                        <button id="sup" class="btn" onclick="deleteSubTask('${list[i].sublist[j].subId}')"></button>
                        <div id='scroll' class='scroll'>
                            <button id='btnup' class='btnup' onclick='moveUp(${list[i].sublist[j].subId})'></button>
                            <button id='btndown'class='btndown' onclick='moveDown(${list[i].sublist[j].subId})'></button>
                        </div>
                    </div>`;
                }
            }
        }
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
        isFinished: isFinished,
        sublist: []
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
            if(element.isFinished){element.isFinished = false;}
            else{element.isFinished = true;}
        }
    });
    localStorage.setItem('tasks', JSON.stringify(list));
    location.reload();
}

//UPDATE A TASK WITH NEW INFO
function editTask()
{
    let list = [];
    if(document.forms['form']['newTitle'].value == ''){alert('El titulo no puede estar vacío.');}
    else if(document.forms['form']['newDate'].value == ''){alert('La fecha no puede estar vacía.');}
    else
    {
        JSON.parse(tasksLS).forEach(element => {
            if(element.id == idLS)
            {
                
                element.title = document.forms['form']['newTitle'].value;
                element.datelimit = document.forms['form']['newDate'].value;
            }
            list.push(element)
        });
        localStorage.setItem('tasks', JSON.stringify(list));
        location.href = '../HTML/index.html';
    }
}

//DELETE A SPECIFIC TASK
function deleteTask(id)
{
    if(confirm('Desea eliminar esta tarea?'))
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
}

//MOVE A TASK UPWARDS ON THE LIST
function moveUp(id)
{
    let list = JSON.parse(tasksLS);
    let newList = [];
    for(i = 0; i < list.length; i++)
    {
        if(i == 0)
        {
            newList.push(list[i]);
        }
        else if(list[i].id == id)
        {
            newList.splice(newList.length - 1, 0, list[i]);
        }
        else
        {
            newList.push(list[i]);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(newList));
    location.reload();
}

//MOVE A TASK DOWNWARDS ON THE LIST
function moveDown(id)
{
    let list = JSON.parse(tasksLS);
    let newList = [];
    let flag;
    let storeValue;
    for(i = 0; i < list.length; i++)
    {
        
        if(i == flag)
        {
            newList.push(list[i]);
            newList.push(storeValue);
        }
        else
        {
            if(i == list.length - 1)
            {
                newList.push(list[i]);
            }
            else if(list[i].id == id)
            {
                flag = i + 1;
                storeValue = list[i];
            }
            else
            {
                newList.push(list[i]);
            }
        }
    }
    localStorage.setItem('tasks', JSON.stringify(newList));
    location.reload();
}

//ADD A SUBTASK WITHIN A TASK
function addSubTask()
{
    let list = JSON.parse(tasksLS);
    console.log(list);
    let subId = Math.floor(Math.random(0, 1) * 10000000000);
    let subTitle = document.forms['form']['title'].value;  
    let subDate = document.forms['form']['datelimit'].value;
    let subFinished = false;

    const item =
    {
        subId: subId,
        subTitle: subTitle,
        subDate: subDate,
        subFinished: subFinished
    };
    console.log(item);
    if(subTitle == ''){alert('El titulo no puede estar vacío.');}
    else if(subDate == ''){alert('La fecha no puede estar vacía.');}
    else
    {
        list.forEach(element =>{
            if(element.id == idLS)
            {
                console.log('flag');
                element.sublist.push(item);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(list));
        location.href = '../HTML/index.html';
    }
}