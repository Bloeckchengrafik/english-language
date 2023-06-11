import {Txt} from '@motion-canvas/2d/lib/components/Txt';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Img} from "@motion-canvas/2d/lib/components";
import worldImg from "../assets/world.svg";
import worldIndoEuropeanImg from "../assets/worldIndoEuropean.svg";
import europeWestGermanicImg from "../assets/europeWestgermanic.svg";
import europeAnglesImg from "../assets/europeAngles.svg";
import {all} from "@motion-canvas/core/lib/flow";
import {version} from "vite";


export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    let whatDoYouThink = createRef<Txt>();

    view.add(<>
        <Txt fontSize={50} y={-400} fill={"white"} ref={title}></Txt>
        <Txt fontSize={70} y={0} fill={"white"} ref={whatDoYouThink}></Txt>
    </>)

    yield* title().text("Conclusion", 1)
    yield* beginSlide("conclusion-question-in")
    yield* whatDoYouThink().text("What do you think?", 1.5)
    yield* beginSlide("conclusion-question-out")
    yield* whatDoYouThink().text("", 0.75)
    yield* beginSlide("conclusion-history")

    let world = createRef<Img>();
    let worldIndoEuropean = createRef<Img>();
    let europeWestGermanic = createRef<Img>();
    let europeAngles = createRef<Img>();

    view.add(<>
        <Img scale={0.7} ref={world} opacity={0} src={worldImg}></Img>
        <Img scale={0.7} ref={worldIndoEuropean} opacity={0} src={worldIndoEuropeanImg}></Img>
        <Img scale={0.7} ref={europeWestGermanic} opacity={0} src={europeWestGermanicImg}></Img>
        <Img scale={0.7} ref={europeAngles} opacity={0} src={europeAnglesImg}></Img>
    </>)

    yield* world().opacity(1, 1)
    yield* beginSlide("conclusion-indo-european")
    yield* worldIndoEuropean().opacity(1, 1)
    yield* beginSlide("conclusion-west-germanic")
    yield* europeWestGermanic().opacity(1, 1)
    yield* beginSlide("conclusion-angles")
    yield* europeAngles().opacity(1, 1)
    yield* beginSlide("conclusion-english")
    yield* all(
        world().opacity(0, 1),
        worldIndoEuropean().opacity(0, 1),
        europeWestGermanic().opacity(0, 1),
        europeAngles().opacity(0, 1),
    )

    yield* beginSlide("conclusion-issues")

    let difficulty = createRef<Txt>();
    let challenge = createRef<Txt>();
    let culture = createRef<Txt>();

    view.add(<>
        <Txt fontSize={50} y={100} fill={"white"} ref={difficulty}></Txt>
        <Txt fontSize={50} y={0} fill={"white"} ref={challenge}></Txt>
        <Txt fontSize={50} y={-100} fill={"white"} ref={culture}></Txt>
    </>)

    yield* difficulty().text("Can be difficult to understand for non-native speakers", 1)
    yield *beginSlide("conclusion-issues-2")
    yield* challenge().text("Challenged by other languages (especially Chinese)", 1)
    yield *beginSlide("conclusion-issues-3")
    yield* culture().text("Languages are cultural artifacts", 1)
    yield *beginSlide("conclusion-issues-4")

    yield* all(
        difficulty().text("", 1),
        challenge().text("", 1),
        culture().text("", 1),
    )

    yield* beginSlide("conclusion-future")

    let businessAndScience = createRef<Txt>();

    view.add(<>
        <Txt fontSize={40} y={70} fill={"white"} ref={businessAndScience}></Txt>
    </>)

    yield* whatDoYouThink().text("It's not going anywhere", 1.5)
    yield* beginSlide("conclusion-future-2")
    yield* businessAndScience().text("The Language Of Business and science", 1.5)
    yield* beginSlide("conclusion-future-3")
    yield* all(
        whatDoYouThink().text("", 0.75),
        businessAndScience().text("", 0.75),
    )
    yield* beginSlide("conclusion-end")
    yield* title().text("", 0.5)
    yield* whatDoYouThink().text("Thank you!", 1.5)
});
