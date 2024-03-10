// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {minuets: 25, seconds: 0, isTrue: false}
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.timerId)
  }

  getIncreasedSeconds = () => {
    const {seconds, minuets} = this.state
    const isCompleted = seconds === minuets * 60
    if (isCompleted) {
      this.clearTimerInterval()
      this.setState({isTrue: false})
    } else {
      this.setState(obj => ({seconds: obj.seconds + 1}))
    }
  }

  playAndPauseButton = () => {
    const {minuets, seconds, isTrue} = this.state
    const isCompleted = seconds === minuets * 60
    if (isCompleted) {
      this.setState({seconds: 0})
    }
    if (isTrue) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.getIncreasedSeconds, 1000)
    }
    this.setState(obj => ({isTrue: !obj.isTrue}))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({minuets: 25, seconds: 0, isTrue: false})
  }

  onDecreaseLimit = () => {
    this.setState(obj => ({minuets: obj.minuets - 1}))
  }

  onIncreaseLimit = () => {
    this.setState(obj => ({minuets: obj.minuets + 1}))
  }

  render() {
    const {isTrue, minuets, seconds} = this.state
    const totalSeconds = minuets * 60 - seconds
    const min = Math.floor(totalSeconds / 60)
    const sec = Math.floor(totalSeconds % 60)
    const a = min > 9 ? min : `0${min}`
    const b = sec > 9 ? sec : `0${sec}`
    const isDisabled = seconds > 0
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="card-container">
          <div className="image-container">
            <div className="timer-container">
              <h1 className="timer-text">
                {a}:{b}
              </h1>
              {isTrue ? <p>Running</p> : <p>Paused</p>}
            </div>
          </div>
          <div className="timer-buttons-container">
            <div className="play-pause-reset-button-container">
              <button
                className="button button1"
                onClick={this.playAndPauseButton}
              >
                {isTrue ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                    alt="pause icon"
                    className="icon"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="icon"
                  />
                )}
                {isTrue ? 'Pause' : 'Start'}
              </button>
              <button className="button button1" onClick={this.onResetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <p>Reset</p>
              </button>
            </div>
            <div>
              <p>Set Timer Limit</p>
              <div className="add-dec-button-container">
                <button
                  className="limit-controller-button"
                  type="button"
                  disabled={isDisabled}
                  onClick={this.onDecreaseLimit}
                >
                  -
                </button>
                <div>
                  <p className="timer-duration">{min}</p>
                </div>
                <button
                  className="limit-controller-button"
                  type="button"
                  disabled={isDisabled}
                  onClick={this.onIncreaseLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
