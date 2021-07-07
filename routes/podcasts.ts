import "https://deno.land/x/dotenv/load.ts";
import { parse } from "https://deno.land/x/xml/mod.ts";
import { createHash } from "https://deno.land/std@0.100.0/hash/mod.ts"

import IArticle from "../interfaces/article.ts";

const hashId = (type: string, reference: string) => {
    const hash = createHash("md5");
    hash.update(`${type}:${reference}`);
    return hash.toString();
}

const podcast = async (url: string, source: string) => {
    const type = "rss";
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      })
    const rssString = await response.text();
    const podcastData: any = await parse(rssString);
    return ((Array.isArray(podcastData.rss.channel.item)) ? podcastData.rss.channel.item : [podcastData.rss.channel.item]).map((article: any) => {
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
    const totPodcast = await podcast("https://anchor.fm/s/40177308/podcast/rss", "tech-off-topic");
    context.response.body = {
        data: [].concat(
            totPodcast,
        ).sort((a: IArticle, b: IArticle) => {
            return (new Date(a.timestamp) < new Date(b.timestamp)) ? 1 : -1;
        }),
        generated: new Date(),
    };
}