import React from 'react'
import '../style/key.css'

const Key = (props) => (
    <div className="key">
        <span style={{ border: '1px solid #D8D8D8', padding: '5px' }}>
            <center><b style={{ fontSize: '12px', marginLeft: '3px'}}>Key</b><br/></center>
            <span className="keyholder">
                {props.colors.map((color , index) => (
                <span className="keytitle" key={index}
                        title={props.data[index]}>
                    <span className="colorbox" style={{ backgroundColor: color }}/>
                    <span>
                        { props.keyData instanceof Array ? props.keyData[index] : props.keyData(index)}
                        <strong>{props.data ? `   (${props.data[index]})` : ''}</strong>
                    </span>
                    <br/>
                </span>
                ))}
            </span>
        </span>
    </div>
)

export default Key;