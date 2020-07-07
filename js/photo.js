var photoobj = {
    // page: 1,
    // offset: 20,
    init: function () {
        var that = this;
        console.log('ccc')
        $.getJSON("/photo/main.json", function (data) {
            data[0].list = data[0].list.reverse()
            data[0].list.map(item => {
                that.render(that.page, item);
            })

            that.scroll(data[0]);
        });
    },

    render: function (page, data) {
        // var begin = (page - 1) * this.offset;
        // var end = page * this.offset;
        // if (begin >= data.length) return;
        console.log(data)
        var html, li = "<h1>" + data['name'] + "</h1>";
        for (var i = 0; i < data['list'].length; i++) {
            if (i === 0) {
                li += '<div class="img-box">'
            }

            li += '<a class="img-bg" rel="example_group" href="/photo' + data['list'][i]['src'] + '?raw=true">' + 
                '<img data-src="/photo' + data['list'][i]['src'] + '?raw=true" class="lazyload"/>' +
                '</a>';

            if (i === data['list'].length-1) {
                li += '</div>';
            }
        }

        $(".img-box-ul").append(li);
        // $(".img-box-ul").lazyload();
        // $("a[rel=example_group]").fancybox();
    },

    scroll: function (data) {
        var that = this;
        // $(window).scroll(function() {
        //     var windowPageYOffset = window.pageYOffset;
        //     var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
        //     var sensitivity = 0;

        //     var offsetTop = $(".instagram").offset().top + $(".instagram").height();

        //     if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
        //         that.render(++that.page, data);
        //     }
        // })
    }
}
photoobj.init()