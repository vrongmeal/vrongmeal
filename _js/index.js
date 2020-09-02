import transition from "./partials/transition.js";
import zoom from "./partials/zoom.js";
import $ from "jquery";

$("main img").each(function() {
  if( $(this).attr("class") !== "nozoom" ) {
    this.setAttribute("data-action", "zoom");
  }
});

transition();
zoom();
