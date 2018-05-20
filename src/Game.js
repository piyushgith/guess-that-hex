import React, { Component } from 'react';
import GameGuessing from './GameGuessing'
import WaitingForPlayers from './WaitingForPlayers'
import ResultBox from './ResultBox'
import logo from './logo.png';

class Game extends Component {
  constructor() {
    super()
    this.state = {}
  }

  renderGameContent() {
    const { creator, revealed, hex, guess, players, onSubmit,
      onReveal } = this.props

    if(revealed) {
      return this.renderReveal()
    } else {
      return (
        <GameGuessing
          creator={creator}
          guess={guess}
          hex={hex}
          onReveal={onReveal}
          onSubmit={onSubmit}
          players={players}
        />
      )
    }
  }

  renderReveal() {
    const { hex, players } = this.props
    
    return (
      <div>
        <div style={styles.boxes}>
          {players && players.map(player => (
            <ResultBox
              key={player.id}
              player={player}
            />
          ))}
        </div>
        <div className="color-container">
          <div className="color" style={{ backgroundColor: hex || '#fff' }}></div>
        </div>
      </div>
    )
  }

  render() {
    const { id, creator, started, players, onStart } = this.props

    return (
      <div>
        <div style={styles.nav}>
          <div style={styles.navContainer}>
            <img src={logo} style={styles.logo} alt="guess that hex" />
          </div>
        </div>

        {started ? this.renderGameContent() : (
          <WaitingForPlayers
            gameId={id}
            players={players}
            creator={creator}
            onStart={onStart}
          />
        )}
      </div>
    )
  }
}

const styles = {
  nav: {
    borderBottom: '1px solid #eee',
  },
  navContainer: {
    margin: '0 auto',
    width: '992px',
    maxWidth: '80%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    width: '200px',
    height: '61px',
    margin: '0.75em 0 -1.4em',
    zIndex: '1'
  },
  boxes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    height: '100vh'
  }
}

export default Game;
