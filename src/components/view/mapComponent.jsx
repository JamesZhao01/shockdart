import { useRef, useEffect, useState } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvent,
} from "react-leaflet";
import { Col } from "react-bootstrap";
import { CRS, divIcon } from "leaflet";

const MapEvent = (props) => {
    useMapEvent("resize", (e) => {
        console.log(e);
        props.updateSize(e.newSize.x);
    });

    useMapEvent("click", (e) => {
        console.log(
            Math.round((e.latlng.lat / props.size) * 100) / 100,
            Math.round((e.latlng.lng / props.size) * 100) / 100
        );
    });
    return null;
};

const MapComponent = (props) => {
    const [size, setSize] = useState(0);
    const map = useRef(null);

    const iconClasses = ["marker-primary", "marker-secondary"];
    const iconMap = iconClasses.map((item, idx) =>
        divIcon({ className: item })
    );

    useEffect(() => {
        setSize(map.current.offsetHeight);
        console.log(map.current.offsetHeight);
    }, []);

    return (
        <Col sm={6} lg={4} ref={map}>
            <MapContainer
                center={[size / 2, size / 2]}
                zoom={0}
                crs={CRS.Simple}
                zoomControl={false}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                key={size}
            >
                <TileLayer
                    url="./img/bind.png"
                    bounds={[
                        [0, 0],
                        [size, size],
                    ]}
                    tileSize={size}
                />
                <MapEvent
                    updateSize={(newSize) => {
                        setSize(newSize);
                    }}
                    size={size}
                />
                {props.waypoints.map((item, idx) => {
                    return (
                        <Marker
                            key={idx}
                            position={[item[0] * size, item[1] * size]}
                            icon={iconMap[item.length > 3 ? item[3] : 0]}
                            eventHandlers={{
                                click: (e) => {
                                    props.setActive(item[2]);
                                },
                            }}
                        />
                    );
                })}
            </MapContainer>
        </Col>
    );
};

export default MapComponent;
