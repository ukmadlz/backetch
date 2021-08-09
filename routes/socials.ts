export default function (context: any) {
    context.response.body = {
        data: [{
           name: "twitter",
           link: "https://twitter.com/ukmadlz", 
        },
        {
            name: "github",
            link: "https://github.com/ukmadlz", 
        },
        {
            name: "twitch",
            link: "https://twitch.tv/ukmadlz", 
        }],
        generated: new Date(),
    };
}