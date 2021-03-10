import React, { Component } from "react";
import { LangContext } from "../language";

export default class LanguageSwitch extends Component {
  render() {
    return (
      <LangContext.Consumer>
        {({ toggleLang }) => (
          <div className="switch right">
            <label>
              PT
              <input type="checkbox" id="MVP" onChange={toggleLang} />
              <span className="lever" />
              EN
            </label>
          </div>
        )}
      </LangContext.Consumer>
    );
  }
}
