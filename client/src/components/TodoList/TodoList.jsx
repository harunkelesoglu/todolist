import React,{Component} from 'react';
import {Tab} from 'semantic-ui-react';
import Items from '../Items/Items';

class TodoList extends Component{

    constructor(props){
        super(props)
        this.state={
            panes:[]
        }
    }
    componentDidMount(){
        const panes = (this.props) && this.props.map(item => {
            return { menuItem: item.name, render: () => <Tab.Pane> <Items items={item.items}/> </Tab.Pane> }
        });
        this.setState({panes})
    }

    render(){
        const {panes} = this.state;
        return(
            <Menu pointing vertical>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item
              name='messages'
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='friends'
              active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
          </Menu> 
    }
}

export default TodoList;