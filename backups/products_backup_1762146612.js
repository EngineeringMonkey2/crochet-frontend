// Root paths for product images
const root1 = "images/RealChrochet/cow/";
const root2 = "images/RealChrochet/bunny/";
const root3 = "images/RealChrochet/monkey/";
const root4 = "images/RealChrochet/strawberrycow/";
const root5 = "images/RealChrochet/lamb/";
const root6 = "images/RealChrochet/elephant/";
const root7 = "images/RealChrochet/frog/";
const root8 = "images/RealChrochet/bee/";
const root9 = "images/RealChrochet/succulent/";
const root10 = "images/RealChrochet/giraffe/";
const root11 = "images/RealChrochet/turtle/";
const root12 = "images/RealChrochet/ghost/";
const root13 = "images/RealChrochet/ghostkey/";
const root14 = "images/RealChrochet/zombee/";
const root15 = "images/RealChrochet/pumpkin/";
const root16 = "images/RealChrochet/pumpkinkey/";
const root17 = "images/RealChrochet/puppyghost/";
const root18 = "images/RealChrochet/piecoaster/";
const root19 = "images/RealChrochet/whitesushi/";
const root20 = "images/RealChrochet/whiteyellowsushi/";
const root21 = "images/RealChrochet/blacksushi/";
const root22 = "images/RealChrochet/allthree/";

const cdnProcessImages = (paths) => (typeof window !== 'undefined' && window.resolveImagePaths
    ? window.resolveImagePaths(paths)
    : paths);

