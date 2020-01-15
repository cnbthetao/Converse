class Details {
    constructor() {
        this.sid = location.search.substring(1).split('=')[1];
        this.spic = $('.zoomPad');
        this.productname = $('#product-name');
        this.productprice = $('.product-price');
        this.productthumblist = $('.product-thumb-list')
    }
    init() {
        $.ajax({
            url: 'http://10.31.152.25/Converse/php/details.php',
            data: {
                sid: this.sid
            },
            dataType: 'json'
        }).done((objdata) => {
            $('.zoomPad img').attr('src', objdata.url.replace(/B_NEW/,'H_NEW'));
            $('.product-name span').html(objdata.title);
            $('.product-price span').html('￥' + objdata.price);

            let piclist = objdata.urls.split(',');
            let $strhtml = '';
            $.each(piclist, function (index, value) {
                $strhtml += `<a><img src="${value}"/></a>`
            });
            this.productthumblist.html($strhtml)

        });
    }
}



class Fdj {
    constructor() {
        this.wrap = $('.details-product-img');
        this.spic = $('.zoomPad');
        this.sf = $('#sf');
        this.bf = $('.bf');
        this.bpic = $('#bpic');
        this.ulmove = $('.product-thumb-list');
        this.list = $('.product-thumb-list a')
        this.bpic=$('.bpic')
    }

    init() {
        let _this = this;
        this.spic.hover(() => {
            $('#sf,.bf').css('visibility', 'visible');

            this.sf.css({
                width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
                height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight()
            });
            
            this.bili = this.bpic.outerHeight() / this.spic.outerHeight();
            console.log(this.bili)
            this.spic.on('mousemove', (e) => {
                let $l = e.pageX - this.wrap.offset().left - this.sf.width() / 2-30;
                let $t = e.pageY - this.wrap.offset().top - this.sf.height() / 2-50;
                if ($l < 0) {
                    $l = 0;
                } else if ($l >= this.spic.outerWidth() - this.sf.outerWidth()) {
                    $l = this.spic.outerWidth() - this.sf.outerWidth();
                }
                if ($t < 0) {
                    $t = 0;
                } else if ($t >= this.spic.outerHeight() - this.sf.outerHeight()) {
                    $t = this.spic.outerHeight() - this.sf.outerHeight();
                }
                this.sf.css({
                    left: $l,
                    top: $t
                });
                this.bpic.css({
                    left: -$l * this.bili,
                    top: -$t * this.bili
                });

            });
        }, () => {
            $('#sf,.bf').css('visibility', 'hidden');
        });
        this.ulmove.on('click','a',function(){
            let $imgurl=$(this).find('img').attr('src');
            _this.spic.find('img').attr('src',$imgurl.replace(/S_NEW/,'H_NEW'));
            _this.bpic.attr('src',$imgurl.replace(/S_NEW/,'L_NEW'));
        })
    }
}





function fd() {
    new Details().init();
    new Fdj().init();
}

export {
    fd
}