import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import ItemTypes from './ItemTypes';

import {flow} from '../utils';//'lodash/flow';

const style = {
  width: 400,
  padding: 5,
  backgroundColor: 'yellow',
};

const cardTarget = {
  drop() {
  },
};

//@DragDropContext(HTML5Backend)
/*
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
*/

class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library',
      }, {
        id: 2,
        text: 'Make it generic enough',
      }, {
        id: 3,
        text: 'Write README',
      }, {
        id: 4,
        text: 'Create some examples',
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it',
      }, {
        id: 6,
        text: '???',
      }, {
        id: 7,
        text: 'PROFIT',
      }],
    };
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      },
    }));
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card),
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.state;

    return connectDropTarget(
      <div style={style}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
            findCard={this.findCard}
          />
        ))}
      </div>,
    );
  }
}

export default flow([
  DropTarget( ItemTypes.CARD, cardTarget, connect => ({ connectDropTarget: connect.dropTarget() }) ),
  DragDropContext(HTML5Backend),
])(Container);