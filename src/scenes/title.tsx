import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef, Reference} from "@motion-canvas/core/lib/utils";
import {all} from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
    yield* beginSlide("empty")

    let title: Reference<Txt> = createRef();
    let subtitle: Reference<Txt> = createRef();

    view.add(<>
        <Txt fontSize={70} ref={title}>The English Language</Txt>
        <Txt y={60} fontSize={30} ref={subtitle}>Can English continue to be a world-leading language?</Txt>
    </>)
    yield* beginSlide("title")

    yield *all(
        title().fill("#fff", 0.5),
        subtitle().fill("#fff", 0.5),
    )

    yield* beginSlide("title-out")

    yield *all(
        title().y(-400, 0.5),
        title().fontSize(40, 0.5),
        title().text("test", 0.5),
        subtitle().y(-340, 0.5),
        subtitle().text("", 0.5),
    )

    yield* beginSlide("end")
});
