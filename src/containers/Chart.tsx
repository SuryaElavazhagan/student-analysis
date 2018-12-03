import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from 'src/store/types';

interface IProps {
    isClientLoaded: boolean;
    chartLogic: () => void;
}

function Chart({ isClientLoaded, chartLogic }: IProps) {
    if(isClientLoaded){
        chartLogic();
    }
    return (
        <div id="chart"/>
    )
}

const mapStateToProps = ({ isClientLoaded }: IStoreState) => ({
    isClientLoaded
})

export default connect(mapStateToProps, null)(Chart)
