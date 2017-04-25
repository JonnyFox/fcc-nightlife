import { States } from './states';

export class Utility {

    static format(format: string, ...args: any[]): string {
        var formatted = format;
        for (var i = 0; i < args.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');

            if (formatted)
                formatted = formatted.replace(regexp, args[i]);
        }
        return formatted;
    }

    static formatUrl(...sections: string[]): string {
        return sections.join('/');
    }

    static toUrl(state: States): string {
        return Utility.formatUrl(...States[state].toLocaleLowerCase().split('.'));
    }

    static isNull(obj: any): boolean {
        return obj == null || obj == undefined;
    }

    static isNullOrEmpty(stringValue: string): boolean {
        return Utility.isNull(stringValue) || stringValue == '';
    }

    static isNullOrWhitespace(stringValue: string): boolean {
        return Utility.isNullOrEmpty(stringValue) || stringValue.toString().trim().length == 0;
    }

}