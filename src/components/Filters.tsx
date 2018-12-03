import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../store/actions/filterActions';
import RadioGroup from './RadioGroup';
import Select from './Select';

interface IProps {
    filterKey: number;
    filters: string[];
    setFilter: (key: number, data: string, action: string) => void;
}

function Filters({ filterKey, filters, setFilter } : IProps) {
    const radio = {
        'Arrear Category': { options: ['Standing Arrear', 'History of Arrear'] },
        'Board': { options: ['CBSE', 'State', 'Both'] },
        'Gender': { options: ['Male', 'Female', 'Both'] }
    }

    const select = {
        'Caste': { options: ['BC', 'MBC', 'OC', 'SC', 'ST'] },
        'Mark Filter': { options: ['Below Average', 'Average', 'Above Average', 'Excellence'] },
        'Semester': { options: ['1', '2', '3', '4', '5'] }
    }

    function handleChange(value: string, title: string) {
        setFilter(filterKey, value, title);
    }

    function renderRequiredFilters(){
        return filters.map(filter => {
            if(filter in select || (filter.includes('Filter'))){
                return(
                    <Select key={filter}
                        title={filter}
                        options={select[filter] ? select[filter].options : select['Mark Filter'].options}
                        onChange={ handleChange }/>
                )
            }
            else {
                return(
                    <RadioGroup key={filter} title={filter} options={radio[filter].options} onChange={ handleChange }/>
                )
            }
        })
    }

    return(
        <div>
            <h1 className="display-4 text-center">Filters</h1>
            <form>
            {
                renderRequiredFilters()    
            }
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setFilter(key: number, data: string, action: string): void{
        switch(action){
            case 'Arrear Category': dispatch(actions.setArrearFilter(key, data));
                break;
            case 'Board': dispatch(actions.setBoardFilter(key, data));
                break;
            case 'Gender': dispatch(actions.setGenderFilter(key, data));
                break;
            case 'Caste': dispatch(actions.setCasteFilter(key, [data]));
                break;
            case 'HSC Filter': dispatch(actions.setHighSchoolMarkLimit(key, data));
                break;
            case 'SSLC Filter': dispatch(actions.setSecondarySchoolMarkLimit(key, data));
                break;
            case 'Semester': dispatch(actions.setSemesterFilter(key, data));
                break;
        }
    }
})

export default connect(null, mapDispatchToProps)(Filters);