export default interface IWordpress {
    rss: {
      "@version": number,
      "@xmlns:content": string,
      "@xmlns:wfw": string,
      "@xmlns:dc": string,
      "@xmlns:atom": string,
      "@xmlns:sy": string,
      "@xmlns:slash": string,
      channel: {
        title: string,
        "atom:link": {
          "$": null,
          "@href": string,
          "@rel": string,
          "@type": string,
        },
        link: string,
        description: string,
        lastBuildDate: string,
        language: string,
        "sy:updatePeriod": string,
        "sy:updateFrequency": number,
        item: [
          {}
        ]
      }
    }
  }