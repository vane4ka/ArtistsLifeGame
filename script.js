
function opentutor() {
    $('#screen').css('height', '0');
    tutor1();
}

function tutor1() {
    let btn = $('#btn_next');
    $('#tutorial').css('background', 'radial-gradient(circle at ' + 
        (btn.position().left + btn.width() / 2) + 'px ' + (btn.position().top + btn.height() / 2) + 
        'px, transparent 0%, transparent 5%, rgba(0,0,0,0.8) 10%)');
    $('#tutor1').css('top', (btn.position().top + 250) + 'px');
    $('#tutor1').css('left', (btn.position().left - $('#tutor1').width() - 50) + 'px');  
    $('#tutor1').fadeIn(500);  
    $('#tutor1').css('display', 'flex');
}

function tutor2() {
    $('#tutor1').fadeOut(500);
    let chip = $('#chip');
    let bottom = $('#bg').height() - chip.position().top;
    let tutorHeight = $('#tutorial').height();
    $('#tutorial').css('background', 'radial-gradient(circle at ' + 
        (chip.position().left + chip.width() / 2) + 'px ' + (tutorHeight - bottom) + 
        'px, transparent 0%, transparent 5%, rgba(0,0,0,0.8) 10%)');
    $('#tutor2').css('top', (tutorHeight - bottom - 250) + 'px');
    $('#tutor2').css('left', (chip.position().left + 200) + 'px');
    $('#tutor2').fadeIn(500);
    $('#tutor2').css('display', 'flex');
}

function start() {
    $('#tutorial').css('height', '0');
}

let points2 = [];
let width = 4900, height = 7000;
let windowWidth, windowHeight, fieldWidth, fieldHeight;
let chipX = 0, chipY = 0, fieldPos = 100;
let bg, field, chip, translateY;
let step = 1, deg = 0;
let skip = 0;
let res = 0;

function caclulate() {
    windowWidth = $(window).width(), windowHeight = $(window).height();
    fieldWidth = windowWidth, fieldHeight = windowWidth * height / width;
    points2.length = 0;
    points.forEach(p => {
        points2.push({
            x1: fieldWidth * p.x1 / width, y1: fieldHeight * p.y1 / height,
            x2: fieldWidth * p.x2 / width, y2: fieldHeight * p.y2 / height
        });
    });
    translateY = windowHeight - fieldHeight;
    bg = $('#bg');
    field = $('#field');
    chip = $('#chip');
    bg.css('height', fieldHeight);
    field.css('height', fieldHeight);
    bg.css('transform', 'translateY(' + translateY + 'px)');
    setPos();
}

$(function () {
    caclulate();
});

$(window).resize(function () {
    caclulate();
});

function next() {
    ++res;
    let number = Math.floor(Math.random() * 6) + 1;
    deg = deg == 180 ? 360 : 180;
    $("#btn_next").stop().animate(
        { now: deg },
        {
            duration: 500,
            step: function (now) {
                $(this).css({ opacity: 0.3 });
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            },
            complete: function () {
                $(this).css({ 'background-image': "url('imgs/" + number + ".png')" })
                    .animate({ opacity: 1 }, { duration: 500 });
            }
        }
    );
    moveChip(number);
}

function moveChip(number) {
    let i = 0;
    $('#btn_next').attr('disabled', 'disabled');
    if (number == 12) {
        step += 12;
        setPos(2);
        setTimeout(function() { 
            showModal();
            $('#btn_next').removeAttr('disabled'); 
        }, 2500);
        return;
    }
    let res = setInterval(function () {
        ++i;
        if (i - 1 == Math.abs(number) || step > steps.length) {
            clearInterval(res);
            showModal();
            $('#btn_next').removeAttr('disabled');
        } else {
            if (number > 0) {
                ++step;
            } else if (number < 0) {
                --step;
            }
            setPos();
        }
    }, 500);
}

function setPos(trdur = 0.5) {
    let left = points2[step - 1].x1 + Math.abs(points2[step - 1].x1 - points2[step - 1].x2) / 2 - chip.width() / 2;
    let top = points2[step - 1].y1 + Math.abs(points2[step - 1].y1 - points2[step - 1].y2) / 2 - chip.height() / 2;
    chip.css('transition-duration', trdur + 's');
    chip.css('left', left + 'px');
    chip.css('top', top + 'px');

    let topPage = fieldHeight + translateY;
    let bottomPage = topPage - windowHeight;
    let center = (topPage - bottomPage) / 2;
    let chipPos = fieldHeight - chip[0].offsetTop;

    if (chipPos > center) {
        translateY = windowHeight - fieldHeight + (chipPos - center);
        if (translateY < 0) {
            bg.css('transform', 'translateY(' + (translateY) + 'px)')
        }
    }
}

function showModal() {
    console.log(step);
    $('#fbbtn').hide();
    if (steps[step - 1].died == true) {
        $('#modal>span').text('');
        $('#modal').css('background-image', 'url("imgs/die.png")');
        $('#tryagain').show();
        $('#modalbtn').hide();
    } else if (step >= steps.length) {
        $('#modal>span').text('Поздравляю, ты стал художником за ' + res + ' ' + getStepWord(res) + '!');
        $('#modalbtn').hide();
        $('#fbbtn').show();
    } else {
        $('#modal>span').text(steps[step - 1].text);
        let btntext = 'Закрыть';
        if (steps[step - 1].st > 0) {
            btntext = 'Вперед';
        } else if (steps[step - 1].st < 0) {
            btntext = 'Назад';
        } 
        if (steps[step - 1].skip > 0) {
            skip = steps[step - 1].skip;
            btntext = '<img src="imgs/timer.png" />';
        }
        $('#modalbtn').html(btntext);
    }
    $('#modalbg').addClass('active');
}

function modalBtnClick() {
    if (step > steps.length) { 
        return;
    }
    if (skip > 0) {
        --skip;
        $('#modalbtn').html('<img src="imgs/timer.gif?r=' + Math.random() + '" />');
        $('#modalbtn').attr('disabled', 'disabled');
        setTimeout(function() { 
            $('#modalbtn').removeAttr('disabled'); 
            if (skip == 0) {
                $('#modalbg').removeClass('active');
            } 
        }, 1500);
        return;
    }
    $('#modalbg').removeClass('active');
    if (steps[step - 1].st != 0) {
        moveChip(steps[step - 1].st);
    }
}

function tryAgain() {
    window.location.reload();
}