// forms filling check
input.oninput   = function(){ handler(); };
input1.oninput  = function(){ handler1(); };
input2.oninput  = function(){ handler2(); };

// blank check
input1.onkeydown = function(){
  if (input1.value.length == 0) {
    input.focus();
  }
}

// blank check
input2.onkeydown = function(){
  if (input2.value.length == 0) {
    input1.focus();
  }
}

// checking for filling out the form and,
// when the condition is met, refocusing to the next input
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

    if(bufer.slice(3)){
      input2.value = bufer.slice(3, 7);
      input2.focus();
    }

  }else{
    needStr();// request for missing numbers
  }
};

// checking for filling out the form and,
// when the condition is met, refocusing to the next input
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
    needStr1(); // request for missing numbers
  }

};

// checking for filling out the form and,
// when the condition is met, refocusing to the next input
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

// request for missing numbers for the first form in the following form
function needStr() {
  let needLength    = 3 - input.value.length;
  input.value += input1.value.slice(0, needLength);
  input1.value  = input1.value.slice(needLength);
  needStr1()
}

// a request for getting missing numbers for the second form in the following form
function needStr1() {
  let needLength    = 3 - input1.value.length;
  input1.value += input2.value.slice(0, needLength);
  input2.value  = input2.value.slice(needLength);
}

// download and output a thank you text file
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
