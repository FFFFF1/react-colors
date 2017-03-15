import React from 'react'
import {render} from 'react-dom'
import ColorPicker from '../src/components/ColorPicker.jsx'
import Hue from '../src/components/Hue.jsx'
import Fields from '../src/components/Fields.jsx'
import EditableInput from '../src/components/EditableInput.jsx'
import ColorPanel from '../src/components/ColorPanel'
import ColorBar from '../src/components/ColorBar'

/* 组合化拾色器组件，让组件自由组合 */

const style = {
	divider: {
		height: 1,
		background: '#ccc',
		margin: '8px 0'
	},
	fields: {
		padding: '0 12px' 
	},
	inputStyle: {
		root: {
			marginBottom: 8
		},
		input: {
			boxSizing: 'border-box',
			paddingLeft: 6,
			height: 34,
			width: 80,
			border: '1px solid #ccc',
			borderRadius: 2,
			verticalAlign: 'top'
		},
		label: {
			height: 34,
			lineHeight: '34px',
			width: 20,
		}
	},
	hueStyle: {
		root: {
			marginLeft: 8
		}
	}
}

class ColorPickerExample extends React.Component {

	handleChange (colorObj) {
		console.log(colorObj)
	}

	render () {

		return (
			<ColorPicker defaultColor={[255,0.5,0.5]} colorModel='rgb' onChange={ (a) => this.handleChange(a) }>	
				<ColorBar/>			
			</ColorPicker>
		)
	}
}

render (
	<ColorPickerExample />,
	document.querySelector('.content')
)

// todo: 将一些样式设为默认值
// todo 组件默认样式
// todo 可配置选框样式
// todo 可配置输入框按钮、标签位置
// todo 默认值，变量类型

/*

<ColorBar/>
				<Hue style={ style.hueStyle } direction='vertical'/>
				<Fields style={ style.fields }>
					<EditableInput style={ style.inputStyle } label='r'/>
					<EditableInput style={ style.inputStyle } label='g'/>
					<EditableInput style={ style.inputStyle } label='b'/>
					<div style={ style.divider }></div>
					<EditableInput style={ style.inputStyle } label='h'/>
					<EditableInput style={ style.inputStyle } label='s'/>
					<EditableInput style={ style.inputStyle } label='v'/>
				</Fields>*/