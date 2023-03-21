import { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
    const makeNewDie = () => ({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
    });
    const allNewDice = () => {
        const newDice = Array.from({ length: 10 }, () => makeNewDie());
        return newDice;
    };

    const [dice, setDice] = useState(allNewDice());
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(0)

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
            setGameOver(true);
        }
    }, [dice]);

    

  

    



    const roll = () => {
        if (!gameOver) {
            const prevRound = round
            setRound(prevRound+1)
            const prevDice = dice;
            setDice(prevDice.map((die) => (die.isHeld ? die : makeNewDie())));
        } else {
            setGameOver(false);
            setDice(allNewDice());
            setRound(0)
        
            
           
        }
    };

    const holdDice = (id) => {
        const oldDice = dice;
        setDice(
            oldDice.map((die) =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    };

    return (
        <main>
            {gameOver && <Confetti />}

            <h1 className="title">
                {gameOver ? "Congratulation!" : "Tenzies"}
            </h1>
            <p className="instructions">
                {gameOver
                    ? `You won making ${round} round! `
                    : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
            </p>
            <div className="container">
                {dice.map((die) => (
                    <Die
                        key={die.id}
                        value={die.value}
                        isHeld={die.isHeld}
                        holdDice={() => holdDice(die.id)}
                    />
                ))}
            </div>
            <button className="roll-btn" onClick={roll}>
                {gameOver ? "New Game" : "Roll"}
            </button>
            <p className="round">Round: {round}</p> 
        </main>
    );
}

export default App;
