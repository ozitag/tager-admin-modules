import type { Nullable } from "@tager/admin-services";

import type { OptionType } from "../../typings/common";

/**
 * Значение варианта nullable: у компонента есть проп `nullable`, и вариант
 * «не выбрано» задаётся буквально как { value: null }. Дефолтный параметр
 * OptionType — string, поэтому без явного аргумента такой вариант не
 * проходил проверку типов.
 */
export type OptionsSwitcherOption = OptionType<Nullable<string>> & {
  activeColor?: string;
  activeTextColor?: string;
};
