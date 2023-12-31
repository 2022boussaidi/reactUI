import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "hi !!!!",
    icon: "bi bi-person",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "any help????",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "having a problem!!!",
    icon:"bi bi-person",
    color: "danger",
    date: "6 minute ago",
  },
 
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">  Teamwork Comments</CardTitle>
        
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
