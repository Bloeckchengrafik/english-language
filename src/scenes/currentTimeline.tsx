import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef, range} from "@motion-canvas/core/lib/utils";
import {Layout, Rect, Line} from "@motion-canvas/2d/lib/components";
import {Vector2} from "@motion-canvas/core/lib/types";
import {createSignal} from "@motion-canvas/core/lib/signals";
import {linear} from "@motion-canvas/core/lib/tweening";
import {all} from "@motion-canvas/core/lib/flow";

const RED = '#ff6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    let rectText = createRef<Rect>();

    let rectGraph = createRef<Rect>();

    let timelineWidth = createSignal(0)
    let shownBars = createSignal(0)

    let earlyModernEnglishVectorDraw = createSignal(0)
    let modernEnglishVectorDraw = createSignal(0)
    let vowelShiftVectorDraw = createSignal(0)

    let earlyModernEnglishText = createRef<Txt>()
    let modernEnglishText = createRef<Txt>()
    let vowelShiftText = createRef<Txt>()

    let timelineDates = [
        "1100", // 12th century
        "1200",
        "1300",
        "1400", // 15th century
        "1500",
        "1600",
        "1700",
        "1800",
        "1900",
        "2000"
    ]

    view.add(<>
        <Txt fontSize={50} y={-400} ref={title} fill={"white"}>About the English Language</Txt>
        <Rect scale={0.7} x={-550} y={170} height={1000} ref={rectText}>
            <Txt fontSize={50} y={-400} width={1000} textAlign={"left"} fill={"white"}
                 opacity={1}>Indo-European
                language family</Txt>
            <Txt fontSize={50} y={-300} width={1000} textAlign={"left"} fill={"white"}
                 opacity={1}>West
                Germanic Language</Txt>
            <Txt fontSize={50} y={-200} width={1000} textAlign={"left"} fill={"white"} opacity={1}>
                Named after the Angles</Txt>
            <Txt fontSize={50} y={-100} width={1000} textAlign={"left"} fill={"white"}
                 opacity={1}>Influenced by many different cultures</Txt>
            <Txt fontSize={50} y={0} width={1000} textAlign={"left"} fill={"white"}
                 opacity={1}>Changed a lot over time</Txt>
        </Rect>
        <Rect scale={0.7} x={300} ref={rectGraph} width={1800} height={1000} clip={true} opacity={1}>
            <Line
                stroke={GREEN}
                lineWidth={8}
                endArrow
                arrowSize={20}
                x={() => -timelineWidth() * 700 * 0.5}
                y={200}
                points={[Vector2.zero, () => Vector2.right.scale(timelineWidth() * 700)]}
            />
            <Layout
                y={200 - 20}
                spawner={() => range(shownBars()).map(i => (
                    <Line stroke={GREEN}
                          lineWidth={7}
                          x={() => (-timelineWidth() * 700 * 0.5 + i * 130) + 10}
                          points={[Vector2.zero, () => Vector2.up.scale(40)]}
                    >
                        <Txt fontSize={30} fill={"white"} text={timelineDates[i]} y={70}></Txt>
                    </Line>
                ))}
            />

            <Line
                stroke={RED}
                lineWidth={8}
                endArrow
                arrowSize={20}
                x={() => (-timelineWidth() * 700 * 0.5) + 410}
                y={50}
                points={[Vector2.zero, () => Vector2.down.scale(-70 * earlyModernEnglishVectorDraw())]}
            >
                <Txt fontSize={40} fill={"white"} y={-30} ref={earlyModernEnglishText} opacity={0}>Early modern english</Txt>
            </Line>

            <Line
                stroke={RED}
                lineWidth={8}
                endArrow
                arrowSize={20}
                x={() => (-timelineWidth() * 700 * 0.5) + 670}
                y={-10}
                points={[Vector2.zero, () => Vector2.down.scale(-130 * modernEnglishVectorDraw())]}
            >
                <Txt fontSize={40} fill={"white"} y={-30} ref={modernEnglishText} opacity={0}>Modern English</Txt>
            </Line>

            <Line
                stroke={BLUE}
                lineWidth={8}
                endArrow
                arrowSize={20}
                x={-230}
                y={300}
                points={[Vector2.zero, () => Vector2.right.scale(255 * vowelShiftVectorDraw())]}
            >
                <Txt fontSize={40} fill={"white"} x={130} y={55} ref={vowelShiftText} opacity={0}>Great Vowel Shift</Txt>
            </Line>
        </Rect>
    </>)


    yield* timelineWidth(1.8, 0.75)
    yield* shownBars(10, 0.25, linear)

    yield* beginSlide("earlyModern")

    yield* all(
        earlyModernEnglishVectorDraw(1, 0.75),
        earlyModernEnglishText().opacity(1, 0.75)
    )

    yield* beginSlide("modern")


    yield* all(
        modernEnglishVectorDraw(1, 0.75),
        modernEnglishText().opacity(1, 0.75)
    )

    yield* beginSlide("vowelShift")

    yield* all(
        vowelShiftVectorDraw(1, 0.75),
        vowelShiftText().opacity(1, 0.75)
    )

    yield* beginSlide("end")

    yield* all(
        rectGraph().opacity(0, 0.75),
        rectText().x(-1500, 1),
    )
});
