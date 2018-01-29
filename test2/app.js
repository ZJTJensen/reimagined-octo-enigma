const React = require("react");
const ReactDOM = require("react-dom");
    const myButton = React.createElement('button', null, 'Click Me');
	console.log(JSON.stringify(myButton));
	/*
		Prints the following:
		{
		"type":"button",
		"key":null,
		"ref":null,
		"props": {
		"children":"Click Me!"
		},
		"_owner":null,
		"_store":{}
		}
	*/
	ReactDOM.render(myButton, document.getElementById('app'));