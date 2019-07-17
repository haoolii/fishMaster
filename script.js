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
        webinit()
        soundinit()
        run()
    }
    function run(){
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        bulletrun()
        gunrun()
        fishrun()
        hideweb();//显示网
        collision()
        window.requestAnimationFrame(run);
    }
    function soundinit(){
      bgsound = new sound("./sound/bg.mp3");
      firesound = new sound("./sound/bubble.mp3");
      collsound = new sound("./sound/coll.mp3");
      diesound = new sound("./sound/die.mp3");
      bgsound.play()
    }
    function sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function(){
        this.sound.currentTime=0;
        this.sound.play();
      }
      this.stop = function(){
        this.sound.pause();
      }
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
            // firesound.stop();
            for (var i = 0; i < bulletarray.length; i ++){
                var zd = bulletarray[i];
                if (!zd.v){
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

    function fishinit() {
      for (var i = 0; i < fish; i++) {
          var temp = {
              x: "",//初始位置
              y: "",//
              a: "",//初始随机角度angle
              t: "",//运动过程改变的角度
              c: "",//保存当前第几帧curframe
              f: "",//共有多少帧frame，活动的帧数＝f-d
              d: "",//die打中状态共有多少帧
              o: "",//图片object
              w: "",//width
              h: "",//height
              p: "",//position方向0从左出来，1从右出来
              j: "",//积分
              v: false,//visible可见性
              s: "",//游动速度speed
              // n: "",//被击中的次数
              m: ""//击中多少次后死亡
          };
          fisharray.push(temp);
      }
      //n种不同的鱼
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
      var genRate = 20; //产生的频率
      var random = Math.random();
      if (random * genRate > genRate - 1) {
          //去数组里查找不在屏幕上的鱼，修改状态重新出来
          for (var i = 0; i < fisharray.length; i++) {
              var fi = fisharray[i];
              if (!fi.v) {
                  var r = Math.round(Math.random() * (fishnum.length - 1));//n种鱼中随机取一条
                  fi.x = -fishnum[r].w;//初始位置
                  fi.y = rand(100, screenHeight - 100);//中间一部分位置
                  fi.a = rand(-20, 20);//初始随机角度angle +-20
                  fi.t = 0;//运动过程改变的角度
                  fi.c = rand(0, fishnum[r].f - fishnum[r].d - 1);//保存当前第几帧curframe
                  fi.f = fishnum[r].f;//共有多少帧frame，活动的帧数＝f-d
                  fi.d = fishnum[r].d;//die打中状态共有多少帧
                  fi.o = fishnum[r].o;//图片object
                  fi.w = fishnum[r].w;//width
                  fi.h = fishnum[r].h;//height
                  fi.p = Math.round(Math.random() * 1);//position方向0从左出来，1从右出来
                  fi.j = fishnum[r].j;//积分
                  fi.v = true;//visible可见性
                  fi.s = rand(1, 2);//游动速度speed
                  fi.m = fishnum[r].m;//击中多少次后死亡
                  if (fi.p == 1) {
                      //从右边出来时修改下
                      fi.x = screenWidth;
                  }
                  break;
              }
          }
      }
      //鱼运动
      for (var i = 0; i < fisharray.length; i++) {
          var fi = fisharray[i];
          if (fi.v) {
              var speed = fi.s;//
              if (fi.p == 1) {
                  speed = -fi.s;
              }
              fi.x += Math.cos(fi.a * (Math.PI / 180)) * speed;
              fi.y += Math.sin(fi.a * (Math.PI / 180)) * speed;

              //改变运动角度，每次改变都先让其运动完指定角度后才能第二次改变
              var changangle = 200;//改变频率
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
              //屏幕外的回归循环待使用
              if (fi.x > screenWidth + fi.w / 2) {
                  fi.v = false;
              }
              if (fi.p == 1 && fi.x < -fi.w * 2) {//向左时减去鱼的宽
                  fi.v = false;
              }
              //旋转时要以中心点旋转，平移到当前点，画图时再向左上移动矩形宽高的一半，此时矩形的实际坐标为x:fi.x-fi.w/2,y:fi.y-fi.h/2
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
              if (fi.m > 0) {//0表示死亡状态
                  if (fi.c > fi.f - fi.d - 1) {//从0开始，所以这里减1
                      fi.c = 0;
                  } else {
                      fi.c += 0.1; //游动时尾巴摆动的速度
                  }
              } else {
                  //死亡时,当前帧小于总帧数
                  if (fi.c < fi.f - 1) {
                      fi.c += 0.1;
                  } else {
                      //消失当前鱼
                      fi.v = false;
                      //产生金币
                      // goldadd(fi.x, fi.y);
                  }
              }
              ctx.drawImage(fi.o, 0, parseInt(fi.c) * fi.h, fi.w, fi.h, -fi.w / 2, -fi.h / 2, fi.w, fi.h);
              ctx.restore();
          }
      }
  }

        //碰撞检测
        //分别为两个矩形的坐标及宽高
        //如果没有相交，返回[0,0,0,0,false]
        //相交返回[x0,y0,x1,y1,true],相交矩形坐标及对角坐标
        function check(A, B, C, D, E, F, G, H) {
          // 转为对角线坐标
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

      //两个碰撞物体的对象，位置及宽高
      function checkdetail(ao, ax, ay, aw, ah, bo, bx, by, bw, bh) {
          var rect = check(ax, ay, aw, ah, bx, by, bw, bh);
          if (rect[4]) {
              console.log('test: ')
              console.log
              _ctx.drawImage(ao, 0, 0, aw, ah);
              _ctx.globalCompositeOperation = 'source-in';
              _ctx.drawImage(bo, bx - ax, by - ay, bw, bh);
              var data = _ctx.getImageData(rect[0] - ax, rect[1] - ay, rect[2] - rect[0], rect[3] - rect[1]).data;
              _ctx.clearRect(0, 0, 200, 200);
              _ctx.globalCompositeOperation = 'source-over';
              for (var i = 3; i < data.length; i += 4) {
                  if (data[i])
                      return true;  // 碰撞
              }
              return false;
          }
      }
    // 碰撞測試
    //打中
        function collision() {
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
                            // if (checkdetail(img.zidan, zd.x - 15, zd.y - 24, 30, 48, fi.o, fx, fy, fi.w, fi.h)) {
                                //显示打中，
                                collsound.play()
                                getweb(zd.x - 15, zd.y - 24);
                                zd.v = false;
                                //判断死亡状态
                                fi.m--;
                                if (fi.m == 0) {
                                    //鱼死亡,消失放在前面鱼运动那
                                    diesound.play()
                                    fi.c = fi.f - fi.d;
                                    //显示所得积分
                                    // getshowintegr(fi.x, fi.y, fi.j);
                                    //增加积分
                                    // getintegr(fi.j);
                                    num++;
                                    // document.getElementById("num").innerHTML = num;
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }

        //网初始
        function webinit() {
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
        function getweb(x, y) {
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
        function hideweb() {
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