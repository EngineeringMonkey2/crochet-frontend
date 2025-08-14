
const root1 = "images/RealChrochet/cow/";
const root2 = "images/RealChrochet/bunny/"
const root3 = "images/RealChrochet/monkey/"
const root4 = "images/RealChrochet/strawberrycow/"
const root5 = "images/RealChrochet/bee/"
const root6 = "images/RealChrochet/succulent/"
const root7 = "images/RealChrochet/lamb/"
const root8 = "images/RealChrochet/frog/"
const root9 = "images/RealChrochet/elephant/"
const root10 = "images/RealChrochet/giraffe/"
const root11 = "images/RealChrochet/turtle/"
const root12 = "images/RealChrochet/ghost/"


const products = [
  {
    id: 1,
    name: "Chocolate Cow",
    images: [root1 + "cow8.png", root1 + "cow13.png", root1 + "cow3.png", root1 + "cow12.png" , root1 + "cow1.png", root1+ "cow10.png"],
    price: "$39.99",
    description: "A cute hand made crocheted cow plushie with floppy ears, perfect for your collection.",
	dimensions: "  Dimensions: Height of 12 in. Width of 5 in. "
  },
  {
    id: 2,
    name: "Bunny",
    images: [root2 + "bunny1.png", root2 + "bunny3.png", root2 + "bunny18.png", root2 + "bunny4.png" , root2 + "bunny2.png", root2 + "bunny5.png"],
    price: "$39.99",
    description: "A cute handmade crocheted bunny plushie with floppy ears, perfect for your animal collection!",
	dimensions: "  Dimensions: Height of 11 in. Width of 4.5 in. "
  },
  {
    id: 3,
    name: "Original Monkey",
    images: [root3 + "monkey1.png", root3 + "monkey3.png", root3 + "monkey2.png", root3 + "monkey4.png" , root3 + "monkey6.png", root3 + "monkey5.png"],
    price: "$44.99",
    description: "The oringinal handmade noncustomized monkey plushie.",
	dimensions: " Dimensions: 12in. by 9 in. "

  },
  {
    id: 4,
    name: "Strawberry Cow",
    images: [root4 + "strawberrycow1.png", root4 + "strawberrycow2.png"],
    price: "$44.99",
    description: "A beautiful hand made strawberry cow plushie with spots, perfect for your collection.",
	dimensions: "  Dimensions: Height of 12 in. Width of 5 in. "

  },

  
  
  
  
  
  {
    id: 5,
    name: "Lamb",
    images: [root7 + "lamb1.png", root7 + "lamb2.png", root7 + "lamb3.png", root7 + "lamb4.png", root7 + "lamb5.png", root7 + "lamb6.png"],
    price: "$44.99",
    description: "Beautiful hand made lamb plushie, perfect to add to your collection of animals",
	dimensions: " Dimensions: Height of 12 in. Width of 6 in. "

  },  
  
  
  
  
  
  
  //INSECTS
  
  {
    id: 6,
    name: "Elephant",
    images: [root9 + "elephant1.png", root9 + "elephant2.png", root9 + "elephant3.png", root9 + "elephant4.png", root9 + "elephant5.png", root9 + "elephant6.png"],
    price: "$19.99",
    description: "Small hand made elephant plushie with flappy ears, perfect for your collection",
	dimensions: " Dimensions: Height of 7 in. Width of 4 in. Ear Diameter of 3.5 In."

  },  
  
  
    
    
  
 
  
  
  {
    id: 7,
    name: "Frog",
    images: [root8 + "frog1.png", root8 + "frog2.png", root8 + "frog3.png", root8 + "frog4.png", root8 + "frog5.png"],
    price: "$19.99",
    description: "Beautiful hand made large frog plushie, more colors coming soon to the collection!",
	dimensions: " Dimensions: Height of 7 in. Width of 5 in. Circumference of 15 in."

  },  
  
  
    
  
  
  
  
  
  {
    id: 8,
    name: "Bee",
    images: [root5 + "bee1.png", root5 + "bee5.png", root5 + "bee2.png", root5 + "bee6.png" , root5 + "bee3.png", root5 + "bee7.png"],
    price: "$14.99",
    description: "Cute hand made bee plushie perfect for your collection!",
	dimensions: " Dimensions: Length of 6 in. Width of 3 in. Circumference of 9.5 in. "

  },
  
  
   


  
  //COASTERS
  
  
  {
    id: 9,
    name: "Succulent Coasters",
    images: [root6 + "succoaster1.png", root6 + "succoaster2.png", root6 + "succoaster3.png", root6 + "succoaster4.png", root6 + "succoaster5.png", root6 + "succoaster6.png"],
    price: "$24.99",
    description: "Four hand made beautiful large succulent coasters with a basket to store, able to fit any cup size!",
	dimensions: " Dimensions: The coaster has a diameter of 6 in. The basket has a diameter of 4.5 and a wall hieght of  1 in."

  },
  
  
  
  
  
  
  {
    id: 10,
    name: "Giraffe",
    images: [root10 + "giraffe5.png", root10 + "giraffe2.png", root10 + "giraffe3.png", root10 + "giraffe4.png", root10 + "giraffe1.png", root10 + "giraffe6.png"],
    price: "$59.99",
    description: "Beautiful hand made giraffe plushie, biggest animal out of all the crochet animals!",
	dimensions: " Dimensions: Height of 15 in. Width of 6 in."

  },
  
  {
    id: 11,
    name: "Turtle",
    images: [root11 + "turtle1.png", root11 + "turtle2.png", root11 + "turtle3.png", root11 + "turtle5.png", root11 + "turtle4.png", root11 + "turtle6.png"],
    price: "$19.99",
    description: "Beautiful hand made turtle plushie, perfect for your collection!",
	dimensions: " Dimensions: Height of 7 in. Width of 4 in."

  },
  
  {
    id: 12,
    name: "Ghost",
    images: [root12 + "ghost2.png", root12 + "ghost5.png", root12 + "ghost3.png", root12 + "ghost4.png", root12 + "ghost1.png", root12 + "ghost6.png"],
    price: "$14.99",
    description: "Beautiful hand made ghost plushie, perfect for the autumn season!",
	dimensions: " Dimensions: Height of 5 in. Width of 4 in."

  }
  
  {
    id: 13,
    name: "Test",
    images: [],
    price: "$0.99",
    description: "Test for Devs, Don't buy this",

  }
  
        
  
  
  
  
];
