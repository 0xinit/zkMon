import React, { PureComponent } from "react";
import PlayerImage from "./img/hero.png";

export default class EnemyAvatar extends PureComponent {
  render() {
    let faint = this.props.playerFaint;
    let anim;
    if (faint === true) {
      anim = "animated fadeOut slow";
    }
    if (faint === false) {
      anim = "animated 	fadeInUp";
    }
    if (faint === "") {
      anim = "hide";
    }
    return (
      <div className={anim}>
        <img className="avatar mx-2" src={PlayerImage} alt="" />
      </div>
    );
  }
}
