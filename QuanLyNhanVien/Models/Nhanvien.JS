const LOAI_XUATSAC = 'xuat-sac';
const LOAI_GIOI = 'gioi';
const LOAI_KHA = 'kha';
const LOAI_TB = 'trung-binh';


function NhanVien() {
    this.username = '',
        this.fullName = '',
        this.email = '',
        this.password = '',
        this.dateStart = '',
        this.standardSalary = 0,
        this.duty = '',
        this.workingHours = 0,
        this.employeeType = '',
        this.generalSalary = 0,
        this.loaiNV = 0,
        this.getGeneralSalary = function () {
            switch (this.duty) {
                case 'Sếp':
                    this.generalSalary = this.standardSalary * 3;
                    break;
                case 'Trưởng phòng':
                    this.generalSalary = this.standardSalary * 2;
                    break;
                default:
                    this.generalSalary = this.standardSalary * 1;
                    break;
            }
        },
        this.ranking = function () {
            var str = 'nhân viên ';
            if (this.workingHours >= 192) {
                this.loaiNV = LOAI_XUATSAC;
                this.employeeType = str += 'xuất sắc';
            } else if (this.workingHours >= 176) {
                this.loaiNV = LOAI_GIOI;
                this.employeeType = str += 'giỏi';
            } else if (this.workingHours >= 160) {
                this.loaiNV = LOAI_KHA;
                this.employeeType = str += 'khá';
            } else {
                this.loaiNV = LOAI_TB;
                this.employeeType = str += 'trung bình';
            }
        }
}