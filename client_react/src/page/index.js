import Loadable from "../component/Loadable";
import {lazy} from "react";

const UiChat = Loadable(lazy(() => import('./ui-chat')))
export {UiChat}