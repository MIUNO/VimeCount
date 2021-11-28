/*
    автор говнокода
    █▀▄▀█ █ █ █ █▄ █ █▀█
    █ ▀ █ █ █▄█ █ ▀█ █▄█
*/
var inputIn = document.querySelector('#input-in'); // Поле ввода
var search = document.querySelector('#search'); // Кнопка поиска
var searchnick = location.search.substr(1), keys = {};
searchnick.split('?').forEach(function(item) {
  item = item.split('=');
  keys[item[0]] = item[1];
});    
inputIn.value = keys.nick;
console.log(keys.nick);
if (inputIn.value == 'undefined') { inputIn.value = ''; } else { getPlayer(); }
search.onclick = function (){ getPlayer(); }
$("#input-in").keyup(function(event){
  if(event.keyCode == 13){
    localStorage.inputNick = inputIn.value;
    getPlayer();
  }
});
getOnline();
var nbs0 = document.querySelector('.nick_bs0');
var nbs1 = document.querySelector('.nick_bs1');
var nbs2 = document.querySelector('.nick_bs2');
var nbs3 = document.querySelector('.nick_bs3');
var nbs4 = document.querySelector('.nick_bs4');
var b = ['.nick_bs0', '.nick_bs1', '.nick_bs2', '.nick_bs3', '.nick_bs4'];
var c = [localStorage.nick0, localStorage.nick1, localStorage.nick2, localStorage.nick3, localStorage.nick4];
document.querySelector('.bm0').onclick = function (){
  localStorage.nick0 = inputIn.value; document.querySelector('.nick_bs0').innerHTML = localStorage.nick0; Info();
}
document.querySelector('.bm1').onclick = function (){
  localStorage.nick1 = inputIn.value; document.querySelector('.nick_bs1').innerHTML = localStorage.nick1; Info();
}
document.querySelector('.bm2').onclick = function (){
  localStorage.nick2 = inputIn.value; document.querySelector('.nick_bs2').innerHTML = localStorage.nick2; Info();
}
document.querySelector('.bm3').onclick = function (){
  localStorage.nick3 = inputIn.value; document.querySelector('.nick_bs3').innerHTML = localStorage.nick3; Info();
}
document.querySelector('.bm4').onclick = function (){
  localStorage.nick4 = inputIn.value; document.querySelector('.nick_bs4').innerHTML = localStorage.nick4; Info();
}
for(var i = 0; i < 5; i++){
  console.log(c[i]);
  if( c[i] == null) { c[i] = 'Пусто'; }
  if( c[i] == undefined) { c[i] = 'Пусто'; }
  document.querySelector(b[i]).innerHTML = c[i];
}
nbs0.onclick = function (){ inputIn.value = localStorage.nick0; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
nbs1.onclick = function (){ inputIn.value = localStorage.nick1; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
nbs2.onclick = function (){ inputIn.value = localStorage.nick2; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
nbs3.onclick = function (){ inputIn.value = localStorage.nick3; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
nbs4.onclick = function (){ inputIn.value = localStorage.nick4; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }

function toggleNick(){
  history.replaceState(3, "nick", "?nick=" + inputIn.value); 
}

function Info(){
  bulmaToast.toast({
    message: 'Ник сохранён',
    type: 'is-success',
    duration: 2000,
    position: "bottom-right",
     nimate: { in: 'fadeIn', out: 'fadeOut' }
  })
}

$(window).scroll(function(){
  if ($(this).scrollTop() > 115 && window.screen.width <= 768) {
    $('.menu').addClass('fixed');
    $('.menu').addClass('box');
  } else {
    $('.menu').removeClass('fixed');
    $('.menu').removeClass('box');
  }
});

Orient();
window.addEventListener("orientationchange", function() { Orient(); });
function Orient(){
  if (window.screen.width <= 768) {
    $('.dropdown').addClass('is-right');
    $('.dropdown-content').addClass('dropdownR');
    $('.dropdown-content').removeClass('dropdownL');
  } else {
    $('.dropdown').removeClass('is-right');
    $('.dropdown-content').addClass('dropdownL');
    $('.dropdown-content').removeClass('dropdownR');
  }
}

var activateTab = (el) => {
  var target = $(el).attr('data-tab');
  var tabsettarget = $(el).attr('data-tabset');
  var parentUl = $(el).parent();
  $(parentUl).children('li').each(function(){
    $(this).removeClass('is-active');  
  });
  $(el).addClass('is-active');
  $("[data-tabsettarget='"+tabsettarget+"']").children('[data-tabtarget]').each(function(){ $(this).hide();} );
  $("[data-tabtarget='"+target+"']").show();
}
$('.tabs').children('ul').each(function(){
  var _this = this
  $(_this).children('li').each(function(){
    var _that = $(this);
    if(_that.hasClass('is-active')){
      activateTab(_that);
      return;
    }
  });
});
$('.tabs ul').on('click', 'li', function(el){ activateTab(this); });
$("#showModal").click(function() { $(".modal").addClass("is-active"); });
$("#close").click(function() { $(".modal").removeClass("is-active"); });
document.addEventListener('DOMContentLoaded', function () {
  var $dropdowns = getAll('.dropdown:not(.is-hoverable)');
  if ($dropdowns.length > 0) {
    $dropdowns.forEach(function ($el) {
      $el.addEventListener('click', function (event) {
        event.stopPropagation();
        $el.classList.toggle('is-active');
      });
    });
  document.addEventListener('click', function (event) { closeDropdowns(); }); }
  function closeDropdowns() {
    $dropdowns.forEach(function ($el) {
      $el.classList.remove('is-active');
    });
  }
  document.addEventListener('keydown', function (event) {
    var e = event || window.event;
    if (e.keyCode === 27) {
      closeDropdowns();
    }
  });
  function getAll(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector), 0); } });

function getPlayer() {
  CheckNick()
  var url = 'https://api.vimeworld.ru/user/name/' + inputIn.value + '?token=Dip60P3vscegiu5cSGxvovEDKqVjaSu';
  fetch(url).then((response) => { return response.json();}).then((json) => {
    try { GiveID(json[0].id); toggleNick(); }
    catch(err){
      bulmaToast.toast({
      message: 'Неверный ник',
      type: 'is-danger',
      duration: 2000,
      position: "bottom-right",
      animate: { in: 'fadeIn', out: 'fadeOut' }
    })}
    try { GiveMore(json[0].username, json[0].level, json[0].levelPercentage, json[0].rank); }
    catch(err) {}
  });
}

function getOnline() {
  var url = 'https://api.vimeworld.ru/online?token=Dip60P3vscegiu5cSGxvovEDKqVjaSu';
  fetch(url).then((response) => { return response.json();}).then((json) => {
    GiveOnline(json.total);
  });
}
setInterval(getOnline, 10000);

function GiveOnline(online){
  document.querySelector('#online').innerHTML = online;
}
function GiveID(id) {
  var playerid = id;
  console.log(playerid);
  var url = 'https://api.vimeworld.ru/user/' + playerid + '/stats?token=Dip60P3vscegiu5cSGxvovEDKqVjaSu';
  fetch(url).then((response) => { return response.json();}).then((json) => {
    BW(json.stats.BW.global, json.stats.BW.season.monthly);
    SW(json.stats.SW.global, json.stats.SW.season.monthly);
    CP(json.stats.CP.global, json.stats.CP.season.monthly);
    Bridge(json.stats.BRIDGE.global.games, json.stats.BRIDGE.global.wins, json.stats.BRIDGE.global.kills, json.stats.BRIDGE.global.deaths, json.stats.BRIDGE.global.points);
  });
  var url2 = 'https://api.vimeworld.ru/user/' + playerid + '/session?token=Dip60P3vscegiu5cSGxvovEDKqVjaSu';
  fetch(url2).then((response) => { return response.json();}).then((json) => {
    GiveSession(json.online.value);
  });
}
function GiveSession(online){
  var onl = document.querySelector('#session');
  if(online == true){
    document.querySelector('#session').innerHTML = 'Онлайн';
    onl.setAttribute("class", 'tag is-success is-rounded m-1 is-medium');
  }
  if(online == false){
    document.querySelector('#session').innerHTML = 'Оффлайн';
    onl.setAttribute("class", 'tag is-danger is-rounded m-1 is-medium');
  }
}
function GiveMore(username, level, levelPercentage, rank) {
  document.querySelector('#nick').innerHTML = username;
  document.querySelector('#lvl').innerHTML = level;
  var colorR = document.querySelector('#nick');
  if (rank == 'PLAYER') {colorR.style.color = '';}
  if (rank == 'VIP') {colorR.style.color = '#00be00';}
  if (rank == 'PREMIUM') {colorR.style.color = '#00dada';}
  if (rank == 'HOLY') {colorR.style.color = '#ffba2d';}
  if (rank == 'IMMORTAL') {colorR.style.color = '#e800d5';}
  if (rank == 'BUILDER' || rank == 'SRBUILDER' || rank == 'MAPLEAD') {colorR.style.color = '#009c00';}
  if (rank == 'YOUTUBE') {colorR.style.color = '#fe3f3f';}
  if (rank == 'DEV' || rank == 'ORGANIZER' || rank == 'ADMIN') {colorR.style.color = '#00bebe';}
  if (rank == 'MODER' || rank == 'WARDEN' || rank == 'CHIEF') {colorR.style.color = '#1b00ff';}
  var bar = (levelPercentage*100).toFixed(0);
  document.querySelector('#barr').setAttribute("value", bar);
  Skin(username);
}

function Skin(username){
  var skk = document.querySelector('#skin');
  var skk2 = document.querySelector('#skin-viewer');
  var skkkkk = 'https://skin.vimeworld.ru/raw/skin/' + username + '.png';
  var steve = 'https://raw.githubusercontent.com/MIUNO/vimestat/main/img/Steve.png';
  var helm = 'https://skin.vimeworld.ru/helm/' + username + '/64.png';
  skk.setAttribute("src", helm);
    var skin = new Image();
    skin.src = 'https://skin.vimeworld.ru/raw/skin/' + username + '.png';
    skin.onerror = function(){
      var skinn = 'url(' + steve + ')';
      var skin = steve;
      SkinColor(skin);
      SkinSet(skinn);
    }
    skin.onload = function(){
      var skinn = 'url(' + skkkkk + ')';
      var skin = skkkkk;
      SkinColor(skin);
      SkinSet(skinn);
    }
    var cppppp = 'url(https://skin.vimeworld.ru/raw/cape/' + username + '.png)';     
    var cape = new Image();     
    cape.src = 'https://skin.vimeworld.ru/raw/cape/' + username + '.png'; 
      cape.onload = function() {      
        var width = this.width;
        var hight = this.height;
        if (width == 64 && hight == 32){ skk2.setAttribute("class", 'mc-skin-viewer-9x legacy cape spin'); }
        else { skk2.setAttribute("class", 'mc-skin-viewer-9x legacy legacy-cape spin'); }
      }        
    for (var i = 0; i < 7; i++) {
      var cape3d = document.querySelectorAll('.ct3d')[i];
      cape3d.style.backgroundImage = cppppp;
    }
    function SkinSet(skinn){
      for (var i = 0; i < 71; i++) {
        var skin3d = document.querySelectorAll('.st3d')[i];
        skin3d.style.backgroundImage = skinn;
      }
    }
    function SkinColor(skin){
      var imggg = document.createElement('img');
      imggg.setAttribute('src', skin)
      imggg.crossOrigin = "Anonymous";
      imggg.addEventListener('load', function() {
      var vibrant = new Vibrant(imggg, 2);
      var swatches = vibrant.swatches()
      var vvv = Object.values(swatches);
      var aaa = [];
      for (var i = 0; i < 6; i++) {
        try { aaa[i] = vvv[i].rgb; }
        catch(err){ if (vvv[i] == undefined) { delete aaa[i]; } }
      }
      var nnn = Object.values(aaa);
      var color1 = nnn[0];
      var skincontainer = document.querySelector('.skin-container');
        skincontainer.style.backgroundColor =  'rgba(' + color1[0] + ', ' + color1[1] + ', ' + color1[2] + ', 0.5)';
    });
  }
}
// Мини Игры
function BW(Info1, Info2) {
  var bwclassg = ['#bwkg', '#bwdg', '#bwgg', '#bwwg', '#bwbBg', '#bwkdg', '#bwgwg', '#bwkgg', '#bwwdg', '#bwbg'];
  var bwg =  Match(Object.values(Info1));
  for (var i = 0; i < 10; i++) {
    if (bwg[i] == 'NaN') {bwg[i] = 0}
    if (bwg[i] == 'Infinity') {bwg[i] = '-'}
    document.querySelector(bwclassg[i]).innerHTML = bwg[i];
  }
  var bwclassm = ['#bwkm', '#bwdm', '#bwgm', '#bwwm', '#bwbBm', '#bwkdm', '#bwgwm', '#bwkgm', '#bwwdm', '#bwbm'];
  var bwm =  Match(Object.values(Info2));
  for (var i = 0; i < 10; i++) {
    if (bwm[i] == 'NaN') {bwm[i] = 0}
    if (bwm[i] == 'Infinity') {bwm[i] = '-'}
    document.querySelector(bwclassm[i]).innerHTML = bwm[i];
  }
  var bwtab = ['#tabbwkd', '#tabbwgw', '#tabbwgm', '#tabbwdg', '#tabbwbg'];
  var arr = [];
  var tabbw = MatchTab(arr.concat(bwg, bwm));
  for (var i = 0; i < 5; i++) {
    document.querySelector(bwtab[i]).innerHTML = tabbw[i];
  }
    var options = {
      chart: { id: 'bwchart', height: 185, width: "100%", type: "line", zoom: { enabled: false } },
      colors:['hsl(217, 71%, 53%)', 'hsl(171, 100%, 41%)'],
      stroke: { curve: "smooth", width: 3 },
      series: [
        { name: "За всё время", data: [bwg[5],bwg[6],bwg[7],bwg[8],bwg[9]] },
        { name: "За месяц", data: [bwm[5],bwm[6],bwm[7],bwm[8],bwm[9]] }
      ],
      xaxis: { categories: ["1", "2", "3", "4", "5"] }
    };
  var chart = new ApexCharts(document.querySelector("#chart_bw"), options);
  chart.render();
  ApexCharts.exec('bwchart', "updateSeries", [
    { name: "За всё время", data: [bwg[5],bwg[6],bwg[7],bwg[8],bwg[9]] },
    { name: "За месяц", data: [bwm[5],bwm[6],bwm[7],bwm[8],bwm[9]] }
  ]);
}

function SW(Info1, Info2) {
  var swclassg = ['#swkg', '#swdg', '#swgg', '#swwg', '#swwSg', '#swkdg', '#swgwg', '#swkgg', '#swdgg'];
  var sgg = Object.values(Info1);
  var swg = Match([sgg[2],sgg[3],sgg[1],sgg[0],sgg[8]]);
  for (var i = 0; i < 9; i++) {
    if (swg[i] == 'NaN') {swg[i] = 0}
    if (swg[i] == 'Infinity') {swg[i] = '-'}
    document.querySelector(swclassg[i]).innerHTML = swg[i];
  }
  var swclassm = ['#swkm', '#swdm', '#swgm', '#swwm', '#swwSm', '#swkdm', '#swgwm', '#swkgm', '#swdgm'];
  var smm = Object.values(Info2);
  var swm = Match([smm[2],smm[3],smm[1],smm[0],smm[8]]);
  for (var i = 0; i < 9; i++) {
    if (swm[i] == 'NaN') {swm[i] = 0}
    if (swm[i] == 'Infinity') {swm[i] = '-'}
    document.querySelector(swclassm[i]).innerHTML = swm[i];
  }
  var swtab = ['#tabswkd', '#tabswgw', '#tabswgm', '#tabswdg', '#tabswbg'];
  var arr = [];
  var tabsw = MatchTab(arr.concat(swg, swm));
  for (var i = 0; i < 4; i++) {
    document.querySelector(swtab[i]).innerHTML = tabsw[i];
  }
    var options = {
      chart: { id: 'swchart', height: 185, width: "100%", type: "line", zoom: { enabled: false } },
      colors:['hsl(217, 71%, 53%)', 'hsl(171, 100%, 41%)'],
      stroke: { curve: "smooth", width: 3 },
      series: [
        { name: "За всё время", data: [swg[5],swg[6],swg[7],swg[8]] },
        { name: "За месяц", data: [swm[5],swm[6],swm[7],swm[8]] }
      ],
      xaxis: { categories: ["1", "2", "3", "4"] }
    };
    var chart = new ApexCharts(document.querySelector("#chart_sw"), options);
    chart.render();
  ApexCharts.exec('swchart', "updateSeries", [
    { name: "За всё время", data: [swg[5],swg[6],swg[7],swg[8]] },
    { name: "За месяц", data: [swm[5],swm[6],swm[7],swm[8]] }
  ]);
}
function CP(Info1, Info2) {
  var cpclassg = ['#cpkg', '#cpdg', '#cpgg', '#cpwg', '#cprPBg', '#cpkdg', '#cpgwg', '#cpkgg', '#cpdgg', '#cpbgg']; 
  var cpg = Match(Object.values(Info1));
  for (var i = 0; i < 10; i++) {
    if (cpg[i] == 'NaN') {cpg[i] = 0}
    if (cpg[i] == 'Infinity') {cpg[i] = '-'}
    document.querySelector(cpclassg[i]).innerHTML = cpg[i];
  }
  var cpclassm = ['#cpkm', '#cpdm', '#cpgm', '#cpwm', '#cprPBm', '#cpkdm', '#cpgwm', '#cpkgm', '#cpdgm', '#cpbgm']; 
  var cpm = Match(Object.values(Info2));
  for (var i = 0; i < 10; i++) {
    if (cpm[i] == 'NaN') {cpm[i] = 0}
    if (cpm[i] == 'Infinity') {cpm[i] = '-'}
    document.querySelector(cpclassm[i]).innerHTML = cpm[i];
  }
  var cptab = ['#tabcpkd', '#tabcpgw', '#tabcpgm', '#tabcpdg', '#tabcpbg'];
  var arr = [];
  var tabcp = MatchTab(arr.concat(cpg, cpm));
  for (var i = 0; i < 5; i++) {
    document.querySelector(cptab[i]).innerHTML = tabcp[i];
  }
    var options = {
      chart: { id: 'cpchart', height: 185, width: "100%", type: "line", zoom: { enabled: false } },
      colors:['hsl(217, 71%, 53%)', 'hsl(171, 100%, 41%)'],
      stroke: { curve: "smooth", width: 3 },
      series: [
        { name: "За всё время", data: [cpg[5],cpg[6],cpg[7],cpg[8],cpg[9]] },
        { name: "За месяц", data: [cpm[5],cpm[6],cpm[7],cpm[8],cpm[9]] }
      ],
      xaxis: { categories: ["1", "2", "3", "4", "5"] }
    };
  var chart = new ApexCharts(document.querySelector("#chart_cp"), options);
  chart.render();
  ApexCharts.exec('cpchart', "updateSeries", [
    { name: "За всё время", data: [cpg[5],cpg[6],cpg[7],cpg[8],cpg[9]] },
    { name: "За месяц", data: [cpm[5],cpm[6],cpm[7],cpm[8],cpm[9]] }
  ]);
}
function Bridge (games, wins, kills, deaths, points){
  var brclass = ['#brk', '#brd', '#brg', '#brw', '#brp', '#brkd', '#brgw', '#brkg', '#brdg', '#brpg'];
  var br = Match([kills, deaths, games, wins, points]);
  for (var i = 0; i < 10; i++) {
    if (br[i] == 'NaN') {br[i] = 0}
    if (br[i] == 'Infinity') {br[i] = '-'}
    document.querySelector(brclass[i]).innerHTML = br[i];
  }
}
// Расчёт статистики
function Match(matchmas){ //kills - matchmas[0] deaths - matchmas[1] games - matchmas[2] wins - matchmas[3] points, resourcePointsBreaked, winStreak, bedBreaked - matchmas[4]
  var kd = (matchmas[0] / matchmas[1]).toFixed(2);  // Убийсва\Смерти
  var gw = (matchmas[3] / (matchmas[2] - matchmas[3])).toFixed(2); // Победы\Поражения
  var kg = (matchmas[0] / matchmas[2]).toFixed(2);  // Среднее количество убийств за игру
  var dg = (matchmas[1] / matchmas[2]).toFixed(2); // Среднее количество смертей за игру
  var bg = (matchmas[4] / matchmas[2]).toFixed(2); // Среднее количество сломаных кроватей за игру
  var arr = [];
  var matr = [kd, gw, kg, dg, bg];
  var tab = arr.concat(matchmas, matr);
  return tab;
}
function MatchTab(tab2){
  var tab5 = [];
    for (var i = 0; i < 5; i++) {
      tab4 = ((tab2[i+15]-tab2[i+5])/tab2[i+5]*100).toFixed(1);
      if (tab4 < 0) { tab4 = '<span>' + tab4 + '% </span><span class="tag is-rounded is-danger"><i class="ri-arrow-down-line"></i></span>'; }
      if (tab4 > 0) { tab4 = '<span>' + tab4 + '% </span><span class="tag is-rounded is-success"><i class="ri-arrow-up-line"></i></span>'; }
      if (tab4 == 0) { tab4 = '<span>' + tab4 + '% </span><span class="tag is-rounded is-warning"><i class="ri-arrow-right-s-line"></i></span>'; }
      if (tab4 == 'NaN') { tab4 = '<span>0% </span><span class="tag is-rounded is-warning"><i class="ri-arrow-right-s-line"></i></span>'; }
      if (tab4 == 'Infinity') { tab4 = '<span>-% </span><span class="tag is-rounded is-warning"><i class="ri-arrow-right-s-line"></i></span>'; }
      tab5[i] = tab4;
    }
  return tab5;
}


// Украшательства
function CheckNick(){
  var url666 = 'https://miuno.ru/VimeCount/base/nicks.json';
  fetch(url666).then((response) => { return response.json();}).then((json) => {
    StarNick(json[0]);
  });
}
function StarNick(nicks) {
  var nicksValue = Object.values(nicks);
  var i = nicks.nicks;
  while(i){ if (inputIn.value == nicksValue[i]) { var a = 'true'; } i--; }
  if (a == 'true') {
    document.querySelector('#star').setAttribute("class", 'has-text-weight-medium tag is-warning has-text-white is-rounded m-1 is-medium');
  }
  else {
    document.querySelector('#star').setAttribute("class", 'has-text-weight-medium tag is-warning has-text-white is-rounded m-1 is-medium hide');
  }
} 
