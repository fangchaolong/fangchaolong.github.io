(function() {
    Array.prototype.distinct = function() {
    var arr = this,
     result = [],
     i,
     j,
     len = arr.length;
    for (i = 0; i < len; i++) {
     for (j = i + 1; j < len; j++) {
     if (arr[i].name === arr[j].name) {
      j = ++i;
     }
     }
     result.push(arr[i]);
    }
    return result;
    }
    // 主业务代码
    var fs = require("fs");
    var async = require('async');
    var obj = [];
    var search = function(src) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function(err, paths) {
     if (err) {
     throw err;
     }
     paths.forEach(function(path) {
     var _src = src + '/' + path;
     fs.stat(_src, function(err, st) {
      if (err) {
      throw err;
      }
      // 判断是否为文件
      if (st.isFile()) {
      async.forEachLimit(obj, 1000, function(item, callback) {
       if (src.match(new RegExp(item.name))) {
    
       item.list.forEach(function(iv) {
        if (src.match(new RegExp(iv.name))) {
        iv.list.push({
         name: path.split('.')[0],
         src: _src.substr(_src.indexOf(src)+8)
        })
    
        }
    
       })
       }
       callback(null, item)
      })
      obj = obj.distinct();
      fs.writeFile("main.json", JSON.stringify(obj), "utf-8", (error) => {
       //监听错误，如正常输出，则打印null
       if (error == null) {
       obj = null;
    
       }
    
      });
      }
      // 如果是目录则递归调用自身
      else if (st.isDirectory()) {

      if (obj.length <= 0) {
       obj.push({
       name: path,
       list: []
       })
      } else {
       var value = paths;
       async.forEachLimit(obj, 1000, function(item, callback) {
       //如果数组里已有
       if (src.match(new RegExp(item.name))) {
        item.list.push({
        name: path,
        list: []
        })
       } else {
        value.forEach(function(vv) {
        console.log(vv, item.name)
        if (vv == item.name) {
         obj.push({
         name: path,
         list: []
         })
        } else {}
        })
       }
       callback(null, item)
       }, function(err) {
       if (err) throw err;
       })
      }
      exists(_src, search);
    
      }
     });
     });
    });
    };
    var exists = function(src, callback) {
    callback(src);
    };
    exists('../photo', search);
   })();