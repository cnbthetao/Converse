
// class xuanfu {
//     constructor() {
//         this.header = $('#header');
//         this.headerbot = $('#header-bot');
//     }

//     init() {
//         this.header.on('click', () => {
//             let $top = $(window).scrollTop();
//             if ($top = 300) {
//                 this.header.stop(true).animate({
//                     top: -500
//                 });
//             } else if ($top > 300) {
//                 this.header.stop(true).animate({
//                     top: 0
//                 })
//                 this.header.css(height,500);
//             }
//         })
//     }

// }
function ff() {
    let $top = $(window).scrollTop();
    if ($top <= 200) {
        $('#header').stop(true).css({
            height: 100,
            top: 0
        });
        $('.header-bot').stop(true).css({
            height: 70,
            top: 100
        });
        istop300 = true;
    }
    else {
        if (istop300) {
            $('#header').css('height', 0);
            $('.header-bot').css({
                height: 0,
                top: 0
            });
            istop300 = false;

        }
        $('#header').stop(true).animate({
            top: 0,
            height: 80
        });
        $('.header-bot').stop(true).animate({
            top: 80,
            height: 50
        })
    }
}
let istop300 = false;
ff()

function toppull() {
    $(window).on('scroll', ff)

}


class chating {
    constructor() {
        this.chattinglink = $('#chatting_link')
    }

    init() {
        this.chat()
    }
    chat() {
        let pass = 0;
        $(window).on('scroll', () => {
            let $top = $(window).scrollTop();

            let now = new Date().getTime();
            //let timer = null;
            if (now - pass > 200) {
                this.chattinglink.animate({
                    'top': 200 + $top
                }, 300);
                pass = now;
            }
        })
    }


}



class render {
    constructor() {
        this.box = $('.section_1_inner1_content')
    }

    init() {
        let _this = this;
        $.ajax({
            url: 'http://10.31.152.25/Converse/php/index1.php',
            dataType: 'json'
        }).done((data) => {
            let arr = data;
            let newarr = [];
            for (let i = 0; i < 4; i++) {
                newarr[i] = [];
                for (let j = 0; j < 4; j++) {
                    newarr[i][j] = arr.shift();
                }
            }
            // console.log(newarr);
            
            $.each(newarr, function (index) {
                // console.log(newarr[index])
                let $strhtml = ''
                $strhtml += '<ul>'
                $.each(newarr[index], function (index, value) {
                    $strhtml += `
                  <li>
                     <a href="details.html?sid=${value.sid}">
                     <img src="${value.url}" alt="">
                     </a>
                     <a class="p-l-name" href="">${value.title}</a>
                     <a class="p-l-price">￥${value.price}</a>
                  </li>
                         `
                });
                $strhtml += '</ul>';
                _this.box.eq(index).html($strhtml);
            })
            

            // let $strhtml = '<ul>';
            // $.each(data, function (index, value) {
            //     $strhtml += `
            //   <li>
            //   <a href="details.html?sid=${value.sid}">
            //   <img src="${value.url}" alt="">
            //   </a>

            //   <a class="p-l-name" href="">${value.title}</a>

            // <a class="p-l-price">￥${value.price}</a>

            //     </li>
            //     `
            // });

            // $strhtml += '</ul>';
            // this.box.html($strhtml);

        })
    }
}



class floating {
    constructor() {
        this.float = $('.section_1_inner1_content');
        this.but = $('.section_1_wrap_title ul li')
    }
    init() {
        let _this = this;
        (function move() {
            _this.but.hover(function () {
                _this.float.hide();
                _this.float.eq($(this).index()).show();

            })
        })();
    }

}



function fn() {
    new chating().init();
    new render().init();
    new floating().init();
}

export {
    toppull,
    fn
}