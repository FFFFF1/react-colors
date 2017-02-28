/* 选择色度和明度 */

// todo: 添加propTypes和defaultProps
// todo: 将div叠加修改为梯度背景色的叠加
// todo: 使用梯度和filter，添加其他二维选择功能
// todo: 客制化选框

import React, { Component, PureComponent } from 'react'
import reactCSS from 'reactcss'
import * as saturation from '../helpers/saturation'
import throttle from 'lodash/throttle'

export class Saturation extends (PureComponent || Component) {
  static propTypes = {

  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)

    // 50ms内不重复触发
    this.throttle = throttle((fn, data, e) => {
      fn(data, e)
    }, 50)
  }

  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = (e, skip) => {
    this.props.onChange(saturation.calculateChange(e, skip, this.props, this.refs.container), e)
  }

  handleMouseDown = (e) => {
    this.handleChange(e, true)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const styles = reactCSS({
      'default': {
        root: {
          position: 'relative',
          display: 'inline-block',
          width: '256px',
          height: '256px',
          background: `hsl(${ this.props.hsv.h },100%, 50%)`,
        },
        white: {
          absolute: '0px 0px 0px 0px',
          background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
        },
        black: {
          absolute: '0px 0px 0px 0px',
          background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
        pointer: {
          position: 'absolute',
          top: `${ -(this.props.hsv.v * 100) + 100 }%`,
          left: `${ this.props.hsv.s * 100 }%`,
          cursor: 'default',
        },
        circle: {
          width: '4px',
          height: '4px',
          boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
          borderRadius: '50%',
          cursor: 'hand',
          transform: 'translate(-2px, -2px)',
        },
      },
      'custom': {
        ...this.props.style
      },
    }, { 'custom': !!this.props.style })

    return (
      <div
        style={ styles.root }
        ref="container"
        onMouseDown={ this.handleMouseDown }
        onTouchMove={ this.handleChange }
        onTouchStart={ this.handleChange }
      >
        <div style={ styles.white }>
          <div style={ styles.black } />
          <div style={ styles.pointer }>
            { this.props.pointer ? (
              <this.props.pointer { ...this.props } />
            ) : (
              <div style={ styles.circle } />
            ) }
          </div>
        </div>
      </div>
    )
  }
}

export default Saturation