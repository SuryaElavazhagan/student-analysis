import * as React from 'react';
import { connect } from 'react-redux';
import Spinner from 'src/components/Spinner';
import { IStoreState } from 'src/store/types';

interface IProps {
    isClientLoaded: boolean;
    isDataLoaded: boolean;
    chartLogic: () => void;
}

function Chart({isClientLoaded, isDataLoaded, chartLogic}: IProps) {
    
        if(isClientLoaded && !isDataLoaded) {
            chartLogic();
        }

        return (
            <div id="chart" style={{ height: '400px' }} className="d-flex justify-content-center align-items-center">
            {
                !isDataLoaded ? <Spinner /> : null
            }
            </div>
        )
}

const mapStateToProps = ({ isClientLoaded }: IStoreState) => ({
    isClientLoaded,
});

export default connect(mapStateToProps, null)(Chart);
