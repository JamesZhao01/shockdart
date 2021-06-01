import { useRef, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Diamond, DiamondFill } from "react-bootstrap-icons";

const LineupComponent = (props) => {
    const constructCharges = (charge) => {
        let items = [];
        for (let i = 0; i < 3; i++) {
            items.push(
                <Col
                    xs={2}
                    key={i}
                    className={`border border-dark ${
                        charge > i ? "bg-danger" : "bg-primary"
                    }`}
                />
            );
        }
        return items;
    };

    const constructBounces = (bounce) => {
        let items = [];
        for (let i = 0; i < 2; i++) {
            items.push(
                <Col
                    xs={1}
                    key={i}
                    className="d-flex flex-row align-items-center"
                >
                    {bounce > i ? (
                        <DiamondFill color="red" className="mx-auto" />
                    ) : (
                        <DiamondFill color="gray" className="mx-auto" />
                    )}
                </Col>
            );
        }
        return items;
    };
    return (
        <Row
            className={props.active ? "active-lineup" : "non-active-lineup"}
            onClick={() => {
                props.handleClick(props.id);
            }}
        >
            <Col xs={4}>
                <img className="img-fluid" src={props.position.src} />
            </Col>
            <Col xs={4}>
                <img className="img-fluid" src={props.lineup.src} />
            </Col>
            <Col xs={4}>
                <img className="img-fluid" src={props.lineup.src} />
            </Col>
            <Col xs={3} className="charge"></Col>
            {constructCharges(props.charge)}
            <Col xs={3}></Col>
            <Col xs={5}></Col>
            {constructBounces(props.bounce)}
            <Col xs={5}></Col>
        </Row>
    );
};

export default LineupComponent;
