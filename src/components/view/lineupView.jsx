import { useState, useEffect } from "react";
import MapSelector from "./mapSelector";
import TypeSelector from "./typeSelector";
import MapComponent from "./mapComponent";
import LineupWrapper from "./lineupWrapper";
import DrawComponent from "../draw/drawCoponent";
import { Row, Col } from "react-bootstrap";

const View = () => {
    const [maps, setMaps] = useState([]);
    const [type, setType] = useState("Recon");
    const [target, setTarget] = useState([]);
    const [data, setData] = useState({});
    const [renderedData, setRenderedData] = useState([]);

    const [active, setActive] = useState([-1, undefined]);
    const [waypoints, setWaypoints] = useState([]);

    const handleClickActive = (lineupId) => {
        if (active[0] === lineupId) {
            handleModifiedTypeTarget(true);
        } else {
            let newLineup = data[lineupId];
            setActive([lineupId, newLineup.target]);
            setWaypoints([
                [...newLineup.waypoints.stand, newLineup.id, 1],
                [...newLineup.waypoints.land, newLineup.id, 0],
            ]);
        }
    };

    const handleModifiedTypeTarget = (forceReset = false) => {
        let result = [];
        let waypoints = [];

        for (const [lineupId, lineup] of Object.entries(data)) {
            if (maps.includes(lineup.map)) {
                if (type === lineup.type && target.includes(lineup.target)) {
                    result.push(lineup);
                    waypoints.push([...lineup.waypoints.land, lineup.id]);
                }
            }
        }

        // if type/map/target changed and the id is no longer present, then reset the active and reset waypoints
        if (
            active[0] === -1 ||
            forceReset ||
            (active[0] !== -1 &&
                typeof active[1] !== "undefined" &&
                !target.includes(active[1]))
        ) {
            setActive([-1, undefined]);
            setWaypoints(waypoints);
        }

        setRenderedData(result);
    };

    useEffect(() => {
        fetch("./data.json")
            .then((res) => res.json())
            .then((jsonData) => {
                let restructuredData = {};
                for (const [map, value] of Object.entries(jsonData)) {
                    for (const lineup of value.lineups) {
                        restructuredData[lineup.id] = { ...lineup, map: map };
                    }
                }
                setData(restructuredData);
                console.log(restructuredData);
            });
    }, []);

    useEffect(() => {
        handleModifiedTypeTarget(false);
    }, [maps, type, target]);

    return (
        <div className="container d-flex flex-column">
            <MapSelector
                maps={maps}
                updateMaps={(newMap) => {
                    setMaps(newMap);
                }}
            />
            <TypeSelector
                type={type}
                updateType={(newType) => {
                    setType(newType);
                }}
                target={target}
                updateTarget={(newTarget) => {
                    setTarget(newTarget);
                }}
            />
            <Row>
                <LineupWrapper
                    renderedData={renderedData}
                    handleClickActive={handleClickActive}
                    active={active}
                    setActive={(newActive) => setActive(newActive)}
                    setWaypoints={(newWaypoints) => setWaypoints(newWaypoints)}
                />
                <MapComponent
                    waypoints={waypoints}
                    setActive={(newActiveId) => handleClickActive(newActiveId)}
                />
            </Row>
            <Row>
                <DrawComponent />
            </Row>
        </div>
    );
};

export default View;
