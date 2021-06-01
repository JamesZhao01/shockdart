import { Col } from "react-bootstrap";
import { useState } from "react";
import LineupComponent from "./lineupComponent";

const LineupWrapper = (props) => {
    const handleClick = (lineupId) => {
        props.handleClickActive(lineupId);
    };

    const constructLineups = () => {
        let lineups = [];
        for (let lineup of props.renderedData) {
            lineups.push(
                <LineupComponent
                    {...lineup}
                    key={lineup.id}
                    handleClick={handleClick}
                    active={props.active[0] === lineup.id}
                />
            );
        }
        return lineups;
    };

    return (
        <Col lg={8} sm={6}>
            {constructLineups()}
        </Col>
    );
};

export default LineupWrapper;
