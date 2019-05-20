
function checkValue() {
    var password = document.getElementsByName("password")[0].value;
    var firstName = document.getElementsByName("firstName")[0].value;
    var lastName = document.getElementsByName("lastName")[0].value;
    var type = document.getElementsByName("type")[0].value;
    var correct = 0;

    // checkNull
    if (password == "") {
        document.getElementById("txtPassword").innerHTML = "* กรุณากรอกข้อมูล";
    }else if(password.length < 8){
        document.getElementById("txtPassword").innerHTML = "* password ต้องมากกว่า 8 ตัวอักษร";
    }else{
        document.getElementById("txtPassword").innerHTML = "";
        correct++;
    }
    if (firstName == "") {
        document.getElementById("txtFirstName").innerHTML = "* กรุณากรอกข้อมูล ";
    }else{
        document.getElementById("txtFirstName").innerHTML = "";
        correct++;
    }
    if (lastName == "") {
        document.getElementById("txtLastName").innerHTML = "* กรุณากรอกข้อมูล";
    }else{
        document.getElementById("txtLastName").innerHTML = "";
        correct++;
    }
    if (type == "") {
        document.getElementById("txtType").innerHTML = "* กรุณาเลือกข้อมูล";
    }else{
        document.getElementById("txtType").innerHTML = "";
        correct++;
    }
    if(correct==4){
        document.getElementById("editUser").submit();    
    }
}
