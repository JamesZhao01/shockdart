import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const maps = ["Ascent", "Bind", "Haven", "Icebox", "Split"];

const MapSelector = (props) => {
    const handleChange = (newMap) => props.updateMaps(newMap);

    return (
        <ToggleButtonGroup
            className="mx-auto my-1"
            type="checkbox"
            value={props.maps}
            onChange={handleChange}
        >
            {maps.map((item, idx) => {
                return (
                    <ToggleButton key={item} value={item}>
                        {item}
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
};

export default MapSelector;
