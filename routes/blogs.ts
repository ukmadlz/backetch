import "https://deno.land/x/dotenv/load.ts";
import { parse } from "https://deno.land/x/xml/mod.ts";
import { createHash } from "https://deno.land/std@0.100.0/hash/mod.ts"

import IArticle from "../interfaces/article.ts";

const hashId = (type: string, reference: string) => {
    const hash = createHash("md5");
    hash.update(`${type}:${reference}`);
    return hash.toString();
}

const devTo = async () => {
    const type = 'devto'
    const url = "https://dev.to/api/articles/me"
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached\\
        headers: {
            'api-key': String(Deno.env.get('DEV_TO_API_KEY'))
        }
      })
    const articles = await response.json();
    return articles.filter((article: any) => {
        return article.published;
    })
    .map((article: any): IArticle => {
        const {
            id,
            title,
            description,
            url,
            published_timestamp,
        } = article;
        return {
            id: hashId(type, id),
            title,
            description,
            url,
            timestamp: published_timestamp,
            type,
            source: type,
        }
    })
}

const wordpress = async (url: string, source: string) => {
    const type = "wordpress";
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      })
    const rssString = await response.text();
    const wordpressData: any = await parse(rssString);
    return ((Array.isArray(wordpressData.rss.channel.item)) ? wordpressData.rss.channel.item : [wordpressData.rss.channel.item]).map((article: any) => {
        const {
            title,
            pubDate,
            description,
            link
        } = article;
        return {
            id: hashId(type, link),
            title,
            description,
            url: link,
            timestamp: new Date(pubDate),
            type,
            source
        }
    })
}

export default async function (context: any) {
    const logzArticles = await wordpress("https://logz.io/author/mike-elsmore/feed/", "logz.io");
    const devRelArticles = await wordpress("https://developerrelations.com/author/mikeelsmore/feed/", "developerrelations.com");
    const devToArticles = await devTo();
    context.response.body = {
        data: [].concat(
            devToArticles,
            logzArticles,
            devRelArticles,
        ).sort((a: IArticle, b: IArticle) => {
            return (new Date(a.timestamp) < new Date(b.timestamp)) ? 1 : -1;
        }),
        generated: new Date(),
    };
}