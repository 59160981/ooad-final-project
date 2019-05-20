function checkValue() {
    var x = document.getElementById("alertSubject").innerHTML;
    if (x != "") {
        document.getElementById("alertSubject").innerHTML = "";
    }
    var sub_id = document.getElementsByName("subject_id")[0].value;
    var sub_THName = document.getElementsByName("subject_ThName")[0].value;
    var sub_ENGName = document.getElementsByName("subject_EngName")[0].value;
    var sub_credit = document.getElementsByName("subject_credit")[0].value;
    var correct = 0;

    // checkNull
    if (sub_id == "") {
        document.getElementById("txtsub_id").innerHTML = "* กรุณากรอกข้อมูล";
    } else if (sub_id.length != 8) {
        document.getElementById("txtsub_id").innerHTML = "* รหัสวิชา ต้องเป็นตัวเลขเท่านั้นและมีความยาว 8 ตัวอักษร";
    } else if (sub_id != parseInt(sub_id)) {
        document.getElementById("txtsub_id").innerHTML = "* รหัสวิชา ต้องเป็นตัวเลขเท่านั้น";
    } else {
        document.getElementById("txtsub_id").innerHTML = "";
        correct++;
    }
    if (sub_THName == "") {
        document.getElementById("txtsub_THName").innerHTML = "* กรุณากรอกข้อมูล";
    } else {
        document.getElementById("txtsub_THName").innerHTML = "";
        correct++;
    }
    if (sub_ENGName == "") {
        document.getElementById("txtsub_ENGName").innerHTML = "* กรุณากรอกข้อมูล ";
    } else {
        document.getElementById("txtsub_ENGName").innerHTML = "";
        correct++;
    }
    if (sub_credit == "") {
        document.getElementById("txtsub_credit").innerHTML = "* กรุณากรอกข้อมูล";
    } else if (sub_credit != parseInt(sub_credit)) {
        document.getElementById("txtsub_credit").innerHTML = "* หน่วยกิต ต้องเป็นตัวเลขเท่านั้น";
    } else {
        document.getElementById("txtsub_credit").innerHTML = "";
        correct++;
    }

    if (correct == 4) {
        document.getElementById("editSubject").submit();
    }
}