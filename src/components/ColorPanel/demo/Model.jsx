import React from 'react'
import {ColorPicker, ColorPanel} from 'react-colors'

const style = {
	width: 200,
	height: 200
}

console.log(ColorPanel)
const Model = (props) => (
	<ColorPicker {...props}>
		<ColorPanel model='hsv.h' style={ style }/>
		<ColorPanel model='hsv.s' style={ style }/>
		<ColorPanel model='hsv.v' style={ style }/>
		<ColorPanel model='rgb.r' style={ style }/>
		<ColorPanel model='rgb.g' style={ style }/>
		<ColorPanel model='rgb.b' style={ style }/>
	</ColorPicker>
)

export default Model