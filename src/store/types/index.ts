export interface IFilter {
    gender: string;
    board: string;
    caste: string[];
    highSchoolFilter: string;
    secondarySchoolFilter: string;
    arrearCategory: string;
    semester: string;
    cachedArray: any[];
}

export interface IStoreState {
    isClientLoaded: boolean;
    filters: IFilter[];
}