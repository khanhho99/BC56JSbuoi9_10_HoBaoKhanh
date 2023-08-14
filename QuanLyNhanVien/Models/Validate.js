function Validation() {
    this.isntNull = function (name, value) {
        var announceNull = document.querySelector(`span[data-error-null="${name}"]`);

        if (!value) {
            announceNull.innerHTML = `${name} không được bỏ trống`;
            return false;
        }
        announceNull.innerHTML = ``;
        return true;
    },
        this.validLength = function (name, value) {
            var announce = document.querySelector(`span[data-error-length= "${name}"]`)
            if (value.length > 6 || value.length == 0) {
                announce.innerHTML = `${name} tối đa 4 - 6 kys số`;
                return false;
            }
            document.querySelector(`span[data-error-length= "${name}"]`).innerHTML = ``;
            return true;
        },
        this.isLetter = function (name, value) {
            var regex = /^[A-Z a-z]+$/;
            var announce = document.querySelector(`span[data-error-letter= "${name}"]`);
            if (regex.test(value)) {
                announce.innerHTML = '';
                return true;
            }
            announce.innerHTML = `${name} phải là kí tự`
            return false;
        },
        this.validEmail = function (name, value) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(value)) {
                document.querySelector(`span[data-error-email="${name}"]`).innerHTML = ``;
                return true;
            }
            document.querySelector(`span[data-error-email="${name}"]`).innerHTML = `${name} không hợp lệ`;
            return false;
        },
        this.validPassword = function (name, value) {
            if (value.length < 6 || value.length > 10) {
                document.querySelector(`span[data-error-password="${name}"]`).innerHTML = `${name} phải có độ dài từ 6-10 ký tự`
                return false;
            }
            var regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8}$/
            if (regex.test(value)) {
                document.querySelector(`span[data-error-password="${name}"]`).innerHTML = ``;
                return true;
            }
            document.querySelector(`span[data-error-password="${name}"]`).innerHTML = `${name} chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt`;
            return false;
        },
        this.validSalary = function (name, value) {
            if (Number(value) < 1000000 || Number(value) > 20000000) {
                document.querySelector(`span[data-error-salary="${name}"]`).innerHTML = `${name} từ 1.000.000 - 20.000.000 VND`;
                return false;
            }
            document.querySelector(`span[data-error-salary="${name}"]`).innerHTML = ``;
            return true;
        },
        this.validDuty = function (name, value) {
            if (!value) {
                document.querySelector(`span[data-error-duty="${name}"]`).innerHTML = `Vui lòng chọn ${name} `;
                return false;
            }
            document.querySelector(`span[data-error-duty="${name}"]`).innerHTML = ``;
            return true;
        },
        this.validWorkingTime = function (name, value) {
            if (Number(value) < 80 || Number(value) > 200) {
                document.querySelector(`span[data-error-workingTime="${name}"]`).innerHTML = `${name} từ 80 - 200 giờ`;
                return false;
            }
            document.querySelector(`span[data-error-workingTime="${name}"]`).innerHTML = ``;
            return true;
        }
}