let inputs = [input, input1, input2];

function focusInput(inputId, inputId1 = null, inputId2 = null, buferImp = null) {      

  while (true) {
    if (!isFinite(inputId[0].value)) {
      inputId[0].value = inputId[0].value.slice(0, inputId[0].value.length - 1).trim();
    }else{
      break;
    }    
  }

  if (inputId[0].value.length >= 3 && inputId[0] != input2) { 
    let value  = inputId[0].value.trim();
    let result = value.slice(0, 3);
    let bufer  = value.slice(3);
    inputId[0].value = result;
    if (inputId1 != null) {
      inputId1[0].focus();
      inputId1[0].value = bufer.slice(0, 3);
      bufer             = bufer.slice(3);
      if (buferImp != null) {
        inputId1[0].value = buferImp.slice(0, 3);
      }
      if (inputId2 != null) {
        focusInput(inputId1, inputId2, null, bufer);
      }      
    }    
  }else if (inputId[0] == input2 && inputId[0].value.length >= 4) {
    let value  = inputId[0].value.trim();
    let result = value.slice(0, 4);
    inputId[0].value = result;
    endForm()
  } else {
    needStr(inputId);
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

input.oninput  = function(){ focusInput([input, 0],  [input1, 1], [input2, 2]); };
input1.oninput = function(){ focusInput([input1, 1], [input2, 2]); };
input2.oninput = function(){ focusInput([input2, 2]); }; 
