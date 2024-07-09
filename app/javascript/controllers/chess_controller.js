import { Controller } from "@hotwired/stimulus";
import { Chess } from "./chess.js.js";
import { Chessboard } from './chessboardjs.js';

// Connects to data-controller="chess"
export default class extends Controller {
  connect() {
    console.log ("Connected");
  }
}
