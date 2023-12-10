import React, { useEffect } from "react";
import PlayerImage from "./img/hero.png";

const EnemyAvatar = ({ playerFaint }) => {
  useEffect(() => {
    let anim = "";
    if (playerFaint === true) {
      anim = "animated fadeOut slow";
    } else if (playerFaint === false) {
      anim = "animated fadeInUp";
    } else {
      anim = "hide";
    }
    const avatarElement = document.getElementById("player-avatar");
    if (avatarElement) {
      avatarElement.className = anim;
    }
  }, [playerFaint]);

  return (
    <div id="player-avatar" className="hide">
      <img className="avatar mx-2" src={PlayerImage} alt="" />
    </div>
  );
};

export default EnemyAvatar;
