var employeeArray = [];

function getElement(element) {
    return document.querySelector(element);
}

window.onload = function () {
    if (!localStorage.getItem("arrayNV")) {
        return;
    }
    renderFromLocal();
    console.log(employeeArray)
};

document.querySelector('#btnThemNV').onclick = function () {
    var nv = new NhanVien();
    getFormData(nv);
    // nv.getGeneralSalary();
    // nv.ranking();

    //validate
    var valid = handleValidate(nv);

    if (!valid) {
        return;
    }

    if (isExist(nv.username)) {
        alert("Người dùng đã tồn tại");
        return;
    }

    console.log(nv);
    employeeArray.push(nv);
    renderTable(employeeArray);
    saveToLocal(employeeArray);
}

/**
 * @param {*} arr  - hàm có 1 tham số là 1 mảng array
 * @returns - 1 chuỗi chứa các phần tử trong bảng
 */
function renderTable(arr) {
    var result = arr.map(function (arrItem, index) {
        return `
            <tr>
                <td>${arrItem.username}</td>
                <td>${arrItem.fullName}</td>
                <td>${arrItem.email}</td>
                <td>${arrItem.dateStart}</td>
                <td>${arrItem.position}</td>
                <td>${arrItem.generalSalary}</td>
                <td>${arrItem.employeeType}</td>
                <td>
                    <button onclick="deleteItem(${index})" class="btn btn-danger d-inline"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `
    })
    return getElement('#tableDanhSach').innerHTML = result.join(' ');
}

function saveToLocal(array) {
    localStorage.setItem("arrayNV", JSON.stringify(array));
}

function renderFromLocal() {
    employeeArray = JSON.parse(localStorage.getItem("arrayNV"));
    renderTable(employeeArray);
}

function deleteItem(id) {
    console.log(id)
    employeeArray.splice(id, 1);
    renderTable(employeeArray);
    saveToLocal(employeeArray);
}

//Cập nhật
document.querySelector('#btnCapNhat').onclick = function () {
    var upUsername = getElement('#tknv').value;
    if (!isExist(upUsername)) {
        alert("Người dùng không tồn tại");
        return;
    }
    var indexUpdate = 0;
    for (var i = 0; i < employeeArray.length; i++) {
        if (employeeArray[i].username == upUsername) {
            indexUpdate = i;
            break;
        }
    }

    /**
     * Hàm validation đối tượng
     * @param {*} obj nhận vào 1 đối tượng nhân viên
     * @returns true hoặc false
     */
    function handleValidate(obj) {
        var validation = new Validation();

        //username
        var valid = validation.isntNull('username', obj.username)
            & validation.validLength('username', obj.username)

        //fullname
        valid &= validation.isntNull('fullName', obj.fullName)
            & validation.isLetter('fullName', obj.fullName)

        //email
        valid &= validation.isntNull("email", obj.email)
            & validation.validEmail('email', obj.email)

        //password
        valid &= validation.isntNull("password", obj.password)
            & validation.validPassword("password", obj.password)

        //date
        valid &= validation.isntNull("date", obj.dateStart)

        //salary
        valid &= validation.isntNull("sdSalary", obj.standardSalary)
            & validation.validSalary("sdSalary", obj.standardSalary)

        //position
        valid &= validation.validPosition("chucvu", obj.position)

        //workingHours
        valid &= validation.isntNull("gioLam", obj.workingHours)
            & validation.validWorkingTime("gioLam", obj.workingHours)

        return valid;
    }

    function getFormData(obj) {
        obj.username = getElement('#tknv').value;
        obj.fullName = getElement('#name').value;
        obj.email = getElement('#email').value;
        obj.password = getElement('#password').value;
        obj.dateStart = getElement('#datepicker').value;
        obj.standardSalary = getElement('#luongCB').value * 1;
        obj.position = getElement('#chucvu').value;
        obj.workingHours = getElement('#gioLam').value * 1;
        obj.ranking();
        obj.getGeneralSalary();
    }

    /**
     * @param {*} objA đối tượng nhận dữ liệu
     * @param {*} objB đối tượng tham chiếu
     */
    function passData(objA, objB) {
        objA.username = objB.username;
        objA.fullName = objB.fullName;
        objA.password = objB.password;
        objA.email = objB.email;
        objA.dateStart = objB.dateStart;
        objA.standardSalary = objB.standardSalary;
        objA.workingHours = objB.workingHours;
        objA.position = objB.position;
        objA.generalSalary = objB.generalSalary;
        objA.employeeType = objB.employeeType;
        objA.loaiNV = objB.loaiNV;
    }

    function isExist(username) {
        return result = employeeArray.some(function (item, index) {
            return item.username == username;
        })
    }
}