var photoobj = {
    page: 1,
    offset: 20,
    init: function () {
        var that = this;
        console.log('ccc')
        $.getJSON("/photo/main.json", function (data) {
            console.log(data)
            that.render(that.page, data);

            that.scroll(data);
        });
    },

    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            li += '<li><div class="img-box">' +
                '<a class="img-bg" rel="example_group" href="https://github.com/fangchaolong/fangchaolong.github.io/blob/master/photo' + data[i] + '?raw=true"></a>' +
                '<img data-src="https://github.com/fangchaolong/fangchaolong.github.io/blob/master/photo' + data[i] + '?raw=true" class="lazyload"/>' +
                '</li>';
        }

        $(".img-box-ul").append(li);
        $(".img-box-ul").lazyload();
        $("a[rel=example_group]").fancybox();
    },

    scroll: function (data) {
        var that = this;
        $(window).scroll(function() {
            var windowPageYOffset = window.pageYOffset;
            var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
            var sensitivity = 0;

            var offsetTop = $(".instagram").offset().top + $(".instagram").height();

            if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                that.render(++that.page, data);
            }
        })
    }
}
photoobj.init()