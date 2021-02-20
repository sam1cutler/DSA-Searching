import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const inputArray = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];


class App extends Component {

  state = {
    valueToFind: null,
    binaryTicks: 0
  }

  
  

  handleFormSubmission(event) {
    event.preventDefault();

    console.log('user submitted form');
    
    const { goal } = event.target;
    console.log(goal.value);

    this.setState({
      valueToFind: goal.value
    })
  }

  doLinearSearch() {
    console.log('Attempting linear search.');

    let ticks = 0;
    let searchResult = '';

    for (let i=0 ; i<inputArray.length ; i++) {
      //console.log(inputArray[i]);
      ticks++;
      if (inputArray[i] === parseInt(this.state.valueToFind)) {
        searchResult = `The linear search found ${this.state.valueToFind} after ${ticks} search steps.`;
        return searchResult;
      }
    }

    searchResult = `The linear search could not find ${this.state.valueToFind} after ${ticks} search steps.`;
    return searchResult;
  }

  binarySearch(array, targetValue, start, end, ticks=0) {
    
    // define default or provided values for start and end
    var start = (start === undefined)
        ? 0
        : start;
    var end = (end === undefined)
        ? array.length
        : end;

    ticks++

    if (start > end) {
        return [-1, ticks];
    }

    const index = Math.floor( (start + end) / 2 );
    console.log(`Index is ${index}.`);

    const item = array[index];
    console.log(`Item is ${item}.`);

    if (item == targetValue) {
      return [index, ticks];
    } else if (item < targetValue) {
      return this.binarySearch(array, targetValue, index+1, end, ticks);
    } else if (item > targetValue) {
      return this.binarySearch(array, targetValue, start, index-1, ticks);
    }

  }

  
  doBinarySearch() {
    console.log('Attempting binary search.');

    const sortedArray = inputArray.sort(
      (a, b) => {
        return a - b;
      }
    );

    const searchResults = this.binarySearch(sortedArray, this.state.valueToFind);
    console.log('And here we are in dosearch func')
    console.log(searchResults);

    if (searchResults[0] === -1) {
      return `The binary search could not find ${this.state.valueToFind} after ${searchResults[1]} search steps.`
    } else {
      return `The binary search found ${this.state.valueToFind} after ${searchResults[1]} search steps.`
    }
  }

  findAndCompare() {

    const linearAnswer = this.doLinearSearch();

    const binaryAnswer = this.doBinarySearch();

    return (
      <div className='answer-box'>
        <div>
          {linearAnswer}
        </div>
        <div>
          {binaryAnswer}
        </div>
      </div>
    )

  }

  render() {

    console.log(`Current target is ${this.state.valueToFind}`)

    
    const answer = (this.state.valueToFind !== null)
      ? this.findAndCompare()
      : console.log('Nothing to report');

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            What do you want to find?
          </p>
          <div>
            <form onSubmit={e => this.handleFormSubmission(e)}>
              <label htmlFor='goal'>Search for:</label>
              {' '}
              <input type='number' id='goal' min='1' max='99'/>
              <br />
              <button type='submit'>Submit</button>
            </form>
          </div>
          {answer}
        </header>
      </div>
    );
  }
  
}

export default App;
