import React, { render, useState } from "react";
import { Stage, Layer, Text, Line, Image } from "react-konva";
import useImage from "use-image";

const LionImage = (props) => {
    const [image] = useImage("./img/lineups/lineup.png");
    console.log(image);
    if (image) {
        return (
            <Image
                image={image}
                scaleX={props.size / image.width}
                scaleY={props.size / image.height}
            />
        );
    }
    return null;
};

const DrawComponent = (props) => {
    const [drawLine, setDrawLine] = useState([]);
    const [lines, setLines] = useState([]);
    const [size, setSize] = useState(500);

    return (
        <Stage
            width={size}
            height={size}
            className="border border-primary"
            onMouseLeave={(e) => {
                console.log("leave");
                setDrawLine([]);
            }}
            onMouseUp={(e) => {
                console.log("up");
                if (drawLine.length > 2) {
                    let pointer = e.currentTarget.getPointerPosition();
                    setLines([
                        ...lines,
                        [drawLine[0], drawLine[1], pointer.x, pointer.y],
                    ]);
                }
                setDrawLine([]);
            }}
            onMouseMove={(e) => {
                console.log("move", e.currentTarget.getPointerPosition());
                if (drawLine.length >= 2) {
                    let pointer = e.currentTarget.getPointerPosition();
                    setDrawLine([
                        drawLine[0],
                        drawLine[1],
                        pointer.x,
                        pointer.y,
                    ]);
                }
            }}
            onMouseDown={(e) => {
                console.log("down");
                let pointer = e.currentTarget.getPointerPosition();
                setDrawLine([pointer.x, pointer.y]);
            }}
        >
            <Layer>
                <LionImage size={size} />
                {drawLine.length !== 0 ? (
                    <Line points={drawLine} stroke="red" strokeWidth="20" />
                ) : undefined}
                {lines.map((item, idx) => {
                    return (
                        <Line
                            key={idx}
                            points={item}
                            stroke="red"
                            strokeWidth="20"
                            onMouseDown={(e) => {
                                console.log("bap");
                                lines.splice(idx, 1);
                                setLines([...lines]);
                                e.cancelBubble = true;
                            }}
                        />
                    );
                })}

                {/* <Image /> */}
                {/* <Line
                    points={[0, 0, 50, 50]}
                    stroke="red"
                    strokeWidth="20"
                    onMouseDown={(e) => {
                        console.log("line!");
                        e.cancelBubble = true;
                    }}
                /> */}

                {/* <Text
                    text="Draggable Text"
                    x={state.x}
                    y={state.y}
                    draggable
                    fill={state.isDragging ? "green" : "black"}
                    onDragStart={() => {
                        setState({ ...state, isDragging: true });
                    }}
                    onDragEnd={(e) => {
                        setState({
                            ...state,
                            isDragging: false,
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }}
                /> */}
            </Layer>
        </Stage>
    );
};

export default DrawComponent;
