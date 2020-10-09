
var data=(localStorage.getItem('todoList'))?JSON.parse(localStorage.getItem('todoList')):{
    todo:[],
    completed:[],
};

var removeSvg='<i class="fa-2x fa fa-trash-o" ></i>';
var completeSvg='<i class="fa-2x fa fa-check-circle-o" ></i>';

store();
document.getElementById('add').addEventListener('click',function(){
    var value=document.getElementById('item').value;
    if(value){
       addNew(value);  
    }
    
});

document.getElementById('item').addEventListener('keydown',function(e){
    var value=this.value;
if(e.keyCode ===13 && value){  
   addNew(value);
}   
})


function addNew(value){
    
     data.todo.push(value);
    addtodo(value);
       document.getElementById('item').value=''; 
        dataObj(); 
    
}








function store(){
    if(!data.todo.length && !data.completed.length){
        return;
    }
    for(var i=0;i<data.todo.length;i++){
        var value=data.todo[i];
        addtodo(value);
        
    }
    for(var j=0;j<data.completed.length;j++){
        
       var value=data.completed[j]; 
        addtodo(value,true);
    }
    
    
}


function dataObj(){
 localStorage.setItem('todoList',JSON.stringify(data));  
    
}

function removeItem(){
    var item=this.parentNode.parentNode;
    
    var parent=item.parentNode;
    var Id=parent.id;
    var value=item.innerText;
    
      if(Id==='todo'){
    
    data.todo.splice(data.todo.indexOf(value),1);
    }else{
        data.completed.splice(data.completed.indexOf(value),1);
    }
    dataObj();
    parent.removeChild(item);
}



function completeItem(){
  var item=this.parentNode.parentNode;
    var parent=item.parentNode;
    var Id=parent.id;
  var value=item.innerText;
    if(Id==='todo'){
    
    data.todo.splice(data.todo.indexOf(value),1);
    data.completed.push(value);
   
    }else{
        data.completed.splice(data.completed.indexOf(value),1);
    data.todo.push(value);
   
    }
    
    if(Id==='todo'){
      var target=document.getElementById('completed');
    }else{
      target=document.getElementById('todo');   
    }
    dataObj(); 
   parent.removeChild(item);
target.insertBefore(item,target.childNodes[0]);
   
}





function addtodo(text,completed){
    var list=(completed)?document.getElementById('completed'):document.getElementById('todo');
    
   var item=document.createElement('li') ;
    item.innerText=text;
    var buttons=document.createElement('div');
    buttons.classList.add('buttons');
    var remove=document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML=removeSvg;
    var complete=document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML=completeSvg;
    
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    list.insertBefore(item,list.childNodes[0]);
    
    
    remove.addEventListener("click" ,removeItem);
 complete.addEventListener("click" ,completeItem);
    
}














