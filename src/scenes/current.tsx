import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Img, Rect} from "@motion-canvas/2d/lib/components";
import worldMap from "../assets/world.svg";
import worldMapIndoEuropean from "../assets/worldIndoEuropean.svg";
import europeWestgermanic from "../assets/europeWestgermanic.svg";
import europeAngles from "../assets/europeAngles.svg";
import {all} from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<>
        <Txt fontSize={50} y={-400} ref={title} fill={"white"}>About the English Language</Txt>
    </>)

    let worldMapRef = createRef<Img>();
    let worldMapIndoEuropeanRef = createRef<Img>();
    let worldMapWestGermanicRef = createRef<Img>();
    let worldMapAnglesRef = createRef<Img>();

    let rectMap = createRef<Rect>();
    let rectText = createRef<Rect>();

    let indoEuropean = createRef<Txt>();
    let westGermanic = createRef<Txt>();
    let angles = createRef<Txt>();

    let legendWorld = createRef<Rect>();
    let legendWorldText = createRef<Txt>();

    let legendIndoEuropean = createRef<Rect>();
    let legendIndoEuropeanText = createRef<Txt>();

    let legendWestGermanic = createRef<Rect>();
    let legendWestGermanicText = createRef<Txt>();

    let legendAngles = createRef<Rect>();
    let legendAnglesText = createRef<Txt>();

    let groupRight = createRef<Rect>();

    view.add(<>
        <Rect scale={0.7} x={-550} y={170} height={1000} ref={rectText}>
            <Txt fontSize={50} y={-400} width={1000} textAlign={"left"} fill={"white"} ref={indoEuropean}
                 opacity={0}>Indo-European
                language family</Txt>
            <Txt fontSize={50} y={-300} width={1000} textAlign={"left"} fill={"white"} ref={westGermanic}
                 opacity={0}>West
                Germanic Language</Txt>
            <Txt fontSize={50} y={-200} width={1000} textAlign={"left"} fill={"white"} ref={angles} opacity={0}>Named
                after the Angles</Txt>
        </Rect>
        <Rect ref={groupRight}>
            <Rect scale={0.7} x={300} ref={rectMap} width={1800} height={1000} clip={true} opacity={0}>
                <Img src={worldMap} ref={worldMapRef}/>
                <Img src={worldMapIndoEuropean} ref={worldMapIndoEuropeanRef} opacity={0}/>
                <Img src={europeWestgermanic} ref={worldMapWestGermanicRef} opacity={0}/>
                <Img src={europeAngles} ref={worldMapAnglesRef} opacity={0} y={900} scale={4}/>
            </Rect>
            <Rect y={400}>
                <Rect>
                    <Rect fill={"#eacdc2"} width={32} height={32} ref={legendWorld} radius={10} opacity={0}></Rect> <Txt
                    fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"} ref={legendWorldText}></Txt>
                </Rect>
                <Rect y={50}>
                    <Rect fill={"#7475b4"} width={32} height={32} ref={legendIndoEuropean} radius={10}
                          opacity={0}></Rect> <Txt
                    fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
                    ref={legendIndoEuropeanText}></Txt>
                </Rect>
                <Rect x={350}>
                    <Rect fill={"#79b474"} width={32} height={32} ref={legendWestGermanic} radius={10}
                          opacity={0}></Rect> <Txt
                    fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
                    ref={legendWestGermanicText}></Txt>
                </Rect>
                <Rect x={350} y={50}>
                    <Rect fill={"#b47474"} width={32} height={32} ref={legendAngles} radius={10} opacity={0}></Rect>
                    <Txt
                        fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
                        ref={legendAnglesText}></Txt>
                </Rect>
            </Rect>
        </Rect>
    </>)

    yield* all(
        rectMap().opacity(1, 1),
        legendWorld().opacity(1, 1),
        legendWorldText().text("Others", 1),
    )

    yield* beginSlide("indo-european");

    // Indo-European
    yield* all(
        indoEuropean().opacity(1, 1),
        worldMapIndoEuropeanRef().opacity(1, 1),
        legendIndoEuropean().opacity(1, 1),
        legendIndoEuropeanText().text("Indo-European", 1),
    );

    yield* beginSlide("west-germanic");
    worldMapRef().opacity(0);

    // West Germanic
    yield* all(
        westGermanic().opacity(1, 1),
        worldMapIndoEuropeanRef().scale(4, 1),
        worldMapIndoEuropeanRef().y(900, 1),
        worldMapWestGermanicRef().scale(4, 1),
        worldMapWestGermanicRef().y(900, 1),
    );

    yield* all(
        worldMapWestGermanicRef().opacity(1, 1),
        legendWestGermanic().opacity(1, 1),
        legendWestGermanicText().text("West Germanic (in europe)", 1),
    );


    yield* beginSlide("angles");

    // Angles
    yield* all(
        angles().opacity(1, 1),
        worldMapAnglesRef().opacity(1, 1),
        legendAngles().opacity(1, 1),
        legendAnglesText().text("Early Angle Settlements (400-500 CE)", 1),
    );

    yield* beginSlide("end");

    yield* all(
        groupRight().opacity(0, 1),
    );
});
