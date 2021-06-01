import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const targets = ["Retake", "Attack", "Defend"];

const shockTargets = ["Bomb", "Cheese"];

const TypeSelector = (props) => {
    const handleTypeChange = (newType) => {
        props.updateType(newType);
        props.updateTarget([]);
    };

    const handleTargetChange = (newTarget) => {
        props.updateTarget(newTarget);
    };

    return (
        <>
            <ToggleButtonGroup
                className="mx-auto my-1"
                type="radio"
                name="typeSelector"
                value={props.type}
                onChange={handleTypeChange}
            >
                <ToggleButton name="typeSelector" value={"Recon"}>
                    Recon
                </ToggleButton>
                <ToggleButton name="typeSelector" value={"Shock"}>
                    Shock
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                className={`mx-auto my-1 ${
                    props.type === "Recon" ? "" : "d-none"
                }`}
                type="checkbox"
                value={props.target}
                onChange={handleTargetChange}
            >
                {targets.map((item, idx) => {
                    return (
                        <ToggleButton key={item} value={item}>
                            {item}
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>
            <ToggleButtonGroup
                className={`mx-auto my-1 ${
                    props.type === "Recon" ? "d-none" : ""
                }`}
                type="checkbox"
                value={props.target}
                onChange={handleTargetChange}
            >
                {shockTargets.map((item, idx) => {
                    return (
                        <ToggleButton key={item} value={item}>
                            {item}
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>
        </>
    );
};

export default TypeSelector;
