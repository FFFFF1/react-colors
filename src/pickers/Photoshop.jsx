import React, {PropTypes} from 'react'
import chroma from 'chroma-js'
import PsPointerDoubleTriangle from './PsPointerDoubleTriangle.jsx'
import PsPointerCircle from './PsPointerCircle.jsx'
import ColorPicker, {
	ColorInput, 
	ColorRadio, 
	ColorPanel, 
	ColorBar
} from '../components'


class Photoshop extends React.Component {
	static propTypes = {
		color: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
		header: PropTypes.string,
		onChange: PropTypes.func,
		onAccept: PropTypes.func,
		onCancel: PropTypes.func,
		model: PropTypes.string,
		colorModel: PropTypes.string
	}

	static defaultProps = {
	  color: [255,0,0],
	  onChange: () => {},
	  onAccept: () => {},
	  onCancel: () => {}
	}

	constructor(props) {
	  super(props)
		let color = chroma(props.color, props.colorModel).rgb()
	  this.state = {
	  	color: color,
	  	currColor: color
	  }
	}

	handleChange = (newColor) => {
		this.setState({color: newColor.rgb})
		this.props.onChange(newColor)
	}

	handleAccept = () => {
		this.setState({currColor: this.state.color})
		this.props.onAccept(this.state.color)
	}

	handleCancel = () => {
		this.props.onCancel()
	}

	render () {
		let {color, currColor} = this.state

		const styles = {
			root: {
				width: 550,
				height: 354,
				boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 0px 0px 1px, rgba(0, 0, 0, 0.14902) 0px 8px 16px',
				background: '#ededed',
				fontSize: 'Robot nono Sans-serif'
			},
			title: {
				boxSizing: 'border-box',
				position: 'absolute',
				color: '#666',
				left: 0,
				top: 0,
				width: '100%',
				height: 26,
				lineHeight: '26px',
				paddingLeft: 4, 
				fontSize: 13,
				background: '#fff'
			},
			panel: {
				position: 'absolute',
				left: 12,
				top: 57,
				width: 255,
				height: 255
			},
			bar: {
				display: 'absolute',
				left: 280,
				top: 57,
				width: 20,
				height: 255
			},
			color: {
				position: 'absolute',
				left: 315,
				top: 44,
				width: 60,
				height: 68,
			},
			colorP: {
				margin: 0,
				fontSize: 13,
				textAlign: 'center'
			},
			buttons: {
				position: 'absolute',
				left: 426,
				top: 36
			},
			button: {
				width: 115,
				height: 20,
				marginBottom: 10 
			},
			colorNew: {
				height: 34,
				background: `rgb(${Math.round(color[0])},${Math.round(color[1])},${Math.round(color[2])})`
			},
			colorCurr: {
				height: 34,
				background: `rgb(${Math.round(currColor[0])},${Math.round(currColor[1])},${Math.round(currColor[2])})`
			},
			inputHsv: {
				position: 'absolute',
				left: 315,
				top: 167,
			},
			inputRgb: {
				position: 'absolute',
				left: 315,
				top: 244,
			},
			inputLab: {
				position: 'absolute',
				left: 455,
				top: 167
			},
			inputCmyk: {
				position: 'absolute',
				left: 455,
				top: 244,
			},
			inputHex: {
				position: 'absolute',
				left: 318,
				top: 319,
			},
			inputDiv: {
				marginBottom: 4,
				height: 19
			},
			input: {
				width: 45,
				height: 20
			},
			lab: {
				width: 56,
				height: 20
			},
			hex: {
				width: 80,
				height: 20
			} 
		}
		return (
			<ColorPicker style={ styles.root } defaultColor={this.state.color} colorModel='rgb' onChange={ (a) => this.handleChange(a) }>	
				<div style={ styles.title }>Color Picker</div>
				<ColorPanel pointer={ <PsPointerCircle /> } style={ styles.panel }/>
				<ColorBar pointer={ <PsPointerDoubleTriangle /> } style={ styles.bar }/>
				<div style={ styles.color }>
					<p style={ styles.colorP }>new</p>
					<div style={ styles.colorNew }></div>
					<div style={ styles.colorCurr }></div>
					<p style={ styles.colorP }>current</p>
				</div>
				<div style={ styles.buttons }>
					<button style={ styles.button } onClick={ this.handleAccept }>OK</button>
					<button style={ styles.button } onClick={ this.handleCancel }>Cancel</button>
				</div>
				<div style={ styles.inputHsv } data-color='1'>
					<div data-color='1' style={ styles.inputDiv }><ColorRadio model='hsv.h'/><ColorInput inputStyle={ styles.input } label='H:' model='hsv.h' rightLabel='°'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorRadio model='hsv.s'/><ColorInput inputStyle={ styles.input } label='S:' model='hsv.s' rightLabel='%'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorRadio model='hsv.v'/><ColorInput inputStyle={ styles.input } label='V:' model='hsv.v' rightLabel='%'/></div>
				</div>
				<div style={ styles.inputRgb } data-color='1'>
					<div data-color='1' style={ styles.inputDiv }><ColorRadio model='rgb.r'/><ColorInput inputStyle={ styles.input } label='R:' model='rgb.r'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorRadio model='rgb.g'/><ColorInput inputStyle={ styles.input } label='G:' model='rgb.g'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorRadio model='rgb.b'/><ColorInput inputStyle={ styles.input } label='B:' model='rgb.b'/></div>
				</div>
				<div style={ styles.inputLab } data-color='1'>
					<div data-color='1' style={ styles.inputDiv }><ColorInput inputStyle={ styles.lab } label='L:' model='lab.l'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorInput inputStyle={ styles.lab } label='a:' model='lab.a'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorInput inputStyle={ styles.lab } label='b:' model='lab.b'/></div>
				</div>
				<div style={ styles.inputCmyk } data-color='1'>
					<div data-color='1' style={ styles.inputDiv }><ColorInput inputStyle={ styles.input } label='C:' model='cmyk.c' rightLabel='%'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorInput inputStyle={ styles.input } label='M:' model='cmyk.m' rightLabel='%'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorInput inputStyle={ styles.input } label='Y:' model='cmyk.y' rightLabel='%'/></div>
					<div data-color='1' style={ styles.inputDiv }><ColorInput inputStyle={ styles.input } label='K:' model='cmyk.k' rightLabel='%'/></div>
				</div>
					<div style={ styles.inputHex } data-color='1'>
					<ColorInput inputStyle={ styles.hex } model='hex'/>
				</div>
				
			</ColorPicker>
		)
	}
}

export default Photoshop