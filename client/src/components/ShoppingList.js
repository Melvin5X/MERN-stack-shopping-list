import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as legoData from "./loaders/legoloader.json";
import * as doneData from "./loaders/successloader.json";

const legoOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const successOptions = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  render() {
    const { items, loading, loadingDone } = this.props.item;
    return (
      <React.Fragment>
        {!loadingDone ? (
          <FadeIn>
            <div class="d-flex justify-content align-items-center">
              <h2>Fetching users</h2>
              {loading ? (
                <Lottie options={legoOptions} height={120} width={120}></Lottie>
              ) : (
                <Lottie
                  options={successOptions}
                  height={120}
                  width={120}
                ></Lottie>
              )}
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <Container>
              <ListGroup>
                <TransitionGroup className="shopping-list">
                  {items.map(({ _id, name }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem>
                        {this.props.isAuthenticated ? (
                          <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, _id)}
                          >
                            &times;
                          </Button>
                        ) : null}
                        {name}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ListGroup>
            </Container>
          </FadeIn>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
