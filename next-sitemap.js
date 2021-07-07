module.exports = {
    siteUrl: 'https://movelparts.com.br',
    changefreq: 'daily',
    generateRobotsTxt: true,
    exclude: ['/404'],
    robotsTxtOptions: {
        policies: [{
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: '*',
                disallow: '/404'
            },
            {
                userAgent: '*',
                disallow: '/api'
            }
        ]
    }
}