      var inputIn = document.querySelector('.input-in');
      let search = document.querySelector('.search');
      search.onclick = function (){
          getPlayer();
          id = 'none';
      }

      document.addEventListener( 'keyup', event => {
      if( event.code === 'Enter' ) 
        getPlayer();
      });






    function getPlayer() {
    var url = 'https://api.vimeworld.ru/user/name/' + inputIn.value;
    fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
//          GiveID2(json[0].id)
          GiveID(json[0].id)
          GiveMore(json[0].username, json[0].level, json[0].levelPercentage, json[0].rank)
          GiveGuild(json[0].guild, json[0].guild.name, json[0].guild.id, json[0].guild.avatar_url)
        });
      }
    });
  }


    function GiveID(id) {
    document.querySelector('#id').innerHTML = id;
    var playerid = id;
    console.log(playerid);
    var url = 'https://api.vimeworld.ru/user/' + playerid + '/stats';
    fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          BW(json.stats.BW.global.kills, json.stats.BW.global.deaths, json.stats.BW.global.games, json.stats.BW.global.wins, json.stats.BW.global.bedBreaked, json.stats.BW.season.monthly.kills, json.stats.BW.season.monthly.deaths, json.stats.BW.season.monthly.games, json.stats.BW.season.monthly.wins, json.stats.BW.season.monthly.bedBreaked)
          SW(json.stats.SW.global.kills, json.stats.SW.global.deaths, json.stats.SW.global.games, json.stats.SW.global.wins, json.stats.SW.global.winStreak, json.stats.SW.season.monthly.kills, json.stats.SW.season.monthly.deaths, json.stats.SW.season.monthly.games, json.stats.SW.season.monthly.wins, json.stats.SW.season.monthly.winStreak)
          CP(json.stats.CP.global.kills, json.stats.CP.global.deaths, json.stats.CP.global.games, json.stats.CP.global.wins, json.stats.CP.global.resourcePointsBreaked, json.stats.CP.season.monthly.kills, json.stats.CP.season.monthly.deaths, json.stats.CP.season.monthly.games, json.stats.CP.season.monthly.wins, json.stats.CP.season.monthly.resourcePointsBreaked)
          Bridge(json.stats.BRIDGE.global.games, json.stats.BRIDGE.global.wins, json.stats.BRIDGE.global.kills, json.stats.BRIDGE.global.deaths, json.stats.BRIDGE.global.points)
        });
      }
    });
    }
    
    function GiveMore(username, level, levelPercentage, rank) {
      document.querySelector('#nick').innerHTML = username;
      document.querySelector('#lvl').innerHTML = level;
      document.querySelector('#rank').innerHTML = rank;
      var colorR = document.querySelector('#rank');
      if (rank == 'PLAYER') {colorR.style.color = '#1266F1';}
      if (rank == 'VIP') {colorR.style.color = '#00B74A';}
      if (rank == 'PREMIUM') {colorR.style.color = '#39C0ED';}
      if (rank == 'HOLY') {colorR.style.color = '##FFA900';}
      if (rank == 'IMMORTAL') {colorR.style.color = '#B23CFD';}
      if (rank == 'BUILDER' || rank == 'SRBUILDER' || rank == 'MAPLEAD') {colorR.style.color = '#00B74A';}
      if (rank == 'YOUTUBE') {colorR.style.color = '#D32F2F';}
      if (rank == 'DEV' || rank == 'ORGANIZER' || rank == 'ADMIN') {colorR.style.color = '#00BCD4';}
      if (rank == 'MODER' || rank == 'WARDEN' || rank == 'CHIEF') {colorR.style.color = '#304FFE';}
      var elementg = document.querySelector('.guild');
        elementg.style.visibility = 'hidden';
      var barr = (levelPercentage*100) + '%';
      var pbar = document.querySelector('.progress-bar');
      pbar.style.width = barr;
      var progressLvl = levelPercentage*100;
      progressLvl_str=progressLvl.toFixed(1);
      document.querySelector('#progress').innerHTML = progressLvl_str + '%';
      Skin(username);
    }

   function GiveGuild(guild, name, id, avatar_url) {
      var elementg = document.querySelector('.guild');
      if(guild == "null") {
      }
      else {
        elementg.style.visibility = 'visible';
      }
      document.querySelector('#name').innerHTML = name;
      var gavatar = document.querySelector('#avatar_url');
      gavatar.setAttribute("src", avatar_url);
      gavatar.style.width = '32px';
      gavatar.style.height = '32px';
   }

   function guilderror(){
      var gavatar = document.querySelector('#avatar_url');
      gavatar.setAttribute("src", 'https://vimeworld.ru/images/guild.png');
      gavatar.style.width = '32px';
      gavatar.style.height = '32px';
  }

    function Skin(username){
          var skk = document.querySelector('#skin');
          skk.setAttribute("src", 'http://skin.vimeworld.ru/helm/' + username + '/64.png');
          var skkkkk = 'url(https://skin.vimeworld.ru/raw/skin/' + username + '.png)';
            for (var i = 0; i < 71; i++) {
                var skin3d = document.querySelectorAll('.st3d')[i];

                skin3d.style.backgroundImage = skkkkk;
            }

//          var cppppp = 'url(https://skin.vimeworld.ru/raw/cape/' + username + '.png)';
//              for (var i = 0; i < 7; i++) {
//               var cape3d = document.querySelectorAll('.ct3d')[i];
//               cape3d.style.backgroundImage = cppppp;
//           }
          var skindw = document.querySelector('#skindownload');
          skindw.setAttribute("href", 'https://skin.vimeworld.ru/raw/skin/' + username + '.png');
          var capedw = document.querySelector('#capedownload');
          capedw.setAttribute("href", 'https://skin.vimeworld.ru/raw/cape/' + username + '.png');
    }

    function BW(kills, deaths, games, wins, bedBreaked, mkills, mdeaths, mgames, mwins, mbedBreaked) {
      var bwclassg = ['#bwkillsglobal', '#bwdeathsglobal', '#bwgamesglobal', '#bwwinsglobal', '#bwbedBreakedglobal', '#bwkdglobal', '#bwgwglobal', '#bwkgglobal', '#bwdgglobal', '#bwbgglobal'];
      var bwg =  Match([kills, deaths, games, wins, bedBreaked]);
      for (var i = 0; i < 10; i++) {
        if (bwg[i] == 'NaN') {bwg[i] = 0}
        if (bwg[i] == 'Infinity') {bwg[i] = '-'}
        document.querySelector(bwclassg[i]).innerHTML = bwg[i];
      }
      var bwclassm = ['#bwkillsmonthly', '#bwdeathsmonthly', '#bwgamesmonthly', '#bwwinsmonthly', '#bwbedBreakedmonthly', '#bwkdmonthly', '#bwgwmonthly', '#bwkgmonthly', '#bwdgmonthly', '#bwbgmonthly'];
      var bwm =  Match([mkills, mdeaths, mgames, mwins, mbedBreaked]);
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
    }

    function SW(kills, deaths, games, wins, winStreak, mkills, mdeaths, mgames, mwins, mwinStreak) {
      var swclassg = ['#swkillsglobal', '#swdeathsglobal', '#swgamesglobal', '#swwinsglobal', '#swwinStreakglobal', '#swkdglobal', '#swgwglobal', '#swkgglobal', '#swdgglobal'];
      var swg = Match([kills, deaths, games, wins, winStreak]);
      for (var i = 0; i < 9; i++) {
        if (swg[i] == 'NaN') {swg[i] = 0}
        if (swg[i] == 'Infinity') {swg[i] = '-'}
        document.querySelector(swclassg[i]).innerHTML = swg[i];
      }
      var swclassm = ['#swkillsmonthly', '#swdeathsmonthly', '#swgamesmonthly', '#swwinsmonthly', '#swwinStreakmonthly', '#swkdmonthly', '#swgwmonthly', '#swkgmonthly', '#swdgmonthly'];
      var swm = Match([mkills, mdeaths, mgames, mwins, mwinStreak]);
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
    }

    function CP(kills, deaths, games, wins, resourcePointsBreaked, mkills, mdeaths, mgames, mwins, mresourcePointsBreaked) {
      var cpclassg = ['#cpkillsglobal', '#cpdeathsglobal', '#cpgamesglobal', '#cpwinsglobal', '#cpresourcePointsBreakedglobal', '#cpkdglobal', '#cpgwglobal', '#cpkgglobal', '#cpdgglobal', '#cpbgglobal']; 
      var cpg = Match([kills, deaths, games, wins, resourcePointsBreaked]);
      for (var i = 0; i < 10; i++) {
        if (cpg[i] == 'NaN') {cpg[i] = 0}
        if (cpg[i] == 'Infinity') {cpg[i] = '-'}
        document.querySelector(cpclassg[i]).innerHTML = cpg[i];
      }
      var cpclassm = ['#cpkillsmonthly', '#cpdeathsmonthly', '#cpgamesmonthly', '#cpwinsmonthly', '#cpresourcePointsBreakedmonthly', '#cpkdmonthly', '#cpgwmonthly', '#cpkgmonthly', '#cpdgmonthly', '#cpbgmonthly']; 
      var cpm = Match([mkills, mdeaths, mgames, mwins, mresourcePointsBreaked]);
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
    }
    function Bridge (games, wins, kills, deaths, points){
      var brclass = ['#brkills', '#brdeaths', '#brgames', '#brwins', '#brpoints', '#brkd', '#brgw', '#brkg', '#brdg', '#brpg'];
      var br = Match([kills, deaths, games, wins, points]);
      for (var i = 0; i < 10; i++) {
        if (br[i] == 'NaN') {br[i] = 0}
        if (br[i] == 'Infinity') {br[i] = '-'}
        document.querySelector(brclass[i]).innerHTML = br[i];
      }
    }
    function Match(matchmas){
      //kills - matchmas[0] deaths - matchmas[1] games - matchmas[2] wins - matchmas[3] points, resourcePointsBreaked, winStreak, bedBreaked - matchmas[4]
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
        if (tab4 < 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-danger rounded-pill"><i class="bi bi-caret-down-fill"></i></span>'; }
        if (tab4 > 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-success rounded-pill"><i class="bi bi-caret-up-fill"></i></span>'; }
        if (tab4 == 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-warning rounded-pill"><i class="bi bi-caret-right-fill"></i></span>'; }
        tab5[i] = tab4;
      }
      return tab5;
    }