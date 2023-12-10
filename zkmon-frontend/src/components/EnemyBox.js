import React from "react";
import EnemyAvatar from "./EnemyAvatar";

const EnemyBox = ({
  enemyHP,
  enemyMaxHP,
  enemyName,
  enemyLevel,
  enemyFaint,
}) => {
  const percentage = (enemyHP / enemyMaxHP) * 100 + "%";
  const num = (enemyHP / enemyMaxHP) * 100;
  let progressColor;

  if (num <= 25) {
    progressColor = "progress-bar bg-danger";
  } else if (num <= 50) {
    progressColor = "progress-bar bg-warning";
  } else if (num > 50) {
    progressColor = "progress-bar bg-success";
  }

  return (
    <div>
      <div id="enemy-container">
        <div id="enemy-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <h2 id="enemy-name">{enemyName}</h2>
            <h5 className="mr-1 d-none d-sm-block">Lv{enemyLevel}</h5>
          </div>
          <div className="d-flex justify-content-between align-items-center ml-3 mr-1">
            <h5>HP</h5>
            <div className="progress ml-1 both-progress">
              <div
                className={progressColor}
                role="progressbar"
                style={{ width: percentage }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>

        <div className="mr-sm-4 avatar-box">
          <EnemyAvatar enemyFaint={enemyFaint} />
          <div className="oval" />
        </div>
      </div>
    </div>
  );
};

export default EnemyBox;
