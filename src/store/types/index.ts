export interface IFilter {
    gender: string;
    board: string;
    caste: string;
    highSchoolFilter: string;
    secondarySchoolFilter: string;
    arrearCategory: string;
    semester: number;
    cachedArray: any[];
    isLoaded: boolean;
}

export interface IStoreState {
    isClientLoaded: boolean;
    filters: IFilter[];
}