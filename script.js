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
        guninit()
        bulletinit()
        run()
    }
    function run(){
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        gunrun()
        bulletrun()
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
    function gunrun(){
        ctx.save();
        ctx.translate(gun.x, gun.y);
        ctx.rotate(gun.a);
        ctx.drawImage(img.gun, 0, 0, 64, 64, -32, -30, 64, 64);
        ctx.fillRect(0,0,10,10)
        ctx.restore();
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