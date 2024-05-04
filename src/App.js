import React from 'react';

const buttons = [
    { id: 'clear', value: 'AC', displayText: 'AC' },
    { id: 'divide', value: '/', displayText: '/' },
    { id: 'multiple', value: 'x', displayText: 'x' },
    { id: 'seven', value: '7', displayText: '7' },
    { id: 'eight', value: '8', displayText: '8' },
    { id: 'nine', value: '9', displayText: '9' },
    { id: 'subtract', value: '-', displayText: '-' },
    { id: 'four', value: '4', displayText: '4' },
    { id: 'five', value: '5', displayText: '5' },
    { id: 'six', value: '6', displayText: '6' },
    { id: 'add', value: '+', displayText: '+' },
    { id: 'one', value: '1', displayText: '1' },
    { id: 'two', value: '2', displayText: '2' },
    { id: 'three', value: '3', displayText: '3' },
    { id: 'zero', value: '0', displayText: '0' },
    { id: '.', value: '.', displayText: '.' },
    { id: 'equal', value: '=', displayText: '=' }
];

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: '0',
            formula: '',
            flag_equal: 0,
            flag_operator: 0
        };
        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    handleButtonPress = (value) => () => {
        const { input, formula, flag_equal } = this.state;

        if (value === 'AC') {
            this.resetCalculator();
        } else if (value === '=') {
            this.calculateResult();
        } else if (value === '.') {
            this.handleDecimal(value);
        } else if (!isNaN(value)) {
            this.handleNumber(value);
        } else {
            this.handleOperator(value);
        }
    };

    resetCalculator() {
        this.setState({ input: '0', formula: '', flag_equal: 0 });
    }

    calculateResult() {
        const result = eval(this.state.formula.replace(/x/g, '*'));
        this.setState(prevState => ({
            input: result.toString(),
            formula: prevState.formula + '=' + result,
            flag_equal: 1
        }));
    }

    handleDecimal(value) {
        if (!this.state.input.includes('.')) {
            this.setState(prevState => ({
                input: prevState.input + value,
                formula: prevState.formula === '' ? '0' + value : prevState.formula + value
            }));
        }
    }

    handleNumber(value) {
        if (this.state.flag_equal === 1 || this.state.input === '0') {
            this.setState({
                input: value,
                formula: value !== '0' ? value : '',
                flag_equal: 0
            });
        } else {
            this.setState(prevState => ({
                input: prevState.flag_operator === 1 ? value: prevState.input + value,
                formula: prevState.formula + value,
                flag_operator: 0
            }));
        }
    }

    handleOperator(value) {
        if (this.state.flag_equal === 1) {
            this.setState(prevState => ({
                formula: prevState.input + value,
                flag_equal: 0
            }));
        } else if (this.state.input !== '0') {
            this.setState(prevState => ({
                formula: prevState.formula + value
            }));
        }
        this.setState({ input: value , flag_operator: 1});
    }

    render() {
        return (
            <div id="App">
                <div id="calculator">
                    <div id="formulaDisplay">{this.state.formula}</div>
                    <div id="display">{this.state.input}</div>
                    <div id="calculatorBody">
                        {buttons.map(button => (
                            <button
                                key={button.id}
                                id={button.id}
                                value={button.value}
                                onClick={this.handleButtonPress(button.value)}
                            >
                                {button.displayText}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Calculator;
