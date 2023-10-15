const fs = require("fs")
const yaml = require("yaml")

const file = fs.readFileSync('./test.yaml', 'utf8')
const yamlResult = yaml.parse(file)["page"];

const library = {
    paragraph: {
        parameters: ["text"],
        css: [
            ["position", {
                center: "align-center-classname",
                left: "left-aligh-classname",
                right: "right-align-classname"
            }],
            ["font-size", {
                large: "large-text-css",
                medium: "medium-text-css",
                small: "small-text-css"
            }]
        ],
        tag: (text = "saasas", classname = "") =>
            `<p class="${classname}">${text} </p>`,
    },
    image: {
        parameters: ["path", "width", "height"],
        css: [["position", {
            center: "align-center-classname",
            left: "left-aligh-classname",
            right: "right-align-classname"
        }]],
        tag: (src = "", width = "10px", height = "10px", classname = "") =>
            `<img src="${src}" width=${width} height=${height} class="${classname}">`,
    },
    link: {
        parameters: ["url", "name"],
        css: [["position", {
            center: "align-center-classname",
            left: "left-aligh-classname",
            right: "right-align-classname"
        }]],
        tag: (url = "", name = "hello", classname = "") => `<a href="${url}" class="${classname}">${name}</a>`
    },
    pagename: {
        parameters: ["text"],
        css: [],
        tag: (name = "dummy page", classname = "") => `<title class="${classname}">${name}</title>`
    },
    heading: {
        parameters: ["text"],
        css: [["position", {
            center: "align-center-classname",
            left: "left-aligh-classname",
            right: "right-align-classname"
        }]],
        tag: (text = "heading", classname = "") => `<h1 class="${classname}">${text}</h1>`
    }
};



let result = "<html>"
yamlResult.forEach(element => {
    for (const property in element) {
        result += library[property]["tag"]
            (...library[property]["parameters"]
                .map(e =>
                    element[property].attributes[e]
                ),
                library[property]['css'].map(
                    cssElement =>
                    cssElement[1][element[property].attributes[cssElement[0]]]
                ).join(" ")
            ) + "\n"
    }
});

result += "</html>"

fs.writeFileSync("generated.html", result);