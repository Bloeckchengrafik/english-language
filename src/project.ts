import {makeProject} from '@motion-canvas/core';

import title from './scenes/title?scene';
import overview from "./scenes/overview?scene";
import current from "./scenes/current?scene";
import currentInfluences from "./scenes/currentInfluences?scene";
import currentTimeline from "./scenes/currentTimeline?scene";
import currentAmounts from "./scenes/currentAmounts?scene";
import issues from "./scenes/issues?scene";
import whatabout from "./scenes/whatabout?scene";
import conclusion from "./scenes/summary?scene";

export default makeProject({
  scenes: [title, overview, current, currentInfluences, currentTimeline, currentAmounts, issues, whatabout, conclusion],
});
