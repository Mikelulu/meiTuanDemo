
import React from 'react'

export default {

    log(info) {

        if(__DEV__){
            // debug模式
            console.log(info);
        }else{
            // release模式
        }

    }
}