const createHTMLElement = require('./createHTMLElement');

const d = new createHTMLElement(`
    <div>
        hello pramith
    </div>
`);
document.getElementById('app').appendChild(d);