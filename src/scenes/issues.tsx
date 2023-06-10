import {CodeBlock, edit, lines, range, remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {DEFAULT} from "@motion-canvas/core/lib/signals";
import {Txt} from "@motion-canvas/2d/lib/components/Txt";
import {Img, Rect} from "@motion-canvas/2d/lib/components";
import ChinaOutline from "../assets/China-outline.svg";
import {all, waitFor} from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
    let title = createRef<CodeBlock>();

    view.add(<>
        <CodeBlock fontSize={50} ref={title} fill={"white"} opacity={0} language={"diff"}
                   code={`The intricacies arising from the pervasive ubiquity \nof English as a preeminent mode of global discourse, \nbeset by an array of quandaries.`}></CodeBlock>
    </>)

    yield* title().opacity(1, 0.75)
    yield* beginSlide("issues")

    yield* title().edit(0.75)`${edit("The intricacies", "Issues")} arising from the pervasive ubiquity \nof English as a preeminent mode of global discourse, \nbeset by an array of quandaries.`

    yield* beginSlide("preeminent")
    yield* title().edit(0.75)`Issues arising from the pervasive ubiquity \nof English as a ${edit("preeminent mode of global discourse", "world-leading language")}, \nbeset by an array of quandaries.`

    yield* beginSlide("visualize-complexity")
    yield* title().selection(range(0, 6, 1, 2), 0.5)

    yield* beginSlide("visualize-complexity-2")
    yield* title().selection(lines(2), 0.5)

    yield* beginSlide("remove")
    yield* title().edit(0.75)`Issues ${edit("arising from the pervasive ubiquity \nof", "with")} English ${edit("as a", "being the")} world-leading language, \nbeset by an array of quandaries.`
    yield* title().edit(0.75)`Issues with English being the world-leading language${remove(", \nbeset by an array of quandaries.")}`
    yield* title().selection(DEFAULT, 0.2)
    yield* title().y(-400, 0.75)

    yield* beginSlide("possibly hard-to-understand")

    let hardToUnderstand = createRef<Txt>();
    let challenge = createRef<Txt>();
    let moreThanJustWords = createRef<Txt>();

    let china = createRef<Img>();
    let quote = createRef<Txt>();
    let quoteSource = createRef<Txt>();

    view.add(<>
            <Rect scale={0.7} x={-450} y={170} height={1000}>
                <Txt fontSize={50} y={-400} width={1300} textAlign={"left"} fill={"white"}
                     opacity={0} ref={hardToUnderstand}>Can be difficult to understand for non-native speakers</Txt>
                <Txt fontSize={50} y={-300} width={1300} textAlign={"left"} fill={"white"}
                     opacity={0} ref={challenge}>Challenged by other languages, namely Chinese</Txt>
                <Txt fontSize={50} y={-200} width={1300} textAlign={"left"} fill={"white"}
                     opacity={0} ref={moreThanJustWords}>Languages are cultural artifacts</Txt>
            </Rect>

            <Rect scale={0.7} x={350} width={1800} height={1000} clip={true} opacity={1}>
                <Img src={ChinaOutline} ref={china} opacity={0}/>
            </Rect>

            <Txt fontSize={50} textAlign={"center"} fill={"white"}
                 opacity={0} ref={quote}
                 text={"Language is the dwelling place \nof ideas that do not exist anywhere else.\n \nIt is a prism through which to see the world."}></Txt>
            <Txt fontSize={30} y={300} textAlign={"center"} fill={"#aaa"}
                 opacity={0} ref={quoteSource} text={"- Dr. Robin Wall Kimmerer"}></Txt>

        </>
    )

    yield* hardToUnderstand().opacity(1, 0.75)

    yield* beginSlide("challenged-by-other-languages")

    yield* china().opacity(1, 0.75)
    yield* challenge().opacity(1, 0.75)

    yield* beginSlide("more-than-just-words")
    yield* all(
        china().opacity(0, 0.75),
        challenge().opacity(0, 0.75),
        hardToUnderstand().opacity(0, 0.75)
    )

    yield* quote().opacity(1, 0.75)

    yield* waitFor(1)

    yield* quoteSource().opacity(1, 0.75)

    yield* beginSlide("quote-out")
    yield* all(
        quote().opacity(0, 0.75),
        quoteSource().opacity(0, 0.75),
    )
    yield* all(
        hardToUnderstand().opacity(1, 0.75),
        challenge().opacity(1, 0.75)
    )

    yield* moreThanJustWords().opacity(1, 0.75)

    yield* beginSlide("out")

    yield* all(
        hardToUnderstand().opacity(0, 0.75),
        challenge().opacity(0, 0.75),
        moreThanJustWords().opacity(0, 0.75)
    )

    yield* title().edit(0.75)`${edit("Issues with English being the world-leading language", "")}`
});
