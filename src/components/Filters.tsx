import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../store/actions/filterActions';
import { IFilter, IStoreState } from '../store/types/index';
import RadioGroup from './RadioGroup';
import Select from './Select';

/**
 * Filters component shows up a list of filters for a Analysis.
 * 
 * Radio buttons will be shown for ARREAR_CATEGORY, BOARD_OF_EDUCATION, GENDER.
 * Select box will be shown for CASTE, MARK_FILTER, SEMESTER.
 * 
 * Usage: 
 *  <Filters filterKey={index of the analysis}
 *           filters={Array of options need to be provided for a analysis} />
 */

interface IProps {
    filterKey: number;
    filters: string[];
    storeFilters: IFilter[];
    setFilter: (key: number, data: string, action: string) => void;
}

function Filters({ filterKey, filters, setFilter, storeFilters } : IProps) {
    const currentFilter = storeFilters[filterKey];
    const radio = {
        'Arrear Category': { options: ['Standing Arrear', 'History of Arrear'] },
        'Board': { options: ['CBSE', 'State', 'Both'] },
        'Gender': { options: ['Male', 'Female', 'Both'] }
    }

    const select = {
        'Caste': { options: ['BC', 'MBC', 'OC', 'SC', 'ST'] },
        'Mark Filter': { options: ['Below Average', 'Average', 'Above Average', 'Excellence'] },
        'Semester': { options: [1, 2, 3, 4, 5] }
    }

    function handleChange(value: string, title: string) {
        setFilter(filterKey, value, title);
    }

    function renderRequiredFilters(){
        return filters.map(filter => {
            if(filter in select || (filter.includes('Filter'))){
                let filterName = '';
                if(filter.includes('HSC')) { filterName = 'highSchoolFilter'; }
                else if(filter.includes('SSLC')) { filterName = 'secondarySchoolFilter'; }
                else { filterName = filter.toLowerCase(); }
                return(
                    <Select key={filter}
                        title={filter}
                        options={select[filter] ? select[filter].options : select['Mark Filter'].options}
                        value={currentFilter[filterName]}
                        onChange={ handleChange }/>
                )
            }
            else {
                return(
                    <RadioGroup key={filter} title={filter} options={radio[filter].options}
                        onChange={ handleChange } value={currentFilter[filter.toLowerCase()]}/>
                )
            }
        })
    }

    function handleClearChange() {
        setFilter(filterKey, '', 'Clear');
    }

    return(
        <>
            <form>
            {
                renderRequiredFilters()    
            }
            </form>
            <button type="button" className="mt-2 mb-2 btn btn-danger btn-block" 
                onClick={ handleClearChange }>Clear all</button>
        </>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setFilter(key: number, data: string, action: string): void {
        switch(action){
            case 'Arrear Category': dispatch(actions.setArrearFilter(key, data));
                break;
            case 'Board': dispatch(actions.setBoardFilter(key, data));
                break;
            case 'Gender': dispatch(actions.setGenderFilter(key, data));
                break;
            case 'Caste': dispatch(actions.setCasteFilter(key, data));
                break;
            case 'HSC Filter': dispatch(actions.setHighSchoolMarkLimit(key, data));
                break;
            case 'SSLC Filter': dispatch(actions.setSecondarySchoolMarkLimit(key, data));
                break;
            case 'Semester': dispatch(actions.setSemesterFilter(key, Number(data)));
                break;
            case 'Clear':
                dispatch(actions.setSemesterFilter(key, 0));
                dispatch(actions.setSecondarySchoolMarkLimit(key, data));
                dispatch(actions.setHighSchoolMarkLimit(key, data));
                dispatch(actions.setCasteFilter(key, ''));
                dispatch(actions.setGenderFilter(key, data));
                dispatch(actions.setBoardFilter(key, data));
                dispatch(actions.setArrearFilter(key, data));
                break;
        }
        dispatch(actions.setDataLoaded(key, false));
    },
});

const mapStateToProps = ({ filters }: IStoreState) => ({
    storeFilters: filters,
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);