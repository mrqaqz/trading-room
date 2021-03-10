import React, { Component } from "react";
import { Button, Card, Icon, Modal } from "react-materialize";
import ProductDescription from "./ProductDescription";
import UserDescrition from "./UserDescription";

export default class NotificationCard extends Component {
  constructor() {
    super();

    this.handleApprove = this.handleApprove.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }
  handleApprove() {
    this.props.approveAction(this.props.notification);
  }

  handleReject() {
    this.props.rejectAction(this.props.notification);
  }
  render() {
    const { notification } = this.props;
    return (
      <Modal
        actions={[
          <ApproveButton
            key={this.props.key}
            handleApprove={this.handleApprove}
          />,
          <DeclinButton
            key={this.props.key}
            handleReject={this.handleReject}
          />,
        ]}
        bottomSheet={false}
        fixedFooter={true}
        header="Notification"
        id={this.props.key}
        open={false}
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
        trigger={
          <Card
            // actions={[<ApproveButton />, <DeclinButton />]}
            className={notification.read ? "red lighten-5 " : " red darken-4"}
            closeIcon={<Icon>close</Icon>}
            revealIcon={<Icon>more_vert</Icon>}
            textClassName={notification.read ? "grey-text" : " white-text"}
            title={notification.title}
          >
            {notification.message.text}
          </Card>
        }
      >
        {notification.message.text}
        <br />

        {notification.message.product != null ? (
          <ProductDescription product={notification.message.product} />
        ) : (
          <UserDescrition user={notification.message.user} />
        )}
      </Modal>
    );
  }
}

function ApproveButton(props) {
  return (
    <Button
      flat
      right
      modal="close"
      node={props.key}
      waves="red"
      className="valign-wrapper"
      onClick={props.handleApprove}
    >
      Approve <Icon>check</Icon>
    </Button>
  );
}
function DeclinButton(props) {
  return (
    <Button
      flat
      right
      modal="close"
      node={props.key}
      waves="red"
      className="valign-wrapper"
      onClick={props.handleReject}
    >
      Decline <Icon>close</Icon>
    </Button>
  );
}
