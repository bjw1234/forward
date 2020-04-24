import React, { PureComponent } from 'react'
import './index.styl'

enum EToastType {
  "info", "error"
}

type Props = {
  text: string
  type: EToastType
  duration: number
}

class Toast extends PureComponent<Props> {

  timeId: NodeJS.Timeout | undefined

  state = {
    visible: false,
    type: "info",
    text: "loading.."
  }

  show = (params: any) => {

    if (this.timeId) return

    this.setState({
      visible: true,
      text: params.text,
      type: params.type,
    });

    this.timeId = setTimeout(() => {
      this.timeId = undefined
      this.setState({ visible: false });
    }, params.duration);
  }


  render() {
    const { text, visible } = this.state;
    return (
      <div className={`toast-container ${visible ? '' : 'hidden'}`}>
        <div className="text">{text}</div>
      </div>
    )
  }
}

export default Toast