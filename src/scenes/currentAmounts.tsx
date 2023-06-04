import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Circle, Rect, Line, Img} from "@motion-canvas/2d/lib/components";
import {Vector2} from "@motion-canvas/core/lib/types";
import {createSignal} from "@motion-canvas/core/lib/signals";
import worldMap from "../assets/worldEnglish.svg";
import {all} from "@motion-canvas/core/lib/flow";
import {createEaseOutBack, createEaseOutElastic, easeOutExpo, easeOutQuint} from "@motion-canvas/core/lib/tweening";

const GREEN = '#99C47A';
const BLUE = '#68ABDF';
const ORANGE = '#FFA500';

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    let rectText = createRef<Rect>();
    let rectGraph = createRef<Rect>();

    let mostSpokenLanguage = createRef<Txt>();
    let spreadOfEnglish = createRef<Txt>();

    let englishAbsolute = 1500; // in millions
    let chineseAbsolute = 1100;
    let hindiAbsolute = 602.2;

    let englishRelative = 1;
    let chineseRelative = chineseAbsolute / englishAbsolute;
    let hindiRelative = hindiAbsolute / englishAbsolute;

    let graphScale = createSignal(0)
    let initScale = createSignal(0)

    let worldMapRef = createRef<Img>();

    let englishOfficialContainer = createRef<Rect>();
    let englishOfficial = createRef<Txt>();
    let englishUnofficialContainer = createRef<Rect>();
    let englishUnofficial = createRef<Txt>();

    view.add(<>
        <Txt fontSize={50} y={-400} ref={title} fill={"white"}>About the English Language</Txt>
        <Rect scale={0.7} x={-550} y={170} height={1000} ref={rectText}>
            <Txt fontSize={50} y={-400} width={1000} textAlign={"left"} fill={"white"}
                 opacity={0} ref={mostSpokenLanguage}>Most spoken Language worldwide</Txt>
            <Txt fontSize={50} y={-300} width={1000} textAlign={"left"} fill={"white"}
                 opacity={0} ref={spreadOfEnglish}>Spread by english colonialism</Txt>
        </Rect>
        <Rect scale={0.7} x={300} ref={rectGraph} width={1800} height={1000} clip={true} opacity={1}>
            <Img src={worldMap} ref={worldMapRef} opacity={0}/>
            <Rect>
                <Rect x={-400}>
                    <Txt fontSize={50} width={400} x={-150} textAlign={"right"} fill={"white"}
                         opacity={initScale}>English</Txt>
                    <Line
                        x={70}
                        points={() => [
                            new Vector2(0, -40 * initScale()),
                            new Vector2(0, 50 * initScale())
                        ]}
                        stroke={BLUE}
                        lineWidth={5}
                    />
                    <Line
                        x={70}
                        points={() => [
                            new Vector2(2, 0),
                            new Vector2(700 * englishRelative * graphScale(), 0)
                        ]}
                        opacity={graphScale}
                        stroke={BLUE}
                        lineWidth={40}
                    >
                        <Txt fontSize={50} width={() => 1650 * graphScale()} opacity={graphScale} textAlign={"right"}
                             clip={true} fill={"white"}>1.5B</Txt>
                    </Line>
                </Rect>
            </Rect>
            <Rect y={100}>
                <Rect x={-400}>
                    <Txt fontSize={50} width={500} x={-200} textAlign={"right"} fill={"white"} opacity={initScale}>Chinese
                        (Mandarin)</Txt>
                    <Line
                        x={70}
                        points={() => [
                            new Vector2(0, -50 * initScale()),
                            new Vector2(0, 50 * initScale())
                        ]}
                        stroke={BLUE}
                        lineWidth={5}
                    />
                    <Line
                        x={70}
                        points={() => [
                            new Vector2(2, 0),
                            new Vector2(700 * chineseRelative * graphScale(), 0)
                        ]}
                        opacity={graphScale}
                        stroke={BLUE}
                        lineWidth={40}
                    >
                        <Txt fontSize={50} width={() => 1280 * graphScale()} opacity={graphScale} textAlign={"right"}
                             clip={true} fill={"white"}>1.1B</Txt>
                    </Line>
                </Rect>
            </Rect>
            <Rect y={200}>
                <Rect x={-400}>
                    <Txt fontSize={50} width={400} x={-150} textAlign={"right"} fill={"white"}
                         opacity={initScale}>Hindi</Txt>
                    <Line
                        x={70}
                        points={() => [
                            new Vector2(0, -50 * initScale()),
                            new Vector2(0, 40 * initScale())
                        ]}
                        stroke={BLUE}
                        lineWidth={5}
                    />
                    <Line
                        x={70}
                        points={() => [
                            new Vector2(2, 0),
                            new Vector2(700 * hindiRelative * graphScale(), 0)
                        ]}
                        opacity={graphScale}
                        stroke={BLUE}
                        lineWidth={40}
                    >
                        <Txt fontSize={50} width={() => 950 * graphScale()} opacity={graphScale} textAlign={"right"}
                             clip={true} fill={"white"}>602.2M</Txt>
                    </Line>
                </Rect>
            </Rect>
        </Rect>

        <Rect y={400}>
            <Rect>
                <Rect fill={BLUE} width={32} height={32} ref={englishOfficialContainer} radius={10} opacity={0}></Rect> <Txt
                fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"} ref={englishOfficial}></Txt>
            </Rect>
            <Rect y={50}>
                <Rect fill={GREEN} width={32} height={32} ref={englishUnofficialContainer} radius={10}
                      opacity={0}></Rect> <Txt
                fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
                ref={englishUnofficial}></Txt>
            </Rect>
        </Rect>
    </>)

    yield* beginSlide("start")

    yield* initScale(1, 0.5)
    yield* graphScale(1, 0.5)

    yield* beginSlide("text")

    yield* mostSpokenLanguage().opacity(1, 0.5)

    yield* beginSlide("endStatistic")

    yield* graphScale(0, 0.5)
    yield* initScale(0, 0.5)

    yield* worldMapRef().opacity(1, 0.5)

    yield* beginSlide("englishOfficial")

    yield* all(
        englishOfficialContainer().opacity(1, 0.5),
        englishOfficial().text("English as an official language", 0.5),
    )
    yield* all(
        englishUnofficialContainer().opacity(1, 0.5),
        englishUnofficial().text("English as an unofficial language", 0.5),
    )

    yield *spreadOfEnglish().opacity(1, 0.5)

    yield* beginSlide("end")

    yield* all(
        englishOfficialContainer().opacity(0, 0.5),
        englishOfficial().text("", 0.5),

        englishUnofficialContainer().opacity(0, 0.5),
        englishUnofficial().text("", 0.5),

        worldMapRef().opacity(0, 0.5),
    )

    yield* rectText().opacity(0, 0.5)
    yield* title().text("", 2, easeOutExpo)
});
