function DanhSachNguoiDung() {
    this.LayDanhSachNguoiDung = function () {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung`,
            type: "GET", // Truyen vao se co 1 trog 2 trang thai
        });
    };
    this.ThemNguoiDung = function (ngDung) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung`,
            type: "POST",
            data: ngDung
        })
            .done(function (data) {   // Thanh cong
                if (data === "tai khoan da ton tai !") {
                    alert(data);
                } else {
                    location.reload();
                }
            }).fail(function (err) {  // That bai
                console.log(err)
            });
    };
    this.XoaNguoiDung = function (ngDung) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${ngDung}`,
            type: "DELETE"
        })
            .done(function (data) {   // (Thanh) cong
                location.reload();
            }).fail(function (err) {  // That bai
                console.log(err)
            });
    };
    this.LayThongTinNguoiDung = function (TaiKhoan) {
        var DSND = JSON.parse(localStorage.getItem("DSND"));
        return DSND.find(function (item) {
            return item.TaiKhoan === TaiKhoan;
        })
    }
    this.CapNhatChinhSua = function (ngDung) {
        var ngd = JSON.stringify(ngDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: ngd,
            contentType: "application/json",
            dataType: "json"
        })

            .done(function (data) {   // (Thanh) cong
                location.reload();
            }).fail(function (err) {  // That bai
                console.log(err)
            });
    }
}