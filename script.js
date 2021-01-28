class TodoList {
  constructor(settings) {
    if (!settings.list) {
      throw new Error('Don\'t have list!');
    }

    if (!settings.btnAdd) {
      throw new Error('Don\'t have button add!');
    }

    if (!settings.btnRemoveAll) {
      throw new Error('Don\'t have button remove all!');
    }

    this.list = ge(settings.list);
    this.btnAdd = ge(settings.btnAdd);
    this.btnRemoveAll = ge(settings.btnRemoveAll);    
    this.input = ge('#title');
    
    this.itemList = [];
    this.init();
  }

  createItem(){
    const title = this.input.value;

    if(title != ''){
      const newItem ={
        todo: title,
      }    
  
      this.itemList.push(newItem);
      this.render();
    }

    this.input.value = '';
    this.input.focus();
  }

  removeItem(event){
    event.target.parentElement.remove();
    this.input.focus();
  }

  removeAll(){
    const myNode = this.list;

    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }

    this.itemList = [];
    this.input.focus();
  }

  render(){
    if(this.itemList.length != 0){
      this.itemList.forEach((item,i) => {
        this.itemTitle = ce('div', {class: 'todo__item-title'},item.todo);
        this.itemClose = ce('button', {title: "123", class: 'btn-close', "data-id":"123"},'X');
        this.itemTodo = ce('div', {class: 'todo__item'},[
          this.itemTitle,
          this.itemClose
        ]);
  
        item.id = i;
        
      })
        
      this.itemClose.addEventListener('click',(event) => this.removeItem(event));
      console.log(this.itemList)
      if(this.itemTodo) this.list.append(this.itemTodo)  
      
    }   
    
  }     
  

  init(){
    this.input.focus();
    this.render();

    

    this.btnAdd.addEventListener('click',() => this.createItem());
    this.btnRemoveAll.addEventListener('click',() => this.removeAll());

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
  btnRemoveAll: '.btn-remove-all'
});