/**************************/
/* CREATED ON: 30/09/2024 */
/**************************/
/* AUTHORS:               */
/*    Victor Falcon       */
/*    Aaron Fuentes       */
/*    Xavier B.           */
/*    Xavier Ramirez      */
/**************************/


//HTML REFERENCES
const tasksHTML = document.getElementById('tasks');

//LOCAL STORAGE REFERENCES
const tasksLS = localStorage.getItem('tasks');

//FOR HARD LOCAL STORAGE WIPE
//localStorage.clear(); 

//REDIRECTS
function addTaskRedirect(){location.href = '../HTML/insertTask.html';}
function taskListRedirect(){location.href = '../HTML/index.html';}


//GENERATE LIST ON MAIN PAGE
try
{        
    if(tasksLS == null)
    {
        tasksHTML.innerHTML = `<p>No hay tareas añadidas en el listado. Empieza a añadir unas cuantas</p><button onclick="addTaskRedirect()">Añadir Tarea</button>`;
    }
    else
    {
        let list = tasksLS.split(',');
        for(i = 0; i < list.length; i++)
        {
            tasksHTML.innerHTML += `<div id='task'>${list[i]}</div>`;
        }
    }
}
catch
{
    console.log('Outside of List Site');
}

//ADD TASK TO THE LIST
function addTask()
{
    let list = [];
    if(tasksLS != null){list = tasksLS.split(',');}
    let title = document.forms['form']['title'].value;
    let desc = document.forms['form']['desc'].value;
    list.push([title, desc]);
    localStorage.setItem('tasks', list);
    location.href = '../HTML/index.html';
}