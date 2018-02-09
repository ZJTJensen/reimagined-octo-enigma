var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var calculatePayment = function(principal, years, rate) {
    var monthlyRate = rate / 100 / 12;
    var monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));
    var balance = principal;
    var amortization = [];
    
    for (var y=0; y<years; y++) {
        var interestY = 0;  //Interest payment for year y
        var principalY = 0; //Principal payment for year y
        for (var m=0; m<12; m++) {
            var interestM = balance * monthlyRate;       //Interest payment for month m
            var principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({principalY: principalY, interestY: interestY, balance: balance});
    }
    return {monthlyPayment: monthlyPayment, amortization:amortization};
};

var Header =  createReactClass({
    render: function () {
        return (
            <header>
                <h1>{this.props.title}</h1>
            </header>
        );
    }
});

var AmortizationChart =  createReactClass({
    render: function () {
        var items = this.props.data.map(function (year, index) {
            var d = new Date();
        var now = d.getFullYear();
            return (
                <tr key={index}>
                    <td>{now+index + 1}</td>
                    <td className="currency principal">{(year.principalY.toFixed(2)).toLocaleString()}</td>
                    <td className="stretch">
                        <div className="flex">
                            <div className="bar principal" style={{flex: year.principalY, WebkitFlex: year.principalY}}></div>
                            <div className="bar interest" style={{flex: year.interestY, WebkitFlex: year.interestY}}></div>
                        </div>
                    </td>
                    <td className="currency interest">{(year.interestY.toFixed(2)).toLocaleString()}</td>
                    <td className="currency">{(year.balance.toFixed(2)).toLocaleString()}</td>
                </tr>
            );
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>Year</th>
                    <th className="principal">Principal</th>
                    <th className="stretch"></th>
                    <th className="interest">Interest</th>
                    <th>Balance</th>
                </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        );
    }
});

var MortgageCalculator =  createReactClass({
    getInitialState: function() {
        return {
            principal: this.props.principal,
            years: this.props.years,
            rate: this.props.rate
        };
    },
    principalChange: function(event) {
        this.setState({principal: event.target.value});
    },
    yearsChange: function(event) {
        this.setState({years: event.target.value});
    },
    rateChange: function(event) {
        this.setState({rate: event.target.value});
    },
    render: function () {
        var payment = calculatePayment(this.state.principal, this.state.years, this.state.rate);
        var monthlyPayment = payment.monthlyPayment;
        var amortization = payment.amortization;
        return (
            <div className="content">
                <div className="form">
                    <div>
                        <label>Principal:</label>
                        <input type="text" value={this.state.principal} onChange={this.principalChange}/>
                    </div>
                    <div>
                        <label>Years:</label>
                        <input type="text" value={this.state.years} onChange={this.yearsChange}/>
                    </div>
                    <div>
                        <label htmlFor="rate">Rate:</label>
                        <input type="text" value={this.state.rate} onChange={this.rateChange}/>
                    </div>
                </div>
                <h2>Monthly Payment: <span className="currency">{Number(monthlyPayment.toFixed(2)).toLocaleString()}</span></h2>
                <AmortizationChart data={amortization}/>
            </div>
        );
    }
});

var App =  createReactClass({
    render: function () {
        return (
            <div>
                <Header title="React Mortgage Calculator"/>
                <MortgageCalculator principal="200000" years="30" rate="5"/>
            </div>
        );
    }
});

ReactDOM.render(<App/>,  document.getElementById("app"));