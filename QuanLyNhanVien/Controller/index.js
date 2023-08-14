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

    //validation
    var valid = handleValidate(nv);

    if (!valid) {
        return;
    }

    if (isExist(nv.username)) {
        //bat ra modal
        alert("Username đã tồn tại");
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
                <td>${arrItem.duty}</td>
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

//cap nhat
document.querySelector('#btnCapNhat').onclick = function () {
    var upUsername = getElement('#tknv').value;
    if (!isExist(upUsername)) {
        alert("Username không tồn tại");
        return;
    }
    var indexUpdate = 0;
    for (var i = 0; i < employeeArray.length; i++) {
        if (employeeArray[i].username == upUsername) {
            indexUpdate = i;
            break;
        }
    }
    var temp = new NhanVien();
    passData(temp, employeeArray[indexUpdate]);

    getFormData(temp);
    console.log("temp", temp);
    console.log(employeeArray[indexUpdate])
    var valid = handleValidate(temp);
    if (!valid) {
        return;
    }
    getFormData(temp)
    passData(employeeArray[indexUpdate], temp);
    renderTable(employeeArray);
    saveToLocal(employeeArray);
}

/**
 * Hàm validation đối tượng
 * @param {*} obj nhận vào 1 đối tượng nhân viên
 * @returns true hoặc false
 */
function handleValidate(obj) {
    var validation = new Validation();

    //username
    var valid = validation.isntNull('Username', obj.username)
        & validation.validLength('Username', obj.username)

    //fullname
    valid &= validation.isntNull('Họ và Tên', obj.fullName)
        & validation.isLetter('Họ và Tên', obj.fullName)

    //email
    valid &= validation.isntNull("Email", obj.email)
        & validation.validEmail('Email', obj.email)

    //password
    valid &= validation.isntNull("Password", obj.password)
        & validation.validPassword("Password", obj.password)

    //date
    valid &= validation.isntNull("date", obj.dateStart)

    //salary
    valid &= validation.isntNull("Salary", obj.standardSalary)
        & validation.validSalary("Salary", obj.standardSalary)

    //duty
    valid &= validation.validDuty("Chức vụ", obj.duty)

    //workingHours
    valid &= validation.isntNull("Giờ làm", obj.workingHours)
        & validation.validWorkingTime("Giờ làm", obj.workingHours)

    return valid;
}

function getFormData(obj) {
    obj.username = getElement('#tknv').value;
    obj.fullName = getElement('#name').value;
    obj.email = getElement('#email').value;
    obj.password = getElement('#password').value;
    obj.dateStart = getElement('#datepicker').value;
    obj.standardSalary = getElement('#luongCB').value * 1;
    obj.duty = getElement('#chucvu').value;
    obj.workingHours = getElement('#gioLam').value * 1;
    obj.ranking();
    obj.getGeneralSalary();
}

/**
 * @param {*} objA đối tượng nhận dữ liệu
 * @param {*} objB đối tượng được tham chiếu
 */
function passData(objA, objB) {
    objA.username = objB.username;
    objA.fullName = objB.fullName;
    objA.password = objB.password;
    objA.email = objB.email;
    objA.dateStart = objB.dateStart;
    objA.standardSalary = objB.standardSalary;
    objA.workingHours = objB.workingHours;
    objA.duty = objB.duty;
    objA.generalSalary = objB.generalSalary;
    objA.employeeType = objB.employeeType;
    objA.loaiNV = objB.loaiNV;
}

function isExist(username) {
    return result = employeeArray.some(function (item, index) {
        return item.username == username;
    })
}

//Search
document.querySelector('#searchName').oninput = function () {
    var finding = document.querySelector('#searchName').value;
    finding = stringToSlug(finding);
    var newArr = [];
    for (var i = 0; i < employeeArray.length; i++) {
        var item = stringToSlug(employeeArray[i].loaiNV);
        if (item.search(finding) != -1) {
            newArr.push(employeeArray[i]);
        }
    }
    renderTable(newArr);
}