import React from 'react';
import './styles/NavList.css';

// function ListButton(props) {
//     return (
//         <li className="ListItem">
//             <button>
//                 {props.name}
//             </button>
//         </li>
//     )
// }

class ListButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkName: "CONTENT"
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        document.querySelector(".ContentSection div").textContent = e.target.textContent;
    };

    render() {
        return(
        <li className="ListItem" onClick={e => this.handleClick(e)}>
            <button>
                {this.props.name}
            </button>
        </li>
        )
    }
}

// function ListItem(props) {
//     return (
//         <li className="ListItem">
//             <a href="./">{props.name}</a>
//         </li>
//     )
// }
  
function NavList(props) {
    const links = props.links;
    const listItems = links.map((link) =>
        // <ListItem key={link.toString()} name={link} />
        <ListButton key={link.toString()} name={link} />
    );
    return (
        <ul className="NavList">
            {listItems}
        </ul>
    );
}

export default NavList;