function checkValue(){
    var size = document.getElementsByName("roomID").length;
    var correct = 0;

    for(var i = 0 ; i < size ; i++){
        var roomID = document.getElementsByName("roomID")[i].value;
        var type = document.getElementsByName("type")[i].value;
        var maxStudent = document.getElementsByName("maxStudent")[i].value;
        if(roomID == ""){
            document.getElementsByName("txtroomID")[i].innerHTML = "*";
        }else{
            document.getElementsByName("txtroomID")[i].innerHTML = "";
            correct++;
        }
        if(type == ""){
            document.getElementsByName("txtType")[i].innerHTML = "*";
        }else{
            document.getElementsByName("txtType")[i].innerHTML = "";
            correct++;
        }
        if(maxStudent == ""){
            document.getElementsByName("txtMaxStudent")[i].innerHTML = "*";
        }else{
            document.getElementsByName("txtMaxStudent")[i].innerHTML = "";
            correct++;
        }
    }
    var pass = (size*3);
    // alert("pass : "+pass+" correct : "+correct)
    
    if(correct == pass){
        // alert("pass")
        document.getElementById("editRoom").submit(); 
    }
    
}