export interface DropdownOption {
    label: string,
    url?: string,
    icon?: any,
    subMenus?: DropdownOption[]
}