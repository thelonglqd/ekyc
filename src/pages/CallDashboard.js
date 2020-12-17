import "date-fns";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUltis from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: 30,
  },
  toolbarOffset: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  sectionHeader: {
    backgroundColor: theme.palette.info.main,
    padding: theme.spacing(1),
    fontWeight: "bolder",
  },
  infoTitle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const CallDashboard = ({ auth }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const location = useLocation();
  const incomingCall = location.data;

  const classes = useStyles();

  const testAnswerCall = () => {
    incomingCall &&
      incomingCall.answer(function (res) {
        console.log("answer res", res);
      });
  };

  const testRejectCall = () => {
    incomingCall &&
      incomingCall.reject((res) => {
        console.log("reject res: ", res);
      });
  };

  const settingCallEvent = (call1) => {
    // callStarted();

    call1.on("addremotestream", function (stream) {
      console.log("addremotestream");
      // reset srcObject to work around minor bugs in Chrome and Edge.
      remoteVideo.srcObject = null;
      remoteVideo.srcObject = stream;
    });

    call1.on("addlocalstream", function (stream) {
      console.log("addlocalstream");
      // reset srcObject to work around minor bugs in Chrome and Edge.
      localVideo.srcObject = null;
      localVideo.srcObject = stream;
    });

    call1.on("error", function (info) {
      console.log("on error: " + JSON.stringify(info));
    });

    call1.on("signalingstate", function (state) {
      console.log("signalingstate ", state);
      var reason = state.reason;
      $("#callStatus").html(reason);

      if (state.code === 6) {
        //call Ended
        $("#incoming-call-div").hide();
        callEnded();
      } else if (state.code === 5) {
        //busy
        callEnded();
      }
    });

    call1.on("mediastate", function (state) {
      console.log("mediastate ", state);
    });

    call1.on("info", function (info) {
      console.log("on info:" + JSON.stringify(info));
    });

    call1.on("otherdevice", function (data) {
      console.log("on otherdevice:" + JSON.stringify(data));
      if (
        (data.type === "CALL_STATE" && data.code >= 200) ||
        data.type === "CALL_END"
      ) {
        $("#incoming-call-div").hide();
        callEnded();
      }
    });
  };

  useEffect(() => {
    if (incomingCall) settingCallEvent(incomingCall);
  }, [incomingCall]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.pageContainer} spacing={2}>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className={classes.sectionHeader}>LIVE VIDEO</div>
              </Grid>
              <Grid item xs={12}>
                <button id="answerBtn" onClick={testAnswerCall}>
                  Answer
                </button>
                <button id="rejectBtn" onClick={testRejectCall}>
                  Reject
                </button>
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <video
                    id="localVideo"
                    playsInline
                    autoPlay
                    muted
                    style={{
                      borderRadius: 4,
                      width: "100%",
                      height: 400,
                      background: "#424141",
                    }}
                  />
                  <video
                    id="remoteVideo"
                    playsInline
                    autoPlay
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      width: "100px",
                      height: "100px",
                      background: "#dedede",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <img
                  style={{ borderRadius: 4, width: "100%" }}
                  src="https://dummyimage.com/100x100/999999/d64d4d&text=placeholder"
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  style={{ borderRadius: 4, width: "100%" }}
                  src="https://dummyimage.com/100x100/999999/d64d4d&text=placeholder"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={1}>
                    <ArrowBack color="grey" />
                  </Grid>
                  <Grid item xs={1}>
                    <ArrowForward color="grey" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className={classes.sectionHeader}>
                  ẢNH GIẤY TỜ TUỲ THÂN
                </div>
              </Grid>
              <Grid item xs={12}>
                <img
                  style={{ borderRadius: 4, width: "100%", height: 150 }}
                  src="https://dummyimage.com/100x75/999999/d64d4d&text=placeholder"
                />
              </Grid>
              <Grid item xs={12}>
                <img
                  style={{ borderRadius: 4, width: "100%", height: 150 }}
                  src="https://dummyimage.com/100x75/999999/d64d4d&text=placeholder"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <div style={{ fontWeight: "bold" }}>
                      THÔNG TIN KHÁCH HÀNG
                    </div>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6}>
                      Họ và tên:
                    </Grid>
                    <Grid item xs={6}>
                      Vu Hoang Yen
                    </Grid>
                    <Grid item xs={6}>
                      Số điện thoại:
                    </Grid>
                    <Grid item xs={6}>
                      0986995888
                    </Grid>
                    <Grid item xs={6}>
                      Mã khách hàng:
                    </Grid>
                    <Grid item xs={6}>
                      20201980
                    </Grid>
                    <Grid item xs={6}>
                      Trạng thái tài khoản
                    </Grid>
                    <Grid item xs={6}>
                      Chưa kích hoạt
                    </Grid>
                    <Grid item xs={6}>
                      Trạng thái xác thực
                    </Grid>
                    <Grid item xs={6} style={{ color: "red" }}>
                      Chờ phê duyệt
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <div style={{ fontWeight: "bold" }}>
                      THÔNG TIN XÉT DUYỆT
                    </div>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      Nhân viên xét duyệt
                    </Grid>
                    <Grid item xs={12}>
                      Thời gian xét duyệt
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className={classes.sectionHeader}>THÔNG TIN CÁ NHÂN</div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid className={classes.infoTitle} item xs={4}>
                Tên trường
              </Grid>
              <Grid className={classes.infoTitle} item xs={4}>
                Thông tin OCR
              </Grid>
              <Grid className={classes.infoTitle} item xs={4}>
                Thông tin cập nhật
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Loại giấy tờ
              </Grid>
              <Grid item xs={4}>
                Chứng minh thư
              </Grid>
              <Grid item xs={4}>
                <Select
                  style={{ width: "100%" }}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="CMND">CMND</MenuItem>
                  <MenuItem value="CCCD">CCCD</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Họ và tên
              </Grid>
              <Grid item xs={4}>
                Vũ Hoàng Yến
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value="Vũ Hoàng Yến"
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Số định danh
              </Grid>
              <Grid item xs={4}>
                001180883
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value="001180883"
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Ngày hết hạn
              </Grid>
              <Grid item xs={4}>
                29/11/2020
              </Grid>
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUltis}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Ngày cấp
              </Grid>
              <Grid item xs={4}>
                29/11/2020
              </Grid>
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUltis}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Nơi cấp
              </Grid>
              <Grid item xs={4}>
                Hưng Yên
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value="Hưng Yên"
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Ngày sinh
              </Grid>
              <Grid item xs={4}>
                29/11/2020
              </Grid>
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUltis}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Giới tính
              </Grid>
              <Grid item xs={4}>
                N/A
              </Grid>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Email
              </Grid>
              <Grid item xs={4}>
                yenvh@gmail.com
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value="yenvh@gmail.com"
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Nơi ĐKHK thường trú
              </Grid>
              <Grid item xs={4}>
                Hưng Yên
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value="Hưng Yên"
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                Địa chỉ cụ thể
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <TextareaAutosize
                  fullWidth
                  aria-label="minimum height"
                  rowsMin={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <Button
              style={{ borderRadius: 16, marginRight: 8 }}
              variant="contained"
              color="primary"
            >
              Phê duyệt
            </Button>
            <Button style={{ borderRadius: 16 }} variant="contained">
              Từ chối
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CallDashboard);
