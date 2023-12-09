import React, { useEffect } from "react";
import EnemyImage from "./img/enemy.png";

const EnemyAvatar = ({ enemyFaint }) => {
  useEffect(() => {
    let anim = "";
    if (enemyFaint === true) {
      anim = "animated fadeOut slow";
    } else if (enemyFaint === false) {
      anim = "animated zoomIn slow";
    } else {
      anim = "hide";
    }
    const avatarElement = document.getElementById("enemy-avatar");
    if (avatarElement) {
      avatarElement.className = anim;
    }
  }, [enemyFaint]);

  return (
    <div id="enemy-avatar" className="hide">
      <img className="avatar mr-3 mt-4" src={EnemyImage} alt="" />
    </div>
  );
};

export default EnemyAvatar;
