import React, { Component } from 'react';
import './App.css';
import Splash from './Splash.js';

class App extends Component
{
	constructor()
	{
		super();
		this.state = {
			width: window.innerWidth, 
			height: window.innerHeight
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.buildBackground = this.buildBackground.bind(this);
	}

	componentDidMount()
	{
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount()
	{
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions()
	{
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	buildBackground()
	{
		const maxSquares = 10;
		const squareSize = (this.state.width > this.state.height) ? this.state.width / maxSquares : this.state.height / maxSquares;
		const gutter = squareSize / 20;
		const squareSides = squareSize / Math.sqrt(2);
		let squaresAcross = Math.ceil(this.state.width / squareSize);
		let squaresVert = Math.ceil(this.state.height / squareSize);
		if (this.state.width > this.state.height)
		{
			squaresAcross += 2;
		}
		else
		{
			squaresVert += 2;
		}
		console.log(`High ${squaresVert * 2}, Across: ${squaresAcross}`);

		const squaresArray = [];
		for (let i = 0; i < squaresVert * 2; i++)
		{
			squaresArray.push([]);
			const hOffset = (i % 2 === 0) ? squareSize / 2 : 0;
			for (let j = 0; j < squaresAcross; j++)
			{
				squaresArray[i].push({
					top: (i * ((squareSize) / 2)) - (squareSize / 4),
					left: ((j * squareSize) + hOffset) - (squareSize / 4),
					width: squareSides - gutter,
					height: squareSides - gutter,
					backgroundColor: 'black',
					animationDelay: 0
				});
				if (i === 0 || j === 0)
					console.log(squaresArray[i][j]);
			}
		}

		return <div className="squaresContainer">
			{
				squaresArray.map(function (row, index) {
					return row.map(function (square, index) {
						const id = 'square' + square.top + square.left;
						return <div className="square" key={id} style={square}></div>
					})
				})
			}
		</div>
	}

    /**
     * Calculate the delay out from the center of an array
     * @param {integer} length
     * @param {integer} index
     */
	calculateLetterDelay(length, index)
	{
		let delay = 0;
		// higher delayFactor = faster animation
		const delayFactor = 5;
		// ++ to make it find the center, because arrays start at 0
		index++;

		// + 0.5 for odd numbered lengths to get exact center, even will hit both middle
		const middle = (length / 2) ? length / 2 + 0.5 : length / 2;
		delay = Math.abs((middle - index) / delayFactor);

		return delay;
	}

	render()
	{
		return(
			<div className="App">
				{this.buildBackground()}
				<Splash/>
			</div>
		);
	}
}

export default App;