// Products array
const products = [
    {
        id: 1,
        name: "Chocolate Cow",
        price: "$39.99",
        category: "Animals",
        description: "A cute hand made crocheted cow plushie with floppy ears, perfect for your collection.",
        dimensions: "  Dimensions: Height of 12 in. Width of 5 in. ",
        images: cdnProcessImages([root1 + "cow8.png", root1 + "cow13.png", root1 + "cow3.png", root1 + "cow12.png", root1 + "cow1.png", root1 + "cow10.png"])
    },
    {
        id: 2,
        name: "Bunny",
        price: "$39.99",
        category: "Animals",
        description: "A cute handmade crocheted bunny plushie with floppy ears, perfect for your animal collection!",
        dimensions: "  Dimensions: Height of 11 in. Width of 4.5 in. ",
        images: cdnProcessImages([root2 + "bunny1.png", root2 + "bunny3.png", root2 + "bunny18.png", root2 + "bunny4.png", root2 + "bunny2.png", root2 + "bunny5.png"])
    },
    {
        id: 3,
        name: "Original Monkey",
        price: "$39.99",
        category: "Animals",
        description: "The oringinal handmade noncustomized monkey plushie.",
        dimensions: " Dimensions: 12in. by 9 in. ",
        images: cdnProcessImages([root3 + "monkey1.png", root3 + "monkey3.png", root3 + "monkey2.png", root3 + "monkey4.png", root3 + "monkey6.png", root3 + "monkey5.png"])
    },
    {
        id: 4,
        name: "Strawberry Cow",
        price: "$39.99",
        category: "Animals",
        description: "A beautiful hand made strawberry cow plushie with spots, perfect for your collection.",
        dimensions: "  Dimensions: Height of 12 in. Width of 5 in. ",
        images: cdnProcessImages([root4 + "strawberrycow1.png", root4 + "strawberrycow2.png"])
    },
    {
        id: 5,
        name: "Lamb",
        price: "$39.99",
        category: "Animals",
        description: "Beautiful hand made lamb plushie, perfect to add to your collection of animals",
        dimensions: " Dimensions: Height of 12 in. Width of 6 in. ",
        images: cdnProcessImages([root5 + "lamb1.png", root5 + "lamb2.png", root5 + "lamb3.png", root5 + "lamb4.png", root5 + "lamb5.png", root5 + "lamb6.png"])
    },
    {
        id: 6,
        name: "Elephant",
        price: "$19.99",
        category: "Animals",
        description: "Small hand made elephant plushie with flappy ears, perfect for your collection",
        dimensions: " Dimensions: Height of 7 in. Width of 4 in. Ear Diameter of 3.5 In.",
        images: cdnProcessImages([root6 + "elephant1.png", root6 + "elephant2.png", root6 + "elephant3.png", root6 + "elephant4.png", root6 + "elephant5.png", root6 + "elephant6.png"])
    },
    {
        id: 7,
        name: "Frog",
        price: "$19.99",
        category: "Animals",
        description: "Beautiful hand made large frog plushie, more colors coming soon to the collection!",
        dimensions: " Dimensions: Height of 7 in. Width of 5 in. Circumference of 15 in.",
        images: cdnProcessImages([root7 + "frog1.png", root7 + "frog2.png", root7 + "frog3.png", root7 + "frog4.png", root7 + "frog5.png"])
    },
    {
        id: 8,
        name: "Bee",
        price: "$14.99",
        category: "Insects",
        description: "Cute hand made bee plushie perfect for your collection!",
        dimensions: " Dimensions: Length of 6 in. Width of 3 in. Circumference of 9.5 in. ",
        images: cdnProcessImages([root8 + "bee1.png", root8 + "bee5.png", root8 + "bee2.png", root8 + "bee6.png", root8 + "bee3.png", root8 + "bee7.png"])
    },
    {
        id: 9,
        name: "Succulent Coasters (4 Pack)",
        price: "$24.99",
        category: "Home Goods",
        description: "Four hand made beautiful large succulent coasters with a basket to store, able to fit any cup size!",
        dimensions: " Dimensions: The coaster has a diameter of 6 in. The basket has a diameter of 4.5 and a wall hieght of  1 in.",
        images: cdnProcessImages([root9 + "succoaster1.png", root9 + "succoaster2.png", root9 + "succoaster3.png", root9 + "succoaster4.png", root9 + "succoaster5.png", root9 + "succoaster6.png"])
    },
    {
        id: 10,
        name: "Giraffe",
        price: "$59.99",
        category: "Animals",
        description: "Beautiful hand made giraffe plushie, biggest animal out of all the crochet animals!",
        dimensions: " Dimensions: Height of 15 in. Width of 6 in.",
        images: cdnProcessImages([root10 + "giraffe5.png", root10 + "giraffe2.png", root10 + "giraffe3.png", root10 + "giraffe4.png", root10 + "giraffe1.png", root10 + "giraffe6.png"])
    },
    {
        id: 11,
        name: "Turtle",
        price: "$19.99",
        category: "Animals",
        description: "Beautiful hand made turtle plushie, perfect for your collection!",
        dimensions: " Dimensions: Height of 7 in. Width of 4 in.",
        images: cdnProcessImages([root11 + "turtle1.png", root11 + "turtle2.png", root11 + "turtle3.png", root11 + "turtle5.png", root11 + "turtle4.png", root11 + "turtle6.png"])
    },
    {
        id: 12,
        name: "Ghost",
        price: "$14.99",
        category: "Other",
        description: "Beautiful hand made ghost plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Height of 5 in. Width of 4 in.",
        images: cdnProcessImages([root12 + "ghost2.png", root12 + "ghost5.png", root12 + "ghost3.png", root12 + "ghost4.png", root12 + "ghost1.png", root12 + "ghost6.png"])
    },
    {
        id: 13,
        name: "Ghost Key-Chain",
        price: "$6.99",
        category: "Other",
        description: "Beautiful hand made ghost key-chain plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Height of 3 in. Width of 2 in.",
        images: cdnProcessImages([root13 + "ghostkey1.png", root13 + "ghostkey2.png", root13 + "ghostkey3.png"])
    },
    {
        id: 14,
        name: "ZomBee",
        price: "$14.99",
        category: "Other",
        description: "Beautiful hand made ZomBee plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 6 in. Width of 3 in. Circumference of 9.5 in. ",
        images: cdnProcessImages([root14 + "zombee4.png", root14 + "zombee2.png", root14 + "zombee3.png", root14 + "zombee7.png", root14 + "zombee5.png", root14 + "zombee6.png"])
    },
    {
        id: 15,
        name: "Pumpkin",
        price: "$24.99",
        category: "Other",
        description: "Beautiful hand made Pumpkin plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 6 in. Width of 5 in. Circumference of 9.5 in. ",
        images: cdnProcessImages([root15 + "pumpkin1.png", root15 + "pumpkin2.png", root15 + "pumpkin3.png", root15 + "pumpkin4.png", root15 + "pumpkin5.png", root15 + "pumpkin6.png"])
    },
    {
        id: 16,
        name: "Pumpkin Key-Chain",
        price: "$6.99",
        category: "Other",
        description: "Beautiful hand made Pumpkin key-chain, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 3 in. Width of 2 in.",
        images: cdnProcessImages([root16 + "pumpkinkey1.png", root16 + "pumpkinkey2.png", root16 + "pumpkinkey3.png"])
    },
    {
        id: 17,
        name: "Puppy Ghost",
        price: "$24.99",
        category: "Other",
        description: "Beautiful hand made Puppy Ghost plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 7 in. Width of 5 in. ",
        images: cdnProcessImages([root17 + "puppyghost1.png", root17 + "puppyghost2.png", root17 + "puppyghost3.png", root17 + "puppyghost4.png", root17 + "puppyghost5.png", root17 + "puppyghost6.png"])
    },
    {
        id: 18,
        name: "Pumpkin Pie Coasters (4 Pack)",
        price: "$29.99",
        category: "Other",
        description: "Four beautiful hand made Pumpkin Pie Coasters, perfect for the autumn season!",
        dimensions: " Dimensions: Diameter of 6 in.",
        images: cdnProcessImages([root18 + "piecoaster1.png", root18 + "piecoaster2.png", root18 + "piecoaster3.png", root18 + "piecoaster4.png"])
    },
    {
        id: 19,
        name: "Nigiri Sushi Cat",
        price: "$24.99",
        category: "Other",
        description: "Beautiful Nigiri Sushi Cat, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root19 + "whitesushi1.png", root19 + "whitesushi2.png", root19 + "whitesushi3.png", root19 + "whitesushi4.png", root19 + "whitesushi5.png", root19 + "whitesushi6.png"])
    },
    {
        id: 20,
        name: "Tamago Nigiri Sushi Cat",
        price: "$24.99",
        category: "Other",
        description: "Beautiful Tamago Nigiri Sushi Cat, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root20 + "whiteyellowsushi1.png", root20 + "whiteyellowsushi2.png", root20 + "whiteyellowsushi3.png", root20 + "whiteyellowsushi4.png", root20 + "whiteyellowsushi5.png", root20 + "whiteyellowsushi6.png"])
    },
    {
        id: 21,
        name: "Ikura Sushi Cat",
        price: "$24.99",
        category: "Other",
        description: "Beautiful Ikura Sushi Cat, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root21 + "blacksushi1.png", root21 + "blacksushi2.png", root21 + "blacksushi3.png", root21 + "blacksushi4.png", root21 + "blacksushi5.png", root21 + "blacksushi6.png"])
    },
    {
        id: 22,
        name: "Sushi Cat Trio!",
        price: "$59.99",
        category: "Other",
        description: "The Sushi Cat trio, collecting all the original sushi cats!",
        dimensions: "Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root22 + "all1.png", root22 + "all2.png", root22 + "all3.png", root22 + "all4.png", root22 + "all5.png", root22 + "all6.png"])
    }
];