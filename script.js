window.onload = function () {
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
    var _canvas = document.createElement('canvas');
    var _ctx = _canvas.getContext('2d');
    var img = []
    var fish = 30; // 顯示30條最多
    var fisharray = [];//魚
    var fishnum = [];// 魚的種類
    var gun = []
    var mousex; //滑鼠座標
    var mousey;
    var bullet = 10;//子彈初始化
    var webarray = [];//击中时显示网
    var bulletarray = [];//子彈
    var num = 0;//打中的数量，统计
    var firesound;
    var collsound;
    var bgsound;
    var diesound;
    var screenWidth = document.documentElement.clientWidth;
    var screenHeight = document.documentElement.clientHeight;
    canvas.width = screenWidth
    canvas.height = screenHeight
    loadImages(source, function (images) {
        img = images;
        init();
    })

    function init () {
        fishinit();
        bulletinit()
        guninit()
        webinit()
        soundinit()
        run()
    }
    function run () {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        bulletrun()
        gunrun()
        fishrun()
        hideweb();//显示网
        collision()
        window.requestAnimationFrame(run);
    }
    function soundinit () {
        bgsound = new sound("./sound/bg.mp3");
        firesound = new sound("./sound/bubble.mp3");
        collsound = new sound("./sound/coll.mp3");
        diesound = new sound("./sound/die.mp3");
        bgsound.play()
    }
    function sound (src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.currentTime = 0;
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }
    function guninit () {
        console.log(screenWidth)
        gun.x = screenWidth / 2;
        gun.y = screenHeight - 70;
        canvas.onmousemove = function (e) {
            var event = window.event || e;
            mousex = event.clientX - canvas.offsetLeft;
            mousey = event.clientY - canvas.offsetTop;
            // https://zh.wikipedia.org/wiki/Atan2
            gun.a = Math.atan2(mousey - gun.y, mousex - gun.x) + Math.PI / 2
        }
    }
    function bulletinit () {
        for (var i = 0; i < bullet; i++) {
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
            // firesound.stop();
            for (var i = 0; i < bulletarray.length; i++) {
                var zd = bulletarray[i];
                if (!zd.v) {
                    firesound.play();
                    zd.x = gun.x;
                    zd.y = gun.y;
                    zd.a = gun.a;
                    zd.v = true;
                    break;
                }
            }
        }
    }

    function fishinit () {
        for (var i = 0; i < fish; i++) {
            var temp = {
                x: "",//初始位置
                y: "",//
                a: "",//初始角度
                t: "",//改變的角度
                c: "",//保存當前frame
                f: "",//共有多少frames
                d: "",//死亡frame數
                o: "",//圖片
                w: "",//width
                h: "",//height
                p: "",//方向 0 左 1 右
                j: "",//積分
                v: false,//隱藏
                s: "",//速度
                // n: "",// 被打到的次數
                m: ""//打到死亡次數
            };
            fisharray.push(temp);
        }
        //n種魚
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
                f: 8,
                d: 4,
                o: img.fish2,
                w: 78,
                h: 64,
                j: 15,
                v: false,
                m: 1
            },
            {
                f: 8,
                d: 4,
                o: img.fish3,
                w: 72,
                h: 56,
                j: 15,
                v: false,
                m: 1
            },
            {
                f: 8,
                d: 4,
                o: img.fish4,
                w: 77,
                h: 59,
                j: 15,
                v: false,
                m: 1
            },
            {
                f: 8,
                d: 4,
                o: img.fish5,
                w: 107,
                h: 122,
                j: 20,
                v: false,
                m: 2
            },
            {
                f: 12,
                d: 4,
                o: img.fish6,
                w: 105,
                h: 79,
                j: 20,
                v: false,
                m: 2
            },
            {
                f: 10,
                d: 4,
                o: img.fish7,
                w: 92,
                h: 150,
                j: 20,
                v: false,
                m: 2
            },
            {
                f: 12,
                d: 4,
                o: img.fish8,
                w: 174,
                h: 126,
                j: 25,
                v: false,
                m: 3
            },
            {
                f: 12,
                d: 4,
                o: img.fish9,
                w: 166,
                h: 183,
                j: 25,
                v: false,
                m: 3
            },
            {
                f: 10,
                d: 4,
                o: img.fish10,
                w: 178,
                h: 187,
                j: 25,
                v: false,
                m: 3
            }
        ];
    }


    function bulletrun () {
        for (var i = 0; i < bulletarray.length; i++) {
            var zd = bulletarray[i];
            if (zd.v) {
                // 按照指定角度，
                zd.x += Math.sin(zd.a) * zd.s;
                zd.y += Math.cos(zd.a) * zd.s * -1;
                ctx.save();
                ctx.translate(zd.x, zd.y);// 設置原點
                ctx.rotate(zd.a);
                ctx.drawImage(img.zidan, 0, parseInt(zd.f) * 48, 30, 48, -15, -24, 30, 48);
                ctx.restore();
                if (zd.x > screenWidth || zd.x < -30 || zd.y < -48) {
                    // 超出範圍無效
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
    function gunrun () {
        ctx.save();
        ctx.translate(gun.x, gun.y);
        ctx.rotate(gun.a);
        ctx.drawImage(img.gun, 0, 0, 64, 64, -32, -30, 64, 64);
        ctx.fillRect(0, 0, 10, 10)
        ctx.restore();
    }

    function fishrun () {
        // 一定時間產生魚
        var genRate = 20; // 產生頻率
        var random = Math.random();
        if (random * genRate > genRate - 1) {
            // 不再螢幕上等於超出螢幕，重新派出
            for (var i = 0; i < fisharray.length; i++) {
                var fi = fisharray[i];
                if (!fi.v) {
                    var r = Math.round(Math.random() * (fishnum.length - 1));// 隨機取魚
                    fi.x = -fishnum[r].w;//初始位置
                    fi.y = rand(100, screenHeight - 100);//中間一部分位置
                    fi.a = rand(-20, 20);//初始角度+-20
                    fi.t = 0;// 游的時候改變角度
                    fi.c = rand(0, fishnum[r].f - fishnum[r].d - 1);//寶吋當前第幾frame
                    fi.f = fishnum[r].f;
                    fi.d = fishnum[r].d;
                    fi.o = fishnum[r].o;
                    fi.w = fishnum[r].w;//width
                    fi.h = fishnum[r].h;//height
                    fi.p = Math.round(Math.random() * 1);//0 左 1右
                    fi.j = fishnum[r].j;//積分
                    fi.v = true;//visible可見姓
                    fi.s = rand(1, 2);//速度
                    fi.m = fishnum[r].m;
                    if (fi.p == 1) {
                        fi.x = screenWidth;
                    }
                    break;
                }
            }
        }
        //魚擺動
        for (var i = 0; i < fisharray.length; i++) {
            var fi = fisharray[i];
            if (fi.v) {
                var speed = fi.s;//
                if (fi.p == 1) {
                    speed = -fi.s;
                }
                fi.x += Math.cos(fi.a * (Math.PI / 180)) * speed;
                fi.y += Math.sin(fi.a * (Math.PI / 180)) * speed;

                //改變擺動角度
                var changangle = 200;// 改變頻率
                var random = Math.random();
                if (random * changangle > changangle - 1 && fi.t == 0) {
                    fi.t = rand(-50, 50);
                }
                if (fi.t != 0) {
                    if (fi.t > fi.a) {
                        fi.a += 0.1;//度
                    } else if (fi.t < fi.a) {
                        fi.a -= 0.1;//度
                    }
                    else if (fi.t == fi.a) {
                        fi.t = 0;
                    }
                }
                // 螢幕外的循環使用
                if (fi.x > screenWidth + fi.w / 2) {
                    fi.v = false;
                }
                if (fi.p == 1 && fi.x < -fi.w * 2) {
                    fi.v = false;
                }

                // 中心旋轉，往左側上方推 50% 座標為 x:fi.x-fi.w/2,y:fi.y-fi.h/2
                ctx.save();
                if (fi.p == 1) {
                    //水平翻转后相当于右上角为原点，此时矩形实际坐标为x:fi.x，y:fi.y
                    ctx.translate(fi.x + fi.w / 2, fi.y + fi.h / 2);
                    ctx.scale(-1, 1);
                    ctx.rotate(-fi.a * (Math.PI / 180));
                } else {
                    ctx.translate(fi.x, fi.y);
                    ctx.rotate(fi.a * (Math.PI / 180));
                }
                if (fi.m > 0) {//0 表示死亡狀態
                    if (fi.c > fi.f - fi.d - 1) {
                        fi.c = 0;
                    } else {
                        fi.c += 0.1; // 尾巴擺動速度 0.1
                    }
                } else {
                    // 死亡時，當前frame小於總frame，到結束
                    if (fi.c < fi.f - 1) {
                        fi.c += 0.1;
                    } else {
                        //消失當前魚
                        fi.v = false;
                    }
                }
                ctx.drawImage(fi.o, 0, parseInt(fi.c) * fi.h, fi.w, fi.h, -fi.w / 2, -fi.h / 2, fi.w, fi.h);
                ctx.restore();
            }
        }
    }

    // 碰撞測試
    function check (A, B, C, D, E, F, G, H) {
        // 轉為對角線座標
        C += A, D += B, G += E, H += F;

        // 没有相交
        if (C <= E || G <= A || D <= F || H <= B) {
            return [0, 0, 0, 0, false];
        } else {

            var tmpX, tmpY;

            if (E > A) {
                tmpX = G < C ? [E, G] : [E, C];
            } else {
                tmpX = C < G ? [A, C] : [A, G];
            }

            if (F > B) {
                tmpY = H < D ? [F, H] : [F, D];
            } else {
                tmpY = D < H ? [B, D] : [B, H];
            }
            return [tmpX[0], tmpY[0], tmpX[1], tmpY[1], true];
        }
    }
    // 碰撞測試
    //打中
    function collision () {
        for (var i = 0; i < bulletarray.length; i++) {
            var zd = bulletarray[i];
            if (zd.v) {
                for (var j = 0; j < fisharray.length; j++) {
                    var fi = fisharray[j];
                    if (fi.v) {
                        var fx = fi.x;
                        var fy = fi.y;
                        if (fi.p == 0) {
                            fx = fi.x - fi.w / 2;
                            fy = fi.y - fi.h / 2;
                        }
                        if (check(zd.x - 15, zd.y - 24, 30, 48, fx, fy, fi.w, fi.h)[4]) {
                            // 顯示打中
                            collsound.play()
                            getweb(zd.x - 15, zd.y - 24);
                            zd.v = false;
                            // 判斷死亡狀態
                            fi.m--;
                            if (fi.m == 0) {
                                // 魚死亡
                                diesound.play()
                                fi.c = fi.f - fi.d;
                                num++;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    //網子初始化
    function webinit () {
        for (i = 0; i < 10; i++) {
            webarray.push({
                x: 0,
                y: 0,
                v: false,
                t: 0
            });
        }
    }
    //打中要噴網
    function getweb (x, y) {
        console.log('打中')
        for (i = 0; i < webarray.length; i++) {
            var wi = webarray[i];
            if (!wi.v) {
                wi.x = x;
                wi.y = y;
                wi.v = true;
                wi.t = 20;
                break;
            }
        }
    }
    //一定时间后让网消失
    function hideweb () {
        for (var i = 0; i < webarray.length; i++) {
            var wi = webarray[i];
            if (wi.v && wi.t > 0) {
                ctx.drawImage(img.web, 333, 372, 88, 88, wi.x - 44, wi.y - 44, 88, 88);
            }
            else {
                wi.v = false;
            }
            if (wi.t > 0) {
                wi.t--;
            }
        }
    }
    /*随机取两个值之间的值*/
    function rand (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function loadImages (source, cb) {
        var images = {};
        var count = 0;
        for (src in source) {
            images[src] = new Image()
            images[src].onload = function () {
                count++;
                if (count >= Object.keys(source).length) {
                    console.log('all loaded')
                    cb(images)
                }
            }
            images[src].src = `img/${source[src]}`
        }
    }
}