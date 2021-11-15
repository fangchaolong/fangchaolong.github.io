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
    renderarr: function(data) {
        var str = ''
        for(var i = 0;i < data.length;i++) {
            if (i === 0) {
                str = '<div class="img_lie">'
            }

            str += '<a class="img-bg" rel="example_group" href="/photo' + data[i]['src'] + '?raw=true">' + 
            '<img data-src="/photo' + data[i]['src'] + '?raw=true" class="lazyload"/>' +
            '</a>';

            if (i === data.length-1) {
                str += '</div>';
            }
        }
        return str
    },
    render: function (page, data) {
        // var begin = (page - 1) * this.offset;
        // var end = page * this.offset;
        // if (begin >= data.length) return;
        console.log(data)
        var arr1 = [],arr2 = [],arr3 = [],arr4 = [];
        var html, li = "<h1>" + data['name'] + "</h1>";
        for (var i = 0; i < data['list'].length; i++) {
            if (i%4 === 0) {
                arr1.push(data['list'][i])
            } else if (i%4 === 1) {
                arr2.push(data['list'][i])
            } else if (i%4 === 2) {
                arr3.push(data['list'][i])
            } else {
                arr4.push(data['list'][i])
            }
        }
        li += '<div class="img-box">'
        li += this.renderarr(arr1)
        li += this.renderarr(arr2)
        li += this.renderarr(arr3)
        li += this.renderarr(arr4)
        li += '</div>'
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