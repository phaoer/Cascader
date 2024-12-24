export type CascaderOptionsData = {
    className?: string;
    showTitle?: boolean;
    disabled?: boolean;
    children?: CascaderOptionsData[];
    label: string;
    value: string;
};
export type CascaderOptions = {
    placeholder?: string;
    showClear?: boolean;
    mode?: "single" | "multiple";
    data: CascaderOptionsData[];
    displayRender?: (value: any[]) => string;
    defaultValue?: any[];
    onChange?: (value: any[], labelValue: any[], indexValue: any[]) => void;
};
export default class Cascader {
    private container;
    private uuid;
    private splitStr;
    private options;
    private valValue;
    private randomStr;
    private query;
    private queryAll;
    private getSiblings;
    private menusShow;
    private menusHide;
    private calculateElementWidth;
    private selectItem;
    private renderValue;
    private getNextLevelData;
    private transformValue;
    private createMenu;
    private event;
    constructor(container: string, options: CascaderOptions);
    init(): void;
    setValue(value?: any[]): void;
    get value(): any[];
    get labelValue(): any;
    get indexValue(): any;
}
export type CascaderInstance = InstanceType<typeof Cascader>;
