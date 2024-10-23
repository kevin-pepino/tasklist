/**************************/
/* CREATED ON: 30/09/2024 */
/**************************/
/* AUTHORS:               */
/*    Victor Falcon       */
/*    Aaron Fuentes       */
/*    Xavier Barreras     */
/*    Xavier Ramirez      */
/**************************/
//localStorage.clear();
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
function addTaskRedirect()
{
    localStorage.removeItem('backup');
    location.href = '../HTML/insertTask.html';
}
function taskListRedirect()
{
    localStorage.removeItem('backup');
    location.href = '../HTML/index.html';
}
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
function editSubRedirect(id, subId)
{
    let values = [id, subId];
    localStorage.setItem('id', values);
    location.href = '../HTML/editSubTask.html';
}

//GENERATE LIST ON MAIN PAGE
function loadList()
{
    if(tasksLS == null)
    {
        tasksHTML.innerHTML = `
                                <p class="txt">No hay tareas añadidas en el listado. Empieza a añadir unas cuantas</p>
                                <div class="align">
                                    <div>
                                        <button id="añadir" class="añadir" onclick="addTaskRedirect()"></button>
                                    </div>
                                    <div>
                                        <button id="import" class="import2" onclick="importData()">Importar</button>
                                    </div>
                                </div>
                                `;
    }
    else
    {
        let list = JSON.parse(tasksLS);
        console.log(list);
        tasksHTML.innerHTML += `
            <div id='taskTitles' class='taskTitles'>                
                <button id="addTask" class="addTask" onclick="addTaskRedirect()"></button>
                <button id="orden-alfa" class="alfabeto" onclick="sortByTitle()"></button>
                <button id="orden-fecha" class="fecha" onclick="sortByDate()"></button>
                <button id="export" class="export" onclick="exportData()">Exportar</button>
                <button id="import" class="import" onclick="importData()">Importar</button>
                <div></div>
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
            let subId = '';
            let status = '';
            if(list[i].isFinished)
            {
                finid = "fintrue"; 
                taskid = 'tasktrue';
                status = 'Finalizado';
            }
            else
            {
                finid = "finfalse"; 
                taskid = 'taskfalse';
                status = 'Incompleto';
            }
            tasksHTML.innerHTML += `
            <div id='${taskid}' class='${taskid}'>
            <div id='scroll' class='scroll'>
                    <button id='btnup' class='btnup' onclick='moveUp(${list[i].id})'></button>
                    <button id='btndown'class='btndown' onclick='moveDown(${list[i].id})'></button>
                </div>
                <p><b>${list[i].title}</b></p>
                <p><b>${reformat(list[i].datelimit)}</b></p>
                <p><b>${status}</b></p>
                <button id="nwt" class="btn" onclick="addSubRedirect('${list[i].id}')"></button>
                <button id="${finid}" class="btn" onclick="finishTask('${list[i].id}')"></button>
                <button id="mod" class="btn" onclick="editTaskRedirect('${list[i].id}')"></button>
                <button id="sup" class="btn" onclick="deleteTask('${list[i].id}')"></button>
            </div>
            `;
            if(list[i].sublist.length > 0)
            {
                for(j = 0; j < list[i].sublist.length; j++)
                {
                    if(list[i].sublist[j].subFinished)
                    {
                        finid = "fintrue"; 
                        status = 'Finalizado';
                        subId = 'subtrue';
                    }
                    else
                    {
                        finid = "finfalse"; 
                        status = 'Incompleto';
                        subId = 'subfalse';
                    }
                    tasksHTML.innerHTML += `
                    <div id='${subId}' class='${subId}'>
                        <div id='scroll' class='scroll'>
                            <button id='btnup' class='btnup' onclick="subUp('${list[i].id}', '${list[i].sublist[j].subId}')"></button>
                            <button id='btndown'class='btndown' onclick="subDown('${list[i].id}', '${list[i].sublist[j].subId}')"></button>
                        </div>
                        <p>${list[i].sublist[j].subTitle}</p>
                        <p>${reformat(list[i].sublist[j].subDate)}</p>
                        <p>${status}</p>
                        <div></div>
                        <button id="${finid}" class="btn" onclick="finishSubTask('${list[i].id}', '${list[i].sublist[j].subId}')"></button>
                        <button id="mod" class="btn" onclick="editSubRedirect('${list[i].id}', '${list[i].sublist[j].subId}')"></button>
                        <button id="sup" class="btn" onclick="deleteSubTask('${list[i].id}', '${list[i].sublist[j].subId}')"></button>
                    </div>`;
                }
            }
        }
    }    
}

function loadAdd()
{
    if(localStorage.getItem('backup') != null)
    {
        document.getElementById('nwTitle').value = localStorage.getItem('backup').split(',')[0];
        document.getElementById('nwDate').value = localStorage.getItem('backup').split(',')[1];
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

function loadAdd()
{
    console.log(localStorage.getItem('backup'))
    document.getElementById('nwTitle').value = localStorage.getItem('backup').split(',')[0];
    document.getElementById('nwDate').value = localStorage.getItem('backup').split(',')[1];
}

//INSERTS SUBITEM INFO WHEN LOADING THE SUBEDIT TASK
function loadSubEdit()
{
    JSON.parse(tasksLS).forEach(element =>{
        if(element.id == idLS.split(',')[0])
        {
            element.sublist.forEach(subelement => {
                if(subelement.subId == idLS.split(',')[1])
                {
                    document.getElementById('ctTitle').value = subelement.subTitle;
                    document.getElementById('ctDate').value = subelement.subDate;
                }
            });
        }
    });
}

//ADD TASK TO THE LIST
function addTask(value)
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
    if(title.trim() === '')
    {
        alert('El titulo no puede estar vacío.');
        saveValues()
    }
    else if(datelimit == '')
    {
        alert('La fecha no puede estar vacía.');
        saveValues()
    }
    else if(title.trim() == '' && datelimit == ''){alert('La fecha y el titulo no pueden estar vacíos.');}
    else
    {
        let isDuplicate=list.some(task=>task.title===title && task.datelimit===datelimit);
        if(isDuplicate){
        if(confirm("Deseas agregar esta tarea con datos existentes?")==true){
            list.push(item);
            localStorage.setItem('tasks', JSON.stringify(list));
            localStorage.removeItem('backup');
            if(value){document.forms['form'].action = '../HTML/index.html';''}
        }else(saveValues);
    }

    else
    {
        list.push(item);
        localStorage.setItem('tasks', JSON.stringify(list));
        localStorage.removeItem('backup');
        if(value){document.forms['form'].action = '../HTML/index.html';''}
    }
    }
    
}

//SAVE VALUES TITLE DATE
function saveValues()
{
    let backup = [document.forms['form']['title'].value, document.forms['form']['datelimit'].value]
    localStorage.setItem('backup',backup)
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
            element.sublist.forEach(subelement => {
                if(element.isFinished){subelement.subFinished = true;}
                else{subelement.subFinished = false;}
            })
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
            if(element.id == idLS && 
               (element.title != document.forms['form']['newTitle'].value ||
               element.datelimit != document.forms['form']['newDate'].value))
            {
                
                element.title = document.forms['form']['newTitle'].value;
                element.datelimit = document.forms['form']['newDate'].value;
                element.isFinished = false;
                element.sublist.forEach(subelement => {
                    subelement.subFinished = false;
                });
            }
            list.push(element)
        });
        localStorage.setItem('tasks', JSON.stringify(list));
        document.forms['form'].action = '../HTML/index.html';
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
    let reloadFlag = true;
    for(i = 0; i < list.length; i++)
    {
        if(i == 0 && list[i].id == id)
        {
            newList.push(list[i]);
            reloadFlag = false;
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
    if(reloadFlag){location.reload();}
}

//MOVE A TASK DOWNWARDS ON THE LIST
function moveDown(id)
{
    let list = JSON.parse(tasksLS);
    let newList = [];
    let flag;
    let storeValue;
    let reloadFlag = true;

    for(i = 0; i < list.length; i++)
    {
        
        if(i == flag)
        {
            newList.push(list[i]);
            newList.push(storeValue);
        }
        else
        {
            if(i == list.length - 1 && list[i].id == id)
            {
                newList.push(list[i]);
                reloadFlag = false;
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
    if(reloadFlag){location.reload();}
}

//ADD A SUBTASK WITHIN A TASK
function addSubTask(value)
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
    if(subTitle == '')
    {
        alert('El titulo no puede estar vacío.');
        saveValues()
    }
    else if(subDate == '')
    {
        alert('La fecha no puede estar vacía.');
        saveValues()
    }
    else
    {
        list.forEach(element =>{
            if(element.id == idLS)
            {
                console.log('flag');
                element.sublist.push(item);
                element.isFinished = false;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(list));
        if(value){document.forms['form'].action = '../HTML/index.html';}
    }
}

//DELETE SUBTASK
function deleteSubTask(id, subId)
{
    if(confirm('Desea eliminar esta subtarea?'))
    {
        let list = JSON.parse(tasksLS);
        let newList = [];
        list.forEach(element => {
            if(element.id == id)
            {
                element.sublist.forEach(subelement =>{
                    if(subelement.subId != subId)
                    {
                        newList.push(subelement);
                    }
                });
                element.sublist = newList;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(list));
        location.reload();
    }
}

//SAVE THE NEW DATA FOR THE SUBTASK
function editSubTask()
{
    let list = [];
    if(document.forms['form']['newTitle'].value == ''){alert('El titulo no puede estar vacío.');}
    else if(document.forms['form']['newDate'].value == ''){alert('La fecha no puede estar vacía.');}
    else
    {
        JSON.parse(tasksLS).forEach(element => {
            if(element.id == idLS.split(',')[0])
            {
                element.sublist.forEach(subelement =>
                {
                    if(subelement.subId == idLS.split(',')[1] &&
                      (subelement.subTitle != document.forms['form']['newTitle'].value ||
                       subelement.subDate != document.forms['form']['newDate'].value))
                    {
                        subelement.subTitle = document.forms['form']['newTitle'].value;
                        subelement.subDate = document.forms['form']['newDate'].value;
                        subelement.subFinished = false;
                    }
                    if(!subelement.subFinished)
                    {
                        element.isFinished = false;
                    }
                });
            }
            list.push(element)
        });
        localStorage.setItem('tasks', JSON.stringify(list));
        document.forms['form'].action = '../HTML/index.html';
    }
}

//MARKS A SUBTASK AS FINISHED. IF ALL SUBTASKS ARE FINISHED, SO WILL THE MAIN TASK
function finishSubTask(id, subId)
{
    let list = JSON.parse(tasksLS);
    let trueCounter = 0;
    list.forEach(element => {
        if(element.id == id)
        {
            element.sublist.forEach(subelement =>
            {
                if(subelement.subId == subId)
                {
                    if(subelement.subFinished){subelement.subFinished = false;}
                    else{subelement.subFinished = true;}
                }
                if(subelement.subFinished){trueCounter++;}
            });
            if(trueCounter == element.sublist.length){element.isFinished = true;}
            else{element.isFinished = false;}
        }
    });
    localStorage.setItem('tasks', JSON.stringify(list));
    location.reload();
}

//MOVES A SUBTASK UP WITHIN ITS LIST
function subUp(id, subId)
{
    let list = JSON.parse(tasksLS);
    let newList = [];
    let reloadFlag = true;
    for(i = 0; i < list.length; i++)
    {
        if(list[i].id == id){

            for(j = 0; j < list[i].sublist.length; j++)
            {
                if(j == 0 && list[i].sublist[j].subId == subId)
                {
                    newList.push(list[i].sublist[j]);
                    reloadFlag = false;
                }
                else if(list[i].sublist[j].subId == subId)
                {
                    newList.splice(newList.length - 1, 0, list[i].sublist[j]);
                }
                else
                {
                    newList.push(list[i].sublist[j]);
                }
            }
            list[i].sublist = newList;
        }
    
    }
    localStorage.setItem('tasks', JSON.stringify(list));
    if(reloadFlag){location.reload();}
}

//MOVES A SUBTASK DOWN WITHIN ITS LIST
function subDown(id, subId)
{
    let list = JSON.parse(tasksLS);
    let newList = [];
    let flag;
    let storeValue;
    let reloadFlag = true;

    for(i = 0; i < list.length; i++)
    {
        if(list[i].id == id)
        {
            for(j = 0; j < list[i].sublist.length; j++)
            {
                if(j == flag)
                {
                    newList.push(list[i].sublist[j]);
                    newList.push(storeValue);
                }
                else
                {
                    if(j == list[i].sublist.length - 1 && list[i].sublist[j].subId == subId)
                    {
                        newList.push(list[i].sublist[j]);
                        reloadFlag = false;
                    }
                    else if(list[i].sublist[j].subId == subId)
                    {
                        flag = j + 1;
                        storeValue = list[i].sublist[j];
                    }
                    else
                    {
                        newList.push(list[i].sublist[j]);
                    }
                }
            }
            list[i].sublist = newList;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(list));
    if(reloadFlag){location.reload();}
}

//DOWNLOADS ALL OF THE DATA IN A JSON FILE
function exportData()
{
  const json = `data:text/json;chatset=utf-8,${encodeURIComponent(tasksLS)}`;
  const link = document.createElement("a");
  link.href = json;
  link.download = "data.json";

  link.click();
}

//

function importData()
{
    let list = [];
    let sublist = [];
    fetch('../JSON/data.json')
    .then((response) => response.json())
    .then((data) => 
    {
        data.forEach(element => 
        {
            if(element.id != null || element.title != null || element.datelimit != null)
            {
                element.sublist.forEach(subelement =>
                {
                    if(subelement.subId != null || subelement.subTitle != null || subelement.subDate != null)
                    {
                        sublist.push(subelement);
                    }
                });
                list.push(element);
            };
        });
        localStorage.setItem('tasks', JSON.stringify(list));
        location.reload();
    });
}
// ORDEN ALFABÉTICO
function sortByTitle() {
    if (tasksLS) { // Verifica si hay tareas almacenadas en localStorage
        let list = JSON.parse(tasksLS); // Convierte la cadena JSON a un objeto de JavaScript
        list.sort((a, b) => a.title.localeCompare(b.title)); // Ordena las tareas por título
        localStorage.setItem('tasks', JSON.stringify(list)); // Guarda la lista ordenada en localStorage
        location.reload(); // Recarga la página para mostrar las tareas ordenadas
    }
}
// ORDEN POR FECHA
function sortByDate() {
    if (tasksLS) { // Verifica si hay tareas en localStorage
        let list = JSON.parse(tasksLS); // Convierte las tareas guardadas a objetos JavaScript
        list.sort((a, b) => new Date(a.datelimit) - new Date(b.datelimit)); // Ordena las tareas por fecha
        localStorage.setItem('tasks', JSON.stringify(list)); // Guarda la lista ordenada
        location.reload(); // Recarga la página para mostrar las tareas ordenadas
    }
}