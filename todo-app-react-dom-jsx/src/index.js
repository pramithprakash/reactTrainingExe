import ReactDom from 'react-dom';
import React, {Fragment} from 'react';

const todoList = [
    "Item 1",
    "Item2",
    "Item3"
];

//#method1
//const todoItems = todoList.map(i => <li>{i}</li>);
// const app = <ul>
//         {todoItems}
//     </ul>
// ReactDom.render(app, document.getElementById('root'));


//#method2
// const app = <ul>
//         {todoList.map(i => <li>{i}</li>)}
//     </ul>
// ReactDom.render(app, document.getElementById('root'));


//#method3
// const App = (props) => <ul>
//         {props.items.map(i => <li>{i}</li>)}
//     </ul> 
// ReactDom.render(<App items={todoList} />, document.getElementById('root'));

let inputElement = null;

const Header = props => <h1>{props.name}</h1>;

const ListItems = ({items}) => <ul className="list-group">{items.map(i => <li className="list-group-item" key={i}>{i}</li>)}</ul>;

const AddItems = () => {
        return (<form onSubmit={addItem}>
            <input type="text" placeholder="Add Item" ref={node => inputElement = node} className="form-control" />
            <input type="submit" className="btn btn-primary" />
        </form>);
    }

const addItem = e => {
    e.preventDefault();
    const newItem = inputElement.value;
    if (newItem == ''){return false}
    inputElement.value = '';
    todoList.push(newItem);
    render();
}

const render = () => {
    ReactDom.render(
        <Fragment><Header name="Todo App" /><AddItems /><ListItems items={todoList} /></Fragment>,
        document.getElementById('root')
    );
}

render();
