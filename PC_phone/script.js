/*日時を取得・設定する関数たち開始*/
window.addEventListener("load", nowMounth);
window.addEventListener("load", nowDate);
window.addEventListener("load", getweek);

function nowDate() {
    var ele = document.getElementById("date");
    var date = new Date();
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    if ((min.toString().length) == 1) {
        ele.innerHTML = day + "日 " + hour + ":0" + min;
    } else {
        ele.innerHTML = day + "日 " + hour + ":" + min;
    }
    setInterval(() => {
        date = new Date();
        day = date.getDate();
        hour = date.getHours();
        min = date.getMinutes();
        if ((min.toString().length) == 1) {
            ele.innerHTML = day + "日 " + hour + ":0" + min;
        } else {
            ele.innerHTML = day + "日 " + hour + ":" + min;
        }
    }, 100000);
}

function nowMounth() {
    var date = new Date();
    var mounth = Number(date.getMonth()) + 1;
    document.getElementById("mounth").innerHTML = mounth + "月";
}

function getweek() {
    let now = new Date();
    let date = now.getDate();
    let day_arr = ['日', '月', '火', '水', '木', '金', '土']
    let elem = day_arr[now.getDay()];
    document.getElementById("elem").innerHTML = "(" + elem + ")";
    document.getElementById("week").innerHTML = date + "日";
}

/*日時を取得・設定する関数たち終了*/

/*日時を設定する関数*/

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.carender_time_table td');
    const stateArray = new Array(cells.length).fill(0); // 初期状態は未選択状態 (0)
    {
        /*日報をセット出来ない所を9で指定*/
        stateArray[0] = 9;//5:10より前
        stateArray[6] = 9;//7:40~8:00の朝礼
        stateArray[15] = 9;//12:00~12:50の昼休憩
        stateArray[37] = 9;//24:00より後
    }
    // セルにクリックイベントリスナーを追加
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            // 配列の状態を表示
            alert('列の状態: ' + stateArray[index]);
        });
    });
});

/*日時を設定する関数終了*/
