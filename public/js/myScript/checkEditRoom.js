function checkRoomID() {
    var dup = 0;
    var size = document.getElementsByName("roomID").length;
    var arr = [];
    for (var i = 0; i < size; i++) {
        document.getElementsByName("roomID")[i].style.borderColor = "#DFDFDF";
        var roomID = document.getElementsByName("roomID")[i].value;
        arr.push(roomID);
    }

    for (var i = 0; i < size; i++) {
        for (var j = i + 1; j < size; j++) {
            if (arr[i] == arr[j] && arr[i] != "" && arr[j] != "") {
                dup++;
                document.getElementsByName("roomID")[i].style.borderColor = "red";
                document.getElementsByName("roomID")[j].style.borderColor = "red";
            }
        }
    }

    if (dup == 0) {
        return true;
    }
    
}

function checkValue(){
    var size = document.getElementsByName("roomID").length;
    var correct = 0;


    var arr = [];
    for (var i = 0; i < size; i++) {
        document.getElementsByName("roomID")[i].style.borderColor = "#DFDFDF";
        var roomID = document.getElementsByName("roomID")[i].value;
        arr.push(roomID);
        var type = document.getElementsByName("type")[i].value;
        var maxStudent = document.getElementsByName("maxStudent")[i].value;
        if (roomID == "") {
            document.getElementsByName("txtroomID")[i].innerHTML = "*";
        } else {
            document.getElementsByName("txtroomID")[i].innerHTML = "";
            correct++;
        }
        if (type == "") {
            document.getElementsByName("txtType")[i].innerHTML = "*";
        } else {
            document.getElementsByName("txtType")[i].innerHTML = "";
            correct++;
        }
        if (maxStudent == "") {
            document.getElementsByName("txtMaxStudent")[i].innerHTML = "*";
        } else {
            document.getElementsByName("txtMaxStudent")[i].innerHTML = "";
            correct++;
        }
    }


    var pass = size * 3;
    if(correct == pass && checkRoomID()){
        document.getElementById("editRoom").submit(); 
    }
    
}