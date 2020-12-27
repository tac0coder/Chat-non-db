var text=document.getElementById('chat_input')



var send=document.getElementById('send')
var chat = document.getElementById('chat')
var msgs = 1
let name=prompt("Username?")
/*text.oninput = function(){
  if(text.value.length >529){
    text.style['padding-bottom']=(parseInt(text.style['padding-bottom'][0]+text.style['padding-bottom'][1])+20).toString()+'px'
    send.style['padding-bottom']=(parseInt(text.style['padding-bottom'][0]+text.style['padding-bottom'][1])+20).toString()+'px'
    text.style['height']=(parseInt(text.style['padding-bottom'][0]+text.style['padding-bottom'][1])).toString()+'px'
    send.style['hieght']=(parseInt(text.style['padding-bottom'][0]+text.style['padding-bottom'][1])).toString()+'px'

  }
}*/
function postDoc(data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("POST", "ajax_info.txt", true);
  xhttp.send(data);
}
var ampm = function(){
  var date= new Date()
var hours = date.getHours();
var hours = (hours+24)%24;
var mid='am';
if(hours==0){ //At 00 hours we need to show 12 am
hours=12;
}
else if(hours>12)
{
hours=hours%12;
mid='pm';
}return [hours.toString(),mid]}
send.onclick = function(){
  var date = new Date

  /*add to json*/postDoc({'id':`msg${msgs}`,"msg":text.value+'\xa0'.repeat(20),"time":ampm()[0].toString()+':'+(date.getMinutes()<10?'0'+date.getMinutes().toString():date.getMinutes().toString())+ampm()[1].toString(),"name":'\xa0'.repeat(5)+name})
  
  text.value=''
  msgs+=1
}
reload = function(){
  chat.innerHTML=''
  fetch("chat.json").then(response => response.json()).then(function (result) {
  for(i in result){
    chat.innerHTML+= '<p>'+i['msg']+i['time']+['name']+"</p></br>"
  }

})
}
setInterval(reload,300)
