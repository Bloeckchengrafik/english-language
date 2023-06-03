import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef, Reference} from "@motion-canvas/core/lib/utils";
import {all} from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<>
        <Txt fontSize={50} y={-400} ref={title}>About the english language</Txt>
    </>)
});
