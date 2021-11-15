if (!localStorage.getItem('user')) {
    localStorage.setItem('user', function() {
        return "xxxxxxxxxxyxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16)
        })
    }())
}