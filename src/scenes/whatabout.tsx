import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Rect, Img, Circle} from "@motion-canvas/2d/lib/components";
import StillAmount from "../assets/001202.png"
import {createSignal} from "@motion-canvas/core/lib/signals";
import {all} from "@motion-canvas/core/lib/flow";
import Cap from "../assets/cap.png";

const YELLOW = '#FFC66D';
const RED = '#FF6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';
const ORANGE = '#FFA500';
const PURPLE = '#B68CB8';
const PINK = '#FFB6C1';
const TEAL = '#5feeee';
const BROWN = '#A52A2A';
const OTHER_BLUE = '#36558F';
const GREY = '#a6a6a6';

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    let mostWidely = createRef<Txt>();
    let imgAmount = createRef<Img>();
    let imgCap = createRef<Img>();
    let fiftyEight = createRef<Txt>();
    let takeALongTime = createRef<Txt>();

    view.add(<>
        <Txt fontSize={50} y={-400} fill={"white"} ref={title}></Txt>
        <Rect scale={0.7} x={-450} y={170} height={1000}>
            <Txt fontSize={50} y={-400} width={1400} textAlign={"left"} fill={"white"}
                 opacity={0} ref={mostWidely}>English is the most widely spoken language in the world</Txt>
            <Txt fontSize={50} y={-300} width={1400} textAlign={"left"} fill={"white"}
                    opacity={0} ref={fiftyEight}>Most of the internet is in English</Txt>
            <Txt fontSize={50} y={-200} width={1400} textAlign={"left"} fill={"white"}
                    opacity={0} ref={takeALongTime}>It would take a long time for people to get used to a new language</Txt>
        </Rect>
        <Img scale={0.7} x={450} ref={imgAmount} width={1200} height={700} clip={true} opacity={0} stroke={BLUE}
             lineWidth={4} src={StillAmount}></Img>
        <Img scale={0.7} x={450} ref={imgCap} width={700} height={700} opacity={0} src={Cap}></Img>
    </>)

    yield* title().text("What about the future?", 1)

    yield* beginSlide("whatabout-1")

    yield* mostWidely().opacity(1, 0.75)
    yield* imgAmount().opacity(1, 0.75)

    yield* beginSlide("whatabout-2")

    yield* imgAmount().opacity(0, 0.75)

    const percentColorsAndLabels = [
        {
            percent: 0.577,
            color: BLUE,
            label: 'English'
        },
        {
            percent: 0.053,
            color: YELLOW,
            label: 'Russian'
        },
        {
            percent: 0.045,
            color: RED,
            label: 'Spanish'
        },
        {
            percent: 0.039,
            color: GREEN,
            label: 'French'
        },
        {
            percent: 0.039,
            color: ORANGE,
            label: 'German'
        },
        {
            percent: 0.032,
            color: PURPLE,
            label: 'Japanese'
        },
        {
            percent: 0.026,
            color: PINK,
            label: 'Turkish'
        },
        {
            percent: 0.022,
            color: TEAL,
            label: 'Persian'
        },
        {
            percent: 0.018,
            color: BROWN,
            label: 'Portuguese'
        },
        {
            percent: 0.017,
            color: OTHER_BLUE,
            label: 'Italian'
        },
        {
            percent: 0.132,
            color: GREY,
            label: 'Other'
        }
    ]

    const startAndEndDegrees = []

    let prevEnd = 0

    for (let percentColorsAndLabel of percentColorsAndLabels) {
        let start = prevEnd
        prevEnd = prevEnd + percentColorsAndLabel.percent * 360

        startAndEndDegrees.push({
            name: percentColorsAndLabel.label,
            color: percentColorsAndLabel.color,
            startDeg: start,
            endDeg: prevEnd,
            sortKey: percentColorsAndLabel.percent
        })
    }

    startAndEndDegrees.sort((a, b) => {
        return b.sortKey - a.sortKey
    })

    let rectGraph = createRef<Rect>();

    let scale = createSignal(0)
    let legend = createRef<Rect>();

    view.add(<>
        <Rect scale={0.7} x={300} ref={rectGraph} width={1800} height={1000} clip={true} opacity={0}>
            {startAndEndDegrees.map((startAndEndDegree) => {
                return <Circle width={600} height={600} fill={startAndEndDegree.color} zIndex={0} closed={true}
                               startAngle={() => startAndEndDegree.startDeg * scale()} endAngle={() => startAndEndDegree.endDeg * scale()}/>
            })}
        </Rect>

        <Rect y={400} x={130} ref={legend} opacity={0}>
            {startAndEndDegrees.map((startAndEndDegree, index) => {
                let y = (index % 3) * 50
                let x = Math.floor(index / 3) * 275

                return <>
                    <Rect x={-350 + x} y={y - 50}>
                        <Rect fill={startAndEndDegree.color} width={32} height={32} radius={10} opacity={1}></Rect>
                        <Txt
                            fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
                            text={`${Math.round(startAndEndDegree.sortKey * 1000) / 10}% ${startAndEndDegree.name}`}
                        ></Txt>
                    </Rect>
                </>
            })}
        </Rect>
    </>)

    yield* rectGraph().opacity(1, 0.75)
    yield* all(
        scale(1, 1.5),
        rectGraph().rotation(40, 1.5),
        legend().opacity(1, 1.5)
    )

    yield* beginSlide("whatabout-3")

    yield* fiftyEight().opacity(1, 0.75)

    yield* all(
        rectGraph().opacity(0, 0.75),
        legend().opacity(0, 0.75),
    )

    yield* imgCap().opacity(1, 0.75)
    yield* takeALongTime().opacity(1, 0.75)

    yield* beginSlide("whatabout-4")

    yield* all(
        imgCap().opacity(0, 0.75),
        takeALongTime().opacity(0, 0.75),
        fiftyEight().opacity(0, 0.75),
        mostWidely().opacity(0, 0.75)
    )

    let forgetIt = createRef<Txt>();

    view.add(<Txt fontSize={70} y={0} fill={"white"} ref={forgetIt}></Txt>)
    yield* forgetIt().text("Forget it", 1)
    yield* forgetIt().text("Forget it, it's not going anywhere", 1)
});
