class TodoList {
  constructor(settings) {

    this.errors(settings.list);
    this.errors(settings.btnAdd);
    this.errors(settings.btnRemoveAll);
    this.errors(settings.list);

    this.list = ge(settings.list);
    this.btnAdd = ge(settings.btnAdd);
    this.btnRemoveAll = ge(settings.btnRemoveAll);    
    this.input = ge('#title');
    
    this.todoList = [];

    this.init();
   
  }

  events(){
    this.btnAdd.addEventListener('click',() => this.createItem());
    this.btnRemoveAll.addEventListener('click',() => this.removeAll());
  }

  createItem(){

    const newItem = {
      todo: this.input.value
    }

    this.input.value = '';
    this.input.focus();
    this.todoList.push(newItem);
    this.render();
    this.removeItem();
  }

  removeItem(){
    this.newItemClose.addEventListener('click', () => {
      this.newItem.remove();
    })
  }

  removeAll(){
    this.todoList.length = 0;

    console.log(this.todoList)
  }

  render(){
    this.todoList.forEach( (item,index) => {
      this.newItemTitle = ce('div',{class:'todo__item-title'},item.todo);
      this.newItemClose = ce('button',{class:'btn-close'},'X');
      this.newItem = ce('div',{class:'todo__item'},[this.newItemTitle,this.newItemClose]);
      item.id = index;
    })
    this.list.append(this.newItem)
    
  }

  errors(element){    
    if (!element) {
      throw new Error(`Element class not passed!`);
    }
  }

  init(){
    if(this.todoList.length != 0) this.render();
    this.events();
  }
}
// function Get Elements

function ge(selector) {
  return document.querySelector(selector);
}

// function Create Elements

function ce(tag, attrs = {}, content = []) {
  const element = document.createElement(tag);

  for (const attr in attrs) {
    const value = attrs[attr];
    element.setAttribute(attr, value);
  }

  if (!Array.isArray(content)) {
    content = [content];
  }

  content.forEach(child => element.append(child));

  return element;
}


const todo = new TodoList({
  list: '.todo__out',
  btnAdd: '.btn-add',
  btnRemoveAll: '.btn-remove-all',
  input: '#title',
});