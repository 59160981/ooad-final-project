function checkValue(){
    var buildID = document.getElementsByName("buildID")[0].value;
    var name = document.getElementsByName("name")[0].value;
    var correct = 0;

    if(buildID == ""){
        document.getElementById("txtBuildID").innerHTML = "* กรุณากรอกข้อมูล";
        document.getElementById("txtAlertBuildID").innerHTML = "";
    }else{
        document.getElementById("txtBuildID").innerHTML = "";
        correct++;
    }

    if(name == "") {
        document.getElementById("txtBuildName").innerHTML = "* กรุณากรอกข้อมูล";
        document.getElementById("txtAlertBuildID").innerHTML = "";
    } else {
        document.getElementById("txtBuildName").innerHTML = "";
        correct++;
    }

    if(correct == 2){
        document.getElementById("addBuild").submit(); 
    }
    
}