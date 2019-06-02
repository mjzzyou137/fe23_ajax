$(document).ready(function () {
    var danhSachNguoiDung = new DanhSachNguoiDung();
    layDanhSachNguoiDung();

    function test(){}
    function taoBranchNguyenTheMan(){}
    function timkiem(){
        console.log(fasfdsfa)
    }
    function layDanhSachNguoiDung() {
        danhSachNguoiDung.LayDanhSachNguoiDung()
            .done(function (data) {   // Thanh cong
                localStorage.setItem("DSND", JSON.stringify(data))
                CapNhatNguoiDung(data)
            }).fail(function (err) {  // That bai
                console.log(err)
            });
        ;
    }
    $("#btnThemNguoiDung").click(function(){
        showPopUp("Thêm Người Dùng", "Thêm", "btnThem")
        $("#TaiKhoan").removeAttr("disabled")
    })
    $("body").delegate("#btnSua", "click", function () {
        showPopUp("Sửa Người Dùng", "CẬP NHẬT", "btnCapNhat");
        var TaiKhoan = $(this).data("taikhoan");
        var ngDung = danhSachNguoiDung.LayThongTinNguoiDung(TaiKhoan);
        console.log(ngDung)
        $("#TaiKhoan").val(ngDung.TaiKhoan)
        $("#TaiKhoan").attr("disabled", "disabled")
        $("#HoTen").val(ngDung.HoTen)
        $("#MatKhau").val(ngDung.MatKhau)
        $("#Email").val(ngDung.Email)
        $("#SoDienThoai").val(ngDung.SoDT)
    })
    function showPopUp(title, titleButton, idBtn) {
        var title = "Sửa người dùng"
        $(".modal-title").html(title);
        var button = `
            <button id="${idBtn}" class="btn btn-danger">${titleButton}</button>
            <button id="btnDong" class="btn btn-primary" data-dismiss="modal">ĐÓNG</button>
        `
        $(".modal-footer").html(button);
    }
    $("body").delegate("#btnThem", "click", function () {
        var TaiKhoan = $("#TaiKhoan").val();
        var HoTen = $("#HoTen").val();
        var MatKhau = $("#MatKhau").val();
        var Email = $("#Email").val();
        var SoDienThoai = $("#SoDienThoai").val();
        var LoaiNguoiDung = $("#loaiNguoiDung").val();
        var ngDung = new NguoiDung(TaiKhoan, HoTen, MatKhau, Email, SoDienThoai, LoaiNguoiDung);
        danhSachNguoiDung.ThemNguoiDung(ngDung);
    })
    function CapNhatNguoiDung(DanhSachNguoiDung) {
        $("#tblDanhSachNguoiDung").html("");
        var content = ``;
        DanhSachNguoiDung.map(function (item, index) {
            content += `
            <tr>
            <td>${index + 1}</td>
            <td>${item.TaiKhoan}</td>
            <td>${item.MatKhau}</td>
            <td>${item.HoTen}</td>
            <td>${item.Email}</td>
            <td>${item.SoDT}</td>
            <td>${item.MaLoaiNguoiDung}</td>
            <td>${item.TenLoaiNguoiDung}</td>
            <td> 
                <button id="btnSua" class="btn btn-danger" data-taikhoan="${item.TaiKhoan}" data-toggle="modal"
                data-target="#myModal">SỬA</button>
                <button id="btnXoa" class="btn btn-success" data-taikhoan="${item.TaiKhoan}">XÓA</button>
            </td>
            </tr>
        `
        })
        $("#tblDanhSachNguoiDung").html(content);
    }
    $("body").delegate("#btnXoa", "click", function () {
        var TaiKhoan = $(this).data("taikhoan");
        danhSachNguoiDung.XoaNguoiDung(TaiKhoan);
    })
    $("body").delegate("#btnCapNhat", "click", function () { 
        var TaiKhoan = $("#TaiKhoan").val();
        var HoTen = $("#HoTen").val();
        var MatKhau = $("#MatKhau").val();
        var Email = $("#Email").val();
        var SoDienThoai = $("#SoDienThoai").val();
        var LoaiNguoiDung = $("#loaiNguoiDung").val();
        var ngDung = new NguoiDung(TaiKhoan, HoTen, MatKhau, Email, SoDienThoai, LoaiNguoiDung);
        danhSachNguoiDung.CapNhatChinhSua(ngDung)
    })
})