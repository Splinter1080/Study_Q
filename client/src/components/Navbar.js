import React,{useState} from "react";
import { Segment, Menu ,Input} from "semantic-ui-react";

export default function Navbar() {

  const [activeItem , setActiveItem] = useState('home')

const  handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    
    <Segment color="teal">
      <Menu secondary stackable>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='join group'
          active={activeItem === 'join group'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='create group'
          active={activeItem === 'create group'}
          onClick={handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </Segment>
  );
}
