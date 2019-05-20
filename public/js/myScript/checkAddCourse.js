function checkValue() {
    var data = document.getElementsByName('subject_idAdd')[0].value;
    if (data == "") {
        document.getElementById('alertAddCourse').innerHTML = "* กรอกข้อมูล";
    } else {
        document.getElementById('AddCourse').submit();
    }
}