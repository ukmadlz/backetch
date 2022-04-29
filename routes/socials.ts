export default function (context: any) {
    context.response.body = {
        data: [{
           id: "twitter",
           name: "Twitter",
           link: "https://twitter.com/ukmadlz", 
        },
        {
            id: "github",
            name: "GitHub",
            link: "https://github.com/ukmadlz", 
        },
        {
            id: "twitch",
            name: "Twitch",
            link: "https://twitch.tv/ukmadlz", 
        },
        {
            id: "linkedin",
            name: "LinkedIn",
            link: "https://www.linkedin.com/in/mikeelsmore/", 
        }],
        generated: new Date(),
    };
}