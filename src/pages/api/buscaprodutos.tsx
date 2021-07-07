import fetch from 'node-fetch-cache'

var headers = new Headers();
headers.append("Authorization", `Bearer ${process.env.API_KEY}`);

var init: RequestInit = { method: 'GET', headers: headers, cache: 'force-cache' };

export default async function(req, res) {
    return new Promise<void>((resolve, reject) => {
        fetch(`${process.env.BASE_URL}/produtos`, init)
        .then(response => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            response.json().then(data => {
                var results = req.query.q ?
                data.filter(produto => produto.nome.toLowerCase().includes(req.query.q.toLowerCase())) : []
                results.length === 0 ? results = [] : null
                res.end(JSON.stringify({ results }));
            })
            resolve();
        })
        .catch(error => {
          res.json(error);
          res.status(405).end();
          return resolve();
        });
    });
};