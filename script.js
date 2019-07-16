window.onload = function (){
    var source = {
        fish1: "fish1.png",
        fish2: "fish2.png",
        fish3: "fish3.png",
        fish4: "fish4.png",
        fish5: "fish5.png",
        fish6: "fish6.png",
        fish7: "fish7.png",
        fish8: "fish8.png",
        fish9: "fish9.png",
        fish10: "fish10.png",
        coinAni1: "coinAni1.png",
        coinAni2: "coinAni2.png",
        coinText: "coinText.png",
        bottom: "bottom.png",
        number_black: "number_black.png",
        web: "web.png",
        gun: "gun.png",
        zidan: "zidan.png"
    }
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d');
    var img = []
    var fish = 30; // 顯示30條最多
    var fisharray = [];//魚
    var fishnum = [];// 魚的種類
    var gun = []
    var mousex; //滑鼠座標
    var mousey;
    var bullet = 10;//子彈初始化
    var bulletarray = [];//子彈
    var screenWidth = document.documentElement.clientWidth;
    var screenHeight= document.documentElement.clientHeight;
    canvas.width = screenWidth
    canvas.height = screenHeight
    loadImages(source, function (images) {
        img = images;
        init();
    })

    function init(){
        fishinit();
        bulletinit()
        guninit()
        run()
    }
    function run(){
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        bulletrun()
        gunrun()
        fishrun()
        window.requestAnimationFrame(run);
    }
    function guninit(){
        console.log(screenWidth)
        gun.x = screenWidth/2;
        gun.y = screenHeight - 70;
        canvas.onmousemove = function (e) {
            var event = window.event || e;
            mousex = event.clientX - canvas.offsetLeft;
            mousey = event.clientY - canvas.offsetTop;
            // https://zh.wikipedia.org/wiki/Atan2
            gun.a = Math.atan2(mousey - gun.y, mousex - gun.x) + Math.PI / 2
        }
    }
    function bulletinit(){
        for(var i = 0; i < bullet; i ++){
            bulletarray.push({
                x: gun.x,
                y: gun.y,
                a: 0, // 角度
                s: 10, // 速度
                f: 1, // 保存子彈狀態 三張不同的圖 感覺連續是彈道
                v: false // 保存是否可用狀態 
            })
        }
        canvas.onmousedown = function (e) {
            var event = window.event || e;
            mousex = event.clientX - canvas.offsetLeft;
            mousey = event.clientY - canvas.offsetTop;
            for (var i = 0; i < bulletarray.length; i ++){
                var zd = bulletarray[i];
                if (!zd.v){
                    zd.x = gun.x;
                    zd.y = gun.y;
                    zd.a = gun.a;
                    zd.v = true;
                    break;
                }
            }
        }
    }

    function fishinit() {
        for (var i = 0; i < fish; i++) {
            var temp = {
                x: '',//初始位置
                y: '',
                a: '',//隨機角度
                t: '',//過程中改變的角度
                c: '',//保存當前第幾幀
                f: '',//共有多少frame 活動的幀數 = f - d
                d: '',//死亡有幾幀
                o: '',// object圖片
                w: '',// width寬度
                h: '',// height高度
                p: '',// position 0 左 1 右
                j: '',// 積分
                v: false,// visible可見
                s: '',// speed
                n: '',//被擊中次數
                m: ''//擊中幾次會死亡
            }
            fisharray.push(temp);
        }
        fishnum = [
            {
                f: 8,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish1,//图片object
                w: 55,//width
                h: 37,//height
                j: 10,//积分
                v: false,//visible可见性
                m: 1//击中多少次后死亡
            },
            {
                f: 8,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish2,//图片object
                w: 78,//width
                h: 64,//height
                j: 15,//积分
                v: false,//visible可见性
                m: 1//击中多少次后死亡
            },
            {
                f: 8,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish3,//图片object
                w: 72,//width
                h: 56,//height
                j: 15,//积分
                v: false,//visible可见性
                m: 1//击中多少次后死亡
            },
            {
                f: 8,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish4,//图片object
                w: 77,//width
                h: 59,//height
                j: 15,//积分
                v: false,//visible可见性
                m: 1//击中多少次后死亡
            },
            {
                f: 8,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish5,//图片object
                w: 107,//width
                h: 122,//height
                j: 20,//积分
                v: false,//visible可见性
                m: 2//击中多少次后死亡
            },
            {
                f: 12,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish6,//图片object
                w: 105,//width
                h: 79,//height
                j: 20,//积分
                v: false,//visible可见性
                m: 2//击中多少次后死亡
            },
            {
                f: 10,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish7,//图片object
                w: 92,//width
                h: 150,//height
                j: 20,//积分
                v: false,//visible可见性
                m: 2//击中多少次后死亡
            },
            {
                f: 12,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish8,//图片object
                w: 174,//width
                h: 126,//height
                j: 25,//积分
                v: false,//visible可见性
                m: 3//击中多少次后死亡
            },
            {
                f: 12,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish9,//图片object
                w: 166,//width
                h: 183,//height
                j: 25,//积分
                v: false,//visible可见性
                m: 3//击中多少次后死亡
            },
            {
                f: 10,//共有多少帧frame，活动的帧数＝f-d
                d: 4,//die打中状态共有多少帧
                o: img.fish10,//图片object
                w: 178,//width
                h: 187,//height
                j: 25,//积分
                v: false,//visible可见性
                m: 3//击中多少次后死亡
            }
        ];
    }

    function bulletrun() {
        for (var i = 0; i < bulletarray.length; i++) {
            var zd = bulletarray[i];
            if(zd.v){
                // 按照指定角度，
                zd.x += Math.sin(zd.a) * zd.s;
                zd.y += Math.cos(zd.a) * zd.s * -1;
                ctx.save();
                ctx.translate(zd.x, zd.y);//设置原点
                ctx.rotate(zd.a);
                ctx.drawImage(img.zidan, 0, parseInt(zd.f) * 48, 30, 48, -15, -24, 30, 48);
                ctx.restore();
                if (zd.x > screenWidth || zd.x < -30 || zd.y < -48) {
                    //超出范围后设置不可用
                    zd.v = false;
                    zd.f = 1;
                }
                zd.f += 0.3;
                if (zd.f > 3) {
                    zd.f = 0;
                }
            }
        }
    }
    function gunrun() {
        ctx.save();
        ctx.translate(gun.x, gun.y);
        ctx.rotate(gun.a);
        ctx.drawImage(img.gun, 0, 0, 64, 64, -32, -30, 64, 64);
        ctx.fillRect(0,0,10,10)
        ctx.restore();
    }

    function fishrun() {
        //每一定时间产生一条鱼
        var genRate = 100;
        var random = Math.random();
        // 應該只是要過濾掉最小0
        if (random * genRate > genRate - 1){
            for(var i = 0; i < fisharray.length; i++) {
              var fi = fisharray[i];
              if(!fi.v) {
                var r = Math.round(Math.random() * (fishnum.length - 1)); //某種魚
                fi.x = -fishnum[r].w;//初始位置
                fi.y = rand(100, screenHeight - 100); //隨機初始位置
                fi.a = rand(-20, 20); // 角度
                fi.t = 0; // 運動中改變角度
                fi.c = rand(0, fishnum[r].f - fishnum[r].d - 1);// 保存當前第幾貞curframe
                fi.f = fishnum[r].f; // 共有多少幀
                fi.d = fishnum[r].d;// 死亡有幾幀
                fi.o = fishnum[r].o;// 圖片object
                fi.w = fishnum[r].w;//width
                fi.h = fishnum[r].h;//height
                fi.p = Math.round(Math.random() * 1); //從哪邊出現 0左 1右
                fi.j = fishnum[r].j;// 積分
                fi.v = true;// visible
                fi.s = rand(1, 2);// 速度
                fi.m = fishnum[r].m;// 被擊中幾次死亡
                if (fi.p == 1) {
                  // 右邊出來就要改到從右邊生出
                  fi.x = screenWidth;
                }
                break;
              }
            }
        }
        for (var i = 0; i < fisharray.length; i++) {
          var fi = fisharray[i];
          if(fi.v){
            var speed = fi.s;
            if (fi.p === 1) {
              speed = -fi.s
            }
            fi.x += Math.cos(fi.a * (Math.PI / 180)) * speed;
            fi.y += Math.sin(fi.a * (Math.PI / 180)) * speed;
            //改变运动角度，每次改变都先让其运动完指定角度后才能第二次改变
            var changangle = 200; // 改變頻率
            var random = Math.random();
            if (random * changangle > changangle - 1 && fi.t == 0) {
          }
        }
      }
    }
/*随机取两个值之间的值*/
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function loadImages (source, cb) {
        var images = {};
        var count = 0;
        for(src in source){
            images[src] = new Image()
            images[src].onload = function () {
                count ++;
                if(count >= Object.keys(source).length){
                    console.log('all loaded')
                    cb(images)
                }
            }
            images[src].src = `img/${source[src]}`
        }
    }
}