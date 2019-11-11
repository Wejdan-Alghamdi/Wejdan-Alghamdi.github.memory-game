# Memory Game Project

The project consist of one html which hold the main elements of the game and one css file which style the html page and make it responsive.
The most important part of this project is it's javascript file which manipulate the whole game, The main functions in the JS file are 
- The Start function that shuffle the cards and append them to the container automatically after downloading the page.
- ClickedCard function that add an event listener for each cards.
- CompareCards function which store the last two clicked card and compare between them.
- Move function that counter the movements number of the player.
- Rating function that lose one according to the particular numbers of movements.
- Timer function that count how much time that the player took to win the game.
- Also there is a restart function that reset every functionality to the default case and the game will start again 
- Finally the GameOver function that called when all pairs of the cards in the game are match then a popup modal will appear and show the player how much time he took to win and how many star he got also it have event listener to the (play again)button to restart the game.  


## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Requirments](#requirments)
* [Description](#description)


## Instructions

This project created for [Front End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011) from udacity.



## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Requirments

This project require the fllowing frameworks :
- [Bootstrap](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css)
- [Google fonts](https://fonts.googleapis.com/css?family=Coda)

## Description

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!
the project also contain a timer that start when the player flip the first card and it will stop when the game is over .
In the game there are a rating stars that will lose one when the player moves particular numbers of movements.
During the game the player can restart the game and every thing will be back to the default situation.
When the game is over a congratulations modal will apeare which contain the time that the player took to win and the star rating ,then it will ask the player if wants to play again. 

