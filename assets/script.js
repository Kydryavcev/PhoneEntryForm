let inputs = [input, input1, input2];

input.oninput   = function(){ handler(event.key); };
input1.oninput  = function(){ handler1(); };
input2.oninput  = function(){ handler2(); };
input1.onkeydown = function(){
  if (input1.value.length == 0) {
    input.focus();
  }
}
input2.onkeydown = function(){
  if (input2.value.length == 0) {
    input1.focus();
  }
}



function handler() {
  while (true) {
    if (!isFinite(input.value)) {
      input.value = input.value.slice(0, input.value.length - 1).trim();
    }else{
      break;
    }    
  }

  if (input.value.length >= 3) { 
    let value  = input.value.trim();
    let result = value.slice(0, 3);
    let bufer  = value.slice(3);
    input.value = result;
    input1.focus();
    input1.value = bufer.slice(0, 3);
    input2.value = bufer.slice(3, 7);
  }else{
    needStr([input, 0]);
  }
};

function handler1() {

  while (true) {
    if (!isFinite(input1.value)) {
      input1.value = input1.value.slice(0, input1.value.length - 1).trim();
    }else{
      break;
    }    
  }

  if (input1.value.length >= 3) { 
    let value  = input1.value.trim();
    let result = value.slice(0, 3);
    let bufer  = value.slice(3);
    input1.value = result;
    input2.focus();
    input2.value = bufer.slice(0, 3);
  }else{
    needStr([input1, 1]);
  }
};

function handler2() {

  while (true) {
    if (!isFinite(input2.value)) {
      input2.value = input2.value.slice(0, input2.value.length - 1).trim();
    }else{
      break;
    }    
  }

  if (input2.value.length >= 4) { 
    let value  = input2.value.trim();
    let result = value.slice(0, 4);
    input2.value = result;
    endForm();
  }
};

function needStr(inputId) {
  if (inputs[inputId[1] + 1]) {
    if (inputs[inputId[1] + 1].value) {
      let needLength    = 3 - inputId[0].value.length;
      inputId[0].value += inputs[inputId[1] + 1].value.slice(0, needLength);
      inputs[inputId[1] + 1].value  = inputs[inputId[1] + 1].value.slice(needLength);  
      if(inputs[inputId[1] + 2]){
        if (inputs[inputId[1] + 2].value) {
          inputs[inputId[1] + 1].value += inputs[inputId[1] + 2].value.slice(0, needLength);
          inputs[inputId[1] + 2].value  = inputs[inputId[1] + 2].value.slice(needLength); 
        }
      }  
    }    
  }  
}

function endForm() {
  inputBlock.style.display = "none";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "assets/text.txt", false);
  try {
    xhr.send();
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
        let div = document.createElement('div');
        div.innerHTML = xhr.response;
        document.body.append(div);
    }
  } catch(err) { 
    alert("Запрос не удался");
  }
}