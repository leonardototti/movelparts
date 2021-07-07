import React, { useState } from 'react'
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

var headers = new Headers();
headers.append("Authorization", `Bearer ${process.env.API_KEY}`);

var init: RequestInit = { method: 'GET', headers: headers, cache: 'force-cache' };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    var fields: any = [];

    fields.push(
        {
            loc: 'https://movelparts.com.br/',
            lastmod: new Date().toISOString()
        },
        {
            loc: 'https://movelparts.com.br/produtos',
            lastmod: new Date().toISOString()
        },
        {
            loc: 'https://movelparts.com.br/empresa',
            lastmod: new Date().toISOString()
        },
        {
            loc: 'https://movelparts.com.br/contato',
            lastmod: new Date().toISOString()
        },
        {
            loc: 'https://movelparts.com.br/representantes',
            lastmod: new Date().toISOString()
        },
    );

    await fetch(`${process.env.BASE_URL}/produtos`, init).then(async response => {
        await response.json().then(async data => {
            await data.map((url: any) => {
                fields.push({
                    loc: `https://movelparts.com.br/produtos/${url.slug}`,
                    lastmod: new Date().toISOString()
                })
            })
        })
    });

    return getServerSideSitemap(ctx, fields);
}

export default () => { }