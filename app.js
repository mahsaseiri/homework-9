window.onload = init;

function init() {
    var res;
    var addResult = document.getElementById('addResult');
    var updateResult = document.getElementById('updateResult');
    addResult.style.color = "red";
    updateResult.style.color = "red";
    document.getElementById('delete').addEventListener('click', function() {
        var temp = [];
        var chbox = document.getElementsByClassName('chbox');
        for (var i = 0; i < chbox.length; i++) {
            if (chbox[i].checked) {
                temp.push(res[i]);

            }
        }
        for (var j = 0; j < temp.length; j++) {
            for (var k = 0; k < res.length; k++) {
                if (temp[j] == res[k]) {
                    res.splice(k, 1);
                }
            }
        }
        build(res, "output");
    });
    document.getElementById('add').addEventListener('click', function() {
        $('.add').slideToggle();
    });
    document.getElementById('update').addEventListener('click', function() {
        $('.update').slideToggle();
    });
    document.getElementById('add2').addEventListener('click', function() {
        var task = document.forms[0].addTask.value;
        var st = document.forms[0].addStatus.value;
        if (st == "") {
            st = 'to do';
        }
        if (task == "") {
            addResult.innerHTML = "enter name of task";
        } else {
            addResult.innerHTML = "";
            var n = { "title": task, "status": st };
            console.log(n);
            res.push(n);
            build(res, "output");
        }

    });
    document.getElementById('update2').addEventListener('click', function() {
        var counter = 0;
        var s;
        var chbox = document.getElementsByClassName('chbox');
        for (var i = 0; i < chbox.length; i++) {
            if (chbox[i].checked) {
                s = i;
                counter++;
            }
        }
        if (counter == 1) {
            updateResult.innerHTML = '';
            res[s].status = document.getElementById('updateStatus').value;
            if (res[s].status == "") {
                res[s].status = "to do";
            }
        } else {
            updateResult.innerHTML = 'choose one task';
        }
        build(res, "output");
    });

    function loadJson(m, u, c) {
        var xHR = new XMLHttpRequest;
        xHR.open(m, u, true);
        xHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.response);
                c(res);
            }

        }
        xHR.send();
    }

    function build(d, id) {

        Handlebars.registerHelper('myif', function(a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }


        });
        var html = "";
        var source = document.getElementById("taskbar-template").innerHTML;
        var template = Handlebars.compile(source);
        html = template(d);
        document.getElementById(id).innerHTML = html;
    };
    loadJson("GET", "https://api.myjson.com/bins/13eftm", function(r) {
        build(r, "output");
    });
}