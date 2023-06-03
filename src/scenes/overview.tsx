import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef, Reference} from "@motion-canvas/core/lib/utils";
import {all} from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<>
        <Txt fontSize={50} y={-400} ref={title}>Overview</Txt>
    </>)

    yield* title().fill("#fff", 0.5)

    yield* beginSlide("overview-1")

    let refCurrentSituation: Reference<Txt> = createRef();
    let refIssues: Reference<Txt> = createRef();
    let refOutlook: Reference<Txt> = createRef();
    let refConclusion: Reference<Txt> = createRef();
    view.add(<>
        <Txt y={-200} fontSize={60} ref={refCurrentSituation}>The current Situation</Txt>
        <Txt y={-100} fontSize={60} ref={refIssues}>Issues</Txt>
        <Txt y={0} fontSize={60} ref={refOutlook}>Outlook</Txt>
        <Txt y={100} fontSize={60} ref={refConclusion}>Conclusion</Txt>
    </>)
    yield* refCurrentSituation().fill("#fff", 0.5)
    yield* beginSlide("overview-2")
    yield* refIssues().fill("#fff", 0.5)
    yield* beginSlide("overview-3")
    yield* refOutlook().fill("#fff", 0.5)
    yield* beginSlide("overview-4")
    yield* refConclusion().fill("#fff", 0.5)

    yield* beginSlide("overview-out")
    yield* all(
        refIssues().fill("#000", 0.5),
        refOutlook().fill("#000", 0.5),
        refConclusion().fill("#000", 0.5),
        refCurrentSituation().y(-400, 0.5),
        refCurrentSituation().fontSize(50, 0.5),
        title().fill("#000", 0.5),
    )

    yield* beginSlide("overview-out-2")
});
