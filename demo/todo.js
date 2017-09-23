class Todo {

  constructor () {
    this.list = [
      '買い物に行く',
      '仕事をする'
    ];
    this.rendarView();
  }

  rendarTasks () {
    this.el.tasks.innerHTML = ['<li>', this.list.join('</li><li>'),'</li>'].join('');
  }

  submit () {
    const task = this.el.newTask.value;
    if (task.length) {
      this.list.push(task);
      this.rendarTasks();
      this.el.newTask.value = '';
    }
    event.preventDefault();
  }

  rendarView () {
    document.querySelector('todo').innerHTML = `
      <form onSubmit="todo.submit()" method="post">
        <input class="newTask"/><input type="submit"/>
        <ul class="tasks">
        </ul>
      </form>
    `;
    this.el = {
      newTask: document.querySelector('.newTask'),
      tasks:  document.querySelector('.tasks')
    };
    this.rendarTasks();
  }

}
window.todo = new Todo();
  