
import React, { PureComponent } from 'react'
import {
    Image
} from 'react-native'

class TabBarItem extends PureComponent {
    render() {
        // let声明的变量只在它所在的代码块有效
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return(
            <Image
                source={ this.props.focused ? selectedImage : this.props.normalImage}
                style={{tintColor: this.props.tintColor, width: 25, height: 25}}
            />
        )
    }
}

export default TabBarItem;