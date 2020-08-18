// @flow
import theme from "./theme";

class Style {
  themes: Object;
  constructor() {
    this.themes = {};
    this.add("default", theme);
    this.activate("default");
  }

  activate(name) {
    this.themes["active"] = this.themes[name];
  }

  get() {
    return this.themes["active"];
  }

  add(name, styles) {
    this.themes[name] = styles;
  }
}

export default new Style();