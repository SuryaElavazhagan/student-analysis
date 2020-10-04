import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

declare global {
  export interface Window {
    gapi: any;
  }
}