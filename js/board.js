let date = new Date(); //현재
let nowDate;
let ym = "";
let url = "http://localhost:8082/board/";
// let thum;

let keys;


async function renderCalender() {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    let month = (viewMonth+1).toString().padStart(2, '0');

    ym = viewYear+"-"+month;

    await $.ajax({
        url: `http://localhost:8082/board/getMonthly?nowYM=${ym}`,
        typee:'GET',
        dataType: 'json',
        headers: {"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
        success: function(response){
            thum = response;
            console.log("get thumnails@@@");
            console.log(response);
        },
        error: function(jqXHR, textStatus){
            console.log(textStatus);
        }
    });

    ym+="-";

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';
        
        if(date.toString().padStart(2, '0') in thum){
            var src = thum[date.toString().padStart(2, '0')];
            console.log(src);
            console.log(date.toString().padStart(2, '0'));
            dates[i] = `<div class="date" style="cursor: pointer; background-image: url('${src}'); background-size:cover;"><span class=${condition}>${date}</span></div>`;
        }else{
            dates[i] = `<div class="date" style="cursor: pointer;"><span class=${condition}>${date}</span></div>`;
        }
        

    });

    document.querySelector('.dates').innerHTML = dates.join('');
    let $day = document.querySelectorAll('.date');
    $day.forEach((day)=>{
        if(day.querySelector('span').className == 'this'){

            day.addEventListener('click', function (){
                nowDate = ym + day.innerText.padStart(2, '0');
                $.ajax({
                    url: `http://localhost:8082/board/postexist?nowDate=${nowDate}`,
                    type: 'GET',
                    dataType:'json',
                    headers:{"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
                    success: function (response){
                        if(response){
                            window.location = `/board/view?${nowDate}`;
                        }else{
                            window.location = `/board/post?${nowDate}`;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown){
                        console.log(textStatus);
                    }
                });
            })
        }
    });


    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
};

renderCalender();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalender();
};

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalender();
};

const goToday = () => {
    date = new Date();
    renderCalender();
};





