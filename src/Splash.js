import React, { Component } from 'react';
import './Splash.css';

class Splash extends Component
{
    /**
     * Take a word and return JSX for heading animation
     * @param {String} word
     * @param {Boolean} underline whether to draw an underline 
     */
    buildFullWord(word, underline, overline)
    {
        const _this = this;
        const wordArray = word.split('');
        return <h1>
            {
                // OVERLINE
                (overline === true) ? _this.buildUnderline() : ''
            }
            {
                wordArray.map(function(letter, index)
                {
                    const letterDelay = _this.calculateLetterDelay(word.length, index);
                    const styleObj = {
                        animationDelay: letterDelay + 's'
                    }
                    const letterID = word + index;
                    return <span key={letterID} className="letterRise" style={styleObj}>{letter}</span>;
                })
            }
            {
                // UNDERLINE
                (underline === true) ? _this.buildUnderline() : ''
            }
        </h1>;
    }

    /**
     * Calculate the delay out from the center of a word
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

    buildUnderline()
    {
        return <div className="middleSpread"></div>
    }

    render()
    {
		return(
			<div className="Splash">
				{this.buildFullWord('Patrick', false, false)}
				{this.buildFullWord('Johnston', false, true)}
			</div>
		);
	}
}

export default Splash;
