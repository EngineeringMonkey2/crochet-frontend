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
const root23 = "images/RealChrochet/mug/";
const root24 = "images/RealChrochet/mug2/";
const root25 = "images/RealChrochet/glasstumbler/";
const root26 = "images/RealChrochet/fstb/";
const root27 = "images/RealChrochet/penguin2/";
const root28 = "images/RealChrochet/gingerbreadmug2/";
const root29 = "images/RealChrochet/grinchmug3/";
const root30 = "images/RealChrochet/snowmanmug3/";
const root31 = "images/RealChrochet/christmastumbler3/";

const cdnProcessImages = (paths) => (typeof window !== 'undefined' && window.resolveImagePaths
    ? window.resolveImagePaths(paths)
    : paths);

// Products array
const products = [
    {
        id: 1,
        name: "Chocolate Cow",
        price: "$39.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "A cute hand made crocheted cow plushie with floppy ears, perfect for your collection.",
        dimensions: "  Dimensions: Height of 12 in. Width of 5 in. ",
        images: cdnProcessImages([root1 + "cow8.png", root1 + "cow13.png", root1 + "cow3.png", root1 + "cow12.png", root1 + "cow1.png", root1 + "cow10.png"])
    },
    {
        id: 2,
        name: "Bunny",
        price: "$39.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "A cute handmade crocheted bunny plushie with floppy ears, perfect for your animal collection!",
        dimensions: "  Dimensions: Height of 11 in. Width of 4.5 in. ",
        images: cdnProcessImages([root2 + "bunny1.png", root2 + "bunny3.png", root2 + "bunny18.png", root2 + "bunny4.png", root2 + "bunny2.png", root2 + "bunny5.png"])
    },
    {
        id: 3,
        name: "Original Monkey",
        price: "$39.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "The oringinal handmade noncustomized monkey plushie.",
        dimensions: " Dimensions: 12in. by 9 in. ",
        images: cdnProcessImages([root3 + "monkey1.png", root3 + "monkey3.png", root3 + "monkey2.png", root3 + "monkey4.png", root3 + "monkey6.png", root3 + "monkey5.png"])
    },
    {
        id: 4,
        name: "Strawberry Cow",
        price: "$39.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "A beautiful hand made strawberry cow plushie with spots, perfect for your collection.",
        dimensions: "  Dimensions: Height of 12 in. Width of 5 in. ",
        images: cdnProcessImages([root4 + "strawberrycow1.png", root4 + "strawberrycow2.png"])
    },
    {
        id: 5,
        name: "Lamb",
        price: "$39.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "Beautiful hand made lamb plushie, perfect to add to your collection of animals",
        dimensions: " Dimensions: Height of 12 in. Width of 6 in. ",
        images: cdnProcessImages([root5 + "lamb1.png", root5 + "lamb2.png", root5 + "lamb3.png", root5 + "lamb4.png", root5 + "lamb5.png", root5 + "lamb6.png"])
    },
    {
        id: 6,
        name: "Elephant",
        price: "$19.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "Small hand made elephant plushie with flappy ears, perfect for your collection",
        dimensions: " Dimensions: Height of 7 in. Width of 4 in. Ear Diameter of 3.5 In.",
        images: cdnProcessImages([root6 + "elephant1.png", root6 + "elephant2.png", root6 + "elephant3.png", root6 + "elephant4.png", root6 + "elephant5.png", root6 + "elephant6.png"])
    },
    {
        id: 7,
        name: "Frog",
        price: "$19.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "Beautiful hand made large frog plushie, more colors coming soon to the collection!",
        dimensions: " Dimensions: Height of 7 in. Width of 5 in. Circumference of 15 in.",
        images: cdnProcessImages([root7 + "frog1.png", root7 + "frog2.png", root7 + "frog3.png", root7 + "frog4.png", root7 + "frog5.png"])
    },
    {
        id: 8,
        name: "Bee",
        price: "$14.99",
        category: "Crochet",
        subcategory: "Insects",
        tags: ["Insects", "Plushies"],
        description: "Cute hand made bee plushie perfect for your collection!",
        dimensions: " Dimensions: Length of 6 in. Width of 3 in. Circumference of 9.5 in. ",
        images: cdnProcessImages([root8 + "bee1.png", root8 + "bee5.png", root8 + "bee2.png", root8 + "bee6.png", root8 + "bee3.png", root8 + "bee7.png"])
    },
    {
        id: 9,
        name: "Succulent Coasters (4 Pack)",
        price: "$24.99",
        category: "Crochet",
        subcategory: "Home Goods",
        tags: ["Home Goods", "Coasters", "Accessories"],
        description: "Four hand made beautiful large succulent coasters with a basket to store, able to fit any cup size!",
        dimensions: " Dimensions: The coaster has a diameter of 6 in. The basket has a diameter of 4.5 and a wall hieght of  1 in.",
        images: cdnProcessImages([root9 + "succoaster1.png", root9 + "succoaster2.png", root9 + "succoaster3.png", root9 + "succoaster4.png", root9 + "succoaster5.png", root9 + "succoaster6.png"])
    },
    {
        id: 10,
        name: "Giraffe",
        price: "$59.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "Beautiful hand made giraffe plushie, biggest animal out of all the crochet animals!",
        dimensions: " Dimensions: Height of 15 in. Width of 6 in.",
        images: cdnProcessImages([root10 + "giraffe5.png", root10 + "giraffe2.png", root10 + "giraffe3.png", root10 + "giraffe4.png", root10 + "giraffe1.png", root10 + "giraffe6.png"])
    },
    {
        id: 11,
        name: "Turtle",
        price: "$19.99",
        category: "Crochet",
        subcategory: "Animals",
        tags: ["Animals", "Plushies"],
        description: "Beautiful hand made turtle plushie, perfect for your collection!",
        dimensions: " Dimensions: Height of 7 in. Width of 4 in.",
        images: cdnProcessImages([root11 + "turtle1.png", root11 + "turtle2.png", root11 + "turtle3.png", root11 + "turtle5.png", root11 + "turtle4.png", root11 + "turtle6.png"])
    },
    {
        id: 12,
        name: "Ghost",
        price: "$14.99",
        category: "Crochet",
        subcategory: "Halloween",
        tags: ["Halloween", "Seasonal", "Plushies"],
        description: "Beautiful hand made ghost plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Height of 5 in. Width of 4 in.",
        images: cdnProcessImages([root12 + "ghost2.png", root12 + "ghost5.png", root12 + "ghost3.png", root12 + "ghost4.png", root12 + "ghost1.png", root12 + "ghost6.png"])
    },
    {
        id: 13,
        name: "Ghost Key-Chain",
        price: "$6.99",
        category: "Crochet",
        subcategory: "Halloween",
        tags: ["Halloween", "Seasonal", "Accessories", "Keychains"],
        description: "Beautiful hand made ghost key-chain plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Height of 3 in. Width of 2 in.",
        images: cdnProcessImages([root13 + "ghostkey1.png", root13 + "ghostkey2.png", root13 + "ghostkey3.png"])
    },
    {
        id: 14,
        name: "ZomBee",
        price: "$14.99",
        category: "Crochet",
        subcategory: "Halloween",
        tags: ["Halloween", "Seasonal", "Insects", "Plushies"],
        description: "Beautiful hand made ZomBee plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 6 in. Width of 3 in. Circumference of 9.5 in. ",
        images: cdnProcessImages([root14 + "zombee4.png", root14 + "zombee2.png", root14 + "zombee3.png", root14 + "zombee7.png", root14 + "zombee5.png", root14 + "zombee6.png"])
    },
    {
        id: 15,
        name: "Pumpkin",
        price: "$24.99",
        category: "Crochet",
        subcategory: "Halloween",
        tags: ["Halloween", "Seasonal", "Plushies"],
        description: "Beautiful hand made Pumpkin plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 6 in. Width of 5 in. Circumference of 9.5 in. ",
        images: cdnProcessImages([root15 + "pumpkin1.png", root15 + "pumpkin2.png", root15 + "pumpkin3.png", root15 + "pumpkin4.png", root15 + "pumpkin5.png", root15 + "pumpkin6.png"])
    },
    {
        id: 16,
        name: "Pumpkin Key-Chain",
        price: "$6.99",
        category: "Crochet",
        subcategory: "Halloween",
        tags: ["Halloween", "Seasonal", "Accessories", "Keychains"],
        description: "Beautiful hand made Pumpkin key-chain, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 3 in. Width of 2 in.",
        images: cdnProcessImages([root16 + "pumpkinkey1.png", root16 + "pumpkinkey2.png", root16 + "pumpkinkey3.png"])
    },
    {
        id: 17,
        name: "Puppy Ghost",
        price: "$24.99",
        category: "Crochet",
        subcategory: "Halloween",
        tags: ["Halloween", "Seasonal", "Animals", "Plushies"],
        description: "Beautiful hand made Puppy Ghost plushie, perfect for the autumn season!",
        dimensions: " Dimensions: Length of 7 in. Width of 5 in. ",
        images: cdnProcessImages([root17 + "puppyghost1.png", root17 + "puppyghost2.png", root17 + "puppyghost3.png", root17 + "puppyghost4.png", root17 + "puppyghost5.png", root17 + "puppyghost6.png"])
    },
    {
        id: 18,
        name: "Pumpkin Pie Coasters (4 Pack)",
        price: "$29.99",
        category: "Crochet",
        subcategory: "Halloween",
        tags: ["Halloween", "Seasonal", "Coasters", "Home Goods"],
        description: "Four beautiful hand made Pumpkin Pie Coasters, perfect for the autumn season!",
        dimensions: " Dimensions: Diameter of 6 in.",
        images: cdnProcessImages([root18 + "piecoaster1.png", root18 + "piecoaster2.png", root18 + "piecoaster3.png", root18 + "piecoaster4.png"])
    },
    {
        id: 19,
        name: "Nigiri Sushi Cat",
        price: "$24.99",
        category: "Crochet",
        subcategory: "Food",
        tags: ["Food", "Cats", "Plushies", "Kawaii"],
        description: "Beautiful Nigiri Sushi Cat, perfect for sushi lovers!",
        dimensions: " Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root19 + "whitesushi1.png", root19 + "whitesushi2.png", root19 + "whitesushi3.png", root19 + "whitesushi4.png", root19 + "whitesushi5.png", root19 + "whitesushi6.png"])
    },
    {
        id: 20,
        name: "Tamago Nigiri Sushi Cat",
        price: "$24.99",
        category: "Crochet",
        subcategory: "Food",
        tags: ["Food", "Cats", "Plushies", "Kawaii"],
        description: "Beautiful Tamago Nigiri Sushi Cat, perfect for sushi lovers!",
        dimensions: " Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root20 + "whiteyellowsushi1.png", root20 + "whiteyellowsushi2.png", root20 + "whiteyellowsushi3.png", root20 + "whiteyellowsushi4.png", root20 + "whiteyellowsushi5.png", root20 + "whiteyellowsushi6.png"])
    },
    {
        id: 21,
        name: "Ikura Sushi Cat",
        price: "$24.99",
        category: "Crochet",
        subcategory: "Food",
        tags: ["Food", "Cats", "Plushies", "Kawaii"],
        description: "Beautiful Ikura Sushi Cat, perfect for sushi lovers!",
        dimensions: " Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root21 + "blacksushi1.png", root21 + "blacksushi2.png", root21 + "blacksushi3.png", root21 + "blacksushi4.png", root21 + "blacksushi5.png", root21 + "blacksushi6.png"])
    },
    {
        id: 22,
        name: "Sushi Cat Trio!",
        price: "$59.99",
        category: "Crochet",
        subcategory: "Food",
        tags: ["Food", "Cats", "Plushies", "Kawaii", "Bundle"],
        description: "The Sushi Cat trio, collecting all the original sushi cats!",
        dimensions: "Dimensions: Length of 7 in. Width of 4.5 in.",
        images: cdnProcessImages([root22 + "all1.png", root22 + "all2.png", root22 + "all3.png", root22 + "all4.png", root22 + "all5.png", root22 + "all6.png"])
    },
    {
        id: 23,
        name: "Cafecito Mug",
        price: "$8.99",
        category: "Drinkware",
        subcategory: "Mugs",
        tags: ["Mugs", "Coffee", "Customizable"],
        description: "Customize your mug by putting your name or a special message on it!",
        dimensions: "3.7 in with a diameter of 3.2 in",
        images: cdnProcessImages([root23 + "mug1.png", root23 + "mug2.png", root23 + "mug3.png", root23 + "mug4.png", root23 + "mug5.png"])
    },
    {
        id: 24,
        name: "Hello Pumpkin Mug",
        price: "$8.99",
        category: "Drinkware",
        subcategory: "Mugs",
        tags: ["Mugs", "Halloween", "Seasonal", "Coffee"],
        description: "Hello pumpkin mug, perfect for autumn coffee moments!",
        dimensions: "3.7 in with a diameter of 3.2 in",
        images: cdnProcessImages([root24 + "mug1.png", root24 + "mug2.png", root24 + "mug3.png", root24 + "mug4.png", root24 + "mug5.png"])
    },
    {
        id: 25,
        name: "Glass Tumbler",
        price: "$9.99",
        category: "Drinkware",
        subcategory: "Tumblers",
        tags: ["Tumblers", "Glass", "Lid", "Straw"],
        description: "Glass Tumbler that comes with the lid and straw.",
        dimensions: "Cup: 5.9 in. in height 3 in. in diameter Straw: 7.8 in.",
        images: cdnProcessImages([root25 + "glass1.png", root25 + "glass2.png", root25 + "glass3.png", root25 + "glass4.png", root25 + "glass5.png", root25 + "glass6.png"])
    },
    {
        id: 26,
        name: "Fruit of the Spirit Tote Bag",
        price: "$15.99",
        category: "Tote Bags",
        subcategory: "Canvas Bags",
        tags: ["Canvas", "Inspirational", "Pockets"],
        description: "High quality tote bag that comes with pockets on the inside. Very nice feel.",
        dimensions: "Width: 12 in. Height: 15 in. Thickness: 7 in.",
        images: cdnProcessImages([root26 + "tote1.png", root26 + "tote2.png", root26 + "tote3.png", root26 + "tote4.png", root26 + "tote5.png"]),
        options: {
            color: {
                label: "Color",
                required: true,
                choices: [
                    { value: "black", label: "Black", color: "#000000", default: true },
                    { value: "cream", label: "Cream", color: "#ffffffff" }
                ]
            }
        }
    },
	
	
    {
        id: 27,
        name: "Penguin",
        price: "$19.99",
        category: "Crochet",
        subcategory: "Winter",
        tags: ["Christmas", "Winter", "Animal", "Penguin"],
        description: "Christmas Plushie Hand Made Penguin",
        dimensions: "Height: 6 in. Width: 4 in.",
        images: cdnProcessImages([root27 + "penguin1.png", root27 + "penguin2.png", root27 + "penguin3.png", root27 + "penguin4.png", root27 + "penguin5.png"])
    },
	
    {
        id: 28,
        name: "GingerBread Man In a Mug",
        price: "$19.99",
        category: "Crochet",
        subcategory: "Drinkware",
        tags: ["Christmas", "Winter", "Animal", "Mug"],
        description: "Christmas Plushie Hand Made Gingerbread man with a hand crafted mug. Mug comes with spoon and lid!",
        dimensions: "Plushie: Height: 7 in. Width: 4 in. Mug: Height: 4 in. Diameter: 3.15 in.",
        images: cdnProcessImages([root28 + "gingerbread1.png", root28 + "gingerbread2.png", root28 + "gingerbread3.png", root28 + "gingerbread4.png", root28 + "gingerbread5.png", root28 + "gingerbread6.png"])
    },
	
		
    {
        id: 29,
        name: "The Mean Green Mug Bundle",
        price: "$19.99",
        category: "Crochet",
        subcategory: "Drinkware",
        tags: ["Christmas", "Winter", "Animal", "Mug"],
        description: "Christmas Plushie Hand Made Mean Green Plush with a hand crafted mug. Mug comes with spoon and lid!",
        dimensions: "Plushie: Height: 8 in. Width: 4 in. Mug: Height: 4 in. Diameter: 3.15 in. ",
        images: cdnProcessImages([root29 + "grinch1.png", root29 + "grinch2.png", root29 + "grinch3.png", root29 + "grinch4.png", root29 + "grinch5.png", root29 + "grinch6.png"])
    },
		
    {
        id: 30,
        name: "Snow Plushie in a Mug",
        price: "$19.99",
        category: "Crochet",
        subcategory: "Drinkware",
        tags: ["Christmas", "Winter", "Animal", "Mug"],
        description: "Christmas plushie snowman with a hand crafted mug. Mug comes with spoon and lid!",
        dimensions: "Plushie: Height: 7 in. Width: 4 in. Mug: Height: 4 in. Diameter: 3.15 in. ",
        images: cdnProcessImages([root30 + "snowman1.png", root30 + "snowman2.png", root30 + "snowman3.png", root30 + "snowman4.png", root30 + "snowman5.png", root30 + "snowman6.png"])
    },
	
	
    {
        id: 31,
        name: "Christmas Tumbler",
        price: "$9.99",
        category: "Drinkware",
        subcategory: "Winter",
        tags: ["Christmas", "Winter", "Animal", "Mug"],
        description: "Hand crafted christmas tumbler",
        dimensions: "Cup: 5.9 in. in height 3 in. in diameter Straw: 7.8 in.",
        images: cdnProcessImages([root31 + "mug1.png", root31 + "mug2.png", root31 + "mug3.png", root31 + "mug4.png", root31 + "mug5.png"])
    }
		
	
	
	
];