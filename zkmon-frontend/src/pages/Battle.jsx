import React, { useState, useEffect } from "react";
import "./BattleCss/animate.css";
import "./BattleCss/battle.css";
import "./BattleCss/bootstrap.css";
import TextBox from "../components/TextBox.js";
import EnemyBox from "../components/EnemyBox.js";
import PlayerBox from "../components/PlayerBox.js";
import Attacks from "../components/Attacks.js";
import PlayAgain from "../components/PlayAgain.js";

const Battle = ({ signer }) => {
  const [state, setState] = useState({
    playerName: "Blastoise",
    //... rest of your state
    gameOver: false,
  });

  useEffect(() => {
    startingSequence();
  }, []);

  const startingSequence = () => {
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        textMessageOne: `A wild ${state.enemyName} appeared!`,
        enemyFaint: false,
      }));

      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          textMessageOne: `Go ${state.playerName}!`,
          playerFaint: false,
        }));

        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            textMessageOne: "",
          }));
        }, 3000);
      }, 3000);
    }, 1000);
  };

  const enemyTurn = (enemyAttackName, enemyAttackDamage) => {
    enemyAttackDamage = enemyAttackDamage + Math.floor(Math.random() * 11);

    if (state.enemyHP === 0) {
      setState((prevState) => ({
        ...prevState,
        textMessageOne: `${state.enemyName} fainted.`,
        textMessageTwo: `${state.playerName} wins!`,
        enemyFaint: true,
      }));

      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          gameOver: true,
        }));
      }, 3000);
    } else {
      setState((prevState) => ({
        ...prevState,
        textMessageOne: `${state.enemyName} used ${enemyAttackName} for ${enemyAttackDamage} damage!`,
      }));

      setTimeout(() => {
        if (state.playerHP === 0) {
          setState((prevState) => ({
            ...prevState,
            textMessageOne: `${state.playerName} fainted.`,
            textMessageTwo: `${state.enemyName} wins!`,
            playerFaint: true,
          }));

          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              gameOver: true,
            }));
          }, 3000);
        } else {
          setState((prevState) => ({
            ...prevState,
            textMessageOne: "",
          }));
        }
      }, 2000);
    }
  };

  const handleAttackClick = (name, damage) => {
    damage = damage + Math.floor(Math.random() * 11);

    setState((prevState) => ({
      ...prevState,
      enemyHP: Math.max(prevState.enemyHP - damage, 0),
      playerHP: Math.max(100 - damage - 10, 0),
      textMessageOne: `${state.playerName} used ${name} for ${damage} damage!`,
      textMessageOne: `${
        state.playerName
      } recveived ${name} for poison attack having ${
        100 - damage - 10
      } damage!`,
    }));

    setTimeout(() => {
      let enemyAttack = Math.floor(Math.random() * 4);
      let enemyAttackDamage = state.enemyAttackDamage[enemyAttack];
      let enemyAttackName = state.enemyAttackNames[enemyAttack];

      enemyTurn(enemyAttackName, enemyAttackDamage);
    }, 3000);
  };

  const handlePlayAgain = () => {
    setState((prevState) => ({
      ...prevState,
      playerHP: state.playerMaxHP,
      enemyHP: state.enemyMaxHP,
      gameOver: false,
      textMessageOne: "",
      textMessageTwo: "",
      enemyFaint: false,
      playerFaint: false,
    }));
  };

  return (
    <div className="container h-100">
      <div className="row row h-100 justify-content-center align-items-center">
        <div className="col-sm-12">
          <div id="battle-container" className="px-2 mx-auto">
            <EnemyBox
              enemyName={state.enemyName}
              enemyLevel={state.enemyLevel}
              enemyHP={state.enemyHP}
              enemyMaxHP={state.enemyMaxHP}
              enemyFaint={state.enemyFaint}
            />

            <PlayerBox
              playerName={state.playerName}
              playerLevel={state.playerLevel}
              playerHP={state.playerHP}
              playerMaxHP={state.playerMaxHP}
              playerFaint={state.playerFaint}
            />

            <div id="text-box">
              <div id="text-box-content">
                {state.textMessageOne !== "" && state.gameOver === false && (
                  <TextBox
                    messageOne={state.textMessageOne}
                    messageTwo={state.textMessageTwo}
                  />
                )}

                {state.textMessageOne === "" && state.gameOver === false && (
                  <div>
                    {Object.keys(state.playerAttacks).map((key, index) => (
                      <Attacks
                        key={key}
                        index={index}
                        details={state.playerAttacks[key]}
                        handleAttackClick={handleAttackClick}
                      />
                    ))}
                  </div>
                )}

                {state.gameOver === true && <PlayAgain signer={signer} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
