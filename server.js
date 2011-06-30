/** Server:  node server.js */
(function(domain, port) {
        var d={ msgs:[] };
        require('http').createServer(function (req, res) {
                var r=[], p=require('url').parse(req.url,true).query||{}, op, type='text/javascript', i;
                if (p.a==='get') {
                        for(i=Math.max(0,d.msgs.length-50);i<d.msgs.length;i++) {
				m = d.msgs[i];
                                if (p.since ? (m.t>Math.round(p.since)) : (r.length<50)) r.push(m);
                        }
                        op = p.cb + '(' + JSON.stringify(r) + ')';
                }
                else if (p.a==='post') {
                        d.msgs.push({ text:p.text, user:p.user, t:Date.now() });
                        op = p.cb + '({"success":true})';
                }
                else {
                        type = 'text/html';
                        op = require('fs').readFileSync('index.html');
                }
                res.writeHead(200, {'Content-Type':type});
                res.end( op );
        }).listen(port, domain);
}('amoeba.im', 1337));
