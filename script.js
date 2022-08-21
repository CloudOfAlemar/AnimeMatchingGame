
// ==================================================================
// Initilization Phase ( Setting up Image URLs List Array )
// ==================================================================

const imageURLs = {
  naruto: "https://i.pinimg.com/originals/02/07/2a/02072a87d479f3b0da5ae73160107b18.png",
  itachi: "https://i.pinimg.com/564x/91/3d/73/913d73b27bf6294782beda71c3aaae82.jpg",
  levi: "https://animesher.com/orig/0/97/977/9775/animesher.com_atack-of-titan-levi-ackerman-chibi-shingeki-no-kyojin-977524.jpg",
  hinata: "https://preview.redd.it/qj8afcr08eq41.jpg?auto=webp&s=1a24136bda4b22ca8aa517282c4b64986cb4dc1c",
  charizard: "https://cdnb.artstation.com/p/assets/images/images/019/760/089/large/lei-sofia-cheeb-charizard.jpg?1564913677&dl=1",
  hisoka: "https://i.pinimg.com/originals/89/ed/19/89ed1927fceae9d10dee5df2e7cf525d.jpg",
  l: "https://www.pngitem.com/pimgs/m/534-5341028_l-kira-light-deathnote-anime-misterio-kawaii-sticker.png",
  luffy: "https://www.pngitem.com/pimgs/m/420-4205438_luffy-chibi-one-piece-png-transparent-png.png"
}

// Initialize Image URL List Array
const imageURLsList = [];

// Declaring an Image URL Keys List Array and its Length
const imageURLsKeysList = Object.keys( imageURLs );
const imageURLsKeysListLength = Object.keys( imageURLs ).length;

// Fill imageURLsList Array: including each URL twice at different positions
const fillImageURLsListArray = function() {
  for( let i = 0; i < imageURLsKeysListLength; i++ ) {
    imageURLsList[ i ] = imageURLs[ imageURLsKeysList[ i ] ];
    imageURLsList[ i + imageURLsKeysListLength ] = imageURLs[ imageURLsKeysList[ i ] ];
  }
}

fillImageURLsListArray();

// Selecting all img and .card elements
const images = document.querySelectorAll( "img" );
const cards = document.querySelectorAll( ".card" );

let randomImageURLsListIndex;
let randomURL;

// Assign random URL value to each image element
const randomizeURLValueToImageNode = function() {
  for( let i = 0; i < images.length; i++ ) {
    randomImageURLsListIndex = Math.trunc( Math.random() * imageURLsList.length );
    randomURL = imageURLsList[ randomImageURLsListIndex ];
    images[ i ].src = randomURL;
    imageURLsList.splice( randomImageURLsListIndex, 1 );
  }
}

randomizeURLValueToImageNode();

// ==================================================================
// Game Phase
// ==================================================================

let firstPickURL = "";
let firstPickIndex;
let secondPickURL = "";
let secondPickIndex;
let score = 0;
let bestScore = 0;
let numberOfFaceUpCards = 0;

const scoreValue = document.querySelector( ".score-value" );
const bestscoreValue = document.querySelector( ".bestscore-value" );

const flipEntireCardUp = function( imageNode, cardNode ) {
  imageNode.classList.add( "show-image" );
  cardNode.classList.add( "hide-bg-card" );
  cardNode.classList.add( "rotate-card" );
}

const flipEntireCardDown =
  function( imageNode, cardNode ) {
    imageNode.classList.remove( "show-image" );
    cardNode.classList.remove( "hide-bg-card" );
    cardNode.classList.remove( "rotate-card" );
}

const resetPickAndIndexValues = function() {
  firstPickURL = "";
  firstPickIndex = undefined;
  secondPickURL = "";
  secondPickIndex = undefined;
}

// Giving each card ( more specifically each image ) a click event
for( let i = 0; i < images.length; i++ ) {
  images[ i ].addEventListener( "click", function() {

    // If image is face down and haven't Picked a card
    if( !( images[ i ].classList.contains( "show-image" ) ) && !firstPickURL ) {
      flipEntireCardUp( images[ i ], cards[ i ] );
      firstPickURL = images[ i ].src;
      firstPickIndex = i;
    } else if( !( images[ i ].classList.contains( "show-image" ) ) &&
      firstPickURL && !secondPickURL ) {
      flipEntireCardUp( images[ i ], cards[ i ] );
      secondPickURL = images[ i ].src;
      secondPickIndex = i;
      if( firstPickURL !== secondPickURL ) {
        setTimeout( function() {
          flipEntireCardDown( images[ firstPickIndex ], cards[ firstPickIndex ] );
          flipEntireCardDown( images[ secondPickIndex ], cards[ secondPickIndex ] );
          resetPickAndIndexValues();
        }, 1000 );
        score++;
        scoreValue.textContent = score;
      } else {
        resetPickAndIndexValues();
        numberOfFaceUpCards += 2;
        score++;
        scoreValue.textContent = score;
        if( numberOfFaceUpCards === images.length ) {
          if( !bestScore ) {
            bestScore = score;
            bestscoreValue.textContent = bestScore;
          } else if( bestScore && score < bestScore ) {
            bestScore = score;
            bestscoreValue.textContent = score;
          }
        }
      }
    }

  } );
}

// ===== Reset Functionality =====

const resetButton = document.querySelector( ".reset-button" );

resetButton.addEventListener( "click", function() {
  resetPickAndIndexValues();
  score = 0;
  scoreValue.textContent = 0;
  numberOfFaceUpCards = 0;
  for( let i = 0; i < images.length; i++ ) {
    if( images[ i ].classList.contains( "show-image" ) ) {
      flipEntireCardDown( images[ i ], cards[ i ] );
    }
  }

  // Filling the Image URLs List Array Again
  fillImageURLsListArray();
  // Assign random URL values to image nodes
  randomizeURLValueToImageNode();
} );
