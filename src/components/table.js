import React, { Component } from 'react'

class Table extends Component{

    renderTable(){
        const columns = Object.entries(this.props.displayData).map(entry => entry[1])
        const rows = []

        for(let i = 0; i < columns[0].length; i++){
            rows.push(
                <tr key={i}>
                    <td style={{ border: '1px solid'}}>{i + 1}</td>
                    {
                        columns.map(
                            (column, index) => <td key={index} style={{ border: '1px solid'}}>{column[i]}</td>
                        )
                    }
                </tr>        
            )
        }

        return rows
    }

    render(){
        return(
            <table style={{ border: '1px solid', borderCollapse: 'collapse', borderSpacing: '0px',overflow: 'scroll', margin: '10px 0px'}}>
                <tbody>
                <tr style={{ border: '1px solid'}}>
                    <th colSpan={Object.keys(this.props.displayData).length + 1}>{this.props.title}</th>
                </tr>
                <tr>
                    <th style={{ border: '1px solid'}}>S.no</th>
                    {
                        Object.keys(this.props.displayData).map((key, index) => 
                            <th key={index} style={{ border: '1px solid'}}>{key}</th>
                        )
                    }
                </tr>
                {
                    this.renderTable()
                }
                </tbody>
            </table>
        )
    }
}

export default Table