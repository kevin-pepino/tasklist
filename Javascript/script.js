/**************************/
/* CREATED ON: 30/09/2024 */
/**************************/
/* AUTHORS:               */
/*    Victor F.           */
/*    Aaron F.            */
/*    Xavier B.           */
/*    Xavier R.           */
/**************************/


//HTML REFERENCES
const tasksHTML = document.getElementById('tasks');

//LOCAL STORAGE REFERENCES
const tasksLS = localStorage.getItem('tasks');

//localStorage.setItem('tasks', ['one', 'two', 'three']); 

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
        let ray = tasksLS.split(',');
        for(i = 0; i < ray.length; i++)
        {
            tasksHTML.innerHTML += `<div id='task'>${ray[i]}</div>`;
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
    location.href = '../HTML/index.html';
}