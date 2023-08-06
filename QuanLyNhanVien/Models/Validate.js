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
                announce.innerHTML = `${name} tối đa 4 - 6 kí số`;
                return false;
            }
            document.querySelector(`span[data-error-length= "${name}"]`).innerHTML = ``;
            return true;
        }
}