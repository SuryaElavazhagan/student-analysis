import React from 'react'
import { Link } from 'react-router-dom'
import { chartTypes } from '../data'
import Card from './card'
import '../style/header.css'

const Header = () => {
    return(        
        <div className='app'>
            <div className="header">
                <Link className="heading" to='/' style={{ textDecoration: 'none', color: 'black'}}>
                    <span>STUDENTS ANALYSIS</span>
                </Link>
                <span className="sheet-link" onClick={() => window.open(`https://docs.google.com/spreadsheets/d/1gBVGfqmFVOQ2tLj09HEEL854yF3PfvhA4kpGHNgTp5M/edit#gid=2035923119`)}>SHEET</span>
            </div>
            <div className="options">
                {chartTypes.map(charts => (
                    <Link key={charts.cardHeading} to={`${charts.cardHeading}`} style={{ textDecoration: 'none', color: 'black'}}>
                        <Card
                            header={charts.cardHeading}
                            description={charts.cardDescription}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Header;