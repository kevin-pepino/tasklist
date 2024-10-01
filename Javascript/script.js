/**************************/
/* CREATED ON: 30/09/2024 */
/**************************/
/* AUTHORS:               */
/*    Victor Falcon       */
/*    Aaron Fuentes       */
/*    Xavier B.           */
/*    Xavier Ramirez      */
/**************************/


/*const ite = {
    title: 'kek', 
    desc: 'kekeroni', 
    timestamp: Date.now(), 
    isFinished: true
};
console.log(ite);*/

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

//console.log(tasksLS);

//REDIRECTS
function addTaskRedirect(){location.href = '../HTML/insertTask.html';}
function taskListRedirect(){location.href = '../HTML/index.html';}


//GENERATE LIST ON MAIN PAGE
//try
//{        
    if(tasksLS == null)
    {
        tasksHTML.innerHTML = `<p>No hay tareas añadidas en el listado. Empieza a añadir unas cuantas</p><button onclick="addTaskRedirect()">Añadir Tarea</button>`;
    }
    else
    {
        let list = JSON.parse(tasksLS);
        console.log(list);
        for(i = 0; i < list.length; i++)
        {
            tasksHTML.innerHTML += `
            <div id='task'>
                <tr>${list[i].title}</tr>
                <tr>${list[i].desc}</tr>
                <tr>${list[i].timestamp}</tr>
                <tr>${list[i].isFinished}</tr>
            </div>
            `;
        }
    }
//}
/*catch
{
    console.log('Outside of List Site');
}*/

//ADD TASK TO THE LIST
function addTask()
{
    let list = [];
    if(tasksLS != null){list = JSON.parse(tasksLS);}
    let title = document.forms['form']['title'].value;
    let desc = document.forms['form']['desc'].value;
    let timestamp = Date.now();
    let isFinished = false;
    const item = {
        title: title, 
        desc: desc, 
        timestamp: timestamp, 
        isFinished: isFinished
    };
    console.log('item');
    list.push(item);
    localStorage.setItem('tasks', JSON.stringify(list));
    location.href = '../HTML/index.html';
}

/*function editTask()
{
    let list = tasksLS.split(',');
    for(i = 0; i < list.length; i++)
    {
        
    }
}*/