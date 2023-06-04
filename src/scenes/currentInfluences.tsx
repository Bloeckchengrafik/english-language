import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {all, waitFor} from "@motion-canvas/core/lib/flow";
import {Circle, Rect, Line} from "@motion-canvas/2d/lib/components";
import {Vector2} from "@motion-canvas/core/lib/types";

const RED = '#ff6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';
const ORANGE = '#FFA500';
const PINK = '#FFC0CB';
const YELLOW = '#dede35';

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    let rectText = createRef<Rect>();

    let influencedBy = createRef<Txt>();
    let rectGraph = createRef<Rect>();

    // Circle fade in animation
    // Should run as follows:
    // 1. Two dots on top of each other fade in
    // 2. One dot moves to the right and a line is drawn between the two dots
    // 3. The dot that just moved turns in a circle while drawing a circle
    // 4. a circle line is formed
    // 5. The circle line is filled with color
    // 6. The dots are removed as well as the line

    let dotLeft = createRef<Circle>();
    let dotRight = createRef<Circle>();

    let dotRightContainer = createRef<Rect>();
    let latinPart = createRef<Circle>();
    let frenchPart = createRef<Circle>();
    let germanicPart = createRef<Circle>();
    let greekPart = createRef<Circle>();
    let properNamesPart = createRef<Circle>();
    let otherPart = createRef<Circle>();

    let legend = createRef<Rect>();

    view.add(<>
        <Txt fontSize={50} y={-400} ref={title} fill={"white"}>About the English Language</Txt>
        <Rect scale={0.7} x={-550} y={170} height={1000} ref={rectText}>
            <Txt fontSize={50} y={-400} width={1000} textAlign={"left"} fill={"white"}
                 opacity={1}>Indo-European
                language family</Txt>
            <Txt fontSize={50} y={-300} width={1000} textAlign={"left"} fill={"white"}
                 opacity={1}>West
                Germanic Language</Txt>
            <Txt fontSize={50} y={-200} width={1000} textAlign={"left"} fill={"white"} opacity={1}>Named
                after the Angles</Txt>
            <Txt fontSize={50} y={-100} width={1000} textAlign={"left"} fill={"white"} ref={influencedBy}
                 opacity={0}>Influenced by many different cultures</Txt>
        </Rect>
        <Rect scale={0.7} x={300} ref={rectGraph} width={1800} height={1000} clip={true} opacity={1}>
            <Circle width={20} height={20} fill="#fff" ref={dotLeft} zIndex={1}/>
            <Circle width={800} height={800} stroke={"black"} strokeFirst={true} lineWidth={2} fill={RED} startAngle={0}
                    endAngle={0} ref={otherPart} closed={true}/>
            <Circle width={800} height={800} stroke={"black"} strokeFirst={true} lineWidth={2} fill={BLUE}
                    startAngle={0} endAngle={0} ref={frenchPart} closed={true}/>
            <Circle width={800} height={800} stroke={"black"} strokeFirst={true} lineWidth={2} fill={GREEN}
                    startAngle={0} endAngle={0} ref={germanicPart} closed={true}/>
            <Circle width={800} height={800} stroke={"black"} strokeFirst={true} lineWidth={2} fill={YELLOW}
                    startAngle={0} endAngle={0} ref={greekPart} closed={true}/>
            <Circle width={800} height={800} stroke={"black"} strokeFirst={true} lineWidth={2} fill={PINK}
                    startAngle={0} endAngle={0} ref={properNamesPart} closed={true}/>
            <Circle width={800} height={800} stroke={"black"} strokeFirst={true} lineWidth={2} fill={ORANGE}
                    startAngle={0} endAngle={0} ref={latinPart} closed={true}/>
        </Rect>
        <Rect scale={0.7} x={300} width={1800} height={1000} clip={true} opacity={1} ref={dotRightContainer}>
            <Circle width={20} height={20} fill="#fff" ref={dotRight}/>
            <Line
                points={() => [new Vector2(dotLeft().x(), dotLeft().y()), new Vector2(dotRight().x(), dotRight().y())]}
                lineWidth={4} stroke="#fff"/>
        </Rect>
        <Rect y={400} x={130} ref={legend} opacity={0}>
            <Rect x={-300}>
                <Rect fill={BLUE} width={32} height={32} radius={10} opacity={1}></Rect> <Txt
                fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}>29% French</Txt>
            </Rect>
            <Rect y={50} x={-300}>
                <Rect fill={ORANGE} width={32} height={32} radius={10}
                      opacity={1}></Rect>
                <Txt fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}>
                    29% Latin
                </Txt>
            </Rect>
            <Rect x={350}>
                <Rect fill={RED} width={32} height={32} radius={10}
                      opacity={1}></Rect> <Txt
                fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
            >6% Other</Txt>
            </Rect>
            <Rect x={350} y={50}>
                <Rect fill={PINK} width={32} height={32} radius={10} opacity={1}></Rect>
                <Txt
                    fontSize={32} x={230} width={400} textAlign={"left"} fill={"white"}
                >4% Proper Names</Txt>
            </Rect>
            <Rect x={0}>
                <Rect fill={GREEN} width={32} height={32} radius={10}
                      opacity={1}></Rect> <Txt
                fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
            >26% Germanic</Txt>
            </Rect>
            <Rect x={0} y={50}>
                <Rect fill={YELLOW} width={32} height={32} radius={10} opacity={1}></Rect>
                <Txt
                    fontSize={32} x={130} width={200} textAlign={"left"} fill={"white"}
                >6% Greek</Txt>
            </Rect>
        </Rect>
    </>)

    yield* dotRight().x(400, 0.5)
    yield* all(
        // move in a circular motion
        dotRightContainer().rotation(360, 1),
        otherPart().endAngle(360, 1),
    )
    yield* all(
        dotLeft().opacity(0, 0.5),
        dotRightContainer().opacity(0, 0.5)
    )

    let startOther = 360 - 21.6;
    let startLatin = startOther - 104.4;
    let startFrench = startLatin - 104.4;
    let startGermanic = startFrench - 93.6;
    let startGreek = startGermanic - 21.6;
    let startProperNames = startGreek - 14.4;

    yield* all(
        otherPart().startAngle(startOther, 1),
        latinPart().startAngle(startLatin, 1),
        frenchPart().startAngle(startFrench, 1),
        germanicPart().startAngle(startGermanic, 1),
        greekPart().startAngle(startGreek, 1),
        properNamesPart().startAngle(startProperNames, 1),
        otherPart().endAngle(360, 1),
        latinPart().endAngle(startOther, 1),
        frenchPart().endAngle(startLatin, 1),
        germanicPart().endAngle(startFrench, 1),
        greekPart().endAngle(startGermanic, 1),
        properNamesPart().endAngle(startGreek, 1),
        rectGraph().rotation(45, 1),
    )

    yield* beginSlide("current-influences-0")

    yield* all(
        legend().opacity(1, 0.5),
        influencedBy().opacity(1, 0.5)
    )

    yield* beginSlide("current-influences-1")

    yield* all(
        legend().opacity(0, 0.5),
        rectGraph().opacity(0, 0.5),
    )
});
